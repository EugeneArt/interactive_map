from django.contrib import admin
from .models import Service, ImageService, Room, ImageRoom, Therapy, SubTherapy, PriceRoom


# Register your models here.


# services
class AdminImageServices(admin.TabularInline):
    model = ImageService
    extra = 0
    readonly_fields = ('image_tag',)


@admin.register(Service)
class AdminServices(admin.ModelAdmin):
    inlines = [AdminImageServices]
    ordering = ['name']


# room
class AdminImageRoom(admin.TabularInline):
    model = ImageRoom
    extra = 0
    readonly_fields = ('image_tag',)


class AdminPriceRoom(admin.TabularInline):
    model = PriceRoom
    extra = 0


@admin.register(Room)
class AdminRoom(admin.ModelAdmin):
    inlines = [AdminImageRoom, AdminPriceRoom]
    ordering = ['name']


# therapy
class AdminTherapy(admin.TabularInline):
    model = SubTherapy
    extra = 0
    ordering = ['name']
    readonly_fields = ('image_tag',)


@admin.register(Therapy)
class AdminPackage(admin.ModelAdmin):
    inlines = [AdminTherapy]
    ordering = ['name']
