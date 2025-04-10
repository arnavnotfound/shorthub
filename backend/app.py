from flask import Flask,jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
db = PyMongo(app).db
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'your-secret-key' 


from routes.shortcut_routes import *  
from routes.user_routes import * 
CORS(app,supports_credentials=True,origins=["http://localhost:5173"]) 

if __name__ == "__main__":
    app.run(debug=True,port=5001)


