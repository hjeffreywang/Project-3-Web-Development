// Create a map object
var myMap = L.map("map", {
  center: [47.516232, 14.550072],
  zoom: 2.3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Country data
var countries = [

  {
    name: "Finland",
    location: [61.924110, 25.748152],
    happiness_score: 7.769
  },
  {
    name: "Denmark",
    location: [56.263920, 9.501785],
    happiness_score: 7.600
  },
  {
    name: "Norway",
    location: [60.472023, 8.468946],
    happiness_score: 7.554
  },
  {
    name: "Iceland",
    location: [64.963051, -19.020836],
    happiness_score: 7.494
  },
  {
    name: "Netherlands",
    location: [52.132633, 5.291266],
    happiness_score: 7.488
  },
  {
    name: "Switzerland",
    location: [46.818188, 8.227512],
    happiness_score: 7.480
  },
  {
    name: "Sweden",
    location: [60.128162, 18.643501],
    happiness_score: 7.343
  },
  {
    name: "New Zealand",
    location: [-40.900558, 174.885971],
    happiness_score: 7.307
  },
  {
    name: "Canada",
    location: [56.130367, -106.346771],
    happiness_score: 7.278
  },
  {
    name: "Austria",
    location: [47.516232, 14.550072],
    happiness_score: 7.246
  },
  {
    name: "Haiti",
    location: [18.971188, -72.285217],
    happiness_score: 3.597
  },
  {
    name: "Botswana",
    location: [-22.328474, 24.684866],
    happiness_score: 3.488
  },
  {
    name: "Syria",
    location: [34.802074, 38.996815],
    happiness_score: 3.462
  },
  {
    name: "Malawi",
    location: [-13.254308, 34.301525],
    happiness_score: 3.410
  },
  {
    name: "Yemen",
    location: [15.552727, 48.516388],
    happiness_score: 3.380
  },
  {
    name: "Rwanda",
    location: [-1.940278, 29.873888],
    happiness_score: 3.334
  },
  {
    name: "Tanzania",
    location: [-6.369028, 34.888821],
    happiness_score: 3.231
  },
  {
    name: "Afghanistan",
    location: [33.939110, 67.709953],
    happiness_score: 3.203
  },
  {
    name: "Central African Republic",
    location: [6.611111, 20.939444],
    happiness_score: 3.083
  },
  {
    name: "South Sudan",
    location: [6.876992, 31.306978],
    happiness_score: 2.853
  }

];

// Loop through the countries array and create one marker for each city object
for (var i = 0; i < countries.length; i++) {

  // Conditionals for countries points
  var color = "";
  if (countries[i].happiness_score > 5) {
    color = "Yellow";
  }
  
  else {
    color = "Red";
  }

  // Add circles to map
  L.circle(countries[i].location, {
    fillOpacity: 0.50,
    color: color,
    fillColor: color,
    // Adjust radius
    radius: countries[i].happiness_score * 30000
  }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Happiness score: " + countries[i].happiness_score + "</h3>").addTo(myMap);
}
