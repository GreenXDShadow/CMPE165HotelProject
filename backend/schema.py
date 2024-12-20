from main import db, app

# Set up the SQLite URI (or any other database URI)
# Users Table
class User(db.Model):
    __tablename__ = 'Users'
    user_id = db.Column('User ID', db.String, primary_key=True)
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
    room_id = db.Column('Room ID', db.Integer, nullable=False)
    hotel_name = db.Column('Hotel Name', db.String, nullable=False)
    room_configuration = db.Column('Room Configuration', db.String)  # Room number and floor number
    arrival_date= db.Column('Arrival Date', db.String)  # No need for check-in ending time
    departure_date = db.Column('Departure Date', db.String)
    num_nights = db.Column('# of Nights', db.Integer)
    num_adults = db.Column('# of Adults', db.Integer)
    num_children = db.Column('# of Children', db.Integer)
    num_rooms = db.Column('# of Rooms', db.Integer)
    email = db.Column('Email', db.String, nullable=False)
    first_name = db.Column('First Name', db.String, nullable=False)
    last_name = db.Column('Last Name', db.String, nullable=False)
    cost_before_extra = db.Column('Cost', db.Float)
    extra = db.Column('Extra', db.Float)
    points_used = db.Column('PU', db.Integer)
    total = db.Column('Total', db.Float)
    points_earned = db.Column('PE', db.Integer)
    payment_id = db.Column('Payment ID', db.String, db.ForeignKey('Payment Info.Payment ID'))
    canceled = db.Column('Canceled', db.Integer)  # may be used to keep record of canceled reservations 

# Payment Info Table
class PaymentInfo(db.Model):
    __tablename__ = 'Payment Info'
    payment_id = db.Column('Payment ID', db.String, primary_key=True)
    card_number = db.Column('Card Number', db.String, nullable=False)
    first_name = db.Column('First Name', db.String, nullable=False)
    last_name = db.Column('Last Name', db.String, nullable=False)
    expiration_month = db.Column('Expiration Month', db.String)
    expiration_year = db.Column('Expiration Year', db.String)
    cvc = db.Column('CVC', db.String)
    user_id = db.Column('User ID', db.String, db.ForeignKey('Users.User ID'), nullable=False)  # user_id for feature of saving payment methods

class Purchase(db.Model):
    __tablename__ = 'Purchase'
    id = db.Column('ID', db.Integer, primary_key=True)
    payment_id = db.Column('Payment ID', db.String, db.ForeignKey('Payment Info.Payment ID'), nullable=False)  # Corrected table name
    booking_id = db.Column('Booking ID',db.Integer,db.ForeignKey('Bookings.Booking ID'),nullable=False)
    user_id = db.Column('User ID', db.String, db.ForeignKey('Users.User ID'), nullable=False)
    total = db.Column('Total', db.String, nullable=False)
    service_fee = db.Column('Service Fee', db.String, nullable=False)

# Initialize the database and create tables
with app.app_context():
    db.create_all()