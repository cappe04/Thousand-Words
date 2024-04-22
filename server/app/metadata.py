import os, json

__data = {
    "langs": {}
}

def init_app(app):
    def get_path(path):
        return os.path.join(app.root_path, path)

    for lang in os.listdir(get_path("data/lang")):
        if not os.path.exists(path := get_path(f"data/lang/{lang}/metadata.json")):
            continue
        with open(path, encoding="utf-8") as file:
            __data["langs"][lang] = json.load(file)

def get_metadata():
    return __data

