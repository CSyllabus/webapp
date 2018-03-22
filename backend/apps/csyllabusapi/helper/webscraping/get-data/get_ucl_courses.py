from lxml import html
import json

# read file MDH_courses.txt
f = open("U:\\CSyllabus\\FromWeb\\UCL.txt", "r")
ucl = f.read()

tree = html.fromstring(ucl)
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

output = open("U:\\CSyllabus\\WebScraping\\JsonResult\\ucl_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()