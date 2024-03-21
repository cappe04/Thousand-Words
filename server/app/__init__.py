from flask import Flask

def create_app():
    app = Flask(__name__)

    from . import api
    app.register_blueprint(api.bp)

    from . import cli
    cli.init_cli(app)

    return app