// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center at the San Francisco airport.~ note geoson coord are (longitude, latiude)
let map = L.map('mapid').setView([37.5, -122.5], 10);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

//Syntax for the pointToLayer callback function
    //arguments are data + callback function
    //pointToLayer calls function passing 2 GeoJSON features (feature, latlng)
    // marker is added for each feature with coordinates in the pointToLayer function
//L.geoJson(data, {
//    pointToLayer: function(feature, latlng) {
//      return L.marker(latlng);
//     }
//});

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data.~ Combing the 2 doesnt change the appearance of the map but the console. Can now see
    //feature is JS object: geometry +  properties
//L.geoJson(sanFranAirport, {
//    // We turn each feature into a marker on the map.
//    pointToLayer: function(feature, latlng) {
//      console.log(feature);
//      return L.marker(latlng)
//      .bindPopup("<h2>" + feature.properties.city + "</h2>")
//;
//    }

//}).addTo(map);

//Syntax for the onEachFeature callback function
    // arguments are data + onEachFeature
    // onEachFeature calls anonymous function passing (feature, layer)
//L.geoJson(data, {
//    onEachFeature: function(feature, layer) {
//      layer.bindPopup();
//     }
//});

// Grabbing our GeoJSON data.
    //This returns JS methods that can be accessed and used including JS object: geometry +  properties
L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup();
    }
}).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

