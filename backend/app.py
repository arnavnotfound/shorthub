from flask import Flask,jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
db = PyMongo(app).db
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change to a more secure key in production

CORS(app)  # This will allow cross-origin requests from any domain

from routes.shortcut_routes import *  # Make sure this path is correct
from routes.user_routes import * 


if __name__ == "__main__":
    app.run(debug=True,port=5001)