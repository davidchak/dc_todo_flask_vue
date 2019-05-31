# __init__.py is a special Python file that allows a directory to become
# a Python package so it can be accessed using the 'import' statement.

# Intentionally left empty
import unittest

import os
import unittest

from app import create_app, db


class FlaskTestCase(unittest.TestCase):
    
    def setUp(self):
        self.extra_config_settings = {
            'TESTING' : True,
            'SQLALCHEMY_DATABASE_URI' : 'sqlite:///../test.sqlite'
        }
        app = create_app(self.extra_config_settings)
        app.app_context().push()
        self.client = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_main_page_status_code(self):
        result = self.client.get('/')
        self.assertEqual(result.status_code, 200) 

    def test_status_code_api_get_task(self):
        result = self.client.get('/api/v1/todos/')
        self.assertEqual(result.status_code, 200)


if __name__ == '__main__':
    unittest.main()