from schema import Hotel

# Fetch all hotels
hotels = Hotel.query.all()

# Create a list of dictionaries with hotel attributes
output = [
    {
        'hotel_id': hotel.hotel_id,
        'longitude': hotel.longitude,
        'latitude': hotel.latitude,
        'name': hotel.name,
        'address': hotel.address,
        'city': hotel.city,
        'region_id': hotel.region_id,
        'rating': hotel.rating,
        'check_in_start': hotel.check_in_start,
        'check_in_end': hotel.check_in_end,
        'check_out_time': hotel.check_out_time
    }
    for hotel in hotels
]

print(output)