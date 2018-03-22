import requests
from lxml import html
import json

url = "https://www.cs.princeton.edu/courses/catalog"
r = requests.get(url)

tree = html.fromstring(r.content)
course_names = tree.xpath('//h2[@class="course-name"]/text()')
course_terms = tree.xpath('//h2[@class="course-name"]//span[@class="course-semester"]/text()')
course_descriptions = tree.xpath('//div[@class="course-body"]//p/text()')
print(len(course_names))
print(len(course_terms))