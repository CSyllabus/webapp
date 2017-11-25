"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""
import site
site.addsitedir('/usr/lib64/python2.7/site-packages')
import os
import sys

sys.path.append('/usr/lib64/python2.7/site-packages/')
sys.path.append('/var/www/vhosts/csyllabus.com/backend/')
sys.path.append('/var/www/vhosts/csyllabus.com/backend/wsgi.py')
sys.path.append('/var/www/vhosts/csyllabus.com/')

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.devl")

application = get_wsgi_application()


