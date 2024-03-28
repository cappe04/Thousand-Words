import itertools
import json
import os
import sqlite3
from flask import current_app, g

def init_app(app):
    app.teardown_appcontext(close_db)


    # Load lang metadata
    global __lang_metadata 
    lang_path = os.path.join(app.root_path, "data/lang")

    __lang_metadata = {}

    for lang in os.listdir(lang_path):
        if not os.path.exists(os.path.join(lang_path, f"{lang}/metadata.json")):
            continue
        
        with open(os.path.join(lang_path, f"{lang}/metadata.json")) as file:
            __lang_metadata[lang] = json.load(file)


def connect_db(lang) -> sqlite3.Connection | None:
    path = os.path.join(current_app.root_path, f"data/db/{lang}.db")
    if os.path.exists(path):
        return sqlite3.connect(path)
    return

def get_db(lang):
    if "dbs" not in g:
        g.dbs = dict()
    
    if (db := g.dbs.get(lang)) is None:
        g.dbs[lang] = connect_db(lang)
        return g.dbs[lang]
    return db

def close_db(exeption):
    dbs = g.pop("dbs", None)

    if dbs is not None:
        for v in dbs.values():
            v.close()

def get_tables(lang):
    if (db := get_db(lang)) is None:
        return []
    result = db.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
    return list(itertools.chain(*result))

def get_metadata():
    if "lang_metadata" not in g:
        g.lang_metadata = __lang_metadata
    return g.lang_metadata



