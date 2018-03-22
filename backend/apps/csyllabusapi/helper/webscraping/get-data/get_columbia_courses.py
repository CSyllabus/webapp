import requests
from lxml import html
import json

# request url content
url = "http://www.columbia.edu/cu/bulletin/uwb/sel/COMS_Spring2018.html"
r = requests.get(url)

tree = html.fromstring(r.content)
course_id = tree.xpath('//div[@class="courseblock"]//p[@class="courseblocktitle"]//strong/text()')
course_desc = tree.xpath('//div[@class="courseblock"]//p[@class="courseblockdesc"]/text()')
print(course_id)
courseList = []
for i in range(0, len(course_id)):
    course = {
        'id' : course_id[i].split('. ')[0].strip(),
        'name': course_id[i].split('. ')[1].strip(),
        'ects': None,
        'semester': None,
        'description': course_desc[i].strip()
    }
    if i < len(course_id)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

output = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/columbia_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()