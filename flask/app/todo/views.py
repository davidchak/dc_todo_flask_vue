from flask.views import View, MethodView
from flask import render_template, jsonify, request, json, render_template_string
from .models import Todo, Category
from flask_user import login_required, current_user


# TODO: Добавить поддержку SSE (https://pypi.org/project/Flask-SSE/) 


class BaseView(View):
    decorators = [login_required]

    def __init__(self):
        self.categories = Category.query.all()

    def get_template_name(self):
        raise NotImplementedError()

    def render_template(self, context):
        return render_template(self.get_template_name(), **context)

    def dispatch_request(self):
        context = {
            'objects': self.get_objects()
        }
        return self.render_template(context)



# Main Todo Page
class IndexView(BaseView):
    
    def get_template_name(self):
        return 'todo/index.html'

    def get_objects(self):
        return None

