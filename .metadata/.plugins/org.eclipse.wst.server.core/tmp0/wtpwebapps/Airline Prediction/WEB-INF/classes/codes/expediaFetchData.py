import json

import pymysql as pymysql
import requests
from lxml import html
from collections import OrderedDict
import argparse
import csv
import flask
from datetime import datetime,date,timedelta
# Connect to the database
connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='',
                                 db='1232',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)

def parse(source, destination, traveldate):
    flightline = 0
    Airflightline = 0
    Jetflightline = 0
    d = datetime.strptime(traveldate, '%m/%d/%Y')
    travel2date=d.strftime('%Y-%m-%d')
    #print(traveldate)
    print(source)
    print(destination)
    print(traveldate)
   
    for i in range(5):
        try:
            url = "https://www.expedia.com/Flights-Search?trip=oneway&leg1=from:{0},to:{1},departure:{2}TANYT&passengers=adults:1,children:0,seniors:0,infantinlap:Y&options=cabinclass%3Aeconomy&mode=search&origref=www.expedia.com".format(
                source, destination, traveldate)

            response = requests.get(url)

            parser = html.fromstring(response.text)

            json_data_xpath = parser.xpath("//script[@id='cachedResultsJson']//text()")
            raw_json = json.loads(json_data_xpath[0])

            flight_data = json.loads(raw_json["content"])

            flight_info = OrderedDict()
            lists = []

            for i in flight_data['legs'].keys():

                total_distance = flight_data['legs'][i]["formattedDistance"]
                exact_price = flight_data['legs'][i]['price']['totalPriceAsDecimal']
                #
                # departure_location_airport = flight_data['legs'][i]['departureAirport']['longName']
                departure_location_city = flight_data['legs'][i]['departureLocation']['airportCity']
                departure_location_airport_code = flight_data['legs'][i]['departureLocation']['airportCode']
                #
                # arrival_location_airport = flight_data['legs'][i]['arrivalAirport']['longName']
                arrival_location_airport_code = flight_data['legs'][i]['arrivalLocation']['airportCode']
                arrival_location_city = flight_data['legs'][i]['arrivalLocation']['airportCity']
                airline_name = flight_data['legs'][i]['carrierSummary']['airlineName']
                #
                no_of_stops = flight_data['legs'][i]["stops"]
                flight_duration = flight_data['legs'][i]['duration']
                flight_hour = flight_duration['hours']
                flight_minutes = flight_duration['minutes']
                flight_days = flight_duration['numOfDays']
                #
                if no_of_stops == 0:
                    stop = 0
                else:
                    stop = no_of_stops
                #
                total_flight_duration = "{0} days {1} hours {2} minutes".format(flight_days, flight_hour,
                                                                                flight_minutes)
                # departure = departure_location_airport+", "+departure_location_city
                # arrival = arrival_location_airport+", "+arrival_location_city
                departure = departure_location_city
                arrival = arrival_location_city
                carrier = flight_data['legs'][i]['timeline'][0]['carrier']
                plane = carrier['plane']
                plane_code = carrier['planeCode']
                formatted_price = "{0:.2f}".format(exact_price)
                #
                if not airline_name:
                    airline_name = carrier['operatedBy']
                #
                timings = []
                for timeline in flight_data['legs'][i]['timeline']:
                    if 'departureAirport' in timeline.keys():
                        departure_airport = timeline['departureAirport']['longName']
                        departure_time = timeline['departureTime']['time']
                        arrival_airport = timeline['arrivalAirport']['longName']
                        arrival_time = timeline['arrivalTime']['time']
                        flight_timing = {
                            'departure_airport': departure_airport,
                            'departure_time': departure_time,
                            'arrival_airport': arrival_airport,
                            'arrival_time': arrival_time
                        }
                        timings.append(flight_timing)

                flight_info = {'stops': stop,
                               'ticket price': formatted_price,
                               'departure': departure,
                               'arrival': arrival,
                               'flight duration': total_flight_duration,
                               'airline': airline_name,
                               'plane': plane,
                               'timings': timings,
                               'plane code': plane_code
                               }

                if flight_info.get("airline") == 'Air India':
                    
                        # print(flightline)
                        stops=flight_info.get("stops")
                        ticketPrice=flight_info.get("ticket price")
                        departure=flight_info.get("departure")
                        arrival=flight_info.get("arrival")
                        flight_duration=flight_info.get("flight duration")
                        airline=flight_info.get("airline")
                        plane=flight_info.get("plane")
                        timings=flight_info.get("timings")
                        plane_code=flight_info.get("plane code")
                        departure_time=timings[0]['departure_time']
                        arrival_time=timings[0]['arrival_time']

                        try:
                            with connection.cursor() as cursor:
                                sql = "INSERT INTO flightdataset (departureDate, stops, ticket_price, departure, arrival, flight_duration, airline, plane, departure_time,arrival_time, plane_code) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
                                cursor.execute(sql, (travel2date,stops,ticketPrice,departure,arrival,flight_duration,airline,plane,departure_time,arrival_time,plane_code))
                                connection.commit()
                        except Exception as e:
                            print(e)

                        lists.append(flight_info)
                        

                elif flight_info.get("airline") == 'Jet Airways':
                    
                        # print(flightline)
                        stops=flight_info.get("stops")
                        ticketPrice=flight_info.get("ticket price")
                        departure=flight_info.get("departure")
                        arrival=flight_info.get("arrival")
                        flight_duration=flight_info.get("flight duration")
                        airline=flight_info.get("airline")
                        plane=flight_info.get("plane")
                        timings=flight_info.get("timings")
                        plane_code=flight_info.get("plane code")
                        departure_time=timings[0]['departure_time']
                        arrival_time=timings[0]['arrival_time']

                        try:
                            with connection.cursor() as cursor:
                                sql = "INSERT INTO flightdataset (departureDate,stops, ticket_price, departure, arrival, flight_duration, airline, plane, departure_time, arrival_time, plane_code) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
                                cursor.execute(sql, (travel2date,stops,ticketPrice,departure,arrival,flight_duration,airline,plane,departure_time,arrival_time,plane_code))
                                connection.commit()
                        except Exception as e:
                            print(e)

                        lists.append(flight_info)
                        

                    
                else:
                    continue
            sortedlist = sorted(lists, key=lambda k: k['ticket price'], reverse=False)
            # return flight_info
            sortedlist = json.dumps(sortedlist)
            return sortedlist


        except ValueError:
            print("Rerying...")

    return {"error": "failed to process the page", }


