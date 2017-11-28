#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.db import models
from api.models import Room as Api_room
from django.utils.safestring import mark_safe


# services
class Service(models.Model):
    name = models.CharField(max_length=200, help_text='Название')
    description = models.TextField(help_text='Описание')
    room = models.OneToOneField(Api_room, blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Услуги'
        verbose_name_plural = 'Услуги'

    def __str__(self):
        return "{}".format(self.name)


class ImageService(models.Model):
    image = models.ImageField(upload_to='content/')
    service = models.ForeignKey(Service, related_name='images', blank=True, null=True, on_delete=models.CASCADE)

    def image_tag(self):
        return mark_safe('<img src="%s" height="150" />' % self.image.url)

    image_tag.short_description = 'image'
    image_tag.allow_tags = True

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    def __str__(self):
        return "{}".format(self.id)


# room
class Room(models.Model):
    name = models.CharField(max_length=200, help_text='Название')
    description = models.TextField(help_text='Описание')

    class Meta:
        verbose_name = 'Номер'
        verbose_name_plural = 'Номера'

    def __str__(self):
        return "{}".format(self.name)


class ImageRoom(models.Model):
    image = models.ImageField(upload_to='room/')
    room = models.ForeignKey(Room, related_name='images', blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    def __str__(self):
        return "{}".format(self.id)

    def image_tag(self):
        return mark_safe('<img src="%s" height="150" />' % self.image.url)

    image_tag.short_description = 'image'
    image_tag.allow_tags = True


class Voucher(models.Model):
    room = models.ForeignKey(Room, related_name='voucher', blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, help_text='Название')

    class Meta:
        verbose_name = 'Путевка'
        verbose_name_plural = 'Путевка'

    def __str__(self):
        return "{}".format(self.name)


class Currency(models.Model):
    voucher = models.ForeignKey(Voucher, related_name='currency', blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, help_text='Название')

    class Meta:
        verbose_name = 'Валюта'
        verbose_name_plural = 'Валюта'

    def __str__(self):
        return "{}".format(self.name)


class PriceRoom(models.Model):
    currency_type = models.ForeignKey(Currency, related_name='price_type', blank=True, null=True,
                                      on_delete=models.CASCADE)
    during = models.CharField(max_length=200, blank=True, null=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, default=True)

    def __str__(self):
        return "{}".format(self.during)


# therapy
class Therapy(models.Model):
    name = models.CharField(max_length=200, help_text='Название')

    class Meta:
        verbose_name = 'Лечение'
        verbose_name_plural = 'Лечение'

    def __str__(self):
        return "{}".format(self.id)


class SubTherapy(models.Model):
    therapy = models.ForeignKey(Therapy, related_name='therapy', blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, help_text='Название')
    description = models.TextField(help_text='Описание')
    video = models.FileField(upload_to='therapy/', blank=True, null=True, default=True)
    room = models.OneToOneField(Api_room, blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Каталог лечения'
        verbose_name_plural = 'Каталоги лечения'

    def __str__(self):
        return "{}".format(self.id)


class ImageTherapy(models.Model):
    image = models.ImageField(upload_to='therapy/')
    room = models.ForeignKey(SubTherapy, related_name='images', blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Изображение'
        verbose_name_plural = 'Изображения'

    def __str__(self):
        return "{}".format(self.id)

    def image_tag(self):
        return mark_safe('<img src="%s" height="150" />' % self.image.url)

    image_tag.short_description = 'image'
    image_tag.allow_tags = True
