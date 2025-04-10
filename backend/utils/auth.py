from flask_jwt_extended import create_access_token
from datetime import timedelta
from app import app
import datetime
import jwt


def generate_token(username):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode(
        {"username": username, "exp": expiration},
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )
    return token

def decode_token(token):
    try:
        payload = jwt.decode(token, app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
