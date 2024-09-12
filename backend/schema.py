import sqlite3

data = sqlite3.connect('backend/database.db')
dataCursor = data.cursor()
dataCursor.execute('create table if not exists "Users" ("User ID" text primary key, "Email" text, "Password" text, "First Name" text, "Last Name" text, "Reward Points" integer)')
dataCursor.execute('create table if not exists "Hotels" ("Hotel ID" text primary key, "Name" text, "Address" text, "Room Count" Integer, "Rating" real, "Check In Start" text, "Check In End" text, "Check Out Time" text)')
dataCursor.execute('create table if not exists "Hotel Rooms" ("Hotel ID" text, "Floor" integer, "Room Number" integer, "Beds" integer, "Pricing" real)')
dataCursor.execute('create table if not exists "Bookings" ("Booking ID" text primary key, "Hotel ID" text, "User ID" text, "Email" text, "First Name" text, "Last Name" text, "Start Date" text, "End Date" text, "Guest Count" integer, "Nights" integer, "Payment ID" text, "Cost" real, "Canceled" integer)')
dataCursor.execute('create table if not exists "Payment Info" ("Payment ID" text primary key, "First Name" text, "Last Name" text, "CVC" integer, "Expiration Month" integer, "Expiration Year" integer, "User ID" text)')