from app import create_app
from dotenv import load_dotenv
from os import environ

if __name__ == "__main__":
    load_dotenv()
    host, port = environ.get("HOST_INTERNAL"), environ.get("PORT_INTERNAL")
    create_app().run(
        host=host,
        port=port,
        debug=True,
    )