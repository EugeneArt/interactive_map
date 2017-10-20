from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateSchemeView, CreateMapImageView

urlpatterns = {
    url(r'^schemelist/$', CreateSchemeView.as_view(), name="create_scheme"),
    url(r'^imagelist/$', CreateMapImageView.as_view(), name="create_Image"),
}

urlpatterns = format_suffix_patterns(urlpatterns)