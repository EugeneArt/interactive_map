from django.contrib import admin
from .models import Map, Coordinate, Scheme, Building, Floor, Room, MapImage

class BuildingInline(admin.TabularInline):
    model = Building
    extra = 0

class FloorInline(admin.TabularInline):
    model = Floor
    extra = 0

class RoomInline(admin.TabularInline):
    model = Room
    extra = 0

@admin.register(Coordinate)
class CoordinateAdmin(admin.ModelAdmin):
    list_display = ['latitude', 'longitude']

@admin.register(MapImage)
class MapImageAdmin(admin.ModelAdmin):
    list_display = ['id','image']

@admin.register(Map)
class MapAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Scheme)
class SchemeAdmin(admin.ModelAdmin):
    list_display = ['name', 'map']
    inlines = [BuildingInline]

@admin.register(Building)
class BuildingAdmin(admin.ModelAdmin):
    list_display = ['name', 'scheme' , 'coordinate']
    inlines = [FloorInline]

@admin.register(Floor)
class FloorAdmin(admin.ModelAdmin):
    list_display = ['number', 'building' , 'map']
    inlines = [RoomInline]

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['number', 'name' , 'description', 'floor', 'coordinate']

