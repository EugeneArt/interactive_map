from django.db import models
from api.models import Room as Api_room
from django.utils.safestring import mark_safe

# services
class Service(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    room = models.OneToOneField(Api_room, blank=True, null=True, on_delete=models.CASCADE)

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


class Voucher(models.Model):
    room = models.ForeignKey(Room, related_name='voucher', blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return "{}".format(self.name)


class Currency(models.Model):
    voucher = models.ForeignKey(Voucher, related_name='currency', blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return "{}".format(self.name)

class PriceRoom(models.Model):
    currency_type = models.ForeignKey(Currency, related_name='price_type', blank=True, null=True, on_delete=models.CASCADE)
    during = models.CharField(max_length=200, blank=True, null=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=True)

    def __str__(self):
        return "{}".format(self.during)


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
    room = models.OneToOneField(Api_room, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return "{}".format(self.id)

    def image_tag(self):
        return mark_safe('<img src="/media/%s" height="150" />' % self.image.url)
    image_tag.short_description = 'image'
    image_tag.allow_tags = True
