from rest_framework import serializers
from .models import Scheme, Building, Map, Coordinate, Room, Floor, Terminal, Passageway
from info.models import Service, SubTherapy
from PIL import Image
import pickle
import os
from imap.settings import MEDIA_ROOT

class CoordinateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = Coordinate
        fields = ('__all__')

class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = ('__all__')

class TerminalSerializer(serializers.ModelSerializer):
    coordinate = CoordinateSerializer()
    class Meta:
        model = Terminal
        fields = ('__all__')

class PassagewaySerializer(serializers.ModelSerializer):
    coordinate = CoordinateSerializer()
    class Meta:
        model = Passageway
        fields = ('__all__')


class RoomSerializer(serializers.ModelSerializer):
    coordinate = CoordinateSerializer()
    service = serializers.SerializerMethodField()
    subtherapy = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = ('__all__')

    def get_service(self, obj):
        if hasattr(obj, 'service'):
            return obj.service.name

    def get_subtherapy(self, obj):
        if hasattr(obj, 'subtherapy'):
            return obj.subtherapy.name

class FloorSerializer(serializers.ModelSerializer):
    entrance = CoordinateSerializer()
    terminal = TerminalSerializer(required=False)
    passageway = PassagewaySerializer(required=False)
    rooms = RoomSerializer(many=True)

    class Meta:
        model = Floor
        fields = ('__all__')

    def create(self, validated_data):
        #create entrance coordinate
        entrance_coordinate = validated_data.get('entrance')
        entrance_coordinate_obj = Coordinate.objects.create(**entrance_coordinate)

        # create terminal coordinate
        terminal = validated_data.get('terminal')

        if terminal:
            terminal_coordinate = terminal.get('coordinate')
            terminal_coordinate_obj = Coordinate.objects.create(**terminal_coordinate)
            terminal_obj = Terminal.objects.create(coordinate=terminal_coordinate_obj)
        else:
            terminal_obj = None

        # create passageway coordinate
        passageway = validated_data.get('passageway')

        if passageway:
            passageway_coordinate = passageway.pop('coordinate')
            passageway_coordinate_obj = Coordinate.objects.create(**passageway_coordinate)
            passageway_obj = Passageway.objects.create(coordinate=passageway_coordinate_obj, **passageway)
        else:
            passageway_obj = None

        # create floor entity
        number = validated_data.get('number')
        building = validated_data.get('building')
        map = validated_data.get('map')
        floor = Floor.objects.create(number=number, building=building, map=map, entrance=entrance_coordinate_obj, terminal=terminal_obj, passageway=passageway_obj)

        # get rooms
        rooms = validated_data.pop('rooms')

        # create rooms
        for room in rooms:
            data_coordinate = room.pop('coordinate')
            room_coordinate = Coordinate.objects.create(**data_coordinate)
            Room.objects.create(floor=floor, coordinate=room_coordinate, **room)

        return floor

class FloorListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Floor
        fields = ('id', 'number')

class BuildingSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    coordinate = CoordinateSerializer()
    floors = FloorListSerializer(many=True, required=False)

    class Meta:
        model = Building
        fields = ('__all__')

class SchemeSerializer(serializers.ModelSerializer):
    buildings = BuildingSerializer(many=True)

    class Meta:
        model = Scheme
        fields = ('__all__')

    def create(self, validated_data):
        # get buildings
        buildings = validated_data.pop('buildings')

        # create scheme entity
        name = validated_data.get('name')
        map = validated_data.get('map')
        scheme = Scheme.objects.create(name=name, map=map)

        # create buildings
        for building in buildings:
            data_coordinate = building.pop('coordinate')
            building_coordinate = Coordinate.objects.create(**data_coordinate)
            Building.objects.create(scheme=scheme, coordinate=building_coordinate, **building)

        return scheme

    def update(self, instance, validated_data):
        buildings_data = validated_data.pop('buildings')
        buildings = list((instance.buildings).all())

        # Perform scheme update.
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        #Perform creations and updates buildings.
        for building_data in buildings_data:
            if building_data.get('id'):
                for building in buildings:
                    if building.id == building_data.get('id'):
                        building.name = building_data.get('name', building.name)
                        building.passagewayFloorNumber = building_data.get('passagewayFloorNumber', building.passagewayFloorNumber)

                        data_coordinate = building_data.pop('coordinate')
                        coordinate_id = data_coordinate.get('id')
                        if(coordinate_id):
                            coordinate_instance = Coordinate.objects.get(pk=coordinate_id)
                            coordinate_instance.x = data_coordinate.get('x',coordinate_instance.x)
                            coordinate_instance.y = data_coordinate.get('y', coordinate_instance.y)
                            coordinate_instance.save()
                        else:
                            building_coordinate = Coordinate.objects.create(**data_coordinate)

                        building.save()
                        buildings.remove(building)
            else:
                print('create')
                data_coordinate = building_data.pop('coordinate')
                building_coordinate = Coordinate.objects.create(**data_coordinate)
                Building.objects.create(scheme=instance, coordinate=building_coordinate, **building_data)

        # Perform deletions tracks.
        for building_to_delete in buildings:
            building_to_delete.delete()


        return instance