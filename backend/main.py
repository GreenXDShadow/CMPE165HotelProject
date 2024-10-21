from flask import Flask, request, jsonify, session  # Importing necessary modules
from flask_cors import CORS  # Importing CORS module for cross-origin resource sharing
from flask_bcrypt import Bcrypt  # Importing Bcrypt module for password hashing
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)  # Creating a Flask application instance

app.secret_key = "i-hate-sql"

CORS(app, origins=['http://localhost:3000'], supports_credentials=True)  # Allowing cross-origin requests from http://localhost:3000

bcrypt = Bcrypt(app)  # Creating a Bcrypt instance
db_path = os.path.abspath('./database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from routes import *

if __name__ == '__main__':
    app.run(debug=True, port=4000)  # Running the Flask application in debug mode on port 4000