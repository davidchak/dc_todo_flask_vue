# coding: utf-8


import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.settings import config
from flask_user import UserManager
from flask_assets import Environment, Bundle

db = SQLAlchemy()
assets = Environment()


# Register Blueprint
def register_bluprints(app):
    
    from app.todo import register_todo
    register_todo(app)

    from app.cli import register_cli
    register_cli(app)


# Init flask-assets and create assets bundl
def register_assets(app):
    # Setup Flask-Assets
    assets.init_app(app)

    # TODO: вынести в отдельный файл или в settings.py
    vuejs = Bundle('js/vuejs/vue.js', 'js/vuejs/axios.min.js',
                   'js/todo.js', filters='jsmin', output='assets/assets.min.js')
    assets.register('vuejs', vuejs)


# Read app settings
def read_app_settings(app, config_name='default'):
    # Load common settings
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)


# Initialize Flask Application
def create_app(config_name=None):
    """Create a Flask application.
    """
    # Instantiate Flask
    app = Flask(__name__)

    # Read app settings
    read_app_settings(app, config_name)

    # Register Flask-Assets
    register_assets(app)

    # Setup Flask-SQLAlchemy
    db.init_app(app)

    # Setup Flask-Migrate
    migrate = Migrate(app, db)

    # Setup Flask-Usre
    from app.auth.models import User
    user_manager = UserManager(app, db, User)

    # create bluprints
    register_bluprints(app)


    return app