if __name__ == "__main__":
    try:

        argparser = argparse.ArgumentParser()
        argparser.add_argument('source', help='Source airport code')
        argparser.add_argument('destination', help='Destination airport code')
        argparser.add_argument('date', help='MM/DD/YYYY')
        argparser.add_argument('days', help='Days to departure')

        args = argparser.parse_args()
        source = args.source
        destination = args.destination
        traveldate = args.date
        days=args.days
        print(traveldate)
        print("in expediaFetchData.py")
        print("Fetching flight details")
        currentDate1=date.today()
        currentDate=str(currentDate1)
        

        d = datetime.strptime(currentDate, '%Y-%m-%d')
        currentDate=d.strftime('%m/%d/%Y')
        #print(currentDate)
        
        
        #print('current Date ',currentDate)
        for i in range(0,int(days)):
            travelDate=date.today()+timedelta(days=i)
            d1 = datetime.strptime(str(travelDate), '%Y-%m-%d')
            traveldate=d1.strftime('%m/%d/%Y')
            scraped_data = parse(source, destination, traveldate)
            print("Writing data to output file")
        #    print(scraped_data)
        with open('%s-%s-flight-results.json' % (source, destination), 'w') as fp:
            json.dump(scraped_data, fp, indent=4)
    except Exception as e:
        print(e.args)
