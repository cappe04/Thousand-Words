from app.data.edit_db import init_lang_db, drop_lang_db, lang_folder_exists, db_file_exists

import click

@click.command("init-db")
@click.argument("lang")
def cli_init_db(lang):
    if db_file_exists(lang) and not click.confirm(
        click.style(f"You are about to overwrite language database: {lang.upper()}. ", fg = "yellow") +
        click.style("This action cannot be undone.", fg="red", bold="True")
    ):
        click.secho("Operation canceled.", fg="yellow")
        return

    click.echo(
        click.style("Initializing database for language: ", fg="yellow") + 
        click.style(f"{lang.upper()}", fg="yellow", bold=True)
    )
    try:
        if lang_folder_exists(lang):
            init_lang_db(lang)
            click.secho("Database sucessfully initilized.", fg="green")
        else:
            click.secho(f"Error: Language folder {lang.upper()} not found.", fg="red")
    except Exception as e:
        click.echo(click.style("Error: ", fg="red", bold=True) + click.style(e, fg="red"))

@click.command("drop-db")
@click.argument("lang")
def cli_drop_db(lang):
    if not db_file_exists(lang):
        click.secho(f"Error: Language database {lang.upper()} not found.", fg="red")
        return

    if not click.confirm(
        click.style(f"You are about to delete language database: {lang.upper()}. ", fg = "yellow") +
        click.style("This action cannot be undone.", fg="red", bold="True")
    ):
        click.secho("Operation canceled.", fg="yellow")
        return

    try:
        drop_lang_db(lang)
        click.secho("Database sucessfully deleted.", fg="green")
    except Exception as e:
        click.echo(click.style("Error: ", fg="red", bold=True) + click.style(e, fg="red"))
    
        




