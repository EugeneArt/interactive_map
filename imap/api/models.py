from django.db import models
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
import os

class Coordinate(models.Model):
    latitude = models.IntegerField()
    longitude = models.IntegerField()

    def __str__(self):
        return "{}".format(self.id)

class MapImage(models.Model):
    image = models.ImageField(upload_to='maps/')

    def __str__(self):
        return "{}".format(self.id)

class Map(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default=None)
    start_coordinate = models.OneToOneField(Coordinate, on_delete=models.CASCADE)
    image = models.OneToOneField(MapImage, on_delete=models.CASCADE)
    path_to_graph = models.CharField(max_length=128, blank=True, null=True, default=None)

    def __str__(self):
        return "{}".format(self.name)

class Scheme(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default=None)
    map = models.OneToOneField(Map, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.name)

class Building(models.Model):
    name = models.CharField(max_length=255)
    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE)
    coordinate = models.OneToOneField(Coordinate, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.name)

class Floor(models.Model):
    number = models.IntegerField()
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    map = models.OneToOneField(Map, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.number)

class Room(models.Model):
    number = models.IntegerField()
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True, default=None)
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE)
    coordinate = models.OneToOneField(Coordinate, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.number)