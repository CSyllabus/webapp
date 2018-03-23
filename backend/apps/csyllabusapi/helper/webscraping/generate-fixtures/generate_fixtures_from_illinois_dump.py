import requests
from lxml import html
import json

illinois_fixtures_json = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/fixtures"
                           "/illinois_fixtures_json.json", "w")

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
city_id = 14
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": city_id,
    "fields": {
      "name": "Champaign",
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
      "name": "University of Illinois Urbana-Champaign",
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
            "name": "Computer Science and Engineering",
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
url = "https://courses.illinois.edu/schedule/2018/fall/CS"
r = requests.get(url)
tree = html.fromstring(r.content)
course_idtree = tree.xpath('//table[@id="default-dt"][@class="table table-striped table-bordered table-condensed"]'
                           '//tbody//tr//td/text()')
course_nametree = tree.xpath('//table[@id="default-dt"][@class="table table-striped table-bordered table-condensed"]'
                             '//tbody//tr//td//a/text()')
course_url = tree.xpath('//table[@id="default-dt"][@class="table table-striped table-bordered table-condensed"]'
                        '//tbody//tr//td//a/@href')
# filtering course_id data
# removing empty unused strings with backslash or tabs characters
for i in range(0, len(course_idtree)):
    course_idtree[i] = course_idtree[i].strip()
course_idtree = list(filter(None, course_idtree))

illinois_courses = []
for i in range(0, len(course_idtree)):
    url_course = "https://courses.illinois.edu" + course_url[i]
    r_desc = requests.get(url_course)
    tree_desc = html.fromstring(r_desc.content)
    course_desc = tree_desc.xpath('//div[@id="app-course-info"][@class="row"][@app-label="course information"]'
                                  '//div[@class="col-sm-12"]//p/text()')
    course_name = course_nametree[i].strip()
    course_ects = course_desc[0].split("Credits: ")[0].split(" hours.")[0].strip()
    course_description = course_desc[1].strip()
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
                    "name": course_name,
                    "description": course_description,
                    "ects": course_ects,
                    "semester": None,
                    "created": "2017-10-30T15:07:40.122Z",
                    "modified": "2017-10-30T15:07:41.673Z"
                }
            }
        )
        course_id = course_id + 1

json.dump(fixtures, illinois_fixtures_json)
