from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^countries/(?P<country_id>[^/]+)/universities', views.UniversitiesViewCountry.as_view(), name='universities'),
    url(r'^countries/(?P<country_id>[^/]+)/cities', views.CitiesView.as_view(), name='cities'),
    url(r'^countries', views.CountriesView.as_view(), name='countries'),
    url(r'^country', views.CountryView.as_view(), name='country'),
    url(r'^city', views.CityView.as_view(), name='city'),
    url(r'^cities/(?P<city_id>[^/]+)/universities', views.CityUniversitiesView.as_view(), name='universities'),
    url(r'^university', views.UniversityView.as_view(), name='university'),
    url(r'^universities/(?P<university_id>[^/]+)/faculties', views.FacultyView.as_view(), name='faculties'),
    url(r'^universities/(?P<university_id>[^/]+)/courses', views.CourseByUniversityView.as_view(), name='courses'),
    url(r'^universities/(?P<university_id>[^/]+)/programs', views.ProgramUnivView.as_view(), name='programs'),
    url(r'^universities/(?P<university_id>[^/]+)', views.UniversitiesView.as_view(), name='universities'),
    url(r'^universities', views.UniversitiesView.as_view(), name='universities'),
    url(r'^faculties/(?P<faculty_id>[^/]+)/courses', views.CourseByFacultyView.as_view(), name='courses'),
    url(r'^faculties/(?P<faculty_id>[^/]+)/programs', views.ProgramView.as_view(), name='programs'),
    url(r'^faculties/', views.FacultyViewAll.as_view(), name='faculties'),
    url(r'^programs/(?P<program_id>[^/]+)/courses', views.CourseByProgramView.as_view(), name='courses'),
    url(r'^courses/(?P<course_id>[^/]+)/comments', views.CommentsByCourseView.as_view(), name='comments'),
    url(r'^courses/(?P<course_id>[^/]+)', views.CourseView.as_view(), name='courses'),
    url(r'^courses', views.CourseView.as_view(), name='courses'),
    url(r'^simplecourses', views.CoursesAllSimpleView.as_view(), name='courses'),
    url(r'^comments/(?P<comment_id>[^/]+)', views.CommentsView.as_view(), name='comments'),
    url(r'^comments', views.CommentsView.as_view(), name='comments'),
    url(r'^explorer', views.explorer, name='explorer'),
    url(r'^comparator_text_input', views.comparator_text_input, name='comparator'),
    url(r'^comparator', views.comparator, name='comparator'),
    url(r'^users/self', views.UserViewSelf.as_view(), name='user'),
    url(r'^users/courses', views.UserViewCourse.as_view(), name='user'),
    url(r'^users/check_email', views.check_email, name='check_email'),
    url(r'^users/check_username', views.check_username, name='check_username'),
    url(r'^users/check/(?P<course_id>[^/]+)', views.UserCheckCourseView.as_view(), name='user'),
    url(r'^users/check', views.UserCheckView.as_view(), name='user'),
    url(r'^users/(?P<user_id>[^/]+)', views.UserView.as_view(), name='user'),
    url(r'^users/', views.UserView.as_view(), name='user'),
    url(r'^event_log/', views.EventLogView.as_view(), name='event_log'),
]

#   /universitiesall != /universities
