from django.conf.urls import url, include
from django.contrib.auth.views import login, logout_then_login
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import app, index


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^app/', app, name='app'),
    url('^auth/login/$', login, name='login'),
    url(''
        '^auth/logout/$', logout_then_login, name='logout'),
    url('^$', index, name='index'),
    url(r'^csyllabusapi/', include('csyllabusapi.urls')),
    url(r'^api/', include('csyllabusapi.urls')),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
]
