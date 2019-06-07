import click
from flask.cli import AppGroup, with_appcontext
from app.auth.models import User, Role
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


def register_cli(app):
    app.cli.add_command(other_cli)

