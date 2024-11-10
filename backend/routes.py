from flask import Flask, request, jsonify, session  # Importing necessary modules
from flask_cors import CORS  # Importing CORS module for cross-origin resource sharing
from flask_bcrypt import Bcrypt  # Importing Bcrypt module for password hashing
import uuid  # Importing the uuid module for generating unique IDs
from sqlalchemy import asc, desc


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
        arrival_date = data.get("arrival_date").split('T')[0]
        depart_date = data.get("depart_date").split('T')[0]
        num_adults = request.args.get('num_adults')
        num_children = request.args.get('num_children')
        num_rooms = request.args.get('num_rooms')

        city_id = city_search(data.get('location')) # Get the and input into function for getting the id of the city searched
        
        # use the function call below when we're demoing/using the finished website to actually search with the form parameters
        # hotel_list = hotel_search(city_id, data.get('arrival_date').split('T')[0], data.get('depart_date').split('T')[0], data.get('num_adults'), data.get('num_children'), data.get('num_rooms'), "Price (Low To High)")
        
        # use this example variable below for now to run a default API call so that only input needed is the location, hotel_list will be used later on
        example = hotel_search(city_id, arrival_date, depart_date, "2", "1", "1", "Price (Low To High)")

        data['arrival_date'] = arrival_date
        data['depart_date'] = depart_date
        return jsonify({'hotels': example, 'processed_form_data': data})  # Returning list of hotels + form data with jsonified/cleaner date values
    else:
        return 'False'  # Returning False as a response if the request method is not POST
    
