from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from . import views
from .views import ServiceView, RoomView, TherapyView, SubTherapyView

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^servicelist/$', ServiceView.as_view(), name="create_service"),
    url(r'^roomlist/$', RoomView.as_view(), name="create_room"),
    url(r'^therapylist/$', TherapyView.as_view(), name="create_therapy"),
    url(r'^therapylist/sub/$', SubTherapyView.as_view(), name="create_therapy"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
