# Django Server for CSyllabus

## Primary Modules
1. [django](https://www.djangoproject.com/)
1. [django rest framework](http://www.django-rest-framework.org/)

## Prerequisites
1. Postgres
1. Python

## Installation
(Don't forget to be in virtual env. before these steps, see parent directory readme file)
```
pip install -r backend/requirements/devl.pip
createdb $project_name
python manage.py migrate
python manage.py loadtestdata users.EmailUser:100
python manage.py loaddata backend/apps/csyllabusapi/fixtures/fer_fixtures_json.json
python manage.py createsuperuser
python manage.py runserver
```
+ don't forget to add 'csyllabusapi' to your settings installed apps
