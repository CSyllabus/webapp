# CSyllabus app = Django REST + Angular 4
Made by team from POLIMI, Italy and FER, Croatia University

## Motivation
 CSyllabus is imagined as a web platform which shouldng  ease up process of finding and comparing courses on domestic and foreign faculties.
 It will enable users to discover and compare courses on interactive way through web application.
 This “one click” app will save time and provide very useful information to interested parties.

## Installation
```
export project_name={{ project_name }}
mkvirtualenv $project_name
pip install django
```
1. Follow [backend/README.md](backend/README.md)
1. Follow [frontend/README.md](frontend/README.md)


## Instalation guide for the backend:
```
install PostgreSQL 9.6x (https://www.postgresql.org/download/)
install with pgadmin
create new server hostname -> “localhost”
 write down password and username for root (usually username = postgres)
 after installation create a database in pgadmin to be used with the opensyllabus and write down the name used
if you create a new username and password for the database write it down too
install python 2.7 (https://www.python.org/downloads/)
check python version in command line with 'python -V'
install pip for python 2.7 (it allready comes shipped with python 2.7.9+) 
check pip version with 'pip -V'
install django with 'pip install django'
check django version with 'python -c "import django; print(django.get_version())"'
position yourself in csyllabus root folder
pip install -r backend/requirements/devl.pip
in file backend/settings/devl.py field  change DATABASES according to database name, username and password you wrote down in first 
## steps
python manage.py migrate
python manage.py loadtestdata users.EmailUser:100
python manage.py loaddata backend/apps/csyllabusapi/fixtures/fer_fixtures_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/laquila_fixtures_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/mockup_fixtures_json.json
python manage.py createsuperuser
python manage.py runserver
```

## Instalation guide for the frontend:
```
install nodeJS (https://nodejs.org/en/download/)
position youself in the frontend/csyllabus folder
run ‘npm install’
serve angular app with ‘ng serve’
```

## Coding the backend
```
Recommended IDE is PyCharm, but if you are using other IDE make sure it is connencted to statics code analyzer which checks adherence to PEP 8 standard. (https://www.python.org/dev/peps/pep-0008/)

## In writing the API make sure to adhere to these standards:
https://google.github.io/styleguide/jsoncstyleguide.xml
https://cloud.google.com/apis/design/
```

## Coding the frontend:
```
To adhere to code conventiones we must code using tslint to make sure we convey to these style guidelines (https://angular.io/guide/styleguide).

Conennect your IDE with tslinf file: frontend/csyllabus/tslint.json

Usually IDE-s do this autoamticaly but if they for some reason didn't or if you are unsure if they did:
    
Instrunctions for WebStorm:
    https://www.jetbrains.com/help/webstorm/tslint.html
Instrunction fro PyCharm:
    https://www.jetbrains.com/help/pycharm/tslint.html
Intrunctions for VisualStudio Code:
    https://www.youtube.com/watch?v=-lgBFAtKJ1k

Before pushing to your branch I recommend running 'ng lint' and 'ng test'.
If you coded listening to linter errors and warnings 'ng lint' should say all is fine, if you didnt it will tell you what to correct.

Running 'ng test' will check for unit tests, now these are great and building components and services with angular cli autoamticaly creates some unit tests which give fair code coverage.
```


## CSyllabus
![screenshot](screenshot.png)
