from flask import Blueprint, request

bp = Blueprint("api", __name__)

@bp.route("/lang_api/<lang>")
def lang_api(lang):
    # Get table
    if (table := request.args.get("table")) is None:
        return "Record not found", 400
    
    # Slicing
    start = request.args.get("start", 0)
    end = request.args.get("end", -1)

    return {
        "lang": {
            "name": lang,
            "table": table,
            "span": {
                "start": start,
                "end": end
            }
        }
    }

