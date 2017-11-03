from django.db import models


# services
class Service(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return "{}".format(self.id)


class ImageService(models.Model):
    image = models.ImageField(upload_to='services/')
    service = models.ForeignKey(Service, related_name='images', blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.id)


# room
class Room(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return "{}".format(self.id)


class ImageRoom(models.Model):
    image = models.ImageField(upload_to='room/')
    room = models.ForeignKey(Room, related_name='images', blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.id)


# therapy
class Therapy(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return "{}".format(self.id)


class SubTherapy(models.Model):
    subTherapy = models.ForeignKey(Therapy, related_name='therapy', blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='Therapy/')

    def __str__(self):
        return "{}".format(self.id)
