from rest_framework import serializers
from .models import Scheme, Building, Map, Coordinate, Room, Floor, Terminal
from PIL import Image
import pickle
import os
from imap.settings import MEDIA_ROOT

class CoordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinate
        fields = ('latitude', 'longitude')

class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = ('__all__')

class TerminalSerializer(serializers.ModelSerializer):
    coordinate = CoordinateSerializer()
    class Meta:
        model = Terminal
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
    rooms = RoomSerializer(many=True)
    map = MapSerializer()
    graph = serializers.SerializerMethodField()
    terminal = TerminalSerializer(required=False)

    class Meta:
        model = Floor
        fields = ('__all__')

    def get_graph(self, obj):
        # read pickle from file
        with open(obj.map.path_to_graph, 'rb') as f:
            return pickle.load(f)

    def create(self, validated_data):
        #create entrance coordinate
        entrance_coordinate = validated_data.get('entrance')
        entrance_coordinate_obj = Coordinate.objects.create(**entrance_coordinate)

        # create entrance coordinate
        terminal = validated_data.get('terminal')

        if terminal:
            terminal_coordinate = terminal.get('coordinate')
            terminal_coordinate_obj = Coordinate.objects.create(**terminal_coordinate)
            terminal_obj = Terminal.objects.create(coordinate=terminal_coordinate_obj)
        else:
            terminal_obj = None

        # data for map entity
        map = validated_data.get('map')
        imageObj = map.get('image')

        # write graph to file
        image_id = validated_data.get('map')['image'].id

        #add graph frome request to file
        data = self.context['request'].data.get('graph')

        filename = MEDIA_ROOT + '/graphs/' + str(image_id) + '.txt'

        # write pickle to file
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, 'wb+') as f:
            pickle.dump(data, f)

        # create map entity
        mapObj = Map.objects.create(name=map.get('name'), image=imageObj, path_to_graph=filename)

        # create floor entity
        number = validated_data.get('number')
        building = validated_data.get('building')
        floor = Floor.objects.create(number=number, building=building, map=mapObj, entrance=entrance_coordinate_obj, terminal=terminal_obj)

        # get rooms
        rooms = validated_data.pop('rooms')

        # create rooms
        for room in rooms:
            data_coordinate = room.pop('coordinate')
            room_coordinate = Coordinate.objects.create(**data_coordinate)
            Room.objects.create(floor=floor, coordinate=room_coordinate, **room)

        return floor