# search by the hotel_id of the selected hotel
@app.route('/hotel/<hotel_id>', methods=['GET'])
def hotel(hotel_id):
    if request.method == 'GET':
        arrival_date = request.args.get('start_date').split('T')[0]
        departure_date = request.args.get('end_date').split('T')[0]
        num_adults = request.args.get('num_adults')
        num_children = request.args.get('num_children')
        num_rooms = request.args.get('num_rooms')
        hotel_info_response = hotel_search_by_id(hotel_id, "2024-12-18", "2024-12-20")
        print(hotel_info_response)
        print()

        data = {
            'name': hotel_info_response[0].get('hotel_name'),
            'address': hotel_info_response[0].get('address'),
            # review score and review word are already in the data returned for each hotel in hotel_search, can be passed when redirecting
            'rooms': room_search(hotel_id, "2024-12-18", "2024-12-20", "2", "1", "1")
        }
        # data = {
        #     'name': 'Test Hotel',
        #     'address': '123 Help St',
        #     'rooms': [{'room_id': 156509023, 'config': 'Superior Quadruple Room', 'recommended_for': 4, 'size_ft2': 108.0, 'cost_before_extra': 169.1, 'extra': {"You don't pay the cleaning fee thanks to Genius": 0, '17.70 % TAX': 29.93, 'total_extra': 29.93}, 'total_cost': 199.03, 'image': ('https://cf.bstatic.com/xdata/images/hotel/max500/322605971.jpg?k=8bfb505c9ce9e1373c2f0f30a55b83b45ece3b5fdc86391785e19ccde4095023&o=',), 'highlights': ['Free WiFi', 'Air conditioning', 'Attached bathroom'], 'facilities': ['Linens', 'Upper floors accessible by elevator', 'Toilet', 'Single-room AC for guest accommodation', 'Iron', 'Heating', 'Internet facilities', 'Towels', 'Wardrobe or closet', 'Free toiletries', 'Toilet paper', 'Wireless internet', 'Air conditioning', 'Bathtub or shower', 'Private bathroom', 'Hairdryer'], 'breakfast': 'There is no meal option with this room.'}, {'room_id': 156509024, 'config': 'Queen Room', 'recommended_for': 2, 'size_ft2': 108.0, 'cost_before_extra': 169.1, 'extra': {"You don't pay the cleaning fee thanks to Genius": 0, '17.70 % TAX': 29.93, 'total_extra': 29.93}, 'total_cost': 199.03, 'image': ('https://cf.bstatic.com/xdata/images/hotel/max500/445360743.jpg?k=5485cb1161751b5fdae0d2f118a86a556df60c6e09534f4ceb1acab4bb3690ff&o=',), 'highlights': ['Free WiFi', 'Air conditioning', 'Attached bathroom', 'Flat-screen TV'], 'facilities': ['TV', 'Linens', 'Upper floors accessible by elevator', 'Toilet', 'Flat-screen TV', 'Single-room AC for guest accommodation', 'Iron', 'Heating', 'Internet facilities', 'Towels', 'Wardrobe or closet', 'Free toiletries', 'Toilet paper', 'Wireless internet', 'Air conditioning', 'Bathtub or shower', 'Private bathroom', 'Hairdryer'], 'breakfast': 'There is no meal option with this room.'}, {'room_id': 156509027, 'config': 'Superior Twin Room', 'recommended_for': 2, 'size_ft2': 108.0, 'cost_before_extra': 169.1, 'extra': {"You don't pay the cleaning fee thanks to Genius": 0, '17.70 % TAX': 29.93, 'total_extra': 29.93}, 'total_cost': 199.03, 'image': ('https://cf.bstatic.com/xdata/images/hotel/max500/322605919.jpg?k=3fc7de4540423f309c88407c22cb49684f901e8ded8207693368100c1c11e1b8&o=',), 'highlights': ['Free WiFi', 'Air conditioning', 'Attached bathroom', 'Flat-screen TV'], 'facilities': ['TV', 'Linens', 'Upper floors accessible by elevator', 'Toilet', 'Flat-screen TV', 'Single-room AC for guest accommodation', 'Iron', 'Heating', 'Internet facilities', 'Towels', 'Wardrobe or closet', 'Free toiletries', 'Toilet paper', 'Wireless internet', 'Air conditioning', 'Bathtub or shower', 'Private bathroom', 'Hairdryer'], 'breakfast': 'There is no meal option with this room.'}, {'room_id': 156509025, 'config': 'King Room', 'recommended_for': 2, 'size_ft2': 183.0, 'cost_before_extra': 197.6, 'extra': {"You don't pay the cleaning fee thanks to Genius": 0, '17.70 % TAX': 34.98, 'total_extra': 34.98}, 'total_cost': 232.58, 'image': ('https://cf.bstatic.com/xdata/images/hotel/max500/322605990.jpg?k=fbc8a6d0fae9fca3010fd62853ba4efc0a4f4f5489563ae09140890e8452941b&o=',), 'highlights': ['Free WiFi', 'Air conditioning', 'Attached bathroom', 'Flat-screen TV'], 'facilities': ['TV', 'Linens', 'Upper floors accessible by elevator', 'Toilet', 'Flat-screen TV', 'Single-room AC for guest accommodation', 'Iron', 'Heating', 'Internet facilities', 'Towels', 'Wardrobe or closet', 'Free toiletries', 'Toilet paper', 'Wireless internet', 'Air conditioning', 'Bathtub or shower', 'Private bathroom', 'Hairdryer'], 'breakfast': 'There is no meal option with this room.'}]
        # }

        print(data)
        return jsonify(data), 200
    else:
        return jsonify({'message': 'Invalid request method!'}), 405

