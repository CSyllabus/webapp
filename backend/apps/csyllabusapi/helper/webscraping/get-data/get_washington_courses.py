import requests
from lxml import html
import json

url = "https://www.washington.edu/students/crscat/cse.html"
r = requests.get(url)

tree = html.fromstring(r.content)
course_id = tree.xpath('//a//p//b/text()')
course_desc = tree.xpath('//a//p/text()')
del course_desc[:1]

print(len(course_id))
print(len(course_desc))

courseList = []
for i in range(0, len(course_id)):
    course = {
        'id' : i,
        'name': course_id[i],
        'ects': None,
        'semester': None,
        'description': course_desc[i]
    }
    if i < len(course_id)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

output = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/washington_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()