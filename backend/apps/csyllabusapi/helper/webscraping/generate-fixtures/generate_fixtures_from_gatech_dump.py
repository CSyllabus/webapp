import requests
from lxml import html
import json

gatech_fixtures_json = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/fixtures"
                             "/gatech_fixtures_json.json", "w")
gatech_courses = []

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
city_id = 13
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": city_id,
    "fields": {
      "name": "Atlanta",
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
      "name": "Georgia Institute of Technology",
      "img": "",
      "created": "2017-10-30T15:05:19.541Z",
      "modified": "2017-10-30T15:05:20.945Z",
      "country": country_id,
      "city": city_id
    }
  }
)

#appending programs fixtures
program_id = 40
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
course_id = 1116
course_uni_id = 2339
course_program_id = 2847
# request to get courses
url = "http://www.catalog.gatech.edu/coursesaz/cs/"
r = requests.get(url)

tree = html.fromstring(r.content)
course_idtree = tree.xpath('//div[@class="courseblock"]//p[@class="courseblocktitle"]//strong/text()')
course_desctree = tree.xpath('//p[@class="courseblockdesc"]/text()')

for i in range(0, len(course_idtree)):
    course_name = course_idtree[i].split('. ')[1].strip(),
    course_ects = course_idtree[i].split('. ')[2].split(" Credit Hour")[0].strip(),
    course_description = course_desctree[i].strip()
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

json.dump(fixtures,gatech_fixtures_json)