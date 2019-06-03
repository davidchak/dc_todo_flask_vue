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

	def get(self):
		todo = [{
    			"title": "Firts Todo",
    			"body" : "firts todo body"
    		},{
    			"title": "Second Todo",
    			"body" : "second todo body"
    		},{
    			"title": "Theard Todo",
    			"body" : "theard todo body"
    		}]
		# return jsonify({'objects': Todo.query.all()})
		return jsonify({"todos": todo})
	
	def post(self):
		pass

	def put(self, id):
		pass
	
	def delete(self, id):
		pass

