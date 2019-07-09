// Create span tag for a star
function createSpanRating (rating) {
  var spanTag = document.createElement("span");
  spanTag.className = rating;
  spanTag.innerHTML = "☆";

  return spanTag;
}

// Create img tag
function createImg (photo) {
  var imgTag = document.createElement("img");
  imgTag.src = photo;
  imgTag.className="d-block w-100";

  return imgTag;
}

// Create div tag for images
function createDivImg (active) {
  var divTag = document.createElement("div");
  divTag.className="carousel-item"+active;

  return divTag;
}

// Create a tag and h5 tag for item name
function create_link_name(url, name) {

  var item_name = document.getElementById('item_name');

  while (item_name.firstChild) {
    item_name.removeChild(item_name.firstChild);
  };

  var aTag = document.createElement("a");
  aTag.href = url;
  aTag.style = "text-decoration:none;";

  var h5Tag = document.createElement("h5");
  h5Tag.className = "font_bold";
  h5Tag.textContent = name;
  
  aTag.appendChild(h5Tag);
  item_name.appendChild(aTag);
}


// Populate photos under the carousel
function populatePhotos(photos) {

  var item_photos = document.getElementById('item_photos');

  while (item_photos.firstChild) {
    item_photos.removeChild(item_photos.firstChild);
  };

  for (var i=0; i<photos.length; i++) {
    if (i===0) {
      var a = " active";
    }
    else {
      var a = "";
    };

    photo = photos[i].replace(/"/g,"");
    var custom_photo = createImg(photo);
    var custom_div = createDivImg(a);
    custom_div.appendChild(custom_photo);
    console.log(custom_div);
    item_photos.appendChild(custom_div);
  };
}

// Populating the ratings in stars and review numbers
function populateRatings(rating, review_num) {
  var item_review_num = document.getElementById('item_review_num');
  var item_rating = document.getElementById('item_rating');

  var rating_star = "star-icon full";
  var rating = parseFloat(rating);
  while (item_rating.firstChild) {
    item_rating.removeChild(item_rating.firstChild);
  }

  if (review_num != ""){
    for (var i=0; i<5; i++) {
      if (rating<1) {
        if (rating % 1 === 0){
          rating_star = "star-icon"
        } else{
          rating_star = "star-icon half"
        };
      };
      rating-=1;
      var custom_rating = createSpanRating(rating_star);
      item_rating.appendChild(custom_rating);
    };
    item_review_num.textContent = review_num;
  };
}

// Populate the contents on the side bar when clicked on a marker
function markerOnClick(e) {

  // Grab the placeholders for the side bars by id
  var item_category = document.getElementById('item_category');
  var item_address = document.getElementById('item_address');
  var item_about = document.getElementById('item_about');
  var item_price = document.getElementById('item_price');

  // Populate the contents on the side bar
  item_category.textContent = this.options.cat;
  create_link_name(this.options.url, this.options.name);
  item_address.textContent = this.options.address;
  item_price.textContent = this.options.price;
  item_about.textContent = this.options.des;

  // Start anlyzing the rating and convert them into stars before populating
  populateRatings(this.options.rating, this.options.review_num);
  
  // Add the photos into a carousel format before populating the page

  console.log(this.options.photos);
  populatePhotos(this.options.photos);
}

// Look for the current city

var currentLocation = document.URL;
var currentCity = (currentLocation.split("/"))[4];
var url = "/maps/"+ currentCity;

d3.json(url, function(city_data) {

  // Adding tile layer to the map
  var openStreet = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
  });
  
  var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
  });

  // Grab the contents of the city page by ID

  var city_name = document.getElementById('city_name');
  var city_category = document.getElementById('city_category');
  var city_about = document.getElementById('city_about');

  // Populate with basic information about the city
  
  city_name.textContent = city_data[0].city_name;
  city_category.textContent = city_data[0].city_category;
  city_about.textContent = city_data[0].city_about;

  // Create a new marker cluster group
  var attr_markers = L.markerClusterGroup();
  var bnb_markers = L.markerClusterGroup();
  var hotel_markers = L.markerClusterGroup();

  // Create layers for attraction, airbnb, and hotel
  var attractions = L.geoJson();
  var airbnbs = L.geoJson();
  var hotels = L.geoJson();

  // Create icon variables to add image markers
  var bnbIcon = L.icon({
    iconUrl: 'https://img.icons8.com/color/420/airbnb.png',
    iconSize: [38, 38],
    iconAnchor: [22, 50]
});
  var attrIcon = L.icon({
    iconUrl: 'https://static.thenounproject.com/png/143398-200.png',
    iconSize: [38, 38],
    iconAnchor: [22, 50]
});
  var hoteruIcon = L.icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/building-vol-9/512/3-512.png',
    iconSize: [38, 38],
    iconAnchor: [22, 50]
});

