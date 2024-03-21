import os

DB_DIR = os.path.abspath("app/data/db")

def drop_lang_db(lang):
    os.remove(os.path.join(DB_DIR, lang + ".db"))