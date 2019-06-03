from flask import Blueprint

todo_bp = Blueprint('todo', __name__, template_folder='./templates')

# register url in blueprint
from .views import IndexView, TodoView


todo_bp.add_url_rule('/', view_func=IndexView.as_view('index'), methods=['GET',])
# todo_bp.add_url_rule('/task/id<int:id>/', view_func=TodoView.as_view('todo',
# 					                        defaults={'id', None}), 
# 											methods=['GET', 'PUT', 'DETELE', 'POST'])
todo_bp.add_url_rule('/task/', view_func=TodoView.as_view('todo'),
								methods=['GET',])


def register_todo(app):
	app.register_blueprint(blueprint=todo_bp, url_prefix='/')
