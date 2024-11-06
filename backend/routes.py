from flask import Flask, request, jsonify, session  # Importing necessary modules
from flask_cors import CORS  # Importing CORS module for cross-origin resource sharing
from flask_bcrypt import Bcrypt  # Importing Bcrypt module for password hashing
import uuid  # Importing the uuid module for generating unique IDs

from schema import *  # Importing the database schema
from hotelFetch import *  # Importing the city_search and hotel_search functions from hotelFetch.py
from main import app, db, bcrypt
from datetime import datetime

@app.route('/login', methods=['POST'])  # Defining a route for '/login' with POST method
def login():
    data = request.get_json()  # Extracting JSON data from the request
    print(data)
    email = data['email']  # Extracting email from the data
    password = data['password']

    user = User.query.filter_by(email=email).first()  # Querying the database for the user with the provided email

    if user and bcrypt.check_password_hash(user.password, password):
        session['user_id'] = user.user_id
        print(session['user_id'])
        payment = PaymentInfo.query.filter_by(user_id=user.user_id).first()
        if payment:
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

@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':  # Checking if the request method is POST
        data = request.json  # Extracting JSON data from the request

        print(data)

        city_id = city_search(data.get('location')) # Get the and input into function for getting the id of the city searched
        
        # use the function call below when we're demoing/using the finished website to actually search with the form parameters
        # hotel_list = hotel_search(city_id, data.get('arrival_date'), data.get('depart_date'), data.get('num_adults'), data.get('num_children'), data.get('num_rooms'))
        
        # use this example variable below for now to run a default API call so that only input needed is the location, hotel_list will be used later on
        example = hotel_search(city_id, "2024-12-18", "2024-12-20", "2", "1", "1")

        return jsonify(example)  # Returning list of hotels
    else:
        return 'False'  # Returning False as a response if the request method is not POST
    
# search by the hotel_id of the selected hotel
@app.route('/hotel/<hotel_id>', methods=['GET'])
def hotel(hotel_id):
    if request.method == 'GET':
        # arrival_date = request.args.get('start_date')
        # departure_date = request.args.get('end_date')
        # start = arrival_date.split('T')[0]
        # end = departure_date.split('T')[0]
        # print(start)
        # print(end)
        hotel_info_response = hotel_search_by_id(hotel_id, "2024-12-18", "2024-12-20")
        print(hotel_info_response)
        print()

        data = {
            'name': hotel_info_response[0].get('hotel_name'),
            'address': hotel_info_response[0].get('address'),
            'rating': hotel_info_response[0].get('review_score'),
            'review': hotel_info_response[0].get('review_score_word')
        }

        print(data)
        return jsonify(data), 200
    else:
        return jsonify({'message': 'Invalid request method!'}), 405

@app.route('/booking', methods=['POST'])
def booking():
    if request.method == "POST":
        data = request.get_json()
            
        if 'user_id' not in session:
            print("user_id not in session")
            return jsonify({'message': 'User not logged in!'}), 401
        
        user = User.query.filter_by(user_id=session['user_id']).first()

        user_id = session['user_id']
        payment_id = session['payment_id']
        hotel_id = data['hotel_id']
        hotel_name = data['hotel_name']
        check_in_start = data['startDate']
        check_out_time = data['endDate']
        email = user.email
        first_name = user.first_name
        last_name = user.last_name
        beds = 2
        pricing_per_night = 100 #arbitrary value for now
        cost = 200 #arbitrary value for now
        canceled = 0
    
        check_in_date = datetime.strptime(check_in_start, '%Y-%m-%d')
        check_out_date = datetime.strptime(check_out_time, '%Y-%m-%d')
        nights = (check_out_date - check_in_date).days
    

        new_booking = Booking(
            user_id=user_id,
            payment_id=payment_id,
            hotel_id=hotel_id,
            hotel_name=hotel_name,
            room_and_floor= "Room 1, Floor 2",
            check_in_time=check_in_start,
            check_out_time=check_out_time,
            email=email,
            first_name=first_name,
            last_name=last_name,
            beds=beds,
            nights=nights,
            pricing_per_night=pricing_per_night,
            cost=cost,
            canceled=canceled
        )

        try:
            db.session.add(new_booking)
            db.session.commit()
            return jsonify({'message': 'Booking successful!'}), 200
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify({'message': 'Failed to book!', 'error': str(e)}), 500
    else:
        return jsonify({'message': 'Invalid request method!'}), 405

@app.route('/booking_details', methods=['GET'])
def booking_details():
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in!'}), 401

    booking = Booking.query.filter_by(user_id=session['user_id']).first()

    if booking:
        data = [{
            'hotel_id': booking.hotel_id,
            'hotel_name': booking.hotel_name,
            'check_in_time': booking.check_in_time,
            'check_out_time': booking.check_out_time,
            'room_and_floor': booking.room_and_floor,
            'pricing_per_night': booking.pricing_per_night,
            'cost': booking.cost,
            'tax': 0.25, # arbitrary value for now
            'guests': 2, # arbitrary value for now
            'convenience_fee': 2.50 # arbitrary value for now
        }]
        return jsonify(data), 200
    else:
        return jsonify({'message': 'No payment information found!'}), 404

@app.route('/payment', methods=['GET', 'POST'])  # Defining a route for '/payment' with GET and POST methods
def payment():
    try:
        # would need a session['user_id'] to tie as a foreign key, then would make a new 'payment' by inserting the new info
        # schema needs a way to track the actual payment payment not just the used payment information

        data = request.get_json()
        # get the booking the user just made on the previous page
        booking = Booking.query.filter_by(user_id=session['user_id']).first()
        fee = 100  # website fee
        tax = 0.25 # constant sales tax percentage

        
        # price per night and nights from database mutiplied together = cost for all nights + fee
        cost = (booking.pricing_per_night * booking.nights) + fee

        

        if 'user_id' not in session:
            return jsonify({'message': 'User not logged in!'}), 401
        # to do
        # if user logged in, then display account rewards points   
                
        
        
        # subtract input from account points and dollar amount from total
        user = User.query.filter_by(user_id=session['user_id']).first()
        inputRewards = int(data['rewardsPoints'])
        if(inputRewards <= user.reward_points):
            newRewardsPoints = user.reward_points - inputRewards
            user.reward_points = newRewardsPoints
            costAfterRewards = cost - (inputRewards/100.00) # total cost - $ amount from rewards redeemed
        else:
            costAfterRewards = cost

        earnedRewardsPoints = costAfterRewards/100
        currentRewardsPoints = user.reward_points
        user.reward_points = currentRewardsPoints + earnedRewardsPoints
        
        adjusted_tax = costAfterRewards * tax

        total = costAfterRewards + adjusted_tax

        new_purchase = Purchase(
            payment_id = session['payment_id'],
            booking_id = booking.booking_id,
            user_id = session['user_id'],
            total = total,
            service_fee = fee
        )

        db.session.add(new_purchase)
        db.session.commit()
        return jsonify({'Message': 'Purchase confirmed'}), 200

    except Exception as e:
        print(e)
        return jsonify({'Message': 'Error'}, 404)
@app.route('/confirmation',methods=['GET','POST'])
def confirmation():
    return jsonify({'Message': 'purchase confirmed'},200)