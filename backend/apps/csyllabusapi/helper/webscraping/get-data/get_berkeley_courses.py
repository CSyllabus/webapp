import requests
from lxml import html
import json

courseList = []

# request url content
url = "http://guide.berkeley.edu/courses/compsci/"
r = requests.get(url)

tree = html.fromstring(r.content)
course_codes = tree.xpath('//span[@class="code"]/text()')
course_titles = tree.xpath('//span[@class="title"]/text()')
course_hours = tree.xpath('//span[@class="hours"]/text()')
course_descriptions = tree.xpath('//p[@class="courseblockdesc"]//span[@class="descshow overflow"]/text()')

for i in range(0, len(course_codes)):
    course = {
        'id': course_codes[i].replace("&#160;", " ").replace("\u00a0", " "),
        'name': course_titles[i].split(' (Self-Paced)')[0],
        'ects': course_hours[i].split(' Units')[0], # .split(' - ')[1]
        'semester': None,
        'description': course_descriptions[i] # TODO complete with 2nd part which in is another tag embedded
    }
    if i < len(course_codes)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

# write courseList into json file for later upload into DB
file = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
            "/jsonresult/berkeley_courses.json", "w")
file.write("[")
for course in courseList:
    file.write(course)
file.write("]")
file.close()