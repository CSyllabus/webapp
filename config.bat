python manage.py migrate
python manage.py loadtestdata users.EmailUser:100
python manage.py loaddata backend/apps/csyllabusapi/fixtures/fer_fixtures_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/laquila_fixtures_json.json
python manage.py loaddata backend/apps/csyllabusapi/fixtures/mockup_fixtures_json.json
python manage.py course_similarity
python manage.py createsuperuser