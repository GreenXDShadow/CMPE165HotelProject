from flask import Flask, request, jsonify  # Importing necessary modules
from flask_cors import CORS  # Importing CORS module for cross-origin resource sharing
from flask_sqlalchemy import SQLAlchemy  # Importing SQLAlchemy module for database operations
from flask_bcrypt import Bcrypt  # Importing Bcrypt module for password hashing

app = Flask(__name__)  # Creating a Flask application instance

CORS(app, origins=['http://localhost:3000'])  # Allowing cross-origin requests from http://localhost:3000

bcrypt = Bcrypt(app)  # Creating a Bcrypt instance

@app.route('/login', methods=['GET', 'POST'])  # Defining a route for '/login' with GET and POST methods
def login():
    if request.method == 'POST':  # Checking if the request method is POST
        data = request.json  # Extracting JSON data from the request
        print(data)  # Printing the data to the console
        return 'Success'  # Returning True as a response
    else:
        return 'False'  # Returning False as a response if the request method is not POST
    
@app.route('/registration', methods=['GET', 'POST'])  # Defining a route for '/registration' with GET and POST methods
def registration():
    if request.method == 'POST':  # Checking if the request method is POST
        data = request.json  # Extracting JSON data from the request
        
        email = data.get('email')  # Extracting email from the data
        password = data.get('password') # Extracting password from the data

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')  # Hashing the password

        print(email + hashed_password)  # Printing the data to the console
        return 'Success'  # Returning 'Success' as a response
    else:
        return 'Failed'  # Returning 'Failed' as a response if the request method is not POST

@app.route('/payment', methods=['GET', 'POST'])  # Defining a route for '/payment' with GET and POST methods
def payment():
    if request.method == 'POST':
        data = request.json
        cardnum = data.get('cardnum')
        cvc = data.get('cvc')

        print(cardnum + " " + cvc)
        return 'Success'
    else:
        return 'Failed'

if __name__ == '__main__':
    app.run(debug=True, port=4000)  # Running the Flask application in debug mode on port 4000