import requests
from lxml import html
import json

url = "https://courses.illinois.edu/schedule/2018/fall/CS"
r = requests.get(url)

tree = html.fromstring(r.content)
course_id = tree.xpath('//table[@id="default-dt"][@class="table table-striped table-bordered table-condensed"]//tbody//tr//td/text()')
course_name = tree.xpath('//table[@id="default-dt"][@class="table table-striped table-bordered table-condensed"]//tbody//tr//td//a/text()')
course_url = tree.xpath('//table[@id="default-dt"][@class="table table-striped table-bordered table-condensed"]//tbody//tr//td//a/@href')

# filtering course_id data
# removing empty unused strings with backslash or tabs characters
for i in range(0, len(course_id)):
    course_id[i] = course_id[i].strip()
course_id = list(filter(None, course_id))

courseList = []
for i in range(0, len(course_id)):
    url_course = "https://courses.illinois.edu" + course_url[i]
    r_desc = requests.get(url_course)
    tree = html.fromstring(r_desc.content)
    course_desc = tree.xpath('//div[@id="app-course-info"][@class="row"][@app-label="course information"]//div[@class="col-sm-12]')
    course = {
        'id' : course_id[i].strip(),
        'name': course_name[i].strip(),
        'ects': None,
        'semester': None,
        'description': course_desc
    }
    if i < len(course_name)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

output = open("/Volumes/SSD-Thomas/Documents/GitHub/csyllabus/webapp/backend/apps/csyllabusapi/helper/webscraping"
              "/jsonresult/illinois_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()