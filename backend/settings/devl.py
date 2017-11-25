import os

from .common import *
from .db import *

# SECURITY WARNING: keep the secret key used in production secret!

SECRET_KEY = '8lu*6g0lg)9z!ba+a$ehk)xt)x%rxgb$i1&amp;022shmi1jcgihb*'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


INTERNAL_IPS = ['192.168.56.1']

INSTALLED_APPS += (
   'autofixture',
   'csyllabusapi',
   'backend'
)

SITE_ID = 1

STATICFILES_DIRS.append(
   os.path.join(BASE_DIR, os.pardir, 'frontend', 'build'),
)


