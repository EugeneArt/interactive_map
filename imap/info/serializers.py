from rest_framework.serializers import ModelSerializer
from .models import Service, ImageService, Room, ImageRoom, Therapy, SubTherapy, PriceRoom


# service
class ServiceImageSerializer(ModelSerializer):
    class Meta:
        model = ImageService
        fields = '__all__'


class ServiceSerializer(ModelSerializer):
    images = ServiceImageSerializer(many=True)

    class Meta:
        model = Service
        fields = '__all__'


# room
class RoomImageSerializer(ModelSerializer):
    class Meta:
        model = ImageRoom
        fields = '__all__'


class RoomPriceSerializer(ModelSerializer):
    class Meta:
        model = PriceRoom
        fields = '__all__'


class RoomSerializer(ModelSerializer):
    images = RoomImageSerializer(many=True)
    price = RoomPriceSerializer(many=True)

    class Meta:
        model = Room
        fields = '__all__'


# therapy
class SubTherapySerializer(ModelSerializer):
    class Meta:
        model = SubTherapy
        fields = '__all__'


class TherapySerializer(ModelSerializer):
    therapy = SubTherapySerializer(many=True)

    class Meta:
        model = Therapy
        fields = '__all__'


