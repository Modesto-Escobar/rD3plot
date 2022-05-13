function piechart(json){
  var docSize = viewport(),
      width = docSize.width,
      height = docSize.height;

  var data = json.data.reverse(),
      labels = json.labels ? json.labels.reverse() : false,
      colors = json.colors ? json.colors.reverse() : false;
 
  var radius = Math.min(width,height)/4,
      initAngle = (90-180*data[0]/d3.sum(data)) * Math.PI / 180,
      labelr = radius + 20;
 
  var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(function(d) { return d.startAngle + initAngle; })
      .endAngle(function(d) { return d.endAngle + initAngle; });

  var pie = d3.pie()
    .sort(null)

  if(!colors){
    colors = data.map(function(d,i){
      return categoryColors[i % categoryColors.length];
    });
  }

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var g = svg.append("g")
    .attr("transform","translate("+width/2+","+height/2+")")

  var piedata = pie(data);

  g.selectAll(".arc")
      .data(piedata)
    .enter().append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .style("stroke","#000000")
      .style("fill", function(d,i) { return colors[i]; })

  if(labels){
    g.selectAll(".label")
      .data(piedata)
    .enter().append("text")
      .attr("class", "label")
      .attr("transform", function(d) {
        var c = arc.centroid(d),
            x = c[0],
            y = c[1],
            h = Math.sqrt(x*x + y*y);
        return "translate(" + (x/h * labelr) +  ',' + (y/h * labelr) +  ")"; 
      })
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text(function(d,i) { return labels[i]; })
  }

} // timeline function end

if(typeof multiGraph == 'undefined'){
  window.onload = function(){
    piechart(JSON.parse(d3.select("#data").text()));
  };
}
