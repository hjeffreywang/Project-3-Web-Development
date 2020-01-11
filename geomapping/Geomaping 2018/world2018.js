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
    name: "#1.Finland",
    location: [61.924110, 25.748152],
    happiness_score: 7.632
  },
  {
    name: "#2.Norway",
    location: [60.472023, 8.468946],
    happiness_score: 7.594
  },
  {
    name: "#3.Denmark",
    location: [56.263920, 9.501785],
    happiness_score: 7.555
  },
  {
    name: "#4.Iceland",
    location: [64.963051, -19.020836],
    happiness_score: 7.495
  },
  {
    name: "#5.Switzerland",
    location: [46.818188, 8.227512],
    happiness_score: 7.487
  },
  {
    name: "#6.Netherlands",
    location: [52.132633, 5.291266],
    happiness_score: 7.441
  },
  {
    name: "#7.Canada",
    location: [56.130367, -106.346771],
    happiness_score: 7.328
  },
  {
    name: "#8.New Zealand",
    location: [-40.900558, 174.885971],
    happiness_score: 7.324
  },

  {
    name: "#9.Sweden",
    location: [60.128162, 18.643501],
    happiness_score: 7.314
  },
  {
    name: "#10.Austria",
    location: [47.516232, 14.550072],
    happiness_score: 7.272
  },
  //last 10
  {
    name: "#147.Malawi",
    location: [-13.254308, 34.301525],
    happiness_score: 3.587
  },
  {
    name: "#148.Haiti",
    location: [18.971188, -72.285217],
    happiness_score: 3.582
  },
  {
    name: "#149.Liberia",
    location: [6.428055, -9.429499],
    happiness_score: 3.495
  },
  {
    name: "#150.Syria",
    location: [34.802074, 38.996815],
    happiness_score: 3.462
  },
  {
    name: "#151.Rwanda",
    location: [-1.940278, 29.873888],
    happiness_score: 3.408
  },
  {
    name: "#152.Yemen",
    location: [15.552727, 48.516388],
    happiness_score: 3.355
  },
  {
    name: "#153.Tanzania",
    location: [-6.369028, 34.888821],
    happiness_score: 3.303
  },
  {
    name: "#154.South Sudan",
    location: [6.876992, 31.306978],
    happiness_score: 3.254
  },
  {
    name: "#155.Central African Republic",
    location: [6.611111, 20.939444],
    happiness_score: 3.083
  },
  {
    name: "#156.Burundi",
    location: [-3.373056, 29.918886],
    happiness_score: 2.905
  } 

];

// Loop through the countries array and create one marker for each country object
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
