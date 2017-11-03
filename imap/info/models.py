from django.db import models
from django.utils.safestring import mark_safe

# services
class Service(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return "{}".format(self.name)


class ImageService(models.Model):
    image = models.ImageField(upload_to='content/')
    service = models.ForeignKey(Service, related_name='images', blank=True, null=True, on_delete=models.CASCADE)

    def image_tag(self):
        return mark_safe('<img src="%s" height="150" />' % self.image.url)

    image_tag.short_description = 'image'
    image_tag.allow_tags = True

    def __str__(self):
        return "{}".format(self.id)




# room
class Room(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return "{}".format(self.name)


class ImageRoom(models.Model):
    image = models.ImageField(upload_to='room/')
    room = models.ForeignKey(Room, related_name='images', blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.id)

    def image_tag(self):
        return mark_safe('<img src="%s" height="150" />' % self.image.url)
    image_tag.short_description = 'image'
    image_tag.allow_tags = True


class PriceRoom(models.Model):
    room = models.ForeignKey(Room, related_name='price', blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, null=True)

    def __str__(self):
        return "{}".format(self.name)


# therapy
class Therapy(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return "{}".format(self.name)


class SubTherapy(models.Model):
    subTherapy = models.ForeignKey(Therapy, related_name='therapy', blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='Therapy/')

    def __str__(self):
        return "{}".format(self.id)

    def image_tag(self):
        return mark_safe('<img src="/media/%s" height="150" />' % self.image.url)
    image_tag.short_description = 'image'
    image_tag.allow_tags = True
