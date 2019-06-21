from app import db
from flask.views import View, MethodView
from flask import render_template, jsonify, request, json
from .models import Todo, Category
from flask_user import login_required, current_user


# TODO: Добавить поддержку SSE (https://pypi.org/project/Flask-SSE/) 


# Main Todo Page
class IndexView(View):
    decorators = [login_required]

    def __init__(self):
        self.template_name = 'todo/index.html'

    def dispatch_request(self):
        return render_template(self.template_name)

