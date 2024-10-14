from flask import Flask, request, jsonify, session  # Importing necessary modules
from flask_cors import CORS  # Importing CORS module for cross-origin resource sharing
from flask_sqlalchemy import SQLAlchemy  # Importing SQLAlchemy module for database operations
from flask_bcrypt import Bcrypt  # Importing Bcrypt module for password hashing
import uuid  # Importing the uuid module for generating unique IDs
import json

from schema import app, db, User, Hotel, Booking, PaymentInfo, Purchase  # Importing the database schema

app.secret_key = 'ah-tee-hee'

CORS(app, origins=['http://localhost:3000'], supports_credentials=True)  # Allowing cross-origin requests from http://localhost:3000

bcrypt = Bcrypt(app)  # Creating a Bcrypt instance

@app.route('/login', methods=['POST'])  # Defining a route for '/login' with POST method
def login():
    data = request.get_json()  # Extracting JSON data from the request

    email = data['email']  # Extracting email from the data
    password = data['password']

    user = User.query.filter_by(email=email).first()  # Querying the database for the user with the provided email

    if user and bcrypt.check_password_hash(user.password, password):
        session['user_id'] = user.user_id
        payment = User.query.filter_by(user_id=user.user_id)
        if user and payment:
            session['payment_id'] = payment.payment_id
        return jsonify({'message': 'Login successful!'}), 200
    else:
        return jsonify({'message': 'Invalid credentials!'}), 401

@app.route('/registration', methods=['POST'])  # Defining a route for '/registration' with POST method
def registration():
    data = request.get_json()  # Extracting JSON data from the request
    
    print(data)

    email = data['email']  # Extracting email from the data
    password = data['password']  # Extracting password from the data
    first_name = data['firstname']  # Extracting first name from the data
    last_name = data['lastname']  # Extracting last name from the data
    cardnumber = data['cardnum']  # Extracting card number from the data
    cvc = data['cvc']
    expire_date = data['expire'].split('/')

    expiration_month, expiration_year = map(int, expire_date)

    user_id = str(uuid.uuid4())  # Generating a unique user ID
    payment_id = str(uuid.uuid4())

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')  # Hashing the password

    new_user = User(
        user_id=user_id,
        email=email,
        password=hashed_password,
        first_name=first_name,
        last_name=last_name,
        reward_points=0
    )
    new_payment_info = PaymentInfo(
        payment_id=payment_id,
        first_name=first_name,
        last_name=last_name,
        card_number=cardnumber,
        cvc=cvc,
        expiration_month=expiration_month,
        expiration_year=expiration_year,
        user_id=user_id
    )

    print(new_user)
    print(new_payment_info)

    existing_user = User.query.filter_by(email=email).first()  # Querying the database for the user with the provided email

    print(existing_user)

    if not existing_user:  # If the user does not exist
        try:
            db.session.add(new_user)
            db.session.add(new_payment_info)
            db.session.commit()
            return jsonify({'message': 'User created successfully!'}), 200
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify({'message': 'Failed to create user!', 'error': str(e)}), 500
    else:
        return jsonify({'message': 'User already exists!'}), 409

# add way to filter by keyword to allow for searching
@app.route('/hotels', methods=['GET'])
def hotels():
    try:
        # this would depend on if erickson gives me the api he's using or if he populates the db with hotel info
    except Exception as e:
        print(e)

@app.route('/payment', methods=['POST'])  # Defining a route for '/payment' with POST method
def payment():
    try:
        # would need a session['user_id'] to tie as a foreign key, then would make a new 'payment' by inserting the new info
        # schema needs a way to track the actual payment payment not just the used payment information
        data = request.get_json()

        fee = 100
        tax = 0.25

        cost = (data['room_cost'] * data['number_of_people']) + fee

        adjusted_tax = cost * tax

        total = cost + adjusted_tax

        new_purchase = Purchase(
            payment_id = session['payment_id'],
            user_id = session['user_id'],
            total = total,
            tax = tax,
            service_fee = fee
        )

        db.session.add(new_purchase)
        db.session.commit()
        return jsonify({'Message': 'Booking purchased'}, 200)

    except Exception as e:
        print(e)    

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=4000)  # Running the Flask application in debug mode on port 4000