var city_photos = [];

  // Loop through data for attractions
  for (var i in attraction) {
    for (var city in attraction[i]) {
      var c_photos = [];
      for (var attr in attraction[i][city]) {
    
      // Set the data location property to a variable
      var attr_lat = parseFloat(attraction[i][city][attr]["attraction_lat_lon"][0]);
      var attr_lon = parseFloat(attraction[i][city][attr]["attraction_lat_lon"][1]);
      var attr_name = attraction[i][city][attr]["attraction_name"];
      var attr_cat = attraction[i][city][attr]["attraction_category"][0];
      var attr_des = attraction[i][city][attr]["attraction_about"];
      var attr_address = attraction[i][city][attr]["attraction_address"];
      var attr_rating = attraction[i][city][attr]["attraction_rating"];
      var attr_review_num = attraction[i][city][attr]["attraction_review_num"];
      var attr_photos = attraction[i][city][attr]["attraction_photos"];
      var attr_url = attraction[i][city][attr]["attraction_url"];
      if (city === currentCity) {
        city_photos.push(attraction[i][city][attr]["attraction_photos"][Math.floor(Math.random() * 4)]);
      };
      // Add a new marker to the cluster group and bind a pop-up
      var spot = L.marker([attr_lat, attr_lon],
                  {
                    icon: attrIcon,
                    cat: attr_cat,
                    name: attr_name,
                    des: attr_des,
                    address: attr_address,
                    price: "",
                    rating: attr_rating,
                    review_num: attr_review_num,
                    photos: attr_photos,
                    url: attr_url
                  }).bindTooltip(attr_name)
                  .openTooltip()
                  .on('click', markerOnClick);
      attr_markers.addLayer(spot);
      attr_markers.addLayer(airbnbs)
      }
    }
  }

  // Populate the city photos on the main page
  populatePhotos(city_photos);

  // Loop for airbnb data
  for (var i in airbnb) {
    for (var city in airbnb[i]) {
      for (var bnb in airbnb[i][city]) {

      if (airbnb[i][city][bnb]["listing_lat_lon"] == undefined) {
        continue;
      }
      var bnb_lat = parseFloat(airbnb[i][city][bnb]["listing_lat_lon"][0]);
      var bnb_lon = parseFloat(airbnb[i][city][bnb]["listing_lat_lon"][1]);
      var bnb_name = airbnb[i][city][bnb]["listing_name"];
      var bnb_des = airbnb[i][city][bnb]["listing_about"];
      var bnb_address = airbnb[i][city][bnb]["listing_address"];
      var bnb_price = airbnb[i][city][bnb]["listing_price"];
      var bnb_rating = airbnb[i][city][bnb]["listing_rating"];
      var bnb_review_num = airbnb[i][city][bnb]["listing_review_num"];
      var bnb_photos = airbnb[i][city][bnb]["listing_photos"]
      var bnb_url = airbnb[i][city][bnb]["listing_url"]


      // Add a new marker to the cluster group and bind a pop-up
      var bnb = L.marker([bnb_lat, bnb_lon],
                  {
                    icon: bnbIcon,
                    cat: "Air B&B",
                    name: bnb_name,
                    des: bnb_des,
                    address: bnb_address,
                    price: bnb_price,
                    rating: bnb_rating,
                    review_num: bnb_review_num + " reviews",
                    photos: bnb_photos,
                    url: bnb_url
                  }
                  ).bindTooltip(bnb_name)
                  .openTooltip()
                  .on('click', markerOnClick);
      bnb_markers.addLayer(bnb); 
      bnb_markers.addLayer(airbnbs);
      }
    }
  }

for (var i in hotel) {
  for (var city in hotel[i]) {
    for (var hoteru in hotel[i][city]) {

    var hoteru_lat = parseFloat(hotel[i][city][hoteru]["listing_lat_lon"][0]);
    var hoteru_lon = parseFloat(hotel[i][city][hoteru]["listing_lat_lon"][1]);
    var hoteru_name = hotel[i][city][hoteru]["listing_name"];
    var hoteru_des = hotel[i][city][hoteru]["listing_about"];
    var hoteru_address = hotel[i][city][hoteru]["listing_address"];
    var hoteru_price = hotel[i][city][hoteru]["listing_price"];
    var hoteru_rating = hotel[i][city][hoteru]["listing_rating"];
    var hoteru_review_num = hotel[i][city][hoteru]["listing_review_num"];
    var hoteru_photos = hotel[i][city][hoteru]["listing_photos"]
    var hoteru_url = hotel[i][city][hoteru]["listing_url"]


    // Add a new marker to the cluster group and bind a pop-up
    var hoteru = L.marker([hoteru_lat, hoteru_lon],
                {
                  icon: hoteruIcon,
                  cat: "Hotels",
                  name: hoteru_name,
                  des: hoteru_des,
                  address: hoteru_address,
                  price: "$"+hoteru_price,
                  rating: hoteru_rating,
                  review_num: hoteru_review_num + " reviews",
                  photos: hoteru_photos,
                  url: hoteru_url
                }
                ).bindTooltip(hoteru_name)
                .openTooltip()
                .on('click', markerOnClick);
    hotel_markers.addLayer(hoteru); 
    hotel_markers.addLayer(hotels);
    }
  }
}

    var myMap = L.map("map", {
      center: city_data[0].lat_lon,
      zoom: 12,
      layers: [openStreet, cartoLight, attr_markers, bnb_markers, hotel_markers]
    });
  
    var baseLayers = {
        "Light Theme": cartoLight,
        "Street Map": openStreet
      };

    var landmarkLayers = {
        "Attractions": attr_markers,
        "AirBnB": bnb_markers,
        "Hotels": hotel_markers
      };

    // Add layer control 
    L.control.layers(baseLayers, landmarkLayers, {collapsed:false}).addTo(myMap);
})
