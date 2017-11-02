from django.conf.urls import url, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateSchemeView, CreateMapImageView, CreateBuildingView, CreateFloorView, CreateRoomView

urlpatterns = {
    url(r'^schemelist/$', CreateSchemeView.as_view(), name="create_scheme"),
    url(r'^imagelist/$', CreateMapImageView.as_view(), name="create_image"),
    url(r'^buildinglist/$', CreateBuildingView.as_view(), name="create_building"),
    url(r'^floorlist/$', CreateFloorView.as_view(), name="create_floor"),
    url(r'^roomlist/$', CreateRoomView.as_view(), name="create_room"),
}

urlpatterns = format_suffix_patterns(urlpatterns)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)