@app.route('/booking', methods=['POST'])
def booking():
    if request.method == "POST":
        if 'user_id' not in session:
            print("user_id not in session")
            return jsonify({'message': 'User not logged in!'}), 401
        
        data = request.get_json()
        
        user = User.query.filter_by(user_id=session['user_id']).first()

        user_id = session['user_id']
        payment_id = session['payment_id']
        hotel_id = data['hotel_data'].get('hotel_id')
        room_id = data['room_data'].get('room_id')
        hotel_name = data['hotel_data'].get('name')
        room_configuration = data['room_data'].get('config')
        arrival_date = data['form_data'].get('arrival_date').split('T')[0]
        departure_date = data['form_data'].get('depart_date').split('T')[0]
        nights = (datetime.strptime(departure_date, '%Y-%m-%d')-datetime.strptime(arrival_date, '%Y-%m-%d')).days
        num_adults = data['form_data'].get('num_adults')
        num_children = data['form_data'].get('num_children')
        num_rooms = data['form_data'].get('num_rooms')
        email = user.email
        first_name = user.first_name
        last_name = user.last_name
        cost_before_extra = data['room_data'].get('cost_before_extra')
        extra = cost_before_extra*0.25 + 2.5
        total = cost_before_extra+extra
        canceled = 0

        bookings = Booking.query.filter_by(user_id=session['user_id']).filter(Booking.departure_date >= datetime.today()).all() # only check bookings that haven't passed
        print(str(datetime.today()).split(' ')[0])
        print(bookings)
        for b in bookings:
            if b.departure_date >= arrival_date:
                print(b.booking_id)
                return jsonify({'message': 'Failed to book!'}), 202

        new_booking = Booking(
            #booking_id set automatically
            user_id=user_id,
            hotel_id=hotel_id,
            room_id = room_id,
            hotel_name=hotel_name,
            room_configuration= room_configuration,
            arrival_date=arrival_date,
            departure_date=departure_date,
            num_nights=nights,
            num_adults=num_adults,
            num_children=num_children,
            num_rooms=num_rooms,
            email=email,
            first_name=first_name,
            last_name=last_name,
            cost_before_extra=cost_before_extra,
            extra=extra,
            total=total,
            payment_id=payment_id,
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

    booking = Booking.query.filter_by(user_id=session['user_id']).order_by(desc(Booking.booking_id)).first()

    if booking:
        data = [{
            'hotel_id': booking.hotel_id,
            'hotel_name': booking.hotel_name,
            'arrival_date': booking.arrival_date,
            'departure_date': booking.departure_date,
            'room_configuration': booking.room_configuration,
            'cost_before_extra': booking.cost_before_extra,
            'convenience_fee': 2.50, # arbitrary value for now
            'tax': 0.25, # arbitrary value for now
            'total': booking.total, # convenience fee already accounted for in booking logic
            'guests': str(booking.num_adults) + " adult(s) & " + str(booking.num_children) + " child(ren)",
            'reward_points': round(booking.cost_before_extra*.06,0)
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
        cost_before_extra = booking.cost_before_extra + fee

        adjusted_tax = cost_before_extra * tax

        total = cost_before_extra + adjusted_tax

        new_purchase = Purchase(
            payment_id = session['payment_id'],
            booking_id = booking.booking_id,
            user_id = session['user_id'],
            total = total,
            service_fee = fee
        )

        db.session.add(new_purchase)
        db.session.commit()
        return jsonify({'Message': 'Booking purchased'}, 200)

    except Exception as e:
        print(e)  

@app.route('/confirmation', methods=['GET','POST'])
def confirmation():
    return jsonify({'Message': 'purchase confirmed'},200)

@app.route('/user', methods=['GET','POST'])
def user():
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in!'}), 401

    user = User.query.filter_by(user_id=session['user_id']).first()
    bookings = Booking.query.filter_by(user_id=session['user_id']).order_by(desc(Booking.booking_id)).all()
    
    if bookings:
        user_dict = {key: value for key, value in user.__dict__.items() if not key.startswith('_')}
        booking_dicts = [{key: value for key, value in b.__dict__.items() if not key.startswith('_')} for b in bookings]
        print(booking_dicts)
        return jsonify({'user': user_dict, 'upcoming_bookings': booking_dicts, 'recent_bookings': {}}), 200
    else:
        return jsonify([{}])
    
@app.route('/cancel', methods=['DELETE'])
def cancel():
    if 'user_id' not in session:
        return jsonify({'message': 'User not logged in!'}), 401
    
    booking_id = request.args.get('id')
    booking = Booking.query.filter_by(booking_id=booking_id).first()
    
    if booking:
        # booking.canceled = 1
        db.session.delete(booking)
        db.session.commit()
        print(booking_id, "deleted")
        return '', 204
    else:
        print("Booking not found")
        return '', 204
    
