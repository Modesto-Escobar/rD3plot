function piechart(json){
  var docSize = viewport(),
      width = docSize.width,
      height = docSize.height;

  var options = json.options;

  var nodes = false,
      nodesFiltered = false;

  var body = d3.select("body");

  if(options.cex){
      body.style("font-size", 10*options.cex + "px")
  }else{
      options.cex = 1;
  }

  if(!json.nodenames && json.rownames && json.colnames){
    json.nodenames = ["name"];
    json.nodes = [d3.set(d3.merge([json.rownames, json.colnames])).values()];
  }
  if(json.nodenames){
    nodes = [];
    for(var i=0; i<json.nodes[0].length; i++){
      var node = {};
      json.nodenames.forEach(function(n,j){
        node[n] = json.nodes[j][i];
      });
      nodes.push(node);
    }
  }

  if(json.linknames && typeof json.linknames == "string"){
    json.linknames = [json.linknames];
  }

  var links = false;
  if(json.links){
    links = linksMGMT()
     .linknames(json.linknames)
     .linkSource(options.linkSource)
     .linkTarget(options.linkTarget)
     .links(json.links)
     .rownames(json.rownames)
     .colnames(json.colnames)
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

  // order
  if(nodes){
    topBar.addBox(function(box){
      topOrder(box,displayGraph);
    });
  }

  // colors
  if(links){
    var colorSelect;
    topBar.addBox(function(box){
      box.append("h3").text(texts.Color + ":")

      colorSelect = box.append("div")
        .attr("class","select-wrapper")
      .append("select")
      .on("change",function(){
        options.linkColor = this.value;
        if(options.linkColor=="_none_"){
          delete options.linkColor;
        }
        displayGraph();
      })
      var opt = getSelectOptions(json.linknames).map(function(d){ return [d,d]; });
      opt.unshift(["_none_","-"+texts.none+"-"]);
      colorSelect.selectAll("option")
          .data(opt)
        .enter().append("option")
          .property("value",function(d){ return d[0]; })
          .text(function(d){ return d[1]; })
          .property("selected",function(d){ return d[0]==options.linkColor ? true : null; })
    });
  }

  // node filter in topBar
  if(nodes){
    var topFilterInst = topFilter()
      .data(nodes)
      .datanames(getSelectOptions(json.nodenames))
      .displayGraph(displayGraph);

    topBar.addBox(topFilterInst);
  }

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

  displayGraph();

  if(options.helpOn){
    infoPanel.changeInfo(options.help);
  }

  function displayGraph(newfilter){

    if(typeof newfilter != "undefined"){
      if(newfilter){
        nodesFiltered = newfilter.map(function(d){ return d[options.nodeName]; });
      }else{
        nodesFiltered = false;
      }
    }

    if(links){
      links.linkColor(options.linkColor);
    }

    var svg = body.select("body > svg");
    if(svg.empty()){
      svg = body.append("svg");
    }else{
      svg.selectAll("*").remove();
    }
    svg.attr("width", width)
       .attr("height", height);

    var h = height,
        w = width;

    var size = Math.min(w,h),
        radius = size/4;

    var nrow = json.dim[0],
        ncol = json.dim[1];

    if(nrow>1 || ncol>1){

      var rangei, rangej;
      rangei = d3.range(0,nrow);
      rangej = d3.range(0,ncol);

      // order data
      if(nodes && options.order && json.rownames && json.colnames){
        var names = nodes.map(function(d){ return d[options.nodeName]; }),
            orders = nodes.map(function(d){ return d[options.order]; });

        rangei.sort(function order(a,b){
            var aa = orders[names.indexOf(json.rownames[a])],
                bb = orders[names.indexOf(json.rownames[b])];
            return compareFunction(aa,bb,options.rev);
        });

        rangej.sort(function order(a,b){
            var aa = orders[names.indexOf(json.colnames[a])],
                bb = orders[names.indexOf(json.colnames[b])];
            return compareFunction(aa,bb,options.rev);
        });
      }

      // filter data
      if(nodesFiltered){
        rangei = rangei.filter(function(d,i){
          return nodesFiltered.indexOf(json.rownames[d])!=-1;
        });
        rangej = rangej.filter(function(d,j){
          return nodesFiltered.indexOf(json.colnames[d])!=-1;
        });
      }

      h = h - 80;
      size = Math.min(w,h);
      radius = Math.min(h/rangei.length,w/rangej.length)/2;
      var marginleft = (w-(radius*2*rangej.length))/2;

    if(json.rownames){
      rangei.forEach(function(d,i){
        svg.append("text")
        .attr("class","rownames")
        .attr("text-anchor","end")
        .attr("transform","translate("+(marginleft-10)+","+((radius*i*2)+radius)+")")
        .text(json.rownames[d])
      });
    }

    if(json.colnames){
      rangej.forEach(function(d,i){
        svg.append("text")
        .attr("class","colnames")
        .attr("transform","translate("+(marginleft+((radius*i*2)+radius))+","+(size+10)+")rotate(45)")
        .text(json.colnames[d])
      });
    }

    var e, d, c;
    rangei.forEach(function(newI,i){
      rangej.forEach(function(newJ,j){
        if(options.hideUpper && i<j){
          return;
        }
        e = json.dataw ? json.dataw[newI][newJ] : false;
        c = links ? links.getLinkColor(newI,newJ) : false;
        d = json.data[newI][newJ];
        if(d.filter(function(dd){ return dd!==null; }).length){
          drawPie(svg,marginleft+(radius*j*2)+radius,(radius*i*2)+radius,d,labels,colors,radius-4,false,e,c);
        }
      });
    });

      if(!options.order && !nodesFiltered && options.ablineX){
        if(typeof options.ablineX == "number"){
          options.ablineX = [options.ablineX];
        }
        options.ablineX.forEach(function(d){
          var x = marginleft+(radius*d*2);
          svg.append("line")
          .attr("y1",0)
          .attr("y2",h)
          .attr("x1",x)
          .attr("x2",x)
          .style("stroke","black")
        });
      }

      if(!options.order && !nodesFiltered && options.ablineY){
        if(typeof options.ablineY == "number"){
          options.ablineY = [options.ablineY];
        }
        options.ablineY.forEach(function(d){
          var y = radius*d*2;
          svg.append("line")
          .attr("x1",marginleft)
          .attr("x2",w-marginleft)
          .attr("y1",y)
          .attr("y2",y)
          .style("stroke","black")
        });
      }

    }else{
      drawPie(svg,w/2,h/2,json.data,labels,colors,radius,true,json.dataw);
    }

    if(options.showLegend && labels){
      var datalegend = labels.map(function(d,i){
        return [d,colors[i]];
      }).filter(function(d){
        return d[0];
      });
      drawLegend(svg,datalegend);
    }

    if(options.showLegend && links && options.linkColor){
      var datalegend = links.getColorLegend();
      drawLegend(svg,datalegend);
    }
  }

  function linksMGMT(){
    var links = [],
        sources = [],
        targets = [],
        sourcetarget = [],
        linknames = [],
        linkSource = false,
        linkTarget = false,
        rownames = [],
        colnames = [],
        linkColor = false,
        linkColors = false,
        linkColorScale = false,
        legendColors = d3.set();

    function exports(){
      
    }

    function getLinkIdx(i,j){
      if(!rownames || !colnames){
        console.log("missing rownames or colnames");
        return null;
      }
      return sourcetarget.indexOf(rownames[i]+colnames[j]);
    }

    function loadlinks(x){
      links = x;
      if(linknames.length && linkSource && linkTarget){
        sources = links[linknames.indexOf(linkSource)];
        targets = links[linknames.indexOf(linkTarget)];
        sourcetarget = sources.map(function(s,k){ return s+targets[k]; });
      }else{
        console.log("missing linknames, linkSource or linkTarget");
      }
    }

    exports.linknames = function(x){
      if (!arguments.length) return linknames;
      linknames = x;
      return exports;
    }

    exports.linkSource = function(x){
      if (!arguments.length) return linkSource;
      linkSource = x;
      return exports;
    }

    exports.linkTarget = function(x){
      if (!arguments.length) return linkTarget;
      linkTarget = x;
      return exports;
    }

    exports.linkColor = function(x){
      if (!arguments.length) return linkColor;
      linkColor = x;
      legendColors.clear();
      if(linkColor){
        linkColors = links[linknames.indexOf(linkColor)];
        linkColorScale = d3.scaleOrdinal()
        .unknown(basicColors.black)
        .domain(d3.set(linkColors).values().sort(sortAsc))
        .range(categoryColors)
      }else{
        linkColorScale = false;
        linkColors = false;
        linkColor = false;
      }
      return exports;
    }

    exports.links = function(x){
      if (!arguments.length) return links;
      loadlinks(x);
      return exports;
    }

    exports.rownames = function(x){
      if (!arguments.length) return rownames;
      rownames = x;
      return exports;
    }

    exports.colnames = function(x){
      if (!arguments.length) return colnames;
      colnames = x;
      return exports;
    }

    exports.getLinkColor = function(i,j){
      if(!linkColorScale){
        return false;
      }
      var d = linkColors[getLinkIdx(i,j)];
      legendColors.add(d);
      return linkColorScale(d);
    }

    exports.getColorLegend = function(){
      if(linkColorScale){
        return linkColorScale.domain().map(function(d,i){
          return [d,linkColorScale(d)];
        }).filter(function(d){
          return d[0] && legendColors.has(d[0]);
        });
      }
      return null;
    }

    return exports;
  }

  function drawPie(svg, x, y, d, labels, colors, radius, showlabels, dataw, color){
    var g = svg.append("g")
      .attr("transform","translate("+x+","+y+")")

    g.append("circle")
      .attr("r",radius+(!color || d3.hsl(color).l==0 ? 1 : 2))
      .style("fill",color ? color : basicColors.black)

    var data = d.slice();
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

  function topOrder(div,displayGraph){

    div.append("h3").text(texts.Order + ":")
    var selOrder = div.append("div")
      .attr("class","select-wrapper")
    .append("select")
    .on("change",function(){
      options.order = this.value;
      if(options.order=="-default-")
        options.order = false;
      displayGraph();
    })

    var opt = getSelectOptions(json.nodenames);
    opt.unshift("-default-");
    selOrder.selectAll("option")
        .data(opt)
      .enter().append("option")
        .property("selected",function(d){
          return d==options.order;
        })
        .property("value",String)
        .text(String)

    div.append("h3")
    .text(texts.Reverse)
    div.append("button")
    .attr("class","switch-button")
    .classed("active",options.rev)
    .on("click",function(){
      options.rev = !options.rev;
      d3.select(this).classed("active",options.rev);
      displayGraph();
    })
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

  function getSelectOptions(names){
    if(!names){
      return [];
    }
    return names.filter(function(d){
          return d.substring(0,1)!="_"; 
        })
        .sort(sortAsc);
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
}

if(typeof multiGraph == 'undefined'){
  window.onload = function(){
    piechart(JSON.parse(d3.select("#data").text()));
  };
}

