from flask import Flask, request, jsonify  # Importing necessary modules
from flask_cors import CORS  # Importing CORS module for cross-origin resource sharing
from flask_sqlalchemy import SQLAlchemy  # Importing SQLAlchemy module for database operations

app = Flask(__name__)  # Creating a Flask application instance

CORS(app, origins=['http://localhost:3000'])  # Allowing cross-origin requests from http://localhost:3000

@app.route('/login', methods=['GET', 'POST'])  # Defining a route for '/login' with GET and POST methods
def login():
    if request.method == 'POST':  # Checking if the request method is POST
        data = request.json  # Extracting JSON data from the request
        print(data)  # Printing the data to the console
        return True  # Returning True as a response
    else:
        return False  # Returning False as a response if the request method is not POST
    
@app.route('/registration', methods=['GET', 'POST'])  # Defining a route for '/registration' with GET and POST methods
def registration():
    if request.method == 'POST':  # Checking if the request method is POST
        data = request.json  # Extracting JSON data from the request
        print(data)  # Printing the data to the console
        return 'Success'  # Returning 'Success' as a response
    else:
        return 'Failed'  # Returning 'Failed' as a response if the request method is not POST

if __name__ == '__main__':
    app.run(debug=True, port=4000)  # Running the Flask application in debug mode on port 4000