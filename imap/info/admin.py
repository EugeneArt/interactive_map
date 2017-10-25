from django.contrib import admin
from .models import Service, ImageService, Room, ImageRoom, Therapy, SubTherapy


# Register your models here.


# services
class AdminImageServices(admin.TabularInline):
    model = ImageService
    extra = 0


@admin.register(Service)
class AdminServices(admin.ModelAdmin):
    inlines = [AdminImageServices]


# room
class AdminImageRoom(admin.TabularInline):
    model = ImageRoom
    extra = 0


@admin.register(Room)
class AdminRoom(admin.ModelAdmin):
    inlines = [AdminImageRoom]


# therapy
class AdminTherapy(admin.TabularInline):
    model = SubTherapy
    extra = 0


@admin.register(Therapy)
class AdminPackage(admin.ModelAdmin):
    inlines = [AdminTherapy]
