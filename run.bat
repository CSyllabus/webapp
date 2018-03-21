start cmd.exe /K  python manage.py runserver
start cmd.exe /K cd frontend/csyllabus & ng serve --env=local-django --port=4200 --open
start cmd.exe /K cd frontend/admin & ng serve --port=4201 --open