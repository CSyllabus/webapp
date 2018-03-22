import requests
from lxml import html
import json

url = "https://www.ucl.ac.uk/prospective-students/study-abroad-ucl/study-abroad-guide/subjects/computer-science"
r = requests.get(url)

tree = html.fromstring(r.content)
course_id = tree.xpath('//table//tbody//tr//td/text()')
course_name = tree.xpath('//table//tbody//tr//td//a/text()')
course_url = tree.xpath('//table//tbody//tr//td//a/@href')
courseList = []
iId = 0
for i in range(0, len(course_name)):
    iEcts = iId + 6
    course = {
        'id' : course_id[iId],
        'name': course_name[i].strip(),
        'ects': course_id[iEcts],
        'semester': None,
        # TODO get description using course_url for each course
        'description': None
    }
    if i < len(course_id)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))
    #iId = iEcts + 3

output = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/ucl_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()