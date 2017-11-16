from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^countries/(?P<country_id>[^/]+)/cities', views.CityView.as_view(), name='cities'),
    url(r'^countries', views.CountryView.as_view(), name='countries'),
    url(r'^courses/(?P<course_id>[^/]+)', views.CourseView.as_view(), name='courses'),
    url(r'^courses', views.CourseView.as_view(), name='courses'),
    url(r'^cities/(?P<city_id>[^/]+)/universities', views.UniversityView.as_view(), name='universities'),
    url(r'^universities/(?P<university_id>[^/]+)/faculties', views.FacultyView.as_view(), name='faculties'),
    url(r'^explorer', views.explorer, name='explorer'),

]
