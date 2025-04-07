from flask import request, jsonify
from app import app, db
import datetime
import uuid
# Route to create a new shortcut
@app.route('/api/shortcuts', methods=['POST'])
def create_shortcut():
    data = request.get_json()  # Get the incoming JSON data

    # Extract values from the request
    title = data.get('title')
    description = data.get('description')
    link = data.get('link')

    if not title or not description or not link:
        return jsonify({"message": "Missing required fields"}), 400

    # Insert the new shortcut into the database
    shortcut = {
        '_id': str(uuid.uuid4()),
        'title': title,
        'description': description,
        'link': link,
        # 'created_at': datetime.utcnow()
    }
    db.shortcuts.insert_one(shortcut)
    return jsonify({
        "message": "Shortcut created successfully",
        "_id": shortcut['_id'] 
    }), 201


@app.route('/api/shortcuts', methods=['GET'])
def get_all_shortcuts():
    shortcuts = db.shortcuts.find()  # Get all shortcuts from the database

    # Convert cursor to list and return it as a JSON response
    return jsonify([{
        '_id': str(shortcut['_id']),
        'title': shortcut['title'],
        'description': shortcut['description'],
        'link': shortcut['link'],
        # 'created_at': shortcut['created_at']
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
        # 'created_at': shortcut['created_at']
    })
