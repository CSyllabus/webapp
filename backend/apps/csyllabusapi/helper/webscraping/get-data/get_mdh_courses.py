import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
from lxml import html
import json

url = "http://www.mdh.se/utbildning/kurser?l=en_UK"
r = requests.get(url)

tree = html.fromstring(r.content)
data = tree.xpath('//script[@type="text/javascript"]/text()')
courses = data[0].split("$('#occasionsTableen_UK')")[1].split("\"aoColumnDefs\":")[0].split("[\"<a href=\"")

courseList = []
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
        course = {
            'id': i,
            'name': course_name,
            'ects': course_ects,
            'semester': course_term,
            'description': None
        }
        if course_description:
            course['description'] = course_description[0].replace("\u00a0", " ")
        if i < len(courses)-1:
            courseList.append(json.dumps(course) + ",")
        else:
            courseList.append(json.dumps(course))

output = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/mdh_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()