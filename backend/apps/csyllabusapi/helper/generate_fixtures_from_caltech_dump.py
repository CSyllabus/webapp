import json
import requests
from lxml import html
from bs4 import BeautifulSoup

caltech_fixtures_json = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/fixtures"
                             "/caltech_fixtures_json.json", "w")
caltech_courses = []

fixtures = []

country_id = 6
fixtures.append({
    "model": "csyllabusapi.country",
    "pk": country_id,
    "fields": {
      "name": "United States of America",
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
      "name": "Pasadena",
      "img": "",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z",
      "country": country_id
    }
  }
)
university_id = 8
fixtures.append(
  {
    "model": "csyllabusapi.university",
    "pk": university_id,
    "fields": {
      "name": "California Institute of Technology",
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

# appending courses fixtures
course_id = 1043
course_uni_id = 2266
course_program_id = 2774
# request url content
url = "http://catalog.caltech.edu/current/cs"
r = requests.get(url)
# creating html reader using BeautifulSoup package
soup = BeautifulSoup(r.content, "lxml")
# Search for all p html tags
for p in soup.find_all('p'):
    # get inside values from p tag
    tree = html.fromstring(str(p))
    # each course is made this way : <p><strong>courseId.courseName</strong><em>courseCredits</em>courseDescription</p>
    # get course id and course name
    course_id_name = tree.xpath('//p//strong/text()')
    # get course credits
    course_credits = tree.xpath('//p//em/text()')
    # get course description
    course_desc = tree.xpath('//p/text()')

    # check if courseIdName and courseCredits are set
    if course_id_name and course_credits:
        course_name = course_id_name[0].split('.')[1],
        course_ects = course_credits[0].split(' unit')[0],
        course_description = None
        # check if courseDescription is set
        if course_desc:
            course_description = course_desc[0].strip().replace("\u2019", "'")
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
                        "name": course_name[0],
                        "description": course_description,
                        "ects": course_ects[0],
                        "semester": None,
                        "created": "2017-10-30T15:07:40.122Z",
                        "modified": "2017-10-30T15:07:41.673Z"
                    }
                }
            )
            course_id = course_id + 1

json.dump(fixtures,caltech_fixtures_json)
