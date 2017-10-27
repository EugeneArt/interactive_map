from rest_framework import generics
from .serializers import SchemeSerializer, MapImageSerializer, BuildingSerializer
from .models import Scheme, MapImage, Building

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





