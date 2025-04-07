from flask_jwt_extended import create_access_token
from datetime import timedelta

def create_jwt_token(user_id):
    # Create an access token with the user_id as the identity
    access_token = create_access_token(identity=user_id, expires_delta=timedelta(hours=1))
    return access_token
