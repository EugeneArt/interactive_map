from rest_framework import serializers
from .models import Scheme, Building, Map, Coordinate, Room, Floor, Terminal, Passageway
from PIL import Image
import pickle
import os
from imap.settings import MEDIA_ROOT

class CoordinateSerializer(serializers.ModelSerializer):
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

class BuildingSerializer(serializers.ModelSerializer):
    coordinate = CoordinateSerializer()
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

class RoomSerializer(serializers.ModelSerializer):
    coordinate = CoordinateSerializer()
    class Meta:
        model = Room
        fields = ('__all__')

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
            passageway_coordinate = passageway.get('coordinate')
            passageway_coordinate_obj = Coordinate.objects.create(**passageway_coordinate)
            passageway_obj = Passageway.objects.create(coordinate=passageway_coordinate_obj)
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