import requests
from lxml import html
import json

url = "http://prog-crs.ust.hk/ugcourse/2017-18/COMP"
r = requests.get(url)

tree = html.fromstring(r.content)
course_id = tree.xpath('//div[@class="crse-code"]/text()')
course_title = tree.xpath('//div[@class="crse-title"]/text()')
course_ects = tree.xpath('//div[@class="crse-unit"]/text()')
course_desc = tree.xpath('//div[@class="data-row data-row-long"]//div[@class="data"]/text()')

courseList = []
for i in range(0, len(course_id)):
    course = {
        'id' : course_id[i].strip(),
        'name': course_title[i].strip(),
        'ects': course_ects[i].split(" Credit(s)")[0].strip(),
        'semester': None,
        'description': course_desc[i].strip()
    }
    # TODO delete duplicate course names
    if i < len(course_id)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

output = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/hkust_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()