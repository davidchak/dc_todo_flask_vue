from app import db
from datetime import datetime, timedelta


class Todo(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.String(500), nullable=True)
    created = db.Column(db.DateTime, default=datetime.utcnow)
    complete = db.Column(db.Boolean, default=False)

    def as_dict(self):
    	return {
    		'id': self.id,
    		'title': self.title,
    		'body': self.body,
    		'created': self.created,
    		'complete': self.complete
    		}
   	

    def __repr__(self):
        return '<{}>'.format(self.title)