import json

hkust_course_json = open("hkust_courses.json")
hkust_fixtures_json = open("../fixtures/hkust_fixtures_json.json", "w")
hkust_courses = json.load(hkust_course_json)

fixtures = []

country_id = 6
fixtures.append({
    "model": "csyllabusapi.country",
    "pk": country_id,
    "fields": {
      "name": "China",
      "img": "",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z"
    }
  }
)
city_id = 10
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": city_id,
    "fields": {
      "name": "Hong Kong",
      "img": "",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z",
      "country": country_id
    }
  }
)
university_id = 7
fixtures.append(
  {
    "model": "csyllabusapi.university",
    "pk": university_id,
    "fields": {
      "name": "Hong Kong University of Science and Technology",
      "img": "",
      "created": "2017-10-30T15:05:19.541Z",
      "modified": "2017-10-30T15:05:20.945Z",
      "country": country_id,
      "city": city_id
    }
  }
)

#appending programs fixtures
program_id = 37
fixtures.append(
    {
        "model": "csyllabusapi.program",
        "pk": program_id,
        "fields": {
            "name" : "Computer Science and Engineering",
            "study_level": "undergraduate",
            "created": "2017-10-30T15:07:40.122Z",
            "modified": "2017-10-30T15:07:41.673Z"
        }
     }
)

fixtures.append(
    {
        "model": "csyllabusapi.programuniversity",
         "pk": program_id,
        "fields": {
            "university": university_id,
            "program": program_id,
            "created": "2017-10-30T15:07:40.122Z"
        }
    }
)

fixtures.append(
    {
        "model": "csyllabusapi.programcity",
        "pk": program_id,
        "fields": {
            "city": city_id,
            "program": program_id,
            "created": "2017-10-30T15:07:40.122Z"
        }
    }
)
fixtures.append(
    {
        "model": "csyllabusapi.programcountry",
        "pk": program_id,
        "fields": {
            "country": country_id,
            "program": program_id,
            "created": "2017-10-30T15:07:40.122Z"
        }
    }
)

#appending courses fixtures
course_id = 693
course_program_id = 2424
for course in hkust_courses:
    fixtures.append(
        {
            "model": "csyllabusapi.courseprogram",
            "pk": course_program_id,
            "fields": {
                "course": course_id,
                "program": program_id,
                "created": "2017-10-30T15:07:40.122Z"
            }
        }
    )
    course_program_id = course_program_id + 1
    fixtures.append(
        {
            "model": "csyllabusapi.course",
            "pk": course_id,
            "fields": {
                "name" : course['name'],
                "description": course['description'],
                "ects": course['ects'],
                "semester": course['semester'],
                "created": "2017-10-30T15:07:40.122Z",
                "modified": "2017-10-30T15:07:41.673Z"
            }
        }
    )
    course_id = course_id + 1

json.dump(fixtures,hkust_fixtures_json)