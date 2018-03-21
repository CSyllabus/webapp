import requests
from lxml import html
import json

courseList = []

# request url content
url = "https://courses.students.ubc.ca/cs/main;jsessionid=7cdVUf1oRD2+XvHUQZZZb2ET?pname=subjarea&tname=subjareas" \
      "&req=1&dept=CPSC"
r = requests.get(url)

tree = html.fromstring(r.content)
course_codes = tree.xpath('//tr[@class="\'section1\'"]//td//a/text()')
course_titles = tree.xpath('//tr[@class="\'section1\'"]//td/text()')

for i in range(0, len(course_codes)):
    url_course = "https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=3&dept=CPSC&course=" \
                 + course_codes[i].split("CPSC ")[1]
    r_desc = requests.get(url_course)
    tree = html.fromstring(r_desc.content)
    course_desc = tree.xpath('//div[@class="content expand"][@role="main"]//p/text()')

    course = {
        'id': course_codes[i],
        'name': course_titles[i],
        'ects': course_desc[1].strip().split("Credits: ")[1],
        'semester': None,
        'description': course_desc[0].strip()
    }
    if i < len(course_codes)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

# write courseList into json file for later upload into DB
file = open("britishcolumbia_courses.json", "w")
file.write("[")
for course in courseList:
    file.write(course)
file.write("]")
file.close()