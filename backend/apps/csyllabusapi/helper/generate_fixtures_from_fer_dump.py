import json

fer_course_json = open("fer_courses.json")
fer_fixtures_json = open("../fixtures/fer_fixtures_json.json", "w")
fer_courses = json.load(fer_course_json)

fixtures = []
programs_fixtures = []
programs = []

fixtures.append({
    "model": "csyllabusapi.country",
    "pk": 1,
    "fields": {
      "name": "Croatia",
      "img": "https://csyllabus.com/images/croatia.jpg",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z"
    }
  }
)
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": 1,
    "fields": {
      "name": "Zagreb",
       "img": "https://csyllabus.com/images/zagreb.jpg",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z",
      "country": 1
    }
  }
)
fixtures.append(
  {
    "model": "csyllabusapi.university",
    "pk": 1,
    "fields": {
      "name": "University of Zagreb",
      "created": "2017-10-30T15:05:19.541Z",
      "modified": "2017-10-30T15:05:20.945Z",
      "country": 1,
      "city": 1
    }
  }
)

fixtures.append(
  {
    "model": "csyllabusapi.faculty",
    "pk": 1,
    "fields": {
      "name": "Faculty of electrical engineering and computing",
      "img": "https://csyllabus.com/images/fer.jpg",
      "created": "2017-10-30T15:05:45.387Z",
      "modified": "2017-10-30T15:05:52.444Z",
      "university": 1,
      "city": 1
    }
  }
)

#appending programs fixtures
program_id = 1
for course_sublist in fer_courses:
    for course in course_sublist['profile'].split(','):
        course = course.strip()
        if course+"-"+str(course_sublist['studylevel']) not in programs:
            programs.append(course+"-"+str(course_sublist['studylevel']))
            study_level = ""
            if course_sublist['studylevel'] == 3:
                study_level = "undergraduate"
            elif course_sublist['studylevel'] == 4:
                study_level = "graduate"
            elif course_sublist['studylevel'] == "3, 4":
                study_level = "undergraduate and graduate"
            program = {
                "model": "csyllabusapi.program",
                "pk": program_id,
                "fields": {
                    "name" : course,
                    "study_level": study_level,
                    "created": "2017-10-30T15:07:40.122Z",
                    "modified": "2017-10-30T15:07:41.673Z"
                }
            }
            fixtures.append(program)

            fixtures.append(
                {
                    "model": "csyllabusapi.programfaculty",
                    "pk": program_id,
                    "fields": {
                        "faculty": 1,
                        "program": program_id,
                        "created": "2017-10-30T15:07:40.122Z"
                    }
                }
            )

            fixtures.append(
                {
                    "model": "csyllabusapi.programuniversity",
                    "pk": program_id,
                    "fields": {
                        "university": 1,
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
                        "city": 1,
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
                        "country": 1,
                        "program": program_id,
                        "created": "2017-10-30T15:07:40.122Z"
                    }
                }
            )
            programs_fixtures.append(program)
            program_id = program_id + 1


#appending courses fixtures
course_id = 1
course_program_id = 1
course_university_id= 1
course_faculty_id=1
for course in fer_courses:
    course_programs = course['profile'].split(',')
    i = 0
    for course_program in course_programs:
        course_programs[i] = course_program.strip()
        i = i +1

    for program in programs_fixtures:
        if program["fields"]["name"] in course_programs:
            fixtures.append(
                {
                    "model": "csyllabusapi.courseprogram",
                    "pk": course_program_id,
                    "fields": {
                        "course": course_id,
                        "program": int(program["pk"]),
                        "created": "2017-10-30T15:07:40.122Z"
                    }
                }
            )
            course_program_id = course_program_id + 1

    fixtures.append(
        {
            "model": "csyllabusapi.courseuniversity",
            "pk": course_university_id,
            "fields": {
                "course": course_id,
                "university": 1,
                "created": "2017-10-30T15:07:40.122Z"
            }
        }
    )
    course_university_id = course_university_id + 1

    fixtures.append(
        {
            "model": "csyllabusapi.coursefaculty",
            "pk": course_faculty_id,
            "fields": {
                "course": course_id,
                "faculty": 1,
                "created": "2017-10-30T15:07:40.122Z"
            }
        }
    )
    course_faculty_id = course_faculty_id + 1

    fixtures.append(
        {
            "model": "csyllabusapi.course",
            "pk": course_id,
            "fields": {
                "name" : course['coursename'],
                "description": course['coursedescription'],
                "ects": course['ects'],
                "english_level": course['englevel'],
                "semester": course['semester'],
                "level": course['studylevel'],
                "keywords": "",
                "url": "",
                "created": "2017-10-30T15:07:40.122Z",
                "modified": "2017-10-30T15:07:41.673Z"
            }
        }
    )
    course_id = course_id + 1

json.dump(fixtures,fer_fixtures_json)