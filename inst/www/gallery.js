function gallery(Graph){

  var docSize = viewport(),
      width = docSize.width,
      height = docSize.height,
      options = Graph.options,
      filter = false,
      zoomRange = [0.1, 10],
      gridHeight = 60,
      currentGridHeight = gridHeight;

  if(!options.defaultColor){
    options.defaultColor = categoryColors[0];
  }
  options.colorScalenodeColor = "RdWhGn"; // default linear scale

  var nodes = [],
      len = Graph.nodes[0].length;
  for(var i = 0; i<len; i++){
      var node = {};
      Graph.nodenames.forEach(function(d,j){
        node[d] = Graph.nodes[j][i];
      })
      node[options.nodeName] = String(node[options.nodeName]);
      nodes.push(node);
  }

  var body = d3.select("body");

  body.on("keydown.shortcut",function(){
    if(!body.select("body > div.window-background").empty()){
      return;
    }
    if(d3.event.ctrlKey){
      var key = getKey(d3.event);
      switch(key){
        case "+":
          d3.event.preventDefault();
          zoomsvg.select(".zoombutton.zoomin").dispatch("click");
          return;
        case "-":
          d3.event.preventDefault();
          zoomsvg.select(".zoombutton.zoomout").dispatch("click");
          return;
        case "0":
          d3.event.preventDefault();
          zoomsvg.select(".zoombutton.zoomreset").dispatch("click");
          return;
      }
    }
  });

  // top bar
  var topBar = body.append("div")
        .attr("class","topbar gallery-topbar")

  if(options.main){
    topBar.append("h2").text(options.main)
    topBar.append("span").style("padding","0 10px");
  }

  // multigraph
  if(typeof multiGraph != 'undefined'){
      topBar.append("h3").text(texts.graph + ":")
      multiGraph.graphSelect(topBar);
      topBar.append("span").style("padding","0 10px");
  }

  // node multi search
  topBar.call(displayMultiSearch()
        .data(nodes)
        .column(options.nodeLabel)
        .update(displayGraph)
        .update2(filterSelection)
        .filterData(filterNodes));

  topBar.append("span").style("padding","0 10px");

  // node order
  topOrder(topBar,nodes,displayGraph);

  // colors
  topBar.append("h3").text(texts.Color + ":")

  var colorSelect = topBar.append("div")
      .attr("class","select-wrapper")
    .append("select")
    .on("change",function(){
      options.nodeColor = this.value;
      if(options.nodeColor=="-"+texts.none+"-"){
        options.nodeColor = false;
      }else if(dataType(nodes,options.nodeColor)=="number"){
        displayPicker(options,"nodeColor",displayGraph);
      }
      displayGraph();
    })
  var opt = getSelectOptions();
  opt.unshift("-"+texts.none+"-");
  colorSelect.selectAll("option")
        .data(opt)
      .enter().append("option")
        .property("value",String)
        .text(String)
        .property("selected",function(d){ return d==options.nodeColor?true:null; })
  topBar.append("span").style("padding","0 10px");

  // filter selection
  topBar.append("button")
    .attr("class","primary")
    .text(texts.filterselection)
    .on("click",filterSelection)

  topBar.append("span").style("padding","0 10px");

  // node filter in topBar
  var topFilterInst = topFilter()
    .data(nodes)
    .datanames(getSelectOptions())
    .attr(options.nodeName)
    .displayGraph(displayGraph);
  topBar.call(topFilterInst);

  var content = body.append("div")
        .attr("class","gallery-content");

  var gallery = content.append("div")
        .attr("class","grid-gallery");

  var showPanelButton = gallery.append("div").attr("class","show-panel-button");
  showPanelButton.append("span");
  showPanelButton.append("span");
  showPanelButton.append("span");
  showPanelButton.on("click",function(){
    content.classed("hide-panel",false);
    panelSize();
  })

  gallery.on("click",function(){
    nodes.forEach(function(n){ delete n.selected; });
    displayGraph();
  });

  if(!options.hasOwnProperty("zoom"))
    options.zoom = 1;

  var zoom = d3.zoom()
      .filter(function(){ return d3.event.ctrlKey; })
      .scaleExtent(zoomRange)
      .on("zoom", function(){
        currentGridHeight = gridHeight*d3.event.transform.k;
        displayGraph();
      })

  gallery.call(zoom);

  var galleryItems = gallery.append("div").attr("class","gallery-items");

  var legend = displayLegend()
                 .type("Color")
                 .displayGraph(displayGraph)
                 .newFilter(topFilterInst.newFilter)
                 .displayScalePicker(function(){
                   displayPicker(options,"nodeColor",displayGraph);
                 });
  var legendPanel = gallery.append("div")
        .attr("class","legend-panel")
        .on("click",function(){
          d3.event.stopPropagation();
        })

  resetZoom();

  content.append("div")
      .attr("class","split-bar")
      .call(d3.drag()
        .on("drag",function(){
          panelSize(d3.mouse(content.node())[0]);
        }))

  var panel = content.append("div")
        .attr("class","gallery-panel")

  panel.append("div")
    .attr("class","close-button")
    .on("click",function(){
      content.classed("hide-panel",true);
      panelSize();
    });

  var panelContent = panel.append("div")
        .attr("class","panel-content")
        .append("div");

  var zoomsvg = gallery.append("svg")
    .attr("class","zoom-svg")
    .attr("width",40)
    .attr("height",100)

  makeZoomIn(zoomsvg,100)
    .on("click",function(){
      gallery.call(zoom.scaleBy,1.5);
    })
  makeZoomReset(zoomsvg,65)
    .on("click",resetZoom)
  makeZoomOut(zoomsvg,30)
    .on("click",function(){
      gallery.call(zoom.scaleBy,0.75);
    })

  if(options.note){
    var note = body.append("div")
      .attr("class","gallery-note")
      .html(options.note)
  }

  if(options.help){
    panelContent.html(options.help);
  }else{
    content.classed("hide-panel",true);
  }
  panelSize();

  content.style("height",(height - topBar.node().offsetHeight - 20 - (options.note ? note.node().offsetHeight : 0))+"px");

  function resetZoom(){
    gallery.call(zoom.transform,d3.zoomIdentity.scale(options.zoom));
  }

  function panelSize(size){
    var w = parseInt(content.style("width")) - 20,
        pw = 0,
        gw = 0;
    if(typeof size == "number"){
      gw = size - 6;
      if(gw < 100){
        return;
      }
      pw = w - gw - 12;
      if(pw < 100){
        return;
      }
    }else{
      if(!content.classed("hide-panel")){
        pw = parseInt(panel.style("width"));
        if(pw<100){
          pw = (w/3) - 6;
        }
        gw = w - pw - 6;
      }
    }
    panel.style("width", pw ? pw + "px" : null);
    gallery.style("width", gw ? gw + "px" : null);
  }

  function displayGraph(newfilter){

    if(typeof newfilter != "undefined")
      filter = newfilter;

    var data = nodes.filter(filterNodes);

    if(options.order){
      data.sort(function(a,b){
        var aa = a[options.order],
            bb = b[options.order];
        if(options.rev){
          var aux = bb;
          bb = aa;
          aa = aux;
        }
        return aa < bb ? -1 : aa > bb ? 1 : aa >= bb ? 0 : NaN;
      })
    }

    var items = galleryItems.selectAll(".item").data(data, function(d){ return d[options.nodeName]; });

    var itemsEnter = items.enter()
          .append("div").attr("class","item")
    if(options.imageItems){
      itemsEnter.append("img")
          .on("load", function(){
            imgWidth(this);
          })
          .on("error", function(){
            d3.select(this.parentNode).style("width",currentGridHeight+"px")
          })
          .attr("src",function(n){ return n[options.imageItems]; });
    }else{
      itemsEnter
          .append("div")
            .style("width","100%")
    }

    itemsEnter.append("span")
        .attr("title",function(d){ return d[options.nodeLabel]; })
        .text(function(d){ return d[options.nodeLabel]; })

    itemsEnter.style("cursor","pointer")
      .on("click",function(n){
          d3.event.stopPropagation();
          if(d3.event.ctrlKey){
            if(n.selected){
              delete n.selected;
            }else{
              n.selected = true;
            }
          }else if(d3.event.shiftKey){
            n.selected = true;
            var ext = d3.extent(data.map(function(d,i){ return [i,d.selected]; }).filter(function(d){ return d[1]; }).map(function(d){ return d[0]; }));
            d3.range(ext[0],ext[1]).forEach(function(i){
              data[i].selected = true;
            });
          }else{
            data.forEach(function(n){ delete n.selected; });
            n.selected = true;
          }
          displayGraph();
          if(options.nodeInfo && n[options.nodeInfo]){
            content.classed("hide-panel",false);
            panelSize();
            panelContent.html(n[options.nodeInfo]);
          }
      })

    if(options.nodeText){
      itemsEnter.each(function(d){
        if(d[options.nodeText]){
          var tooltip = d3.select(this).append("div")
            .attr("class","tooltip")
            .style("display","none")
            .text(d[options.nodeText])
            
          d3.select(this)
              .on("mouseenter",function(){
                tooltip.style("display","block");
              })
              .on("mouseleave",function(){
                tooltip.style("display","none");
              })
        }
      });
    }

    items.exit().remove();

    items.order();

    var itemsUpdate = itemsEnter.merge(items);
    itemsUpdate.classed("selected",function(n){ return n.selected; });
    if(options.imageItems){
      itemsUpdate
        .select("img")
          .style("height",currentGridHeight+"px")
          .each(function(){
            imgWidth(this);
          })
    }else{
       itemsUpdate.style("width",currentGridHeight+"px")
          .select("div")
            .style("height",currentGridHeight+"px")
    }
    itemsUpdate.selectAll("span, .tooltip").style("font-size",(currentGridHeight/gridHeight)+"em")

    var colorScale;
    if(options.nodeColor){
      if(Graph.nodenames.indexOf("_color_"+options.nodeColor)!=-1){
          var aux = uniqueRangeDomain(nodes, options.nodeColor, "_color_"+options.nodeColor);
          colorScale = d3.scaleOrdinal()
            .range(aux.range)
            .domain(aux.domain)
      }else{
        var type = dataType(nodes,options.nodeColor);
        if(type=="number"){
          var domain = d3.extent(nodes,function(node){
            return node[options.nodeColor];
          })
          var range = colorScales[options.colorScalenodeColor];
          if(range.length==3){
            domain = [domain[0],d3.mean(domain),domain[1]];
          }
          colorScale = d3.scaleLinear()
            .range(range)
            .domain(domain)
        }
        if(type=="string"){
          colorScale = d3.scaleOrdinal()
            .range(categoryColors)
            .domain(d3.map(nodes,function(node){
              return node[options.nodeColor];
            }).keys())
        }
      }
    }
    legend
      .data(data)
      .value(options.nodeColor)
      .scale(colorScale)
    legendPanel.call(legend);

    if(options.imageItems){
      itemsUpdate.style("border-color",function(d){
        if(!d.selected && options.nodeColor){
            return colorScale(d[options.nodeColor]);
        }
        return null;
      })
    }else{
      itemsUpdate.select("div:first-child").style("background-color",function(d){
        if(options.nodeColor){
            return colorScale(d[options.nodeColor]);
        }
        return options.defaultColor;
      })
    }

    function imgWidth(img){
      var ratio = 1;
      if(img.complete && img.naturalHeight!==0){
        ratio = img.naturalWidth / img.naturalHeight;
      }
      d3.select(img.parentNode).style("width",(currentGridHeight*ratio)+"px")
    }
  }

  function filterSelection(){
      var values = nodes.filter(function(n){
          return n.selected;
        })
        .map(function(n){
          return n[options.nodeName];
        });
      topFilterInst.newFilter(options.nodeName,values);
  }

  function filterNodes(n){
      return !filter || filter.indexOf(n[options.nodeName])!=-1 ? true : false;
  }

  function getSelectOptions(){
    return Graph.nodenames.filter(function(d){ return d.substring(0,1)!="_"; })
        .filter(function(d){ return !options.imageItems || d!=options.imageItems; })
        .sort(sortAsc);
  }

  function topOrder(topBar,data,displayGraph){

    topBar.append("h3").text(texts.Order + ":")

    var selOrder = topBar.append("div")
      .attr("class","select-wrapper")
    .append("select")
    .on("change",function(){
      options.order = this.value;
      if(options.order=="-default-")
        options.order = false;
      displayGraph();
    })

    var opt = getSelectOptions();
    opt.unshift("-default-");
    selOrder.selectAll("option")
        .data(opt)
      .enter().append("option")
        .property("selected",function(d){
          return d==options.order;
        })
        .property("value",String)
        .text(String)

    topBar.append("h3")
    .text(texts.Reverse)
    topBar.append("button")
    .attr("class","switch-button")
    .classed("active",options.rev)
    .on("click",function(){
      options.rev = !options.rev;
      d3.select(this).classed("active",options.rev);
      displayGraph();
    })

    topBar.append("span").style("padding","0 10px")
  }

  function displayLegend(){
    var parent,
        value,
        type,
        data,
        scale,
        displayGraph,
        newFilter,
        scalePicker;

    function exports(parent){
      if(!value){
        parent.selectAll("*").remove();
        return;
      }

      // ordinal scale
      if(scale.name=="i"){
        parent.select("div.scale").remove();

        var legends = parent.select(".legends");
        var initialize = false;
        if(legends.empty()){
          initialize = true;
          legends = parent.append("div").attr("class","legends");
          legends.append("div").attr("class","legends-content")
            .append("div").attr("class","legend")
        }
        var content = legends.select(".legends-content");
        var legend = legends.select(".legend");

        if(initialize){
          legend.append("div")
            .attr("class","title")
            .text(texts[type] + " / " + value)
          legend.append("hr")
            .attr("class","legend-separator")
        }

        var itemsData = d3.map(data.filter(function(d){ return d[value]!==null; }), function(d){ return d[value]; }).keys().sort(sortAsc);

        var items = legend.selectAll(".legend-item")
              .data(itemsData,String)

        var itemsEnter = items.enter()
        .append("div")
            .attr("class","legend-item")
            .style("cursor","pointer")
            .on("click",function(v){
              var checked = d3.select(this).select(".legend-check-box").classed("checked");
              data.forEach(function(d){
                if(String(d[value])==v){
                  d.selected = !checked ? true : false;
                }
              })
              displayGraph();
            })

        itemsEnter.append("div")
        .attr("class","legend-check-box")

        itemsEnter.append("div")
        .attr("class","legend-bullet")
        .style("background-color",function(d){
          return scale(d);
        })

        itemsEnter.append("span")
        .text(stripTags)

        items.exit().remove();

        items.order();

        var itemsUpdate = itemsEnter.merge(items);
        itemsUpdate.select(".legend-check-box")
        .classed("checked",function(v){
          var aux = data.filter(function(d){
            return String(d[value])==v;
          });
          if(aux.length){
            return aux.filter(function(d){
              return !d.selected;
            }).length==0;
          }
          return false;
        })

        var legendsHeight = parent.node().parentNode.offsetHeight-100;
        if(content.node().offsetHeight>legendsHeight){
          content.style("height",legendsHeight+"px")
        }

        if(initialize){
          var legendBottomControls = legends.append("div")
          .attr("class","legend-bottom-controls")

          var legendSelectAll = legendBottomControls.append("div")
          .attr("class","legend-selectall")
          .style("cursor","pointer")
          .on("click",function(){
              var checked = d3.select(this).select(".legend-check-box").classed("checked");
              data.forEach(function(d){
                d.selected = !checked ? true : false;
              })
              displayGraph();
          })
          legendSelectAll.append("div")
          .attr("class","legend-check-box")
          legendSelectAll.append("span")
          .text(texts.selectall)

          legendBottomControls.append("button")
          .attr("class","legend-bottom-button primary")
          .text(texts["filter"])
          .on("click",function(){
            var values = [];
            legend.selectAll(".legend-item > .checked").each(function(d){
              values.push(d);
            });
            newFilter(value,values);
          })
          .attr("title",texts.filterInfo)
        }

        legends.select(".legend-selectall > .legend-check-box").classed("checked",function(){
          return content.selectAll(".legend-item > .checked").size();
        })
        legends.select(".legend-bottom-button").classed("disabled",function(){
          var nselected = data.filter(function(d){
            return d.selected;
          }).length;
          return !nselected || (nselected==data.length);
        })
      }

      // linear scale
      if(scale.name=="h"){
        parent.select("div.legends").remove();
        
        displayLinearScale(parent,
          value,
          scale.range(),
          scale.domain(),
          scalePicker
        );
      }
    }

    exports.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return exports;
    };

    exports.type = function(x) {
      if (!arguments.length) return type;
      type = x;
      return exports;
    };

    exports.data = function(x) {
      if (!arguments.length) return data;
      data = x;
      return exports;
    };

    exports.scale = function(x) {
      if (!arguments.length) return scale;
      scale = x;
      return exports;
    };

    exports.displayGraph = function(x) {
      if (!arguments.length) return displayGraph;
      displayGraph = x;
      return exports;
    };

    exports.newFilter = function(x) {
      if (!arguments.length) return newFilter;
      newFilter = x;

      return exports;
    };

    exports.displayScalePicker = function(x) {
      if (!arguments.length) return scalePicker;
      scalePicker = x;

      return exports;
    };

    return exports;
  }
} // gallery function end

if(typeof multiGraph == 'undefined'){
  window.onload = function(){
    gallery(JSON.parse(d3.select("#data").text()));
  };
}
