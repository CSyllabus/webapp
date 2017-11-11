from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^countries', views.CountryView.as_view(), name='countries'),
    url(r'^cities', views.CityView.as_view(), name='cities'),
    url(r'^universities', views.UniversityView.as_view(), name='universities'),
    url(r'^faculties', views.FacultyView.as_view(), name='faculties'),
    url(r'^explore_courses', views.getCourseByDescription, name='explore_course'),

]
