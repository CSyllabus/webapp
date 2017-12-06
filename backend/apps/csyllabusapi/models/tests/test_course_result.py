from django.test import TestCase
from .. import Course, CourseResult

class CourseResultTestCase(TestCase):
    def test_courseresult(self):
        course1 = Course.objects.create(name='Data bases 2')
        course2 = Course.objects.create(name='Recommender systems')
        course3 = Course.objects.create(name='Advanced data mining')
        course4 = Course.objects.create(name='Machine learning')

        CourseResult.objects.create(first_course=course1, second_course=course3)
        CourseResult.objects.create(first_course=course2, second_course=course4)

        courses = CourseResult.objects.filter(first_course__name__icontains="data",
                                              second_course__name__icontains="data")

        arrCourses = []
        for courseResult in courses:
            arrCourses.append(Course.objects.get(id=courseResult.first_course.id).name)
            arrCourses.append(Course.objects.get(id=courseResult.second_course.id).name)

        self.assertEqual(arrCourses, ['Data bases 2', 'Advanced data mining'])