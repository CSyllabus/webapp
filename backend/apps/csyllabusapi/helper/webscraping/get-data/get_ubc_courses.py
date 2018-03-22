import requests
from lxml import html
import json

url = "https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=1&dept=CPSC"
r = requests.get(url)

tree = html.fromstring(r.content)
course_id = tree.xpath('//table[@class="sortable table table-striped"][@id="mainTable"]//tbody//tr//td//a/text()')
course_name = tree.xpath('//table[@class="sortable table table-striped"][@id="mainTable"]//tbody//tr//td/text()')
course_url = tree.xpath('//table[@class="sortable table table-striped"][@id="mainTable"]//tbody//tr//td//a/@href')

courseList = []
for i in range(0, len(course_id)):
    course = {
        'id' : course_id[i],
        'name': course_name[i],
        'ects': None,
        'semester': None,
        # TODO get description using course_url for each course
        'description': None
    }
    if i < len(course_id)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

output = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/ubc_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()