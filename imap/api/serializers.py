from rest_framework import serializers
from .models import Scheme, Building, Map, Coordinate, MapImage, Room, Floor
from PIL import Image
import pickle
import os
from imap.settings import MEDIA_ROOT

class CoordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinate
        fields = ('latitude', 'longitude')

class MapImageSerializer(serializers.ModelSerializer):
    widthOfImage = serializers.SerializerMethodField('get_width')
    heightOfImage = serializers.SerializerMethodField('get_height')

    def get_width(self, instance):
        img = Image.open(instance.image)
        return img.size[0]

    def get_height(self, instance):
        img = Image.open(instance.image)
        return img.size[1]

    class Meta:
        model = MapImage
        fields = ('__all__')

class MapSerializer(serializers.ModelSerializer):
    start_coordinate = CoordinateSerializer()
    class Meta:
        model = Map
        fields = ('name', 'start_coordinate', 'image', 'path_to_graph')
        read_only_fields = ('path_to_graph',)


class BuildingSerializer(serializers.ModelSerializer):
    coordinate = CoordinateSerializer()
    class Meta:
        model = Building
        fields = ('__all__')

class SchemeSerializer(serializers.ModelSerializer):
    map = MapSerializer()
    buildings = BuildingSerializer(many=True)
    graph = serializers.SerializerMethodField()

    class Meta:
        model = Scheme
        fields = ('__all__')

    def get_graph(self, obj):
        # read pickle from file
        with open(obj.map.path_to_graph, 'rb') as f:
            return pickle.load(f)

    def create(self, validated_data):
        # get buildings
        buildings = validated_data.pop('buildings')

        # data for map entity
        map = validated_data.get('map')
        start_coordinate = map.get('start_coordinate')
        coordinateObj = Coordinate.objects.create(**start_coordinate)
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
        mapObj = Map.objects.create(name=map.get('name'), start_coordinate=coordinateObj, image=imageObj, path_to_graph=filename)

        # create scheme entity
        name = validated_data.get('name')
        scheme = Scheme.objects.create(name=name, map=mapObj)

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
    rooms = BuildingSerializer(many=True)
    map = MapSerializer()
    class Meta:
        model = Floor
        fields = ('__all__')

    def get_graph(self, obj):
        # read pickle from file
        with open(obj.map.path_to_graph, 'rb') as f:
            return pickle.load(f)

    def create(self, validated_data):
        # get rooms
        rooms = validated_data.pop('rooms')

        # data for map entity
        map = validated_data.get('map')
        start_coordinate = map.get('start_coordinate')
        coordinateObj = Coordinate.objects.create(**start_coordinate)
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
        mapObj = Map.objects.create(name=map.get('name'), start_coordinate=coordinateObj, image=imageObj, path_to_graph=filename)

        # create floor entity
        number = validated_data.get('number')
        building = validated_data.get('building')
        floor = Floor.objects.create(number=number, building=building, map=mapObj)

        # create rooms
        for room in rooms:
            data_coordinate = room.pop('coordinate')
            room_coordinate = Room.objects.create(**data_coordinate)
            Room.objects.create(floor=floor, coordinate=room_coordinate, **room)

        return floor