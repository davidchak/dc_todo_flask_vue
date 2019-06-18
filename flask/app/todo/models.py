from app import db
from datetime import datetime, timedelta
from flask import json, current_app



class Todo(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.String(500), nullable=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    complete = db.Column(db.Boolean, default=False)
    autor_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                          nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'),
                          nullable=True)

    def _as_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'created': self.created,
            'complete': self.complete,
            'autor_id': self.autor_id,
            'autor': self.autor.get_full_name(),
            'category': self.category.name
        }


    # TODO: исправить 
    # @classmethod    
    # def _as_json(cls):
    #     fields = {}
    #     for field in [x for x in dir(cls) if not x.startswith(
    #             '_') and x != 'metadata' and x != 'query' and x != 'query_class']:
    #         data = cls.__getattribute__(field)
    #         try:
    #             fields[field] = data
    #         except TypeError:
    #             fields[field] = None
    #     return json.dumps(fields)

    def __repr__(self):
        return '<{}>'.format(self.title)


class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    todos = db.relationship('Todo', backref='category', lazy=True)
