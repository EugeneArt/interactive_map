from rest_framework.serializers import ModelSerializer, ImageField
from .models import Service, ImageService, Room, ImageRoom, Therapy, SubTherapy


# service
class ServiceImageSerializer(ModelSerializer):
    class Meta:
        model = ImageService
        fields = '__all__'


class ServiceSerializer(ModelSerializer):
    images = ServiceImageSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = '__all__'


# room
class RoomImageSerializer(ModelSerializer):
    image = ImageField()

    class Meta:
        model = ImageRoom
        fields = '__all__'


class RoomSerializer(ModelSerializer):
    images = RoomImageSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = '__all__'


# therapy
class SubTherapySerializer(ModelSerializer):
    class Meta:
        model = SubTherapy
        fields = '__all__'


class TherapySerializer(ModelSerializer):
    therapy = SubTherapySerializer(many=True, read_only=True)

    class Meta:
        model = Therapy
        fields = ('id', 'name', 'therapy')
