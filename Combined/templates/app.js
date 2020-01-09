var svgWidth = 1100;
var svgHeight = 700;

var margin = {
  top: 30,
  right: 40,
  bottom: 110,
  left: 70
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "Socialsupport";

// function used for updating x-scale var upon click on axis label
function xScale(happyData, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(happyData, d => d[chosenXAxis]),
      d3.max(happyData, d => d[chosenXAxis])
    ])
    .range([0, width]);

  return xLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "Freedomtomakelifechoices") {
    var label = "Freedom";
  }
  else if (chosenXAxis === "GDPpercapita") {
    var label = "GDP per Capita";
  }
  else if (chosenXAxis === "Healthylifeexpectancy") {
    var label = "Healthy Life Expectancy";
  }    
  else if (chosenXAxis === "Generosity") {
    var label = "Generosity";
  }
  else if (chosenXAxis === "Perceptionsofcorruption") {
    var label = "Perceptions of Corruption";
  }  
  else {
    var label = "Social Support";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.Countryorregion}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the json file and execute everything below
d3.json("2018.json").then(function(happyData, err) {
  if (err) throw err;

  // parse data
  happyData.forEach(function(data) {
    data.Overallrank = +data.Overallrank;
    data.Socialsupport = +data.Socialsupport;
    data.GDPpercapita = +data.GDPpercapita;
    data.Healthylifeexpectancy = +data.Healthylifeexpectancy;
    data.Freedomtomakelifechoices = +data.Freedomtomakelifechoices;
    data.Generosity = +data.Generosity;
    data.Perceptionsofcorruption = +data.Perceptionsofcorruption;
  });

  // xLinearScale function 
  var xLinearScale = xScale(happyData, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(happyData, d => d.Overallrank)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(happyData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.Overallrank))
    .attr("r", 12)
    .attr("fill", "green")
    .attr("opacity", ".7");

  // Create group for  multiple x- axis labels
  // These are the happiness factors
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);



  var ssLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 10)
    .attr("value", "Socialsupport") // value to grab for event listener
    .classed("active", true)
    .text("Social Support");

  var gdpLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 25)
    .attr("value", "GDPpercapita") // value to grab for event listener
    .classed("active", true)
    .text("GDP per Capita");

  var healthyLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "Healthylifeexpectancy") // value to grab for event listener
    .classed("active", true)
    .text("Healthy Life Expectancy");

  var freedomLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 55)
    .attr("value", "Freedomtomakelifechoices") // value to grab for event listener
    .classed("inactive", true)
    .text("Freedom to make life choices");

  var genLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 70)
    .attr("value", "Generosity") // value to grab for event listener
    .classed("active", true)
    .text("Generosity");

  var perceptLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 85)
    .attr("value", "Perceptionsofcorruption") // value to grab for event listener
    .classed("active", true)
    .text("Perceptions of Corruption");

  var yrLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height})`);

  var eighteenLabel = yrLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", -575)
    .attr("value", "Perceptionsofcorruption") // value to grab for event listener
    .classed("active", true)
    .text("2018 Data");

  var nineteenLabel = yrLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", -560)
    .attr("value", "Perceptionsofcorruption") // value to grab for event listener
    .classed("active", true)
    .text("2019 Data");    

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left +10)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Countries by Happiness Ranking");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(happyData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "Freedom") {
          freedomLabel
            .classed("active", true)
            .classed("inactive", false);
          ssLabel
            .classed("active", false)
            .classed("inactive", true);
          gdpLabel
            .classed("active", false)
            .classed("inactive", true);
          healthyLabel
            .classed("active", false)
            .classed("inactive", true); 
          genLabel
            .classed("active", false)
            .classed("inactive", true);
          perceptLabel
            .classed("active", false)
            .classed("inactive", true);                    
        }
        else if (chosenXAxis === "Socialsupport"){
          freedomLabel
            .classed("active", false)
            .classed("inactive", true);
          ssLabel
            .classed("active", true)
            .classed("inactive", false);
          gdpLabel
            .classed("active", false)
            .classed("inactive", true);
          healthyLabel
            .classed("active", false)
            .classed("inactive", true); 
          genLabel
            .classed("active", false)
            .classed("inactive", true);
          perceptLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "GDPpercapita"){
          freedomLabel
            .classed("active", false)
            .classed("inactive", true);
          ssLabel
            .classed("active", false)
            .classed("inactive", true);
          gdpLabel
            .classed("active", true)
            .classed("inactive", false);
          healthyLabel
            .classed("active", false)
            .classed("inactive", true); 
          genLabel
            .classed("active", false)
            .classed("inactive", true);
          perceptLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "Healthylifeexpectancy"){
          freedomLabel
            .classed("active", false)
            .classed("inactive", true);
          ssLabel
            .classed("active", false)
            .classed("inactive", true);
          gdpLabel
            .classed("active", false)
            .classed("inactive", true);
          healthyLabel
            .classed("active", true)
            .classed("inactive", false); 
          genLabel
            .classed("active", false)
            .classed("inactive", true);
          perceptLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "Generosity"){
          freedomLabel
            .classed("active", false)
            .classed("inactive", true);
          ssLabel
            .classed("active", false)
            .classed("inactive", true);
          gdpLabel
            .classed("active", false)
            .classed("inactive", true);
          healthyLabel
            .classed("active", false)
            .classed("inactive", true); 
          genLabel
            .classed("active", true)
            .classed("inactive", false);
          perceptLabel
            .classed("active", false)
            .classed("inactive", true);
        }                        
        else {
          freedomLabel
            .classed("active", false)
            .classed("inactive", true);
          ssLabel
            .classed("active", false)
            .classed("inactive", true);
          gdpLabel
            .classed("active", false)
            .classed("inactive", true);
          healthyLabel
            .classed("active", false)
            .classed("inactive", true); 
          genLabel
            .classed("active", false)
            .classed("inactive", true);
          perceptLabel
            .classed("active", true)
            .classed("inactive", false);
        }        
      }
    });
}).catch(function(error) {
  console.log(error);
});
