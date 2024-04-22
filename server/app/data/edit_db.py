import os, sqlite3, csv, json

from flask import current_app

def get_path(path):
    return os.path.join(current_app.root_path, path)

# Db editing
def init_lang_db(lang: str):
    if not os.path.exists(lang_path := get_path(f"data/lang/{lang}")):
        raise Exception("Langauge folder is missing metadata")

    # Creates the database
    db = sqlite3.connect(get_path(f"data/db/{lang}.db"))

    # Load metadata
    with open(os.path.join(lang_path, "metadata.json"), "r", encoding="utf-8") as file:
        tables = json.load(file)["tables"]

    # Adds seperate table for each .csv file specified by metadata.json
    for tablename, tabledata in tables.items():
        db.execute(f"DROP TABLE IF EXISTS {tablename}")
        db.execute(f"CREATE TABLE {tablename}(id INTEGER PRIMARY KEY, word TEXT, translation TEXT, type TEXT)")
        with open(os.path.join(lang_path, tabledata["filename"]), newline="", encoding="utf-8") as file:
            db.executemany(f"INSERT INTO {tablename}(word, translation, type) VALUES(?, ?, ?)", 
                           csv.reader(file))
        db.commit()

    # Close the database
    db.close()

def drop_lang_db(lang):
    os.remove(os.path.join(current_app.root_path, f"data/db/{lang}.db"))

# Validation
def lang_folder_exists(lang):
    return os.path.exists(get_path(f"data/lang/{lang}"))

def db_file_exists(lang):
    return os.path.exists(get_path(f"data/db/{lang}.db"))

def lang_metadata_exists(lang):
    return os.path.exists(get_path(f"data/lang/{lang}/metadata.json"))




