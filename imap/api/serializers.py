from rest_framework import serializers
from .models import Scheme, Building, Map, Coordinate, MapImage
from PIL import Image
import pickle
import os
from imap.settings import MEDIA_ROOT
from rest_framework.fields import ListField

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
    class Meta:
        model = Building
        fields = ('name', 'coordinate')

class SchemeSerializer(serializers.ModelSerializer):
    map = MapSerializer()
    graph = ListField(serializers.IntegerField())

    class Meta:
        model = Scheme
        fields = ('__all__')

    def create(self, validated_data):
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

        # read pickle from file
        with open(filename, 'rb') as f:
            print(pickle.load(f))

        # create map entity
        mapObj = Map.objects.create(name=map.get('name'), start_coordinate=coordinateObj, image=imageObj, path_to_graph=filename)

        # create scheme entity
        name = validated_data.get('name')
        scheme = Scheme.objects.create(name=name, map=mapObj)

        return scheme


