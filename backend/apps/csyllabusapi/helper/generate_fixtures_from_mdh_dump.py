import json
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from lxml import html

mdh_fixtures_json = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/fixtures"
                             "/mdh_fixtures_json.json", "w")

fixtures = []

country_id = 6
fixtures.append({
    "model": "csyllabusapi.country",
    "pk": country_id,
    "fields": {
      "name": "Sweden",
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
      "name": "Västerås",
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
      "name": "Mälardalens högskola",
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

# appending courses fixtures
course_id = 693
course_uni_id = 2662
course_program_id = 2424

# request data
url = "http://www.mdh.se/utbildning/kurser?l=en_UK"
r = requests.get(url)
tree = html.fromstring(r.content)
data = tree.xpath('//script[@type="text/javascript"]/text()')
courses = data[0].split("$('#occasionsTableen_UK')")[1].split("\"aoColumnDefs\":")[0].split("[\"<a href=\"")

mdh_courses = []
for i in range(1, len(courses)):
    course_url = courses[i].split("encodeURI")[1].split("') +")[0].split("'")[1].replace("amp;", "")
    course_url = "http://www.mdh.se" + course_url
    course_domain = courses[i].split("\",")[2].split("\"")[1]
    course_lang = courses[i].split("\",")[9].split("\"")[1]
    if course_domain == "Informatics/Computer and Systems Scie...#Computer Science" and course_lang == "English":
        course_name = courses[i].split("\",")[0].split("\"")[1].split("</a")[0].split(">")[1].strip()
        course_ects = courses[i].split("\",")[1].split("\"")[1].strip()
        course_term = courses[i].split("\",")[4].split("\"")[1].strip()
        session = requests.Session()
        retry = Retry(connect=3, backoff_factor=0.5)
        adapter = HTTPAdapter(max_retries=retry)
        session.mount('http://', adapter)
        session.mount('https://', adapter)
        r_desc = session.get(course_url)
        tree = html.fromstring(r_desc.content)
        course_description = tree.xpath('//div[@class="lead"]//p/text()')
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
                        "description": course_description[0].strip(),
                        "ects": course_ects,
                        "semester": course_term,
                        "created": "2017-10-30T15:07:40.122Z",
                        "modified": "2017-10-30T15:07:41.673Z"
                    }
                }
            )
            course_id = course_id + 1

json.dump(fixtures, mdh_fixtures_json)
