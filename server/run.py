import app
from app.config import PORT, HOST

if __name__ == "__main__":
    app.create_app().run(port=PORT, host=HOST, debug=True)