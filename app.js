var margin = 200;
var svg = d3.select("svg");
var width = svg.attr("width") - margin;
var height = svg.attr("height") - margin;

svg.append("text")
.attr("transform","translate(100,0)")
.attr("x",50)
.attr("y",50)
.attr("class","title")
.text("Trading volume");

d3.select("body")
.append("div")
.attr("id", "outer")
.style("position", "absolute");

var xScale = d3.scaleBand().range([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range([height,0]);

var g = svg.append("g");
g.attr("transform","translate(100,100)");

var data = [
  {month:'January', val: 67},
  {month:'February', val: 58},
  {month:'May', val: 40},
  {month:'June', val: 100},
  {month:'July', val: 150},

];


xScale.domain(data.map(function(d) { return d.month;}));
yScale.domain([0,d3.max(data, function(d) {return d.val;})]);

g.append("g")
.attr("transform","translate(0,"+height+")")
.call(d3.axisBottom(xScale));


g.append("g")
.call(d3.axisLeft(yScale));

function onMouseOver(d,i) {
  d3.select(this)
    .attr('class','highlight');

  d3.select(this)
  .transition()
  .duration(500)
  .attr('width', xScale.bandwidth()+5)
  .attr("y", (d)=>yScale(d.val)-10)
  .attr("height", (d)=>height-yScale(d.val)+10);

  d3.select("#outer")
  .style("top", (d3.event.pageY)+"px")
  .style("left", (d3.event.pageX + 5)+"px")
  .style("display", "block")
  .html("month: "+d3.select(this).attr('month')+"; value: "+d3.select(this).attr('value'))


}

function onMouseOut(d,i) {
  d3.select(this)
  .attr('class','bar');

  d3.select(this)
  .transition()
  .duration(500)
  .attr('width', xScale.bandwidth())
  .attr("y", (d)=>yScale(d.val))
  .attr("height", (d)=>height-yScale(d.val));

  d3.select("#outer")
  .style("display", "none")
}


g.selectAll(".bar")
.data(data)
.enter()


g.selectAll(".bar")
.data(data)
.enter()
.append("rect")
.attr("class","bar")
.on("mouseover", onMouseOver)
.on("mouseout", onMouseOut)
.attr("x", (d)=>xScale(d.month))
.attr("y", (d)=>yScale(d.val))
.attr("month", (d)=>d.month)
.attr("value", (d)=>d.val)
.attr("width", xScale.bandwidth())
.transition()
.ease(d3.easeLinear)
.duration(500)
.delay((d,i)=>i*50)
.attr("height", (d)=>height-yScale(d.val));
