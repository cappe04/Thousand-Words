import itertools
import os
import sqlite3
from flask import current_app, g

def init_app(app):
    app.teardown_appcontext(close_db)

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
        


