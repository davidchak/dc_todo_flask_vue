import os

BASEDIR = os.path.abspath(os.path.dirname(__file__))



class Config:
    APP_NAME = "WESTCOM"
    CSRF_ENABLED = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask-Mail SMTP server settings
    MAIL_SERVER = 'smtp.yandex.ru'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False
    MAIL_USERNAME = 'info@ops2u.ru'
    MAIL_PASSWORD = 'gfhjkm@no1'
    MAIL_DEFAULT_SENDER = '"Инфо" <info@ops2u.ru>'

    # Flask-User settings
    USER_EMAIL_SENDER_NAME = 'info'
    USER_EMAIL_SENDER_EMAIL = MAIL_USERNAME
    USER_APP_NAME = APP_NAME
    USER_ENABLE_CHANGE_PASSWORD = True  # Allow users to change their password
    USER_ENABLE_CHANGE_USERNAME = False  # Allow users to change their username
    USER_ENABLE_CONFIRM_EMAIL = True  # Force users to confirm their email
    USER_ENABLE_FORGOT_PASSWORD = True  # Allow users to reset their passwords
    USER_ENABLE_EMAIL = True  # Register with Email
    USER_ENABLE_REGISTRATION = True  # Allow new users to register
    USER_REQUIRE_RETYPE_PASSWORD = True  # Prompt for `retype password` in:
    USER_ENABLE_USERNAME = False  # Register and Login with username
    # USER_AFTER_LOGIN_ENDPOINT = 'main.member_page'
    # USER_AFTER_LOGOUT_ENDPOINT = 'main.home_page'

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    APP_NAME = "WESTCOM dev"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASEDIR, 'test_app.db')
    SECRET_KEY = 'This is an INSECURE secret!! DO NOT use this in production!!'
    

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'das;ldk93wd;LNlUOM9dhIJLNFL*uohjkm@(*#mdfnkjsakd'

    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = "postgresql://root:toor@postgres/flask"


config = {
    'production': ProductionConfig,
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}