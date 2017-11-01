from rest_framework import generics
from .serializers import SchemeSerializer, MapImageSerializer, BuildingSerializer, FloorSerializer
from .models import Scheme, MapImage, Building, Floor

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




