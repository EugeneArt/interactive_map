from django.db import models

# Create your models here.


# services
class Service(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()


class ImageService(models.Model):
    image = models.ImageField(upload_to='upload/services/')
    service = models.ForeignKey(Service, on_delete=models.CASCADE)


# room
class Room(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)


class ImageRoom(models.Model):
    image = models.ImageField(upload_to='upload/room/')
    room = models.ForeignKey(Room, on_delete=models.CASCADE)


# therapy
class Therapy(models.Model):
    name = models.CharField(max_length=200)


class SubTherapy(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='upload/Package/Therapy/')
    therapy = models.ForeignKey(Therapy, on_delete=models.CASCADE)