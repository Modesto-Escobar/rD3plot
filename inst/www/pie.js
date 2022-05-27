function piechart(json){
  var docSize = viewport(),
      width = docSize.width,
      height = docSize.height,
      size = Math.min(width,height),
      radius = size/4;

  var options = json.options;

  var body = d3.select("body");

  if(options.cex){
      body.style("font-size", 10*options.cex + "px")
  }else{
      options.cex = 1;
  }

  // info panel
  var infoPanel = displayInfoPanel();
  body.call(infoPanel);

  // top bar
  var topBar = displayTopBar()
    .title(options.main);
  body.call(topBar);

  if(options.help){
      topBar.addIcon(iconButton()
        .alt("help")
        .width(24)
        .height(24)
        .src(b64Icons.help)
        .title(texts.showHelp)
        .job(function(){ infoPanel.changeInfo(options.help); }));
  }

  topBar.addIcon(iconButton()
        .alt("png")
        .width(24)
        .height(24)
        .src(b64Icons.png)
        .title(texts.pngexport)
        .job(svg2png));

  topBar.addIcon(iconButton()
        .alt("svg")
        .width(24)
        .height(24)
        .src(b64Icons.svg)
        .title(texts.svgexport)
        .job(svgDownload));

  height = height - topBar.height() - 4;

  if(options.note){
    var note = body.append("div")
      .attr("class","note");
    note.append("div")
        .html(options.note);
  }

  var tooltip = body.append("div")
             .attr("class","tooltip")
             .style("display","none");

  var colors = json.colors
  if(!colors){
      colors = d3.range(json.dim[2]).map(function(d,i){
        return categoryColors[i % categoryColors.length];
      });
  }

  var svg = body.append("svg")
      .attr("width", width)
      .attr("height", height);

  if(json.dim[0]>1 || json.dim[1]>1){
    radius = Math.min(height/json.dim[0],width/json.dim[1])/2;
    var i, j, g, w;
    for(i=0; i<json.dim[0]; i++){
      for(j=0; j<json.dim[1]; j++){
        g = svg.append("g")
          .attr("transform","translate("+(((width-size)/2)+(radius*j*2)+radius)+","+((radius*i*2)+radius)+")")
        w = json.dataw ? json.dataw[i][j] : false;
        drawPie(g,json.data[i][j],json.labels,colors,radius-4,false,w);
      }
    }
  }else{
    var g = svg.append("g")
      .attr("transform","translate("+(width/2)+","+(height/2)+")")
    drawPie(g,json.data,json.labels,json.colors,radius,true,json.dataw);
  }

  function drawPie(g,data, labels, colors, radius, showlabels, dataw){
    g.append("circle")
      .attr("r",radius+1)
      .style("fill",basicColors.black)

    data.reverse();

    var initAngle = (180*data[data.length-1]/d3.sum(data)) * Math.PI / 180;
 
    var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
      .startAngle(function(d) { return d.startAngle + initAngle; })
      .endAngle(function(d) { return d.endAngle + initAngle; });

    var pie = d3.pie()
      .sort(null)

    var piedata = pie(data);

    var arcs = g.selectAll(".arc")
      .data(piedata)
    .enter().append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .style("stroke","none")
      .style("fill", function(d,i) { return colors[colors.length-1-i]; })

    if(labels){
      if(showlabels){
        var textLabels = g.selectAll(".label")
        .data(piedata)
      .enter().append("text")
        .attr("class", "label")
        .attr("transform", function(d) {
          var c = arc.centroid(d),
              x = c[0],
              y = c[1];
          return "translate(" + x +  ',' + y +  ")"; 
        })
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .style("pointer-events","none")
        .style("fill",function(d,i){
          return d3.hsl(colors[colors.length-1-i]).l<0.5? basicColors.white : basicColors.black;
        })
        .text(function(d,i) { return labels[labels.length-1-i]; })
      }
    }

    arcs.on("mouseenter",function(d,i){
      var text = data[i];
      if(labels && labels[labels.length-1-i]){
        text = labels[labels.length-1-i] + ": " + text;
      }
      tooltip.text(text);

      var coords = d3.mouse(body.node());
      tooltip.style("top",(coords[1]+4)+"px");
      tooltip.style("left",(coords[0]+4)+"px");

      tooltip.style("display",null);
    })
    arcs.on("mouseleave",function(d){
      tooltip.style("display","none");
      tooltip.text("");
    })

    if(dataw){
      var initAngle2 = (-180*dataw[0]/d3.sum(dataw)) * Math.PI / 180;
 
      var arc2 = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)
        .startAngle(function(d) { return d.startAngle + initAngle2; })
        .endAngle(function(d) { return d.endAngle + initAngle2; });

      var piedata2 = pie(dataw);

      var arcw = g.selectAll(".arcw")
        .data(piedata2)
      .enter().append("path")
        .attr("class", "arcw")
        .attr("d", arc2)
        .style("stroke",function(d,i){
          return !i ? "#ff0000" : "none";
        })
        .style("stroke-width", "2px")
        .style("fill", "none")

      arcw.on("mouseenter",function(d,i){
        if(!i){
          tooltip.text(data[i]);

          var coords = d3.mouse(body.node());
          tooltip.style("top",(coords[1]+4)+"px");
          tooltip.style("left",(coords[0]+4)+"px");

          tooltip.style("display",null);
        }
      })
      arcw.on("mouseleave",function(d){
        tooltip.style("display","none");
        tooltip.text("");
      })
    }
  }

  if(options.showLegend && json.labels){
    var datalegend = json.labels.map(function(d,i){
      return [d,colors[i]];
    }).filter(function(d){
      return d[0];
    });
    var legend = svg.append("g")
      .attr("class","pie-legend")
      .attr("transform","translate("+(width-200)+",50)")
    var items = legend.selectAll(".pie-legend-item")
        .data(datalegend)
      .enter().append("g")
        .attr("transform",function(d,i){
          return "translate(0,"+(i*20)+")";
        })
    items.append("circle")
      .attr("cx","-10")
      .attr("cy","-4")
      .attr("r","4")
      .attr("fill",function(d){
      return d[1];
    })
    items.append("text").text(function(d){
      return d[0];
    })
  }

  if(options.helpOn){
    infoPanel.changeInfo(options.help);
  } 

  function svg2png(){

    var canvas = document.createElement("canvas");
    canvas.width = svg.attr("width");
    canvas.height = svg.attr("height");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = basicColors.white;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var svgString = new XMLSerializer().serializeToString(svg.node());
    var svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var url = DOMURL.createObjectURL(svgBlob);
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(function(blob){
        return fileDownload(blob, d3.select("head>title").text()+'.png');
      });
    };
    img.src = url;
  }

  function svgDownload(){
    var svgString = new XMLSerializer().serializeToString(svg.node());
    var blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    fileDownload(blob, d3.select("head>title").text()+'.svg');
  }
} // timeline function end

if(typeof multiGraph == 'undefined'){
  window.onload = function(){
    piechart(JSON.parse(d3.select("#data").text()));
  };
}

