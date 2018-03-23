import requests
from lxml import html
import json

hkust_fixtures_json = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/fixtures"
                           "/hkust_fixtures_json.json", "w")

fixtures = []

country_id = 7
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
city_id = 14
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
university_id = 10
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

# appending programs fixtures
program_id = 41
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
course_id = 1416
course_uni_id = 2639
course_program_id = 3147
# requesting data
url = "http://prog-crs.ust.hk/ugcourse/2017-18/COMP"
r = requests.get(url)

tree = html.fromstring(r.content)
course_idtree = tree.xpath('//div[@class="crse-code"]/text()')
course_title = tree.xpath('//div[@class="crse-title"]/text()')
course_credits = tree.xpath('//div[@class="crse-unit"]/text()')
course_desc = tree.xpath('//div[@class="data-row data-row-long"]//div[@class="data"]/text()')

hkust_courses = []
for i in range(0, len(course_idtree)):
    course_name = course_title[i].strip(),
    course_ects = course_credits[i].split(" Credit(s)")[0].strip(),
    course_description = course_desc[i].strip()
    if course_description:
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

json.dump(fixtures, hkust_fixtures_json)
