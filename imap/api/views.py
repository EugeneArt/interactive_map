from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import SchemeSerializer, MapImageSerializer, BuildingSerializer, FloorSerializer, RoomSerializer, CoordinateSerializer
from .models import Scheme, MapImage, Building, Floor, Room

class CreateSchemeView(generics.ListCreateAPIView):
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer

    def perform_create(self, serializer):
        serializer.save()

class CreateMapImageView(generics.ListCreateAPIView):
    queryset = MapImage.objects.all()
    serializer_class = MapImageSerializer

    def perform_create(self, serializer):
        serializer.save()

class CreateBuildingView(generics.ListCreateAPIView):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer

    def perform_create(self, serializer):
        serializer.save()

class CreateFloorView(generics.ListCreateAPIView):
    queryset = Floor.objects.all()
    serializer_class = FloorSerializer

    def perform_create(self, serializer):
        serializer.save()

class CreateRoomView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('number', 'name')

    def perform_create(self, serializer):
        serializer.save()

class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class FindPathView(APIView):
    def get(self, request, format=None):

        # parse query
        from_floor_id = request.query_params.get('floor')
        to_room_id = request.query_params.get('room')

        # get current floor
        current_floor = Floor.objects.get(pk=from_floor_id)
        current_floor_number = current_floor.number

        # get the room you are looking for
        room = Room.objects.get(pk=to_room_id)
        coordinate_room_serializer = CoordinateSerializer(room.coordinate)
        floor_serializer = FloorSerializer(room.floor)
        floor_number = room.floor.number
        floor_image = MapImageSerializer(room.floor.map.image)

        if current_floor_number - floor_number == 0:
            return Response([{
                'current_floor': floor_serializer.data,
                'image': floor_image.data,
                'coordinate': coordinate_room_serializer.data
            }])
        else:
            return Response([{
                'current_floor': current_floor.data,
                'floor': floor_serializer.data,
                'coordinate': coordinate_room_serializer.data
            }])


