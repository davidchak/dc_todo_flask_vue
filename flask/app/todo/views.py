from flask.views import View, MethodView
from flask import render_template, jsonify
from .models import Todo
class IndexView(View):
	methods=['GET']

	def __init__(self):
		self.template_name = 'index.html'

	def dispatch_request(self):
		return render_template(self.template_name)


class TodoView(MethodView):

	def get(self, id):
		return jsonify({'objects': Todo.query.all()})
	
	def post(self):
		pass

	def put(self, id):
		pass
	
	def delete(self, id):
		pass

