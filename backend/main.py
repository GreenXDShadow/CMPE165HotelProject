from flask import Flask, request, jsonify  # Importing necessary modules
from flask_cors import CORS  # Importing CORS module for cross-origin resource sharing
from flask_sqlalchemy import SQLAlchemy  # Importing SQLAlchemy module for database operations
from flask_bcrypt import Bcrypt  # Importing Bcrypt module for password hashing
from hotelFetch import city_search, hotel_search, room_search

app = Flask(__name__)  # Creating a Flask application instance

CORS(app, origins=['http://localhost:3000'])  # Allowing cross-origin requests from http://localhost:3000

bcrypt = Bcrypt(app)  # Creating a Bcrypt instance

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
        
        email = data.get('email')  # Extracting email from the data
        password = data.get('password') # Extracting password from the data

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')  # Hashing the password

        print(email + hashed_password)  # Printing the data to the console
        return 'Success'  # Returning 'Success' as a response
    else:
        return 'Failed'  # Returning 'Failed' as a response if the request method is not POST
    
@app.route('/payment', methods=['GET', 'POST'])  # Defining a route for '/payment' with GET and POST methods
def payment():
    if request.method == 'POST':  # Checking if the request method is POST
        data = request.json  # Extracting JSON data from the request
        print(data)  # Printing the data to the console
        return 'Success'  # Returning True as a response
    else:
        return 'False'  # Returning False as a response if the request method is not POST

@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':  # Checking if the request method is POST
        data = request.json  # Extracting JSON data from the request

        city_id = city_search(data.get('location')) # Get the and input into function for getting the id of the city searched
        
        # use the function call below when we're demoing/using the finished website to actually search with the form parameters
        # hotel_list = hotel_search(city_id, data.get('arrival_date'), data.get('depart_date'), data.get('num_adults'), data.get('num_children'), data.get('num_rooms'))
        
        # use this example variable below for now to run a default API call so that only input needed is the location, hotel_list will be used later on
        example = hotel_search(city_id, "2024-12-18", "2024-12-20", "2", "1", "1")

        return jsonify(example)  # Returning list of hotels
    else:
        return 'False'  # Returning False as a response if the request method is not POST
    
# unfinalized route for calling API for rooms within a chosen hotel from the /hotelinfo page
@app.route('/hotelinfo', methods=['GET', 'POST'])
def hotels():
    if request.method == 'POST':
        return True
    else:
        return False

if __name__ == '__main__':
    app.run(debug=True, port=4000)  # Running the Flask application in debug mode on port 4000