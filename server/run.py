from app import create_app
from dotenv import load_dotenv
from os import environ

if __name__ == "__main__":
    load_dotenv("../.env")
    host, port = environ.get("HOST"), environ.get("PORT")
    create_app().run(
        host=host,
        port=port,
        debug=True,
    )