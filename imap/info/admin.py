#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.contrib import admin
from .models import *


# content
class AdminImageServices(admin.TabularInline):
    model = ImageService
    extra = 0
    readonly_fields = ('image_tag',)


@admin.register(Service)
class AdminServices(admin.ModelAdmin):
    inlines = [AdminImageServices]
    ordering = ['name']
    search_fields = ['name']


# room
class AdminImageRoom(admin.TabularInline):
    model = ImageRoom
    extra = 0
    readonly_fields = ('image_tag',)

class AdminVoucherInline(admin.TabularInline):
    model = Voucher
    extra = 0

@admin.register(Voucher)
class AdminVoucher(admin.ModelAdmin):
    pass


class AdminPriceRoom(admin.TabularInline):
    model = PriceRoom
    extra = 0


@admin.register(Currency)
class AdminCurrency(admin.ModelAdmin):
    inlines = [AdminPriceRoom]
    list_display = ('name','voucher',)
    ordering = ['name']


@admin.register(Room)
class AdminRoom(admin.ModelAdmin):
    inlines = [AdminImageRoom]
    ordering = ['name']


# therapy
class AdminImageTherapy(admin.TabularInline):
    model = ImageTherapy
    extra = 0
    readonly_fields = ('image_tag',)


@admin.register(SubTherapy)
class AdminTherapy(admin.ModelAdmin):
    inlines = [AdminImageTherapy]
    list_display = ('name','therapy',)
    list_filter = ('room__floor',)
    search_fields = ['name']
    extra = 0
    ordering = ['name']


@admin.register(Therapy)
class AdminPackageTherapy(admin.ModelAdmin):
    ordering = ['name']


@admin.register(Advertisement)
class AdminAdvertisement(admin.ModelAdmin):
    pass