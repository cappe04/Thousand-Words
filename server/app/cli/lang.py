

import os
import click
from flask import current_app

from app.data.edit_db import lang_folder_exists


@click.command("init-lang")
@click.argument("lang")
def cli_init_lang(lang):
    if lang_folder_exists(lang):
        click.secho("Language already exists.", fg="red")
        return
    
    path = os.path.join(current_app.root_path, f"data/lang/{lang}")
    os.makedirs(path)
    with open(os.path.join(path, "metadata.json"), "w") as metadata:
        with open(os.path.join(current_app.root_path, "data/metadata_template.json"), "r") as template:
            metadata.write(template.read())

    click.secho("Langauge sucessfully created.", fg="green")