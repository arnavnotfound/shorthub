from app import app,db
from flask import request,jsonify
from models.user_models import create_user
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
bcrypt = Bcrypt()

@app.route('/api/register', methods = ['POST'])
def register():
    data= request.json
    username = data.get('username')
    password = data.get('password')

    if (db.users.find_one({'username':username})):
        return jsonify({"message": "User already exists"}), 400

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
        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token}), 200

    return jsonify({"message": "Invalid credentials"}), 401


@app.route('/api/user/<username>', methods=['GET'])
def get_user(username):
    user = db.users.find_one({'username':username})
    if not user:
        return jsonify({"message": "user not found"}), 404

    return jsonify({
        '_id': str(user['_id']),
        'username': user['title'],
    })

@app.route('/api/current-user', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    return jsonify({
        # '_id': str(current_user['_id']),
        'username': current_user['username']
    })


