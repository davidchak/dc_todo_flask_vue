# __init__.py is a special Python file that allows a directory to become
# a Python package so it can be accessed using the 'import' statement.

# static                          GET                     /static/<path:filename>
# todo.index                      GET                     /
# todo_api.category_api           DELETE, GET, POST, PUT  /api/v1/category
# todo_api.task_api               DELETE, GET, POST, PUT  /api/v1/task
# todo_api.todo_api_info          GET                     /api/v1/

# Intentionally left empty
import unittest

import os
import unittest

from app import create_app, db
from flask_user import current_user
from datetime import datetime
from flask import current_app


class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        app = create_app('testconf')
        app.app_context().push()
        self.client = app.test_client()
        db.create_all()

        from app.auth.models import User, Role
        
        test_user = User(
            first_name='test',
            last_name='test',
            email='test@ya.ru',
            email_confirmed_at=datetime.utcnow(),
            password=current_app.user_manager.hash_password('test'),
        )
        test_user.roles.append(Role(name='admin'))

        db.session.add(test_user)
        db.session.commit()
        current_user = test_user

    def tearDown(self):
        db.session.remove()
        db.drop_all()


    def test_main_page_status_code(self):
        result = self.client.get('/')
        self.assertEqual(result.status_code, 200)

    def test_task_api_status_code(self):
        result = self.client.get('/task/')
        self.assertEqual(result.status_code, 200)


if __name__ == '__main__':
    unittest.main()
