from django.test import TestCase, Client
from .. import explorer


class ExplorerTestCase(TestCase):
    def get(self):
        c = Client()
        response = c.get('/csyllabusapi/explorer', False)

        self.assertEqual(response.status_code, 200)