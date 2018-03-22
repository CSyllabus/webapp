import requests
from lxml import html
import json

url = "http://courses.cornell.edu/preview_program.php?catoid=31&poid=15165"
r = requests.get(url)

tree = html.fromstring(r.content)
course_id_name = tree.xpath('//li[@class="acalog-course"]//span//a/text()')

courseList = []
for i in range(0, len(course_id_name)):
    url_course = "https://courses.cornell.edu"
    r_desc = requests.get(url_course)
    tree = html.fromstring(r_desc.content)
    course_desc = tree.xpath('//div[@class="content expand"][@role="main"]//p/text()')
    course = {
        'id' : course_id_name[i].split(" - ")[0],
        'name': course_id_name[i].split(" - ")[1],
        'ects': None,
        'semester': None,
        # TODO get description using course_url for each course
        'description': None
    }
    if i < len(course_id_name)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

output = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/cornell_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()