from app.cli.db import cli_init_db, cli_drop_db
from app.cli.lang import cli_init_lang

def init_cli(app):
    app.cli.add_command(cli_init_db)
    app.cli.add_command(cli_drop_db)
    app.cli.add_command(cli_init_lang)