import os, sqlite3, csv

LANG_DIR = os.path.abspath("server/app/data/lang")

def create_table_str(table):
    return f"CREATE TABLE {table}(id INTEGER PRIMARY KEY, word TEXT, translation TEXT, type TEXT)"

def drop_table_str(table):
    return f"DROP TABLE IF EXISTS {table}"

def insert_into_table_str(table):
    return f"INSERT INTO {table}(word, translation, type) VALUES(?, ?, ?)"

def init_lang_db(lang: str):
    path = os.path.join(LANG_DIR, lang)
    db = sqlite3.connect(os.path.join(path, lang + ".db"))
    for table in [t[:-4] for t in os.listdir(path) if t.endswith(".csv")]:
        db.execute(drop_table_str(table))
        db.execute(create_table_str(table))
        with open(os.path.join(path, f"{table}.csv"), newline="", encoding="utf-8") as file:
            db.executemany(insert_into_table_str(table), csv.reader(file))
        db.commit()

langs = os.listdir(LANG_DIR)
init_lang_db("ru")




