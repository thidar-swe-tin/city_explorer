#Import Dependencies
import os
import pandas as pd
import numpy as np
from random import sample
from pandas import DataFrame

# import pymongo
# from pymongo import MongoClient
from flask_pymongo import PyMongo
from flask import Flask, jsonify, render_template


app = Flask(__name__)

# Connection for Heroku - Will work locally
app.config["MONGO_DBNAME"] = 'city_explorer'
app.config["MONGO_URI"] = "mongodb+srv://thidar:mongoexplorer2019@city-explorer-ocvlm.mongodb.net/city_explorer?retryWrites=true"
mongo = PyMongo(app)
db = mongo.db

# Setup Cloud Mongo Atlas Connection
# client = MongoClient("mongodb+srv://thidar:mongoexplorer2019@city-explorer-ocvlm.mongodb.net/test?retryWrites=true")
# db = client.city_explorer

# Setup local connection
# connect = 'mongodb://localhost:27017'
# client = pymongo.MongoClient(connect)

# db = client.tpa_attractions_db
c_attractions = db.attractions
c_attraction_details = db.attraction_details
c_city_seasons_photos = db.city_seasons_photos
c_city_info = db.city_info

# Load city data
cities = [{"city": "nyc", "city_name": "New York", "lat_lon": [40.7128,-74.0060]},
            {"city": "london", "city_name": "London", "lat_lon": [51.5074,-0.1278]},
            {"city": "paris", "city_name": "Paris", "lat_lon": [48.8566,2.3522]},
            {"city": "seoul", "city_name": "Seoul", "lat_lon": [37.5665,126.9780]},
            {"city": "tokyo", "city_name": "Tokyo", "lat_lon": [35.6762,139.6503]},
            {"city": "istanbul", "city_name": "Istanbul", "lat_lon": [41.0082,28.9784]},
            {"city": "dubai", "city_name": "Dubai", "lat_lon": [25.2048,55.2708]},
            {"city": "singapore", "city_name": "Singapore", "lat_lon": [1.3521,103.8198]},
            {"city": "kl", "city_name": "Kuala Lumpur", "lat_lon": [3.1390,101.6869]},
            {"city": "bangkok", "city_name": "Bangkok", "lat_lon": [13.7563,100.5018]}]

cities_df = pd.DataFrame(cities)
# Retrieve city details from MongoDB
city_details = list(c_city_info.find({}, {'_id': 0}))
city_df = pd.DataFrame(city_details)
city_details_df = pd.merge(cities_df, city_df, on='city_name')

# Load data - seasons_photos_df
seasons_photos_df = pd.DataFrame(columns=["city", "season","attraction","photo"])
seasons_photos = db.city_seasons_photos.find({}, {'_id': 0})
for photos in seasons_photos:
    try:
        key = list(photos.keys())[0]
        temp = key.split(" ")
        season = temp[-1]
        city = temp[-3]
        temp = temp[:-3]
        s = " "
        attraction = s.join(temp)
        value = list(photos.values())[0]
        for photo in value:
            seasons_photos_df = seasons_photos_df.append({
                "city": city,
                "season":  season,
                "attraction": attraction,
                "photo": photo
                  }, ignore_index=True)
    except:
        print("Empty") 
seasons_photos_df = seasons_photos_df.drop_duplicates(subset=['photo'])
seasons_photos_df['photo'] = seasons_photos_df['photo'].str.replace("%25","%")
seasons_photos_df['photo'] = seasons_photos_df['photo'].str.replace("%2B"," ")

########### RENDER HTML routes #############
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/seasons")
def seasons():
    """Return the homepage."""
    return updatePhoto("spring")

@app.route("/map")
def map():
    """Return the homepage."""
    return render_template("map.html")

@app.route("/comparison")
def work():
    """Return the homepage."""
    return render_template("comparison.html")

@app.route("/team")
def team():
    """Return the homepage."""
    return render_template("team.html")

########### SEASONS routes #############
@app.route("/seasons/<season>")
def updatePhoto(season):
    data = []
    seasonData = seasons_photos_df.loc[seasons_photos_df['season'] == season]
    # cityGroup = seasonData.groupby('city')
    for city in cities:
        samples = DataFrame.sample(seasonData.loc[seasonData['city'] == city['city']], n=7).reset_index()
        urls = []
        a_names = []
        for index, row in samples.iterrows():
            urls.append(row.photo)
            a_names.append(row.attraction)
        data.append({'city' : city['city_name'], 'city_abbr' : city['city'], 'season' : samples['season'][0], 'attractions' : a_names, 'urls' : urls})
    return render_template("seasons.html", photos=data)

@app.route("/seasonss/<season>")
def test(season):
    data = []
    seasonData = seasons_photos_df.loc[seasons_photos_df['season'] == season]
    for city in cities:
        samples = DataFrame.sample(seasonData.loc[seasonData['city'] == city['city']], n=7).reset_index()
        urls = []
        a_names = []
        for row in samples.itertuples(index=False, name='Pandas'):
            urls.append(row.photo)
            a_names.append(row.attraction)
        data.append({'city' : city['city_name'], 'city_abbr' : city['city'], 'season' : samples['season'][0], 'attractions' : a_names, 'urls' : urls})
    return jsonify(data)

########### MAP routes #############
@app.route("/map/attractions")
def getAttractions():
    attractionsList = list(db.attraction_details.find({}, {'_id': 0}))
    print(attractionsList)
    return jsonify(attractionsList)

@app.route("/map/airbnb")
def getAirbnb():
    return jsonify(list(db.city_airbnb.find({}, {'_id': 0})))

@app.route("/map/airbnb/<city>")
def getAirbnbCity(city):
    # list(db.city_airbnb.find({}, {'_id': 0, 'bangkok': 1}))
    return jsonify(list(db.city_airbnb.find({}, {'_id': 0, city: 1})))

@app.route("/map/hotels")
def getHotels():
   return jsonify(list(db.city_tripadvisor.find({}, {'_id': 0})))

@app.route("/map/hotels/<city>")
def getHotelscity(city):
   return jsonify(list(db.city_tripadvisor.find({}, {'_id': 0, city: 1})))

@app.route("/map/<city>")
def getCity(city):
    for c in cities:
         if c['city'] == city:
             data = city_details_df.loc[city_details_df['city']==city]
    return render_template("map.html", location=data.to_dict(orient = 'records'))

@app.route("/maps/<city>")
def getCity1(city):
    for c in cities:
         if c['city'] == city:
             data = city_details_df.loc[city_details_df['city']==city]
    return jsonify(data.to_dict(orient = 'records'))

if __name__ == '__main__':
    #app.run(debug=False)
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host='0.0.0.0', port=port)