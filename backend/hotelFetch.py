import requests

headers = {
	"x-rapidapi-key": "e1133eb6c5msh93eeb803aa8893cp1c7d9djsn0cbd47c2ce94",
	"x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com"
}

# Input string consisting of a city name, and the API will return a dictionary of different cities related to that search
def city_search(location): 
    url = "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete"
    querystring = {"languagecode":"en-us","text": location}

    response = requests.get(url, headers=headers, params=querystring)
    cities = response.json()

    for c in range(len(cities)):
        if cities[c]['city_name'] == location:
            dest_id = cities[c]['dest_id']
            return dest_id # return dest_id of city when the name matches the query
    return cities[0]['dest_id'] # return first city in list IF query doesn't match one of the cities listed

# Get dest_id for city from city_search(), guest_qty is number of adults and room_qty is the number of rooms wanted
# The hotel search API function still requires arrival+departure date and guest quanitities, which will be submitted by the user upon searching a city anyway
def hotel_search(dest_id, arrival_date, depart_date, guest_qty, room_qty):
    # dates must be in YYYY-MM-DD format 

    url = "https://apidojo-booking-v1.p.rapidapi.com/properties/v2/list"
    querystring = {"offset": "0", "arrival_date": arrival_date, "departure_date": depart_date, "guest_qty": guest_qty, "dest_ids": dest_id,"room_qty": room_qty, "search_type": "city"} # API can take dest_id as either string or int
    
    response = requests.get(url, headers=headers, params=querystring)
    hotels = response.json()

    hotel_dict = {}
    for h in hotels['result']:
        if 'hotel_name' in h:
            hotel_id = h['hotel_id'] # int
            image = h['main_photo_url'] # images provided are very low quality, likely not usable but wanted to document it

            h_details = {'name': h['hotel_name'], # name of hotel
                         'cost_before_extra': round(h['composite_price_breakdown']['gross_amount']['value'], 2), # cost of cheapest hotel room at that hotel before taxes and fees
                         'total_cost': round(h['composite_price_breakdown']['all_inclusive_amount']['value'], 2) # total cost of cheapest room
                        }
            hotel_dict[hotel_id] = h_details

    return hotel_dict # returns a dictionary with keys as the hotel_id of each hotel returned by the API, contents include hotel name and the hote's cheapest room cost

# Same parameters as hotel_search but this time it uses hotel_id to search for available rooms within hotels
# Take a hotel_id from one of the keys of the return from hotel_search
def room_search(hotel_id, arrival_date, depart_date, guest_qty, room_qty):
    # dates must be in YYYY-MM-DD format

    url = "https://apidojo-booking-v1.p.rapidapi.com/properties/v2/get-rooms"
    querystring = {"hotel_id": hotel_id, "arrival_date": arrival_date, "departure_date": depart_date, "rec_guest_qty": guest_qty, "rec_room_qty": room_qty} # API can take hotel_id as either string or int

    response = requests.get(url, headers=headers, params=querystring)
    json = response.json()
    roomInfo = json[0]['rooms'] # list of rooms with photo urls and advertised room highlights, keys are strings so conversion may be necessary if ids are given as int in other parts of the API
    block_of_rooms = json[0]['block']  # list of rooms with price data

    rooms = {}
    for r in block_of_rooms:
        if (r['nr_adults'] >= int(guest_qty)): # filter out the rooms that can't fit the selected # of adults
            room_id = r['room_id'] # int
            price_breakdown = r['product_price_breakdown'] # dictionary of price info
            taxes = price_breakdown['items'] # 0 index is likely tax, 1 index is likely tourism fee

            extra = {}
            for t in taxes:
                key = t['details'] # for extra charges that are percentages, t['details'] has all the charge details
                if (key == None): # if key/t['details'] is None, it should be a per night charge so we can concatenate the details to use as the key
                    if t['base']['kind'] == 'per_night':
                        key = '$' + str(t['base']['base_amount']) + ' per night ' + t['name']
                extra[key] = round(t['item_amount']['value'], 2)
            extra['total_extra'] = round(price_breakdown['excluded_amount']['value'], 2)

            highlights = [] # Room features
            facilities = [] # additional amenities
            for hl in roomInfo[str(room_id)]['highlights']:
                highlights.append(hl['translated_name'])
            for fc in roomInfo[str(room_id)]['facilities']:
                facilities.append(fc['name'])
            
            room_details = {'config': r['name_without_policy'], # room configuration (won't specify if cancellable)
                            'cancel_by': r['refundable_until'], # if booking is cancellable, a date will be provided
                            'recommended_for': r['nr_adults'], # number of adults/people recommended for the room
                            'size_ft2': round(r['room_surface_in_feet2'], 0), # room size
                            'cost_before_extra': round(price_breakdown['net_amount']['value'], 2), # cost of booking before taxes and fees
                            'extra': extra, # dictionary of the taxes and fees, key is the tax/fee description, value is the amount
                            'total_cost': round(price_breakdown['all_inclusive_amount']['value'], 2), # total cost of booking, should add up to the sum of cost_before_extra and extra
                            'image': roomInfo[str(room_id)]['photos'][0]['url_original'], # single image of room, somewhat good quality
                            'highlights': highlights, # list of advertised room features
                            'facilities': facilities, # list of advertised 
                            'breakfast': r['mealplan'] # string of whether breakfast is included or costs money
                            }
            rooms[room_id] = room_details # add dictionary of room details to a dictionary with the key as the room_id

    return rooms  # return dictionary of bookable rooms for the intended dates

# Example calls, print returns
print(hotel_search("20015742", "2024-12-18", "2024-12-20", "2", "1")) # 20015742 is San Jose's dest_id
print(room_search("742931", "2024-12-18", "2024-12-20", "3", "1")) # 742931 is the Hyatt Downtown San Jose hotel_id
