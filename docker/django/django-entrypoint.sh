#!/usr/bin/env bash

until python manage.py migrate --settings=backend.settings.devl
do
    echo "Waiting for postgres ready..."
    sleep 2
done
python manage.py loaddata backend/apps/csyllabusapi/fixtures/epfl\_fixtures\_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/fer\_fixtures\_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/laquila\_fixtures\_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/mockup\_fixtures\_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/polimi\_fixtures\_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/stanford\_fixtures\_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/texas\_fixtures\_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/ucla\_fixtures\_json.json

python manage.py runserver 0.0.0.0:9000 --settings=backend.settings.devl
