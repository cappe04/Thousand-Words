from app.data.init_databases import init_lang_db
from app.data.drop_databases import drop_lang_db

import click

@click.command("init-db")
@click.argument("lang")
def cli_init_db(lang):
    click.echo(
        click.style("Initializing database for language: ", fg="yellow") + 
        click.style(f"{lang.upper()}", fg="yellow", bold=True)
    )
    try:
        init_lang_db(lang)
        click.secho("Database sucessfully initilized!", fg="green")
    except Exception as e:
        click.echo(click.style("Error: ", fg="red", bold=True) + click.style(e, fg="red"))

@click.command("drop-db")
@click.argument("lang")
def cli_drop_db(lang):
    if click.confirm(
        click.style(f"You are about to delete language database: {lang.upper()}. ", fg = "yellow") +
        click.style("This action cannot be undone!", fg="red", bold="True")
    ):
        try:
            drop_lang_db(lang)
            click.secho("Database sucessfully deleted!", fg="green")
        except Exception as e:
            click.echo(click.style("Error: ", fg="red", bold=True) + click.style(e, fg="red"))
    else:
        click.secho("Operation canceled.", fg="yellow")
        




