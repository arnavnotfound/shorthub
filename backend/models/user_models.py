from flask_bcrypt import Bcrypt
from flask import jsonify
from app import db,jwt,app
import uuid
bcrypt= Bcrypt()

def create_user(username,password):
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8') 
    user = {
        '_id' : str(uuid.uuid4()),
        'username': username,
        'password': hashed_password,
        'approved_shortcuts': [],
        'unapproved_shortcuts': []
    }
    db.users.insert_one(user)
    return jsonify(user) 
