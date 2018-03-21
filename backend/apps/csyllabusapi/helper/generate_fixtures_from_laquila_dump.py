import json

laquila_course_json = open("laquila_courses.json")
laquila_fixtures_json = open("../fixtures/laquila_fixtures_json.json", "w")
laquila_courses = json.load(laquila_course_json)

fixtures = []

country_id = 2
fixtures.append({
    "model": "csyllabusapi.country",
    "pk": country_id,
    "fields": {
      "name": "Italy",
      "img": "https://csyllabus.com/images/italy.jpg",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z"
    }
  }
)
city_id = 7
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": city_id,
    "fields": {
      "name": "L'Aquila",
       "img": "https://csyllabus.com/images/laquila.jpg",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z",
      "country": country_id
    }
  }
)
university_id = 4
fixtures.append(
  {
    "model": "csyllabusapi.university",
    "pk": university_id,
    "fields": {
      "name": "University of L'Aquila",
      "description": "Established in 1952 and located in L'Aquila, administrative centre of the Abruzzo Region, our University is a public teaching and research institution offering a full range of academic programmes including biotechnologies, sciences, economics, engineering, education, humanities, medicine, psychology, and sport sciences. With 7 departments, the University of L'Aquila offers its over 18,000 enrolled students 64 degree courses (divided between first and second level degrees), 8 research doctorate programmes, specialisation schools, specializing-master courses and vocational courses. Many members of its distinguished faculty of about 600 professors and researchers have received international recognition and are considered leaders in their fields of research.",
      "created": "2017-10-30T15:05:19.541Z",
      "modified": "2017-10-30T15:05:20.945Z",
      "country": country_id,
      "city": city_id
    }
  }
)

#appending programs fixtures
program_id = 33
fixtures.append(
    {
        "model": "csyllabusapi.program",
        "pk": program_id,
        "fields": {
            "name" : "Computer Science",
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

#appending courses fixtures
course_id = 441
course_program_id = 2173
course_university_id= 441
for course in laquila_courses:
    fixtures.append(
        {
            "model": "csyllabusapi.courseuniversity",
            "pk": course_university_id,
            "fields": {
                "course": course_id,
                "university": 4,
                "created": "2017-10-30T15:07:40.122Z"
            }
        }
    )
    course_university_id = course_university_id + 1


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
                "ects": course['credits'],
                "semester": course['term'],
                "level": 'undergraduate',
                "keywords": "",
                "url": "",
                "created": "2017-10-30T15:07:40.122Z",
                "modified": "2017-10-30T15:07:41.673Z"
            }
        }
    )
    course_id = course_id + 1

json.dump(fixtures,laquila_fixtures_json)
