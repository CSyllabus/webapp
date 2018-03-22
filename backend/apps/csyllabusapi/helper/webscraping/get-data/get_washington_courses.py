from lxml import html
import json

# read file MDH_courses.txt
f = open("U:\\CSyllabus\\FromWeb\\Washington.txt", "r")
princeton = f.read()

tree = html.fromstring(princeton)
course_id = tree.xpath('//p//b/text()')
course_desc = tree.xpath('//p/text()')
del course_desc[:1]
print(course_desc)

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

output = open("U:\\CSyllabus\\WebScraping\\JsonResult\\washington_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()