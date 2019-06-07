# coding: utf-8


import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.settings import config
from flask_user import UserManager
# from flask_vue import Vue

db = SQLAlchemy()
# vue = Vue()


# Initialize Flask Application
def create_app(config_name):
    """Create a Flask application.
    """
    # Instantiate Flask
    app = Flask(__name__)


    # Load common settings
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    # Setup Flask-SQLAlchemy
    db.init_app(app)

    # Setup Flask-Migrate
    migrate = Migrate(app, db)

    # Setup Flask-Usre
    from app.auth.models import User
    user_manager = UserManager(app, db, User)

    # Setup Flask-Vue
    # vue.init_app(app)

    # create blueprint
    from app.todo import register_todo
    register_todo(app)

    from app.cli import register_cli
    register_cli(app)

    return app
