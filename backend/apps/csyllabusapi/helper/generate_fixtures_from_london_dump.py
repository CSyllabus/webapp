import json

london_course_json = open("University_of_London.js")
london_fixtures_json = open("../fixtures/london_fixtures_json.json", "w")
london_courses = json.load(london_course_json)["results"]

fixtures = []

country_id = 7
fixtures.append({
    "model": "csyllabusapi.country",
    "pk": country_id,
    "fields": {
      "name": "United Kingdom",
        "description": "We are one of the largest, most diverse universities in the UK with over 120,000 students in London, and a further 50,000 studying across 180 countries for a University of London degree. The courses you study and all the materials provided are created and assessed by the University of London's member institutions, which have international reputations for their teaching and research. When you study with us, you will join over 52,000 students in every corner of the globe studying more than 100 different courses. When you graduate, your prestigious University of London award will be valued globally and help you to pursue sought-after careers.",
      "img": "",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z"
    }
  }
)
city_id = 12
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": city_id,
    "fields": {
      "name": "London",
      "img": "",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z",
      "country": country_id
    }
  }
)
university_id = 9
fixtures.append(
  {
    "model": "csyllabusapi.university",
    "pk": university_id,
    "fields": {
      "name": "University of London",
      "img": "",
      "created": "2017-10-30T15:05:19.541Z",
      "modified": "2017-10-30T15:05:20.945Z",
      "country": country_id,
      "city": city_id
    }
  }
)

#appending programs fixtures
program_id = 39
fixtures.append(
    {
        "model": "csyllabusapi.program",
        "pk": program_id,
        "fields": {
            "name" : "Computer Science and Engineering",
            "study_level": "undergraduate and graduate",
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

course_id = 1043
course_uni_id = 1043
course_program_id = 2774
for i in range(len(london_courses)):
    course_name = london_courses[i]["title"].strip()
    try:
        course_description = london_courses[i]["metaData"]["c"].strip()
    except:
        course_description = ''

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
            "model": "csyllabusapi.courseuniversity",
            "pk": course_uni_id,
            "fields": {
                "course": course_id,
                "university": university_id,
                "created": "2017-10-30T15:07:40.122Z"
            }
        }
    )
    course_uni_id = course_uni_id + 1

    fixtures.append(
        {
            "model": "csyllabusapi.course",
            "pk": course_id,
            "fields": {
                "name": course_name,
                "description": course_description,
                "ects": None,
                "semester": None,
                "created": "2017-10-30T15:07:40.122Z",
                "modified": "2017-10-30T15:07:41.673Z"
            }
        }
    )
    course_id = course_id + 1

json.dump(fixtures, london_fixtures_json)