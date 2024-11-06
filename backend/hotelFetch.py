import requests

headers = {
    'x-rapidapi-key': "0ef4e9449emsh5d7b3e07754f32ep136219jsn83dd2526356c",
    'x-rapidapi-host': "apidojo-booking-v1.p.rapidapi.com"
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
def hotel_search(dest_id, arrival_date, depart_date, adult_qty, children_qty, room_qty, sort_by):
    # dates must be in YYYY-MM-DD format 

    url = "https://apidojo-booking-v1.p.rapidapi.com/properties/v2/list"
    querystring = {"offset": "0", "dest_ids": dest_id, "arrival_date": arrival_date, "departure_date": depart_date, "guest_qty": adult_qty, "children_qty": children_qty,"room_qty": room_qty, "search_type": "city"} # API can take dest_id as either string or int
    
    response = requests.get(url, headers=headers, params=querystring)
    hotels = response.json()

    hotel_dict = []
    for h in hotels['result']:
        if 'hotel_name' in h:
            image = h['main_photo_url'].replace("square60", "max500")
            review_score = h['review_score']
            rating = h['review_score_word']
            if h['review_score'] is None: # account for properties without a rating
                review_score = 0
                rating = 'Not Yet Rated'
            h_details = {
                        'hotel_id': h['hotel_id'], # id of hotel as int
                        'name': h['hotel_name'], # name of hotel
                        'checkin_start': h['checkin']['from'], # some hotels have start and end times for both checkin and checkout
                        'checkin_end': h['checkin']['until'],
                        'checkout_start': h['checkout']['from'],
                        'checkout_end': h['checkout']['until'],
                        'cost_before_extra': round(h['composite_price_breakdown']['gross_amount']['value'], 2), # cost of cheapest hotel room at that hotel before taxes and fees
                        'total_cost': round(h['composite_price_breakdown']['all_inclusive_amount']['value'], 2), # total cost of cheapest room
                        'has_pool': 'has_swimming_pool' in h, # if has_pool isn't in the hotel dictionary, the hotel doesn't have a pool (has_pool is always 1 if present too) 
                        'breakfast_included': 'ribbon_text' in h, # ribbon_text is only ever 'Breakfast Included', so if the key is present breakfast must be included with any booking
                        'rating': rating, # Booking.com rating description
                        'review_score': review_score, # Booking.com rating/review score
                        'longitude': h['longitude'],
                        'latitude': h['latitude'],
                        'image': image
                        }
            hotel_dict.append(h_details)

    # default sorting is by popularity
    if sort_by == 'Price (Low To High)':
        hotel_dict = sorted(hotel_dict, key=lambda x: x['cost_before_extra'], reverse=False)
    elif sort_by == 'Price (High To Low)':
        hotel_dict = sorted(hotel_dict, key=lambda x: x['cost_before_extra'], reverse=True)
    elif sort_by == 'Review Score (High To Low)':
        hotel_dict = sorted(hotel_dict, key=lambda x: x['review_score'], reverse=True)
    elif sort_by == 'Review Score (Low To High)':
        hotel_dict = sorted(hotel_dict, key=lambda x: x['review_score'], reverse=False)
    return hotel_dict # returns list of hotels in area of the input location

# Same parameters as hotel_search but this time it uses hotel_id to search for available rooms within hotels
# Take a hotel_id from the return of hotel_search()
def room_search(hotel_id, arrival_date, depart_date, adult_qty, children_qty, room_qty):
    # dates must be in YYYY-MM-DD format

    url = "https://apidojo-booking-v1.p.rapidapi.com/properties/v2/get-rooms"
    querystring = {"hotel_id": hotel_id, "arrival_date": arrival_date, "departure_date": depart_date, "rec_guest_qty": adult_qty, "rec_children_qty": children_qty, "rec_room_qty": room_qty} # API can take hotel_id as either string or int

    response = requests.get(url, headers=headers, params=querystring)
    json = response.json()
    roomInfo = json[0]['rooms'] # list of rooms with photo urls and advertised room highlights, keys are strings so conversion may be necessary if ids are given as int in other parts of the API
    block_of_rooms = json[0]['block']  # list of rooms with price data

    alreadyAdded = [] # list to keep track of room_id's already found to help avoid duplicate booking options when there is a refundable and nonrefundable price (we want nonrefundable price if there is one)
    rooms_list = []
    for r in block_of_rooms:
        if (r['nr_adults'] >= int(adult_qty)): # filter out the rooms that can't fit the selected # of adults
            room_id = r['room_id'] # int
            if room_id not in alreadyAdded: # rooms may have refundable and nonrefundable booking options with the same room_id, the nonrefundable option always come firsts so the ones after can be ignored (we charge our own cancellation charge)
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

                image = 'https://cf.bstatic.com/xdata/images/hotel/max500/322605990.jpg?k=fbc8a6d0fae9fca3010fd62853ba4efc0a4f4f5489563ae09140890e8452941b&o='
                if len(roomInfo[str(room_id)]['photos']) > 0:
                    image = roomInfo[str(room_id)]['photos'][0]['url_original'], # single image of room, somewhat good quality
                
                room_details = {
                                'room_id': room_id,
                                'config': r['name_without_policy'], # room configuration (won't specify if cancellable)
                                'recommended_for': r['nr_adults'], # number of adults/people recommended for the room
                                'size_ft2': round(r['room_surface_in_feet2'], 0) if 'room_surface_in_feet2' in r else "Not Given", # room size
                                'cost_before_extra': round(price_breakdown['net_amount']['value'], 2), # cost of booking before taxes and fees
                                'extra': extra, # dictionary of the taxes and fees, key is the tax/fee description, value is the amount
                                'total_cost': round(price_breakdown['all_inclusive_amount']['value'], 2), # total cost of booking, should add up to the sum of cost_before_extra and extra
                                'image': image,
                                'highlights': highlights, # list of advertised room features
                                'facilities': facilities, # list of advertised room facilities
                                'breakfast': r['mealplan'] # string of whether breakfast is included or costs money
                                }

                rooms_list.append(room_details)
                alreadyAdded.append(room_id)

    return rooms_list  # return list of bookable rooms for the intended dates

def hotel_search_by_id(hotel_id, arrival_date, depart_date):
    url = f"https://apidojo-booking-v1.p.rapidapi.com/properties/detail"
    query = {"hotel_id": hotel_id, "arrival_date": arrival_date, "departure_date": depart_date, "languagecode": "en-us"}

    response = requests.get(url, headers=headers, params=query)
    hotel_details = response.json()
    return hotel_details

# Example calls
# print(hotel_search("20015742", "2024-12-18", "2024-12-20", "2", "0", "1")) # 20015742 is San Jose's dest_id
# print(room_search("4975592", "2024-12-18", "2024-12-20", "2", "1", "1")) # 742931 is the Hyatt Downtown San Jose hotel_id

