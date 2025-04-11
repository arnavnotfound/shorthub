from flask import request, jsonify
from app import app, db
import uuid
from flask_jwt_extended import jwt_required,get_jwt_identity

@app.route('/api/shortcuts', methods=['POST'])
@jwt_required()
def create_shortcut():
    current_username = get_jwt_identity()
    data = request.get_json()  

    user = db.users.find_one({"username": current_username})
    

    title = data.get('title')
    description = data.get('description')
    link = data.get('link')

    if not title or not description or not link:
        return jsonify({"message": "Missing required fields"}), 400

    
    shortcut = {    
        '_id': str(uuid.uuid4()),
        'title': title,
        'description': description,
        'link': link,
        'approved': False,
        'created_by': current_username
    }
    # unapproved_shortcuts = user.get("unapproved_shortcuts",[])
    # print(unapproved_shortcuts)
    # unapproved_shortcuts.append(shortcut)
    db.shortcuts.insert_one(shortcut)
    # db.users.update_one(
    #     {"username": current_username},
    #     {"$set":{"unapproved_shortcuts": unapproved_shortcuts}}
    # )
    # print(user)
    return jsonify({
        "message": "Shortcut created successfully",
        "_id": shortcut['_id'] 
    }), 201

@app.route('/api/shortcuts', methods=['GET'])
def get_all_shortcuts():
    shortcuts = db.shortcuts.find({'approved': True})  

    return jsonify([{
        '_id': str(shortcut['_id']),
        'title': shortcut['title'],
        'description': shortcut['description'],
        'link': shortcut['link'],
    } for shortcut in shortcuts])

@app.route('/api/shortcuts/<shortcut_id>', methods=['GET'])
def get_shortcut(shortcut_id):
    
    
    shortcut = db.shortcuts.find_one({'_id': shortcut_id})

    if not shortcut:
        return jsonify({"message": "Shortcut not found"}), 404

    return jsonify({
        '_id': str(shortcut['_id']),
        'title': shortcut['title'],
        'description': shortcut['description'],
        'link': shortcut['link'],
    })
