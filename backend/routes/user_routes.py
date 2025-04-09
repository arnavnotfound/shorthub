from app import app,db
from flask import request,jsonify
from models.user_models import create_user
from flask_bcrypt import Bcrypt
from utils.auth import create_jwt_token

bcrypt = Bcrypt()

@app.route('/api/register', methods = ['POST'])
def signup():
    data= request.json
    username = data.get('username')
    password = data.get('password')
    # Check if user already exists
    if (db.users.find_one({'username':username})):
        return jsonify({"message": "User already exists"}), 400

    # Create user
    create_user(username, password)
    return jsonify({"message": "User created successfully!"}), 201


@app.route('/api/login', methods = ['POST'])
def login():

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = db.users.find_one({'username':username})
    if not user:
        return jsonify({"message": "Invalid "}), 401

    if bcrypt.check_password_hash(user['password'], password): 
        access_token = create_jwt_token(user['_id'])
        return jsonify({"access_token": access_token}), 200

    return jsonify({"message": "Invalid credentials"}), 401