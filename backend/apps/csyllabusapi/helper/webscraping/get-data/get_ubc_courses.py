from lxml import html
import json

# read file MDH_courses.txt
f = open("U:\\CSyllabus\\FromWeb\\UBC.txt", "r")
ubc = f.read()

tree = html.fromstring(ubc)
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

output = open("U:\\CSyllabus\\WebScraping\\JsonResult\\ubc_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()