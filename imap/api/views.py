from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import SchemeSerializer, MapSerializer, BuildingSerializer, FloorSerializer, RoomSerializer, CoordinateSerializer
from .models import Scheme, Map, Building, Floor, Room

class CreateSchemeView(generics.ListCreateAPIView):
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer

    def perform_create(self, serializer):
        serializer.save()

class CreateMapView(generics.ListCreateAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

    def perform_create(self, serializer):
        serializer.save()

class DetailMapView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

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

        # get the room which's looking for
        room = Room.objects.get(pk=to_room_id)
        room_coordinate__serializer = CoordinateSerializer(room.coordinate)

        # get current floor
        current_floor = Floor.objects.get(pk=from_floor_id)
        current_floor_serializer = FloorSerializer(current_floor)

        # get a floor where is room located
        other_floor = Floor.objects.get(pk=room.floor.id)
        other_floor_serializer = FloorSerializer(other_floor)


        if (current_floor.number - other_floor.number == 0) and (current_floor.building.name == other_floor.building.name):
            return Response([{
                'currentFloor': current_floor_serializer.data,
                'roomCoordinate': room_coordinate__serializer.data
            }])
        elif(current_floor.number - other_floor.number != 0) and (current_floor.building.name == other_floor.building.name):
            return Response([{
                'currentFloor': current_floor_serializer.data,
                'otherFloor': other_floor_serializer.data,
                'roomCoordinate': room_coordinate__serializer.data
            }])
        else:
            return Response([{
                'currentFloor': current_floor_serializer.data,
                'otherFloor': other_floor_serializer.data,
                'roomCoordinate': room_coordinate__serializer.data,
                'other_building': other_floor.building.name
            }])


