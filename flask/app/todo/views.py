from app import db
from flask.views import View, MethodView
from flask import render_template, jsonify, request, json
from .models import Todo, Category
from flask_user import login_required, current_user


# Main Todo Page
class IndexView(View):
    decorators = [login_required]

    def __init__(self):
        self.template_name = 'todo/index.html'

    def dispatch_request(self):
        return render_template(self.template_name)


# Api for vuejs
class TodoView(MethodView):
    decorators = [login_required]

    def get_all(self):
        return ([todo._as_dict()
                for todo in Todo.query.filter_by(autor_id=current_user.id).all()])[::-1]

    def get_one_as_dict(self, id): 
        return Todo.query.filter_by(id=id).first()._as_dict()

    def get_one(self, id):
        return Todo.query.filter_by(id=id).first()

    def get(self, id=None):
        if id is None:
            return jsonify({'success': True, 'todos': self.get_all()})
        else:
            return jsonify(
                {'success': True, 'todos': self.get_one_as_dict(id)})

    def post(self):
        data = json.loads((request.data).decode())
        try:
            # TODO: Сделать подгрузку исполнителя из шаблона, изменить (performer=current_user)
            db.session.add(Todo(title=data['title'], autor=current_user, category=Category.query.filter_by(name="default").first())) 
            db.session.commit()
            return jsonify({'success': True, 'todos': self.get_all()})
        except Exception as err:
            db.session.rollback()
            return jsonify({'successs': False, 'error': err})

    def delete(self):
        todo = self.get_one(id=request.args['id'])
        if todo:
            db.session.delete(todo)
            db.session.commit()
            return jsonify({'success': True, 'todos': self.get_all()})
        else:
            return jsonify({'successs': False, 'error': 'id is undefined!'})

    def put(self):
        todo = self.get_one(id=json.loads((request.data).decode())['id'])
        if todo:
            todo.complete = True
            db.session.add(todo)
            db.session.commit()
            return jsonify({'success': True, 'todos': self.get_all()})
        else:
            return jsonify({'successs': False, 'error': 'id is undefined!'})
