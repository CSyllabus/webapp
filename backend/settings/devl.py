import os

from .common import *
from .db import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '{{ secret_key }}'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


INTERNAL_IPS = ['192.168.56.1']

INSTALLED_APPS += (
    'autofixture',
    'csyllabusapi',
    'django.contrib.postgres',
    'corsheaders'
)

STATICFILES_DIRS.append(
    os.path.join(BASE_DIR, os.pardir, 'frontend', 'build'),
)
