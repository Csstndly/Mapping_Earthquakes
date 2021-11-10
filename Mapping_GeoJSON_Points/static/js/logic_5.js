// Add console.log to check to see if our code is working.
console.log("working");



// We create the tile layer that will be the background of our map.~ With large datasets always put the tilelayer first
    //so map is loaded before the data is added
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
    //comes from the raw view url in github
let airportData = "https://raw.githubusercontent.com/Csstndly/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
    //d3.json returns a promise with then() method
    //anon function adds data parameter(references dataset)
    //pass data to l.geoJSON layer and add it to the map
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

    //~~~~~
// Create the map object with center at the San Francisco airport.~ note geoson coord are (longitude, latiude)
//let map = L.map('mapid').setView([37.5, -122.5], 10);

// Add GeoJSON data.
//let sanFranAirport =
//{"type":"FeatureCollection","features":[{
//    "type":"Feature",
//    "properties":{
//        "id":"3469",
//        "name":"San Francisco International Airport",
//        "city":"San Francisco",
//        "country":"United States",
//        "faa":"SFO",
//        "icao":"KSFO",
//        "alt":"13",
//        "tz-offset":"-8",
//        "dst":"A",
//        "tz":"America/Los_Angeles"},
//        "geometry":{
//            "type":"Point",
//            "coordinates":[-122.375,37.61899948120117]}}
//]};

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
//L.geoJson(sanFranAirport, {
//    // We turn each feature into a marker on the map.
//    onEachFeature: function(feature, layer) {
//      console.log(layer);
//      layer.bindPopup();
//    }
//}).addTo(map);


