import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from lxml import html
import json

ubc_fixtures_json = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/fixtures"
                         "/ubc_fixtures_json.json", "w")

fixtures = []

country_id = 8
fixtures.append({
    "model": "csyllabusapi.country",
    "pk": country_id,
    "fields": {
      "name": "Canada",
      "img": "",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z"
    }
  }
)
city_id = 15
fixtures.append({
    "model": "csyllabusapi.city",
    "pk": city_id,
    "fields": {
      "name": "Vancouver",
      "img": "",
      "created": "2017-10-30T15:20:51.049Z",
      "modified": "2017-10-30T15:20:52.235Z",
      "country": country_id
    }
  }
)
university_id = 11
fixtures.append(
  {
    "model": "csyllabusapi.university",
    "pk": university_id,
    "fields": {
      "name": "University of British Columbia",
      "img": "",
      "created": "2017-10-30T15:05:19.541Z",
      "modified": "2017-10-30T15:05:20.945Z",
      "country": country_id,
      "city": city_id
    }
  }
)

# appending programs fixtures
program_id = 42
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
course_id = 1487
course_uni_id = 2710
course_program_id = 3218
# requesting data
url = "https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=1&dept=CPSC"
r = requests.get(url)
tree = html.fromstring(r.content)
course_idtree = tree.xpath('//table[@class="sortable table table-striped"][@id="mainTable"]//tbody//tr//td//a/text()')
course_nametree = tree.xpath('//table[@class="sortable table table-striped"][@id="mainTable"]//tbody//tr//td/text()')
course_url = tree.xpath('//table[@class="sortable table table-striped"][@id="mainTable"]//tbody//tr//td//a/@href')

ubc_courses = []
for i in range(0, len(course_idtree)):
    # getting course description using individual url for each course
    url_course = "https://courses.students.ubc.ca" + course_url[i]
    print(url_course)
    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    r_desc = session.get(url_course)
    tree = html.fromstring(r_desc.content)
    course_desc = tree.xpath('//div[@class="content expand"][@role="main"]//p/text()')

    course_name = course_nametree[i].strip(),
    course_ects = course_desc[1].strip().split("Credits: ")[1],
    course_description = course_desc[0].strip()

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

json.dump(fixtures, ubc_fixtures_json)