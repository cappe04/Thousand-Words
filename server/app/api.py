import os
from flask import Blueprint, current_app, request

from .db import get_db, get_tables

bp = Blueprint("api", __name__)

def validate_lang(lang):
    path = os.path.join(current_app.root_path, f"data/db/{lang}.db")
    return os.path.exists(path)

def validate_table(lang, table):
    return table in get_tables(lang)

def bad_request():
    return "Bad Request", 400

@bp.route("/lang_api/<lang>")
def lang_api(lang):
    # Check if lang exits
    if not validate_lang(lang):
        return bad_request()

    # Get table
    if (table := request.args.get("table")) is None and not validate_table(lang, table):
        return bad_request()
    
    # Slicing
    start = int(request.args.get("start", 1))
    end = int(request.args.get("end", -1))

    # Database query
    db = get_db(lang)
    query = f"SELECT * FROM {table} WHERE id >= ? "
    args = (start,)

    if end != -1:
        query += "AND id <= ?"
        args = (start, end)
    
    result = db.execute(query, args)

    # Return result
    return result.fetchall()

