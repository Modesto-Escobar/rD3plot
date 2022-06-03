function piechart(json){
  var docSize = viewport(),
      width = docSize.width,
      height = docSize.height;

  var options = json.options;

  var body = d3.select("body");

  if(options.cex){
      body.style("font-size", 10*options.cex + "px")
  }else{
      options.cex = 1;
  }

  if(json.linknames && typeof json.linknames == "string"){
    json.linknames = [json.linknames];
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

  var labels = options.labels,
      colors = options.colors;

  if(!colors){
      colors = d3.range(json.dim[2]).map(function(d,i){
        return categoryColors[i % categoryColors.length];
      });
  }

  var svg = body.append("svg")
      .attr("width", width)
      .attr("height", height);

  var size = Math.min(width,height),
      radius = size/4;

  if(json.dim[0]>1 || json.dim[1]>1){
    height = height - 80;
    size = Math.min(width,height);
    radius = Math.min(height/json.dim[0],width/json.dim[1])/2;
    var marginleft = (width-(radius*2*json.dim[1]))/2;

    if(json.rownames){
      svg.selectAll(".rownames")
        .data(json.rownames)
      .enter().append("text")
        .attr("class","rownames")
        .attr("text-anchor","end")
        .attr("transform",function(d,i){
          return "translate("+(marginleft-10)+","+((radius*i*2)+radius)+")";
        })
        .text(String)
    }

    if(json.colnames){
      svg.selectAll(".colnames")
        .data(json.colnames)
      .enter().append("text")
        .attr("class","colnames")
        .attr("transform",function(d,i){
          return "translate("+(marginleft+((radius*i*2)+radius))+","+(size+10)+")rotate(45)";
        })
        .text(String)
    }

    var linkColors = false,
        linkColorScale = false;
    if(json.links && options.linkColor){
      linkColors = json.links[json.linknames.indexOf(options.linkColor)];
      linkColorScale = d3.scaleOrdinal()
        .domain(d3.set(linkColors).values().sort(sortAsc))
        .range(categoryColors)
    }

    var i, j, w;
    for(i=0; i<json.dim[0]; i++){
      for(j=0; j<json.dim[1]; j++){
        w = json.dataw ? json.dataw[i][j] : false;
        var color = linkColors ? linkColorScale(linkColors[(j*json.dim[1])+i]) : false;
        drawPie(svg,marginleft+(radius*j*2)+radius,(radius*i*2)+radius,json.data[i][j],labels,colors,radius-4,false,w, color);
      }
    }
  }else{
    drawPie(svg,width/2,height/2,json.data,labels,colors,radius,true,json.dataw);
  }

  function drawPie(svg,x,y,data, labels, colors, radius, showlabels, dataw, color){
    var g = svg.append("g")
      .attr("transform","translate("+x+","+y+")")

    g.append("circle")
      .attr("r",radius+(color ? 2 : 1))
      .style("fill",color ? color : basicColors.black)

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

    var topoffset = svg.node().getBoundingClientRect().top;

    arcs.on("mouseenter",function(d,i){
      var text = data[i];
      if(labels && labels[labels.length-1-i]){
        text = labels[labels.length-1-i] + ": " + text;
      }
      tooltip.text(text);

      var coords = arc.centroid(d);
      tooltip.style("top",(topoffset+y+coords[1]+4)+"px");
      tooltip.style("left",(x+coords[0]+4)+"px");

      tooltip.style("display",null);
    })
    arcs.on("mouseleave",function(d){
      tooltip.style("display","none");
      tooltip.text("");
    })

    if(dataw && dataw[0]!==null && dataw[1]!==null){
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

          var coords = arc2.centroid(d);
          tooltip.style("top",(topoffset+y+coords[1]+4)+"px");
          tooltip.style("left",(x+coords[0]+4)+"px");

          tooltip.style("display",null);
        }
      })
      arcw.on("mouseleave",function(d){
        tooltip.style("display","none");
        tooltip.text("");
      })
    }
  }

  if(options.showLegend && labels){
    var datalegend = labels.map(function(d,i){
      return [d,colors[i]];
    }).filter(function(d){
      return d[0];
    });
    drawLegend(svg,datalegend);
  }

  if(options.showLegend && options.linkColor && linkColorScale){
    var datalegend = linkColorScale.domain().map(function(d,i){
      return [d,linkColorScale(d)];
    }).filter(function(d){
      return d[0];
    });
    drawLegend(svg,datalegend);
  }

  if(options.helpOn){
    infoPanel.changeInfo(options.help);
  }

  function drawLegend(svg,datalegend){
    var y = 50;
    svg.selectAll(".pie-legend").each(function(){
      y = y + this.getBBox().height + 25;
    })
    var legend = svg.append("g")
      .attr("class","pie-legend")
      .attr("transform","translate("+(width-200)+","+y+")")
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

