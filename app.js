/*var w = 500;
var h = 200;
data = [
  {"x":10, "y":20},
  {"x":20, "y":14},
  {"x":30, "y":20},
  {"x":40, "y":21}
]
var svg = d3.select("body").append("svg").attr({width:w, height:h});
    d3.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr({
  cx:function(d){return d.x*4.7},
  cy:function(d){return h-d.y},
  r:5
})
*/

data1 = [
  {X:1, Y:2},
  {X:8, Y:10},
  {X:3, Y:6},
  {X:4, Y:8}
]

data2 = [
  {X:7, Y:2},
  {X:4, Y:10},
  {X:1, Y:6},
  {X:6, Y:8}
]

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#Scatterplot")
  .append("svg")
  .attr("width", 500)
  .attr("height", 450)
   .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");



  var xScale = d3.scaleLinear()
    .domain([0, 10])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));


  var yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(yScale));


    svg.append('g')
      .selectAll("circle")
      .data(data1)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return xScale(d.X); } )
        .attr("cy", function (d) { return yScale(d.Y); } )
        .attr("r", 2)
        .style("fill", "red")


      svg.append('g')
        .selectAll("circle")
        .data(data2)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return xScale(d.X); } )
          .attr("cy", function (d) { return yScale(d.Y); } )
          .attr("r", 2)
          .style("fill", "blue")
