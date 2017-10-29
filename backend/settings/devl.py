import os

from .common import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '{{ secret_key }}'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'USER': '',
        'NAME': '{{ project_name }}',
	#'NAME': 'csyllabusfer',
    }
}

INTERNAL_IPS = ['192.168.56.1']

INSTALLED_APPS += (
    'autofixture',
)

STATICFILES_DIRS.append(
    os.path.join(BASE_DIR, os.pardir, 'frontend', 'build'),
)
