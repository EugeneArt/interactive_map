from django.http import HttpResponse

from .models import Service, Room, Therapy, SubTherapy
from .serializers import ServiceSerializer, RoomSerializer, TherapySerializer, SubTherapySerializer
from rest_framework import generics


def index(request):
    return HttpResponse('<a href="servicelist">servicelist/</a><br>'
                        '<a href="roomlist">roomlist/</a><br>'
                        '<a href="therapylist">therapylist/</a><br>'
                        '<a href="therapylist/sub">therapylist/sub/</a>')


class ServiceView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def perform_create(self, serializer):
        serializer.save()


class RoomView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def perform_create(self, serializer):
        serializer.save()


class TherapyView(generics.ListCreateAPIView):
    queryset = Therapy.objects.all()
    serializer_class = TherapySerializer

    def perform_create(self, serializer):
        serializer.save()


class SubTherapyView(generics.ListCreateAPIView):
    queryset = SubTherapy.objects.all()
    serializer_class = SubTherapySerializer

    def perform_create(self, serializer):
        serializer.save()
