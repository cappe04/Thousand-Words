import os, sqlite3, csv, json

from flask import current_app

def create_table_str(table):
    return f"CREATE TABLE {table}(id INTEGER PRIMARY KEY, word TEXT, translation TEXT, type TEXT)"

def drop_table_str(table):
    return f"DROP TABLE IF EXISTS {table}"

def insert_into_table_str(table):
    return f"INSERT INTO {table}(word, translation, type) VALUES(?, ?, ?)"


def lang_folder_exists(lang):
    path = os.path.join(current_app.root_path, f"data/lang/{lang}")
    return os.path.exists(path)

def db_file_exists(lang):
    path = os.path.join(current_app.root_path, f"data/db/{lang}.db")
    return os.path.exists(path)

def lang_metadata_exists(lang):
    path = os.path.join(current_app.root_path, f"data/lang/{lang}/metadata.json")
    return os.path.exists(path)

def init_lang_db(lang: str):
    lang_path = os.path.join(current_app.root_path, f"data/lang/{lang}")

    if not lang_metadata_exists(lang): raise Exception("Langauge folder is missing metadata")

    # Creates the database
    db = sqlite3.connect(os.path.join(current_app.root_path, f"data/db/{lang}.db"))

    # Load metadata
    with open(os.path.join(lang_path, "metadata.json"), "r") as file:
        metadata = json.load(file)

    # Adds seperate table for each .csv file specified by metadata.json
    for tablename, tabledata in metadata.items():
        db.execute(drop_table_str(tablename))
        db.execute(create_table_str(tablename))
        with open(os.path.join(lang_path, tabledata["filename"]), newline="", encoding="utf-8") as file:
            db.executemany(insert_into_table_str(tablename), csv.reader(file))
        db.commit()

    # Close the database
    db.close()

def drop_lang_db(lang):
    os.remove(os.path.join(current_app.root_path, f"data/db/{lang}.db"))




