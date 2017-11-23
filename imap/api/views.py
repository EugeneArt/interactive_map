from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import SchemeSerializer, MapSerializer, BuildingSerializer, FloorSerializer, RoomSerializer, \
    CoordinateSerializer
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
        room_coordinate_serializer = CoordinateSerializer(room.coordinate)

        # get current floor
        current_floor = Floor.objects.get(pk=from_floor_id)
        current_floor_serializer = FloorSerializer(current_floor)

        # get a floor where is room located
        other_floor = Floor.objects.get(pk=room.floor.id)
        other_floor_serializer = FloorSerializer(other_floor)

        # same buildings
        if (current_floor.building.id == other_floor.building.id):
            if (current_floor.number - other_floor.number == 0):
                return Response([{
                    'case': 0,
                    'currentFloor': current_floor_serializer.data,
                    'roomCoordinate': room_coordinate_serializer.data
                }])
            else:
                return Response([{
                    'case': 1,
                    'currentFloor': current_floor_serializer.data,
                    'otherFloor': other_floor_serializer.data,
                    'roomCoordinate': room_coordinate_serializer.data
                }])
        # different buildings
        else:
            current_building = Building.objects.get(current_floor.building.id)
            current_building_serializer = BuildingSerializer(current_building)
            other_building = Building.objects.get(other_floor.building.id)
            other_building_serializer = BuildingSerializer(other_building)

            # building with passageway
            if current_building.passagewayFloorNumber:
                if (current_floor.number == current_building.passagewayFloorNumber) and (other_floor.number == other_floor.passagewayFloorNumber):
                    return Response([{
                        'case': 2,
                        'currentFloor': current_floor_serializer.data,
                        'otherFloor': other_floor_serializer.data,
                        'roomCoordinate': room_coordinate_serializer.data
                    }])
                elif (current_floor.number != current_building.passagewayFloorNumber) and (other_floor.number == other_floor.passagewayFloorNumber):
                    current_passageway_floor = Floor.objects.filter(building=current_building, number=current_building.passagewayFloorNumber)
                    current_passageway_floor_serializer = FloorSerializer(current_passageway_floor)
                    return Response([{
                        'case': 3,
                        'currentFloor': current_floor_serializer.data,
                        'currentPassagewayFloor': current_passageway_floor_serializer.data,
                        'otherFloor': other_floor_serializer.data,
                        'roomCoordinate': room_coordinate_serializer.data
                    }])
                elif (current_floor.number == current_building.passagewayFloorNumber) and (other_floor.number != other_floor.passagewayFloorNumber):
                    other_passageway_floor = Floor.objects.filter(building=other_building, number=other_building.passagewayFloorNumber)
                    other_passageway_floor_serializer = FloorSerializer(other_passageway_floor)
                    return Response([{
                        'case': 4,
                        'currentFloor': current_floor_serializer.data,
                        'otherFloor': other_floor_serializer.data,
                        'otherPassagewayFloor': other_passageway_floor_serializer.data,
                        'roomCoordinate': room_coordinate_serializer.data
                    }])
                elif (current_floor.number != current_building.passagewayFloorNumber) and (other_floor.number != other_floor.passagewayFloorNumber):
                    current_passageway_floor = Floor.objects.filter(building=current_building, number=current_building.passagewayFloorNumber)
                    current_passageway_floor_serializer = FloorSerializer(current_passageway_floor)
                    other_passageway_floor = Floor.objects.filter(building=other_building, number=other_building.passagewayFloorNumber)
                    other_passageway_floor_serializer = FloorSerializer(other_passageway_floor)
                    return Response([{
                        'case': 5,
                        'currentFloor': current_floor_serializer.data,
                        'currentPassagewayFloor': current_passageway_floor_serializer.data,
                        'otherFloor': other_floor_serializer.data,
                        'otherPassagewayFloor': other_passageway_floor_serializer.data,
                        'roomCoordinate': room_coordinate_serializer.data
                    }])

            # building without passageway
            else:
                scheme = Scheme.objects.get(current_building.scheme)
                map = Map.objects.get(scheme.map)
                map_serizlizer = MapSerializer(map)

                if (current_floor.number == 1) and (other_floor.number == 1):
                    return Response([{
                        'case': 6,
                        'currentFloor': current_floor_serializer.data,
                        'otherFloor': other_floor_serializer.data,
                        'roomCoordinate': room_coordinate_serializer.data,
                        'current_building': current_building_serializer.data,
                        'other_building': other_building_serializer.data,
                        'map': map_serizlizer.data
                    }])
                elif (current_floor.number > 1) and (other_floor.number == 1):
                    current_floor_first = Floor.objects.filter(building=current_building, number=1)
                    current_floor_first_serializer = FloorSerializer(current_floor_first)
                    return Response([{
                        'case': 7,
                        'currentFloor': current_floor_serializer.data,
                        'currentFloorFirst': current_floor_first_serializer.data,
                        'otherFloor': other_floor_serializer.data,
                        'roomCoordinate': room_coordinate_serializer.data,
                        'current_building': current_building_serializer.data,
                        'other_building': other_building_serializer.data,
                        'map': map_serizlizer.data
                    }])
                elif (current_floor.number == 1) and (other_floor.number > 1):
                    other_floor_first = Floor.objects.filter(building=other_building, number=1)
                    other_floor_first_serializer = FloorSerializer(other_floor_first)
                    return Response([{
                        'case': 8,
                        'currentFloor': current_floor_serializer.data,
                        'otherFloor': other_floor_serializer.data,
                        'otherFloorFirst': other_floor_first_serializer.data,
                        'roomCoordinate': room_coordinate_serializer.data,
                        'current_building': current_building_serializer.data,
                        'other_building': other_building_serializer.data,
                        'map': map_serizlizer.data
                    }])
                elif (current_floor.number > 1) and (other_floor.number > 1):
                    current_floor_first = Floor.objects.filter(building=current_building, number=1)
                    current_floor_first_serializer = FloorSerializer(current_floor_first)
                    other_floor_first = Floor.objects.filter(building=other_building, number=1)
                    other_floor_first_serializer = FloorSerializer(other_floor_first)
                    return Response([{
                        'case': 9,
                        'currentFloor': current_floor_serializer.data,
                        'currentFloorFirst': current_floor_first_serializer.data,
                        'otherFloor': other_floor_serializer.data,
                        'otherFloorFirst': other_floor_first_serializer.data,
                        'roomCoordinate': room_coordinate_serializer.data,
                        'current_building': current_building_serializer.data,
                        'other_building': other_building_serializer.data,
                        'map': map_serizlizer.data
                    }])
