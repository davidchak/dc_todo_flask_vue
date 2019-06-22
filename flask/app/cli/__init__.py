import click
from flask.cli import AppGroup, with_appcontext
from app.auth.models import User, Role
from app.todo.models import Category, Todo
from datetime import datetime
from flask import current_app

other_cli = AppGroup('other')


@other_cli.command('create_superuser')
@with_appcontext
def create_superuser():

	from app import db

	if not User.query.filter(User.email == 'davidchak@yandex.ru').first():

		user = User(
			first_name='давид',
			last_name='чакирян',
			email='davidchak@yandex.ru',
			email_confirmed_at=datetime.utcnow(),
			password=current_app.user_manager.hash_password('pass@no1'),
		)
		user.roles.append(Role(name='admin'))
		db.session.add(user)
		db.session.commit()
		print('Added user <davidchak@yandex.ru>')


@other_cli.command('create_default_data')
@with_appcontext
def create_default_data():

	user = User.query.first()
	
	from app import db
	category_list = ['default']
	for i in  [x for x in category_list if Category.query.filter_by(name=x).first() is None]:
		db.session.add(Category(name=i, description="Без группы", autor=user))
		db.session.commit()
		print('Category <{}> created success!'.format(i))

	t1 = Todo(title="первая задача", body="первая тестовая задача", autor=user, 
		category=Category.query.first())

	t2 = Todo(title="вторая задача", body="вторая тестовая задача", autor=user, 
		category=Category.query.first())
	db.session.add(t1)
	db.session.add(t2)
	db.session.commit()
	




def register_cli(app):
    app.cli.add_command(other_cli)

