from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^countries', views.CountryView.as_view(), name='countries'),
    url(r'^explore_courses', views.getCourseByDescription, name='explore_course'),

]
