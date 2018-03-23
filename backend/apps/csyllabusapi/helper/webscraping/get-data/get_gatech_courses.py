import requests
from lxml import html
import json

url = "http://www.catalog.gatech.edu/coursesaz/cs/"
r = requests.get(url)

tree = html.fromstring(r.content)
course_id = tree.xpath('//div[@class="courseblock"]//p[@class="courseblocktitle"]//strong/text()')
course_desc = tree.xpath('//div[@class="courseblock"]//p[@class="courseblockdesc"]/text()')

courseList = []
for i in range(0, len(course_id)):
    course = {
        'id' : course_id[i].split('. ')[0].replace("\u00a0", " ").strip(),
        'name': course_id[i].split('. ')[1].strip(),
        'ects': course_id[i].split('. ')[2].split(" Credit Hour")[0].strip(),
        'semester': None,
        'description': course_desc[i].strip()
    }
    if i < len(course_id)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

output = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/gatech_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()