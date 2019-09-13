from .views import IndexView
from .api import ApiMainView, TaskApi, CategoryApi
from flask import Blueprint
from flask_assets import Bundle


todo_bp = Blueprint('todo', __name__, template_folder='/templates')
todo_api_bp = Blueprint('todo_api', __name__)


# TODO
todo_bp.add_url_rule(
	'/',
	view_func=IndexView.as_view('index'),
	methods=['GET',]
)


# TODO API
todo_api_bp.add_url_rule(
	'/',
	view_func=ApiMainView.as_view('todo_api_info'),
	methods=['GET']
)

todo_api_bp.add_url_rule(
	'/task',
	view_func=TaskApi.as_view('task_api'),
	methods=['GET', 'POST', 'DELETE', 'PUT']
)

todo_api_bp.add_url_rule(
	'/category',
	view_func=CategoryApi.as_view('category_api'),
	methods=['GET', 'POST', 'DELETE', 'PUT']
)



# Register blueprint todo and todo_api
def register_todo(app):
    app.register_blueprint(blueprint=todo_bp, url_prefix='/')
    app.register_blueprint(blueprint=todo_api_bp, url_prefix='/api/v1/')


# Flask-assets
js_bundle = Bundle('js/vuejs/vue.js', 'js/vuejs/axios.min.js', 'js/momentjs/moment.min.js',
				'js/todo.js', filters='jsmin', output='assets/assets.min.js')

def register_todo_assets(assets):				
	assets.register('js_bundle', js_bundle)