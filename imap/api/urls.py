from django.conf.urls import url, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateSchemeView, CreateMapImageView, CreateBuildingView, CreateFloorView, CreateRoomView, RoomDetailView, RoomListView, FindPathView

urlpatterns = {
    url(r'^schemelist/$', CreateSchemeView.as_view(), name="create_scheme"),
    url(r'^imagelist/$', CreateMapImageView.as_view(), name="create_image"),
    url(r'^buildinglist/$', CreateBuildingView.as_view(), name="create_building"),
    url(r'^floorlist/$', CreateFloorView.as_view(), name="create_floor"),
    url(r'^roomlist/$', CreateRoomView.as_view(), name="create_room"),
    url(r'^roomlist/(?P<pk>[0-9]+)/?$', RoomDetailView.as_view(), name="detail_room"),
    url(r'^findroom/$', RoomListView.as_view(), name="find_room"),
    url(r'^findpath/$', FindPathView.as_view(), name="find_path"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)