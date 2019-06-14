from app import db
from flask_user import UserMixin
from app.todo.models import Todo


autors_performers = db.Table('autors_performers',
        db.Column('autor_id', db.Integer, db.ForeignKey('users.id')),
        db.Column('performer_id', db.Integer, db.ForeignKey('users.id'))
    )


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    active = db.Column('is_active', db.Boolean(), nullable=False, server_default='1')

    # User authentication information. The collation='NOCASE' is required
    # to search case insensitively when USER_IFIND_MODE is 'nocase_collation'.
    email = db.Column(db.String(255), nullable=False, unique=True)
    email_confirmed_at = db.Column(db.DateTime())
    password = db.Column(db.String(255), nullable=False, server_default='')

    # User information
    first_name = db.Column(db.String(100), nullable=False, server_default='')
    last_name = db.Column(db.String(100), nullable=False, server_default='')

    # Define the relationship to Role via UserRoles
    roles = db.relationship('Role', secondary='user_roles')

    autors = db.relationship(
        'User', secondary=autors_performers,
        primaryjoin=(autors_performers.c.performer_id == id),
        secondaryjoin=(autors_performers.c.autor_id == id),
        backref=db.backref('performers', lazy='dynamic'), lazy='dynamic')
    

    def get_full_name(self):
        return "{} {}".format(self.first_name.title(), self.last_name.title())


# Define the Role data-model
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)

# Define the UserRoles association table
class UserRoles(db.Model):
    __tablename__ = 'user_roles'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(), db.ForeignKey('roles.id', ondelete='CASCADE'))
