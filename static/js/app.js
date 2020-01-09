var aRows1 = [];
for (var i=1; i<5001; ++i) {
  aRows1.push('<tr><td>input</td><td>input</td><td>input</td><td>input</td><td>input</td></tr>');
}
var clusterize1 = new Clusterize({
  rows: aRows1,
  scrollId: 'scroll-area1',
  contentId: 'content-area1'
});

var aRows2 = [];
for (var i=1; i<5001; ++i) {
  aRows2.push('<tr><td><input></td><td><input></td><td><input></td><td><input></td><td><input></td></tr>');
}
var clusterize2 = new Clusterize({
  rows: aRows2,
  scrollId: 'scroll-area2',
  contentId: 'content-area2'
});




function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/years").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildBarCharts(firstSample);
    buildMetadata(firstSample);
    
    buildMeanCharts(firstSample);
  });
}

function buildMetadata(sample) {
    
    // @TODO: Complete the following function that builds the metadata panel

    // Use `d3.json` to fetch the metadata for a sample
    d3.json(`./metadata/${sample}`).then((metadata) => {
        // Use d3 to select the panel with id of `#sample-metadata`
        md_panel = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        md_panel.html("");

        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        Object.entries(metadata).forEach((k, v) => {
//            console.log(typeof(k))
            md_panel.append("p").text(`${k[0]}: ${k[1]}`);
        });


        
    });    
}

function buildBarCharts(sample) {
    //graphs should gemerally have this type of format
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(`./chartdata/${sample}`).then(sample_data => {
        bargraph_data = Object.entries(sample_data)
        


        //this is for inspecting the values in console 
        console.log(bargraph_data)
        console.log(Object.values(bargraph_data[7][1]))
        console.log(Object.values(bargraph_data[1][1]))
        console.log(Object.values(bargraph_data[0][1]))
        
        // building a horizontal bar chart

        // dict keys are autolabeled alphabetical order: 
        // [0]Countryorregion
        // [1] Freedomtomakelifechoices
        // [2] GDPpercapita
        // [3] Generosity
        // [4] Healthylifeexpectancy
        // [5] Overallrank
        // [6] Perceptionsofcorruption
        // [7] Score
        // [8] Socialsupport
        

        var data = [{
            type: 'bar',
            x: Object.values(bargraph_data[7][1]).slice(0,20),
            y: Object.values(bargraph_data[0][1]).slice(0,20),
            hovertext: Object.values(bargraph_data[0][1]),
            automargin: true,
            orientation: 'h',
            transforms: [{
                  type: 'sort',
                  target: 'y',
                  order: 'descending'
                        }]
        }];
       
        var layout = {
            height: 1400,
            width: 1400,
            margin:{"t": 25, "b": 0, "l": 0, "r": 0}
        };

        Plotly.newPlot('bar', data, layout);

        
    });
}

function buildMeanCharts(sample) {
    //graphs should gemerally have this type of format
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(`./avgbarchartdata/${sample}`).then(sample_data => {
        bargraph_data = Object.entries(sample_data)
        


        //this is for inspecting the values in console 
        console.log(bargraph_data)
        console.log(Object.values(bargraph_data[1][1]))
        console.log(Object.values(bargraph_data[0][1]))
        
        // building a horizontal bar chart
        

        var data2 = [{
            type: 'bar',
            x: Object.values(bargraph_data[1][1]),
            y: Object.keys(bargraph_data[0][1]),
            hovertext: Object.values(bargraph_data[0][1]),
            automargin: true,
            orientation: 'h',
            transforms: [{
                  type: 'sort',
                  target: 'x',
                  order: 'descending'
                        }]
        }];
       
        var layout2 = {
            height: 400,
            width: 400,
            margin:{"t": 25, "b": 0, "l": 0, "r": 0}
        };

        Plotly.newPlot('bar', data2, layout2);

        
    });
}


function optionChanged(newyear) {
  // Fetch new data each time a new sample is selected
  buildBarCharts(newyear);
  buildMetadata(newyear);
  buildMeanCharts(newyear);
}

// Initialize the dashboard
init();
