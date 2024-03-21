import os, sqlite3, csv

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

def init_lang_db(lang: str):
    lang_path = os.path.join(current_app.root_path, f"data/lang/{lang}")

    # Creates the database
    db = sqlite3.connect(os.path.join(current_app.root_path, f"data/db/{lang}.db"))

    # Adds seperate table for each .csv file if they exist
    for table in [t[:-4] for t in os.listdir(lang_path) if t.endswith(".csv")]:
        db.execute(drop_table_str(table))
        db.execute(create_table_str(table))
        with open(os.path.join(lang_path, f"{table}.csv"), newline="", encoding="utf-8") as file:
            db.executemany(insert_into_table_str(table), csv.reader(file))
        db.commit()

    db.close()

def drop_lang_db(lang):
    os.remove(os.path.join(current_app.root_path, f"data/db/{lang}.db"))




