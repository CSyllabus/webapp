from django.test import TestCase, Client
from .. import comparator


class ComparatorTestCase(TestCase):
    def test_get(self):
        c = Client()
        response = c.get('/csyllabusapi/comparator')

        self.assertEqual(response.status_code, 200)