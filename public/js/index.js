(function(d3) {
  "use strict";

  var data = [
    { name: "Lolita's", rating: 7.5 },
    { name: "Lucha Libre", rating: 8 },
    { name: "Puesto", rating: 9.5 },
    { name: "Rubio's", rating: 4 },
    { name: "Taco Bell", rating: 3 },
    { name: "Taco Stand", rating: 8.5 },
    { name: "Taco's, El Gordo", rating: 9 },
    { name: "Oscar's", rating: 9 },
    { name: "Rigoberto's", rating: 6 },
    { name: "Galaxy Taco", rating: 6.5 },
  ];

  // Defining the margins and chart size
  // See margin conventions for more information
  var margin = {top: 20, right: 10, bottom: 100, left: 40},
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

  var innerWidth  = width  - margin.left - margin.right;
  var innerHeight = height - margin.top  - margin.bottom;
  var barPadding = 0.2;

  // TODO: Input the proper values for the scales
  // var xScale = d3.scale.ordinal().rangeRoundBands([0, 10], 0);
  var xScale = d3.scale.ordinal().rangeRoundBands([0, innerWidth], barPadding);

  // var yScale = d3.scale.linear().range([30, 0]);    //Range -> Pixel Space
  var yScale = d3.scale.linear().range([innerHeight, 0]);

  // Define the chart
  var chart = d3
                .select(".chart")
                .append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" +  margin.left + "," + margin.right + ")");

  // Render the chart
  xScale.domain(data.map(function (d){ return d["name"]; }));

  // TODO: Fix the yScale domain to scale with any ratings range
  // yScale.domain([0, 5]);
  // yScale.domain([0, 10]);
  yScale.domain([0, d3.max(data, function(d){return d["rating"];})]);

  // Note all these values are hard coded numbers
  // TODO:
  // 1. Consume the taco data
  // 2. Update the x, y, width, and height attributes to appropriate reflect this
  chart
    .selectAll(".bar")
    // .data([10, 20, 30, 40])
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    // .attr("x", function(d, i) { return i*100; })
    .attr("x", function(d, i) { return xScale(d["name"]); })
    // .attr("x", function(d, i) { return d.name; })
    // .attr("width", 100)
    .attr("width", xScale.rangeBand())
    // .attr("y", function(d) { return 0; })
    .attr("y", function(d) { return yScale(d["rating"]); })
    // .attr("height", function(d) { return d*10; });
    .attr("height", function(d) { return innerHeight-yScale(d["rating"]); });

  // Orient the x and y axis
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis = d3.svg.axis().scale(yScale).orient("left");

  // TODO: Append X axis
  chart
    .append("g");
  var xAxisG = chart.append("g").append("g")
      .attr("transform", "translate(0," + innerHeight + ")");
  xAxisG.call(xAxis);

  // TODO: Append Y axis
  chart
    .append("g");
  var yAxisG = chart.append("g").append("g");
  yAxisG.call(yAxis);


  // ASSIGNMENT PART 1B
  // Grab the delphi data from the server
  d3.json("/delphidata", function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Data", data);
  });

})(d3);
