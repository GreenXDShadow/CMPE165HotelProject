import random
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Set up the SQLite URI (or any other database URI)
db_path = os.path.abspath('backend/database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
db = SQLAlchemy(app)


# Users Table
class User(db.Model):
    __tablename__ = 'Users'
    user_id = db.Column('User ID', db.Integer, primary_key=True, autoincrement=True)  # Autoincrement true by default as the primary key
    email = db.Column('Email', db.String, unique=True, nullable=False)
    password = db.Column('Password', db.String, nullable=False)
    first_name = db.Column('First Name', db.String)
    last_name = db.Column('Last Name', db.String)
    reward_points = db.Column('Reward Points', db.Integer)

# Hotels Table
class Hotel(db.Model): # for caching hotel data
    __tablename__ = 'Hotels'
    hotel_id = db.Column('Hotel ID', db.Integer, primary_key=True)
    longitude = db.Column('Longitude', db.Float)  # can be used with latitude to decipher hotel's location 
    latitude = db.Column('Latitude', db.Float)
    name = db.Column('Name', db.String, nullable=False)
    address = db.Column('Address', db.String)
    city = db.Column('City', db.String)
    region_id = db.Column('Region ID', db.Integer) # searching cities with API will return region ids
    rating = db.Column('Rating', db.Float)
    check_in_start = db.Column('Check In Start', db.String)
    check_in_end = db.Column('Check In End', db.String)  # check in end time added back just in case
    check_out_time = db.Column('Check Out Time', db.String)

# Bookings Table
class Booking(db.Model):
    __tablename__ = 'Bookings'
    booking_id = db.Column('Booking ID', db.Integer, primary_key=True)
    user_id = db.Column('User ID', db.Integer, db.ForeignKey('Users.User ID'), nullable=False)
    hotel_id = db.Column('Hotel ID', db.Integer, nullable=False)
    check_in_start = db.Column('Check In Start', db.String)  # No need for check-in ending time
    check_out_time = db.Column('Check Out Time', db.String)
    email = db.Column('Email', db.String, nullable=False)
    first_name = db.Column('First Name', db.String, nullable=False)
    last_name = db.Column('Last Name', db.String, nullable=False)
    start_date = db.Column('Start Date', db.String, nullable=False)
    end_date = db.Column('End Date', db.String, nullable=False)
    beds = db.Column('Beds', db.Integer)   # Count is type String to include bed type, 1 King bed would be 1K, 2 Queens is 2Q
    nights = db.Column('Nights', db.Integer)
    pricing_per_night = db.Column('Pricing', db.Float)
    cost = db.Column('Cost', db.Float)
    payment_id = db.Column('Payment ID', db.String, db.ForeignKey('Payment Info.Payment ID'))
    canceled = db.Column('Canceled', db.Integer)  # may be used to keep record of canceled reservations 


# Payment Info Table
class PaymentInfo(db.Model):
    __tablename__ = 'Payment Info'
    payment_id = db.Column('Payment ID', db.Integer, primary_key=True)
    first_name = db.Column('First Name', db.String, nullable=False)
    last_name = db.Column('Last Name', db.String, nullable=False)
    expiration_month = db.Column('Expiration Month', db.Integer)
    expiration_year = db.Column('Expiration Year', db.Integer)
    cvc = db.Column('CVC', db.Integer)
    user_id = db.Column('User ID', db.String, db.ForeignKey('Users.User ID'), nullable=False)  # user_id for feature of saving payment methods


# Initialize the database and create tables
with app.app_context():
    db.create_all()

    newUser = User(email=f'name{random.randint(1, 1000)}@example.com', password='password', first_name='first', last_name='last',
                   reward_points=1)  # id is autoincremented starting from 1
    print("Created user") 

    db.session.add(newUser)  # test code for adding user mechanism
    db.session.commit()
