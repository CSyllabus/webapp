from lxml import html
import json

# read file MDH_courses.txt
f = open("U:\\CSyllabus\\FromWeb\\Princeton.txt", "r")
princeton = f.read()

tree = html.fromstring(princeton)
course_names = tree.xpath('//h2[@class="course-name"]/text()')
course_terms = tree.xpath('//h2[@class="course-name"]//span[@class="course-semester"]/text()')
course_descriptions = tree.xpath('//div[@class="course-body"]//p/text()')
print(len(course_names))
print(len(course_terms))