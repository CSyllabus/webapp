from lxml import html
import json

# read file Stanford.xml
f = open("Stanford.xml","r")
stanfordList = f.read()

tree = html.fromstring(stanfordList)
ids = tree.xpath('//span[@class="courseNumber"]/text()')
titles = tree.xpath('//span[@class="courseTitle"]/text()')
descriptions = tree.xpath('//div[@class="courseDescription"]/text()')
attributes = tree.xpath('//div[@class="courseAttributes"]/text()')

courseList = []
for i in range(len(descriptions)):
    course_id = ids[i].split(':')[0]
    course_name = titles[i].strip()
    try:
        course_credits = int(attributes[i].split('|')[1].strip().split("Units:")[1].strip())
    except:
        course_credits = None
    try:
        course_semester = attributes[i].split('|')[0].strip().split("Terms:")[1].strip()
    except:
        course_semester = None
    course_description = descriptions[i].strip()

    course = {
        'id': course_id,
        'name': course_name,
        'ects': None,
        'semester': None,
        'description': course_description
    }
    if i < len(descriptions)-1:
        courseList.append(json.dumps(course) + ",")
    else:
        courseList.append(json.dumps(course))

output = open("stanford_courses.json", "w")
output.write("[")
for course in courseList:
    output.write(course)
output.write("]")
output.close()


