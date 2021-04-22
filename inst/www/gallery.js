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

  d3.selectAll("html, body")
    .style("height","100%")
    .style("width","100%")

  var body = d3.select("body");

  var infoPanel = displayInfoPanel();
  body.call(infoPanel);

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
        case "f":
          d3.event.preventDefault();
          filterSelection();
          return;
        case "h":
          d3.event.preventDefault();
          if(options.help){
            infoPanel.changeInfo(options.help);
          }
          return;
        case "l":
          d3.event.preventDefault();
          if(legendPanel.classed("hide-legend")){
            legendPanel.select(".show-panel-button").dispatch("click");
          }else{
            legendPanel.select(".close-button").dispatch("click");
          }
          return;
        case "r":
          d3.event.preventDefault();
          topFilterInst.removeFilter();
          return;
        case "s":
          d3.event.preventDefault();
          nodes.forEach(function(n){ n.selected = true; });
          displayGraph();
          return;
      }
    }
  });

  var galleryBox = body.append("div")
        .attr("class","gallery-box")

  // top bar
  var topBar = galleryBox.append("div")
        .attr("class","topbar")

  if(options.help){
      topBar.call(iconButton()
        .alt("help")
        .width(24)
        .height(24)
        .src(b64Icons.help)
        .title(texts.showHelp+" (ctrl + h)")
        .job(function(){ infoPanel.changeInfo(options.help); }));
  }

  topBar.call(iconButton()
        .alt("pdf")
        .width(24)
        .height(24)
        .src(b64Icons.pdf)
        .title(texts.pdfexport)
        .job(gallery2pdf));

  topBar.call(iconButton()
        .alt("xlsx")
        .width(24)
        .height(24)
        .src(b64Icons.xlsx)
        .title(texts.downloadtable)
        .job(nodes2xlsx));

  if(options.main){
    topBar.append("h2").text(options.main)
    topBar.append("span").attr("class","separator");
  }

  // multigraph
  if(typeof multiGraph != 'undefined'){
      topBar.append("h3").text(texts.graph + ":")
      multiGraph.graphSelect(topBar);
      topBar.append("span").attr("class","separator");
  }

  // node multi search
  topBar.call(displayMultiSearch()
        .data(nodes)
        .column(options.nodeLabel)
        .update(displayGraph)
        .update2(filterSelection)
        .filterData(filterNodes));

  topBar.append("span").attr("class","separator");

  // count elements
  topBar.append("h3").text(texts.Elements + ":")
  var elementsCount = topBar.append("span").attr("class","elements-count");
  topBar.append("span").attr("class","separator");

  // node order
  topOrder(topBar,nodes,displayGraph);

  // colors
  topBar.append("h3").text(texts.Color + ":")

  var colorSelect = topBar.append("div")
      .attr("class","select-wrapper")
    .append("select")
    .on("change",function(){
      options.nodeColor = this.value;
      if(options.nodeColor=="_none_"){
        delete options.nodeColor;
      }else if(dataType(nodes,options.nodeColor)=="number"){
        displayPicker(options,"nodeColor",displayGraph);
      }
      displayGraph();
    })
  var opt = getSelectOptions(sortAsc).map(function(d){ return [d,d]; });
  opt.unshift(["_none_","-"+texts.none+"-"]);
  colorSelect.selectAll("option")
        .data(opt)
      .enter().append("option")
        .property("value",function(d){ return d[0]; })
        .text(function(d){ return d[1]; })
        .property("selected",function(d){ return d[0]==options.nodeColor ? true : null; })
  topBar.append("span").attr("class","separator");

  // Deselect
  topBar.append("button")
    .attr("class","primary")
    .text(texts.Deselect)
    .on("click",deselectAllItems)


  topBar.append("span").attr("class","separator");

  // filter selection
  topBar.append("button")
    .attr("class","primary")
    .text(texts.filterselection)
    .on("click",filterSelection)

  topBar.append("span").attr("class","separator");

  // node filter in topBar
  var topFilterInst = topFilter()
    .data(nodes)
    .datanames(getSelectOptions(sortAsc))
    .attr(options.nodeName)
    .displayGraph(displayGraph);
  topBar.call(topFilterInst);

  var content = galleryBox.append("div")
        .attr("class","gallery-content");

  var descriptionPanel = false;
  if(options.description){
    descriptionPanel = content.append("div")
        .attr("class","description-panel")
        .html(options.description);
  }

  var gallery = content.append("div")
        .attr("class","grid-gallery");

  if(descriptionPanel && options.descriptionWidth){
      descriptionPanel.style("width",options.descriptionWidth+"%")
      gallery.style("width",(100-options.descriptionWidth)+"%")
  }

  gallery.on("click",deselectAllItems);

  if(!options.hasOwnProperty("zoom"))
    options.zoom = 1;

  var getCurrentHeight = function(k){ return gridHeight * k; };

  var zoom = d3.zoom()
      .filter(function(){ return d3.event.ctrlKey; })
      .scaleExtent(zoomRange)
      .on("zoom", function(){
        currentGridHeight = getCurrentHeight(d3.event.transform.k);
        displayGraph();
      })

  gallery.call(zoom);

  var galleryItems = gallery.append("div")
        .attr("class","gallery-items fade-labels")
        .classed("rounded-items",options.roundedItems);

  var legend = displayLegend()
                 .type("Color")
                 .displayGraph(displayGraph)
                 .filterHandler(topFilterInst)
                 .displayScalePicker(function(){
                   displayPicker(options,"nodeColor",displayGraph);
                 })
                 .selectionWindow(attrSelectionWindow()
                   .list(getSelectOptions(sortAsc))
                   .clickAction(function(val){
                     colorSelect.property("value",val)
                      .dispatch("change");
                   }));
  var legendPanel = content.append("div")
        .attr("class","legend-panel")
        .classed("hide-legend",!options.showLegend)
        .on("click",function(){
          d3.event.stopPropagation();
        })

  var zoomsvg = content.append("div")
    .attr("class","zoom-svg")
    .append("svg")
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
    var note = galleryBox.append("div")
      .attr("class","gallery-note")
      .html(options.note)
  }

  if(options.help && options.helpOn){
    infoPanel.changeInfo(options.help);
  }

  if(options.itemsPerRow){
    options.zoom = 1;

    var currentItemsPerRow = options.itemsPerRow,
        prevk = options.zoom,
        sizeByItemsPerRow = function(itemsPerRow){
          var w = Math.floor((gallery.node().offsetWidth-12) / itemsPerRow)-18;
          return w/options.aspectRatio;
        }
    
    getCurrentHeight = function(k){
          if(k == 1){
            currentItemsPerRow = options.itemsPerRow;
          }else{
            if(k < prevk){
              currentItemsPerRow = currentItemsPerRow+1;
            }else if(k > prevk){
              currentItemsPerRow = currentItemsPerRow-1;
            }
          }
          prevk = k;
          return sizeByItemsPerRow(currentItemsPerRow);
    }

    // check aspect ratio
    var img = new Image();
    img.onload = function() {
      options.aspectRatio = getImgRatio(this);
      currentGridHeight = sizeByItemsPerRow(currentItemsPerRow);
      gridHeight = currentGridHeight;
      resetZoom();
    }
    img.src = nodes[0][options.imageItems];
  }else{
    resetZoom();
  }

  function resetZoom(){
    gallery.call(zoom.transform,d3.zoomIdentity.scale(options.zoom));
  }

  function displayGraph(newfilter){

    if(typeof newfilter != "undefined")
      filter = newfilter;

    var data = nodes.filter(filterNodes);

    elementsCount.text(data.length);

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
    var imgWrapper = itemsEnter
        .append("div")
          .attr("class","img-wrapper")
    if(options.imageItems){
      imgWrapper.append("img")
          .on("load", options.aspectRatio ? function(){
            imgMarginLeft(this,getImgRatio(this));
          } : function(){
            itemWidth(d3.select(this.parentNode.parentNode),getImgRatio(this));
          })
          .attr("src",function(n){ return n[options.imageItems]; });
    }

    itemsEnter.append("span")
        .attr("title",function(d){ return d[options.nodeLabel]; })
        .text(function(d){ return d[options.nodeLabel]; })

    if(options.nodeText){
      itemsEnter.each(function(d){
        if(d[options.nodeText]){
          var tooltip = d3.select(this).append("div")
            .attr("class","tooltip")
            .style("display","none")
            .html(d[options.nodeText])
            
          d3.select(this)
              .on("mouseenter",function(){
                tooltip.style("display","block");
                if(d3.mouse(gallery.node())[0]>(gallery.node().offsetWidth/2)){
                  tooltip
                    .style("left","unset")
                    .style("right",0);
                }
              })
              .on("mouseleave",function(){
                tooltip.style("display","none")
                  .style("left",null)
                  .style("right",null);
              })
        }
      });
    }

    items.exit().remove();

    items.order();

    var itemsUpdate = itemsEnter.merge(items);
    itemsUpdate.classed("selected",function(n){ return n.selected; });

    itemsUpdate
      .select(".img-wrapper")
        .style("height",currentGridHeight+"px")
    itemsUpdate.each(function(){
      var item = d3.select(this),
          ratio = 1;
      if(options.aspectRatio){
        ratio = options.aspectRatio;
      }else if(options.imageItems){
        var img = item.select(".img-wrapper > img").node();
        ratio = getImgRatio(img);
      }
      itemWidth(item,ratio);
    })

    itemsUpdate.selectAll(".item > span").style("font-size",(currentGridHeight/72)+"em")

    itemsUpdate.style("cursor","pointer")
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
          if(options.nodeInfo){
            if(descriptionPanel){
              descriptionPanel.html(n[options.nodeInfo] ? n[options.nodeInfo] : options.description);
            }else{
              infoPanel.changeInfo(n[options.nodeInfo]);
            }
          }
      })

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
      itemsUpdate.select(".img-wrapper").style("border-color",function(d){
        if(!d.selected && options.nodeColor){
            return applyColorScale(colorScale,d[options.nodeColor]);
        }
        return null;
      })
    }else{
      itemsUpdate.select("div:first-child").style("background-color",function(d){
        if(options.nodeColor){
            return applyColorScale(colorScale,d[options.nodeColor]);
        }
        return options.defaultColor;
      })
    }

    function applyColorScale(scale, value){
      if(value == null){
        return basicColors.white;
      }
      return scale(value);
    }

    function itemWidth(item,ratio){
      var wrapperBorderWidth = 0;
      ["left","right"].forEach(function(d){
        wrapperBorderWidth += parseInt(item.select(".img-wrapper").style("border-"+d+"-width"));
      })
      item.style("width",((currentGridHeight*ratio) + wrapperBorderWidth)+"px");
    }

    function imgMarginLeft(img,ratio){
        var ml = (100 - (100/options.aspectRatio*ratio)) / 2;
        d3.select(img).style("margin-left",ml+"%");
    }
  }

  function getImgRatio(img){
      var ratio = 1;
      if(img.complete && img.naturalHeight!==0){
        ratio = img.naturalWidth / img.naturalHeight;
      }
      return ratio;
  }

  function deselectAllItems(){
    nodes.forEach(function(n){ delete n.selected; });
    displayGraph();
    if(descriptionPanel){
      descriptionPanel.html(options.description);
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

  function getSelectOptions(order){
    return Graph.nodenames.filter(function(d){ return d.substring(0,1)!="_"; })
        .filter(function(d){ return !options.imageItems || d!=options.imageItems; })
        .sort(order ? order : function(){ return 0; });
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

    var opt = getSelectOptions(sortAsc);
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

    topBar.append("span").attr("class","separator");
  }

  function displayLegend(){
    var parent,
        value,
        type,
        data,
        scale,
        displayGraph,
        filterHandler,
        scalePicker;

    function exports(parent){
      if(!value || !scale){
        parent.selectAll("*").remove();
        return;
      }

      selectionWindow
        .visual(type)
        .active(value)

      // ordinal scale
      if(scale.name=="i"){
        parent.select("div.scale").remove();

        var legends = parent.select(".legends"),
            showPanelButton = parent.select(".show-panel-button");

        var initialize = false;
        if(legends.empty()){
          initialize = true;

          var showPanelButton = parent.append("div").attr("class","show-panel-button");
          showPanelButton.append("span");
          showPanelButton.append("span");
          showPanelButton.append("span");
          showPanelButton.on("click",function(){
            parent.classed("hide-legend",false);
          })

          legends = parent.append("div").attr("class","legends");
          legends.style("opacity",0.8)
            .on("mouseenter",function(){
              d3.select(this).transition()
                  .duration(500)
                  .style("opacity",1);
            })
            .on("mouseleave",function(){
              d3.select(this).transition()
                  .duration(500)
                  .style("opacity",0.8);
            })
          legends.append("div")
            .attr("class","highlight-header")
            .text(texts.Legend)
            .append("div")
              .attr("class","close-button")
              .on("click",function(){
                parent.classed("hide-legend",true);
              })

          legends.append("div")
              .attr("class","goback")
              .on("click",function(){
                filterHandler.removeFilter();
              })

          legends.append("div").attr("class","legends-content")
            .append("div").attr("class","legend")
        }

        legends.select(".goback").style("display", filterHandler.getFilteredNames()===false ? "none" : null)

        var content = legends.select(".legends-content");
        var legend = legends.select(".legend");

        if(initialize){
          legend.append("div")
            .attr("class","title")
            .style("cursor","pointer")
            .on("click",selectionWindow)

          legend.append("hr")
            .attr("class","legend-separator")
        }
        legend.select(".title").text(texts[type] + " / " + value);

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

        var legendsHeight = parent.node().parentNode.offsetHeight-250;
        content.style("height",legend.node().offsetHeight>legendsHeight ? legendsHeight+"px" : null)

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
            filterHandler.addFilter(value,values);
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
        parent.select(".show-panel-button").remove();
        
        displayLinearScale(parent,
          value,
          scale.range(),
          scale.domain(),
          scalePicker,
          selectionWindow
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

    exports.filterHandler = function(x) {
      if (!arguments.length) return filterHandler;
      filterHandler = x;

      return exports;
    };

    exports.displayScalePicker = function(x) {
      if (!arguments.length) return scalePicker;
      scalePicker = x;

      return exports;
    };

    exports.selectionWindow = function(x){
      if (!arguments.length) return selectionWindow;
      selectionWindow = x;

      return exports;
    }

    return exports;
  }

  function gallery2pdf(){
    var win = displayWindow(300);
    win.html("<h2>"+texts.loading+"</h2>");
    var close = d3.select(win.node().parentNode).select(".close-button")
      .style("display","none");

    galleryItems.classed("fade-labels",false)

    var margin = 10,
        w = galleryItems.node().offsetWidth + margin*2
        h = galleryItems.node().offsetHeight + margin*2;
    if(height>h){
      h = height;
    }
    var doc = new jsPDF({
      orientation: (w>h)?"l":"p",
      unit: 'pt',
      format: [w,h]
    });

    doc.html(gallery.node(), {
       callback: function (doc) {
         doc.save(d3.select("head>title").text()+".pdf");
         galleryItems.classed("fade-labels",true)
         close.dispatch("click");
       },
       x: margin,
       y: margin
    });
  }

  function nodes2xlsx(){
      var opt = getSelectOptions(),
          data = nodes.filter(filterNodes).map(function(d){
            return opt.map(function(dd){
                     var txt = d[dd];
                     if(txt == null){
                       return "";
                     }
                     if(typeof txt == 'number'){
                       return formatter(txt);
                     }
                     return String(txt);
                   });
          });
      data.unshift(opt);
      if(data.length != 0){
        downloadExcel({items: data}, d3.select("head>title").text());
      }
  }
} // gallery function end

if(typeof multiGraph == 'undefined'){
  window.onload = function(){
    gallery(JSON.parse(d3.select("#data").text()));
  };
}
