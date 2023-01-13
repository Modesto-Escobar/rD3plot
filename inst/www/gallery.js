function gallery(Graph){

  var docSize = viewport(),
      width = docSize.width,
      height = docSize.height,
      options = Graph.options,
      itemsFiltered = false,
      zoomRange = [0.1, 10],
      gridHeight = 60,
      currentGridHeight = gridHeight,
      colorScale,
      pagination = false,
      treeParent = [];

  options.defaultColor = defaultColorManagement(options.defaultColor);
  options.colorScalenodeColor = "RdWhGn"; // default linear scale

  var splitMultiVariable = function(d){
      for(var p in d) {
        if(p!=options.nodeName && p!=options.nodeText && p!=options.nodeInfo){
          if(typeof d[p] == "string" && d[p].indexOf("|")!=-1){
            var aux = d[p].split("|");
            d[p] = aux.map(function(d){ return d=="" ? null : (isNaN(parseInt(d)) ? d : +d); });
          }
        }
      }
  }

  var nodes = [],
      len = Graph.nodes[0].length;
  for(var i = 0; i<len; i++){
      var node = {};
      Graph.nodenames.forEach(function(d,j){
        node[d] = Graph.nodes[j][i];
      })
      splitMultiVariable(node);
      node[options.nodeName] = String(node[options.nodeName]);
      nodes.push(node);
  }

  if(nodes.length>1000){
    pagination = 1;
  }

  options.showTopbar = showControls(options,1);
  options.showExport = showControls(options,2);
  options.showExport2 = showControls(options,3);
  options.showTable = showControls(options,4);

  var topFilterInst = topFilter()
    .data(nodes)
    .datanames(getSelectOptions(sortAsc))
    .displayGraph(displayGraph);

  var frequencyBars = false;
  if(options.frequencies){
      options.frequencies = false;
      frequencyBars = displayFreqBars()
        .nodenames(getSelectOptions().filter(function(d){ return d!=options.nodeName; }))
        .updateSelection(displayGraph)
        .filterHandler(topFilterInst)
        .applyColor(function(val){
          colorSelect.property("value",val)
                     .dispatch("change");
        })
  }

  d3.selectAll("html, body")
    .style("height","100%")
    .style("width","100%")

  var body = d3.select("body");

  if(options.cex){
      body.style("font-size", 10*options.cex + "px")
  }else{
      options.cex = 1;
  }

  var infoPanel = displayInfoPanel();
  body.call(infoPanel);

  body.on("keydown.shortcut",function(){
    if(!body.select("body > div.window-background").empty()){
      return;
    }
    if(d3.event.ctrlKey || d3.event.metaKey){
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
          selectAllItems();
          return;
        case "o":
          d3.event.preventDefault();
          body.select("button.tableselection").dispatch("click");
          return;
      }
    }
  });

  var galleryBox = body.append("div")
        .attr("class","gallery-box"+(options.showTopbar ? "" : " hide-topbar"))

  // top bar
  var topBar = displayTopBar()
    .title(options.main);
  if(options.multipages){
    topBar.goback(true);
  }
  galleryBox.call(topBar);

  if(options.help){
      topBar.addIcon(iconButton()
        .alt("help")
        .width(24)
        .height(24)
        .src(b64Icons.help)
        .title(texts.showHelp+" (ctrl + h)")
        .job(function(){ infoPanel.changeInfo(options.help); }));
  }

  if(options.showExport){
    topBar.addIcon(iconButton()
        .alt("pdf")
        .width(24)
        .height(24)
        .src(b64Icons.pdf)
        .title(texts.pdfexport)
        .job(gallery2pdf));
  }

  if(options.showTable){
    topBar.addIcon(iconButton()
        .alt("table")
        .width(24)
        .height(24)
        .src(b64Icons.table)
        .title(texts.Table)
        .job(displayTable));
  }

  if(frequencyBars){
      topBar.addIcon(iconButton()
        .alt("freq")
        .width(24)
        .height(24)
        .src(b64Icons.chart)
        .title("frequencies")
        .job(function(){
          options.frequencies = true;
          displayGraph();
        }));
  }

  // node multi search
  topBar.addBox(displayMultiSearch()
        .data(itemsFiltered ? itemsFiltered : nodes)
        .column(options.nodeLabel)
        .updateSelection(displayGraph)
        .updateFilter(filterSelection));

  // count elements
  var elementsCount;
  topBar.addBox(function(box){
    box.append("h3").text(texts.Elements + ":")
    elementsCount = box.append("span").attr("class","elements-count");
  });

  // node order
  topBar.addBox(function(box){
    topOrder(box,nodes,displayGraph);
  });

  // colors
  var colorSelect;
  topBar.addBox(function(box){
    box.append("h3").text(texts.Color + ":")

    colorSelect = box.append("div")
      .attr("class","select-wrapper")
    .append("select")
    .on("change",function(){
      options.nodeColor = this.value;
      if(options.nodeColor=="_none_"){
        delete options.nodeColor;
      }else if(dataType(nodes,options.nodeColor)=="number"){
        displayPicker(options,"nodeColor",displayGraphColor);
      }
      displayGraphColor();
    })
    var opt = getSelectOptions(sortAsc).map(function(d){ return [d,d]; });
    opt.unshift(["_none_","-"+texts.none+"-"]);
    colorSelect.selectAll("option")
        .data(opt)
      .enter().append("option")
        .property("value",function(d){ return d[0]; })
        .text(function(d){ return d[1]; })
        .property("selected",function(d){ return d[0]==options.nodeColor ? true : null; })
  });

  // node filter in topBar
  topBar.addBox(topFilterInst);

  // Select all / none
  topBar.addBox(function(box){
    box.append("button")
      .attr("class","primary")
      .text(texts.selectallnone)
      .on("click",function(){
        if(nodes.filter(function(n){ return n.selected; }).length==(itemsFiltered ? itemsFiltered.length : nodes.length)){
          deselectAllItems();
        }else{
          selectAllItems();
        }
      })
  })

  // filter selection
  topBar.addBox(function(box){
    box.append("button")
      .attr("class","primary")
      .text(texts.filterselection)
      .on("click",filterSelection)
  });

  var content = galleryBox.append("div")
        .attr("class","gallery-content");

  var descriptionPanel = false;
  if(options.description || frequencyBars){
    var displayInDescription = function(info){
        descriptionPanel.select(".description-content").html(info ? info : options.description);
        descriptionPanel.select(".close-button").style("display",info ? "block" : "none");
        content.classed("hide-description",false);
    }

    descriptionPanel = content.append("div")
        .attr("class","description-panel")
    descriptionPanel.append("div")
      .attr("class","close-button")
      .on("click",function(){
        if(options.description){
          displayInDescription();
        }else{
          content.classed("hide-description",true);
        }
        if(frequencyBars){
          options.frequencies = false;
        }
      })
    descriptionPanel.append("div")
      .attr("class","description-content");
    if(options.description){
      displayInDescription();
    }else{
      content.classed("hide-description",true);
    }
  }

  var gallery = content.append("div")
        .attr("class","grid-gallery");

  if(pagination){
    gallery.on("scroll",function(){
      if(this.scrollTop==0){
        pagination = 1;
        displayGraph();
      }else if((this.scrollTop + this.clientHeight >= (this.scrollHeight-(this.clientHeight*2))) && (galleryItems.selectAll("div.item").size()<(itemsFiltered ? itemsFiltered.length : nodes.length))) {
        pagination++;
        displayGraph();
      }
    })
  }

  if(descriptionPanel && options.descriptionWidth){
      descriptionPanel.style("width",options.descriptionWidth+"%")
      gallery.style("width",(100-options.descriptionWidth)+"%")
  }

  gallery.on("click",deselectAllItems);

  if(!options.hasOwnProperty("zoom"))
    options.zoom = 1;

  var getCurrentHeight = function(k){ return gridHeight * k; };

  var zoom = d3.zoom()
      //.filter(function(){ return d3.event.ctrlKey || d3.event.metaKey; })
      .scaleExtent(zoomRange)
      .on("zoom", function(){
        currentGridHeight = getCurrentHeight(d3.event.transform.k);
        displayGraph();
      })

  //gallery.call(zoom);

  var galleryItems = gallery.append("div")
        .attr("class","gallery-items fade-labels")
        .classed("rounded-items",options.roundedItems);

  var legend = displayLegend()
                 .type("Color")
                 .displayGraph(displayGraph)
                 .filterHandler(topFilterInst)
                 .displayScalePicker(function(){
                   displayPicker(options,"nodeColor",displayGraphColor);
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
  }else{
    var footer = galleryBox.append("div")
      .attr("class","footer")
    footer.append("img")
      .attr("height",20)
      .style("vertical-align","middle")
      .attr("src",b64Icons.netcoinblack)
    footer.append("span")
      .text("netCoin")
  }

  if(options.help && options.helpOn){
    infoPanel.changeInfo(options.help);
  }

  if(options.itemsPerRow){
    options.zoom = 1;

    var currentItemsPerRow = options.itemsPerRow,
        prevk = options.zoom;
    
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
          return Math.floor((gallery.node().offsetWidth-24) / currentItemsPerRow)-18;
    }

    currentGridHeight = getCurrentHeight(1);
    gridHeight = currentGridHeight;
    resetZoom();
  }else{
    resetZoom();
  }

  if(typeof tutorialTour != "undefined"){
    tutorialTour(options);
  }

  function resetZoom(){
    gallery.call(zoom.transform,d3.zoomIdentity.scale(options.zoom));
  }

  function displayGraphColor(){
    colorScale = undefined;
    displayGraph();
  }

  function displayGraph(newfilter){

    if(typeof newfilter != "undefined"){
      nodes.forEach(function(node){ delete node.selected; });
      itemsFiltered = newfilter;
    }

    var filteredData = itemsFiltered ? itemsFiltered : nodes;

    if(Graph.tree){
      galleryBox.select(".topbar > .breadcrumbs").remove();
      if(treeParent.length){
        var breadcrumbs = galleryBox.select(".topbar").append("div")
          .attr("class","breadcrumbs")
          .style("padding","4px 12px")
        breadcrumbs.append("span")
          .text("home")
          .style("cursor","pointer")
          .style("color",basicColors.mediumBlue)
          .on("click",function(){
            treeParent = [];
            displayGraph();
          })
        treeParent.forEach(function(parent,i){
          breadcrumbs.append("span").text(" > ")
          breadcrumbs.append("span").text(parent)
            .style("cursor","pointer")
            .style("color",basicColors.mediumBlue)
            .attr("index",i)
            .on("click",function(){
              var idx = +d3.select(this).attr("index");
              treeParent = treeParent.filter(function(e,j){
                return j<=idx;
              });
              displayGraph();
            })
        });
      }

      filteredData = filteredData.filter(function(d){
        if(!treeParent.length){
          return Graph.tree[1].indexOf(d[options.nodeName])==-1;
        }
        return Graph.tree[0].filter(function(e,i){ return treeParent[treeParent.length-1]==e && Graph.tree[1][i]==d[options.nodeName]; }).length;
      });
    }

    elementsCount.text(filteredData.length);

    var orderedData = filteredData.slice();
    if(options.order){
      orderedData.sort(function(a,b){
        var aa = a[options.order],
            bb = b[options.order];
        return compareFunction(aa,bb,options.rev);
      })
    }

    var displayData = orderedData;
    if(pagination){
      var limit  = Math.max(1000,(width/(currentGridHeight+12) * height/(currentGridHeight+12)));
      displayData = orderedData.filter(function(d,i){ return i<pagination*limit; });
    }

    var items = galleryItems.selectAll(".item").data(displayData, function(d){ return d[options.nodeName]; });

    var itemsEnter = items.enter()
          .append("div").attr("class","item")
    var imgWrapper = itemsEnter
        .append("div")
          .attr("class","img-wrapper")
    if(options.imageItems){
      imgWrapper.append("img")
          .on("load", !options.roundedItems && !options.itemsPerRow ? function(){
            this.ratio = 1;
            if(this.complete && this.naturalHeight!==0){
              this.ratio = this.naturalWidth / this.naturalHeight;
            }
            d3.select(this.parentNode.parentNode).style("width",(currentGridHeight*this.ratio)+"px");
          } : null)
          .attr("src",function(n){ return n[options.imageItems]; });
    }

    itemsEnter.append("span")
        .attr("title",function(d){ return d[options.nodeLabel]; })
        .text(function(d){ return d[options.nodeLabel]; })

    items.exit().remove();

    var itemsUpdate = itemsEnter.merge(items);
    itemsUpdate.classed("selected",function(n){ return n.selected; });

    itemsUpdate.order();

    itemsUpdate
      .select(".img-wrapper")
        .style("height",currentGridHeight+"px")
        .style("border-width", typeof options.nodeBorder == "number" ? options.nodeBorder+"px" : null);

    itemsUpdate.style("width",function(){
      var img = this.querySelector("img"),
          ratio = img && img.ratio ? img.ratio : 1;
      return (currentGridHeight*ratio)+"px";
    });

    itemsUpdate.selectAll(".item > span").style("font-size",(currentGridHeight/72)+"em")

    itemsUpdate.style("cursor","pointer")
      .on("click",function(n){
          d3.event.stopPropagation();
          if(d3.event.ctrlKey || d3.event.metaKey){

            if(n.selected){
              delete n.selected;
            }else{
              n.selected = true;
            }
          }else if(d3.event.shiftKey){
            n.selected = true;
            var ext = d3.extent(displayData.map(function(d,i){ return [i,d.selected]; }).filter(function(d){ return d[1]; }).map(function(d){ return d[0]; }));
            d3.range(ext[0],ext[1]).forEach(function(i){
              displayData[i].selected = true;
            });
          }else{
            displayData.forEach(function(n){ delete n.selected; });
            n.selected = true;
          }
          if(options.nodeInfo){
            if(descriptionPanel && !options.frequencies){
              displayInDescription(n[options.nodeInfo]);
            }else{
              infoPanel.changeInfo(n[options.nodeInfo]);
            }
            body.select(".panel-template.auto-color").datum(n);
          }
          if(options.nodeText && n[options.nodeText]){
            if(body.selectAll(".tooltip").filter(function(d){
              return d==n[options.nodeName];
            }).empty()){
              var tooltip = body.append("div")
              .attr("class","tooltip")
              .datum(n[options.nodeName])
              .style("cursor","grab")
              .style("display","block")
              .html(n[options.nodeText])
              tooltip.append("div")
              .attr("class","close-button")
              .on("click",function(){
                d3.event.stopPropagation();
                tooltip.remove();
              })
              tooltip.call(d3.drag()
              .on("start",function(){
                tooltip.style("cursor","grabbing");
                tooltip.datum(d3.mouse(tooltip.node()));
              })
              .on("drag",function(){
                var coor = d3.mouse(body.node().parentNode),
                    coor2 = tooltip.datum();
                coor[0] = coor[0]-coor2[0];
                coor[1] = coor[1]-coor2[1];
                tooltip
                 .style("top",(coor[1])+"px")
                 .style("left",(coor[0])+"px")
              })
              .on("end",function(){
                tooltip.style("cursor","grab");
                tooltip.datum(null);
              })
              );
              var coor = d3.mouse(body.node());
              if(coor[0]>(body.node().offsetWidth/2)){
                tooltip
                  .style("left",(coor[0]-tooltip.node().offsetWidth-10)+"px")
              }else{
                tooltip
                  .style("left",(coor[0]+10)+"px")
              }
              if(coor[1]>(body.node().offsetHeight/2)){
                tooltip
                  .style("top",(coor[1]-tooltip.node().offsetHeight-10)+"px")
              }else{
                tooltip
                  .style("top",(coor[1]+10)+"px")
              }
              tooltip.select(".tooltip > .info-template > h2.auto-color").style("background-color",function(d){
                if(options.nodeColor){
                  return applyColorScale(colorScale,n[options.nodeColor]);
                }
                return options.defaultColor;
              })
            }
          }
          displayGraph();
      })
      .on("dblclick", Graph.tree ? function(d){
        if(Graph.tree[0].indexOf(d[options.nodeName])!=-1){
          nodes.forEach(function(node){ delete node.selected; });
          treeParent.push(d[options.nodeName]);
          displayGraph();
        }
      } : null)

    if(options.nodeBorder && Graph.nodenames.indexOf(options.nodeBorder)!=-1 && dataType(nodes,options.nodeBorder)=="number"){
      var borderScale = d3.scaleLinear()
            .range([1,5])
            .domain(d3.extent(nodes,function(d){ return d[options.nodeBorder]; }));
      itemsUpdate.select(".img-wrapper").style("border-width",function(d){
        return borderScale(d[options.nodeBorder]) + "px";
      })
    }

    if(!colorScale && options.nodeColor){
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
            .clamp(true)
        }
        if(type=="string"){
          colorScale = d3.scaleOrdinal()
            .range(categoryColors)
            .domain(d3.map(nodes,function(node){
              return node[options.nodeColor];
            }).keys())
        }
        if(type=="object"){
          var values = [];
          nodes.forEach(function(node){
            if(node[options.nodeColor]){
              if(typeof node[options.nodeColor] == "string"){
                values.push(node[options.nodeColor]);
              }else{
                node[options.nodeColor].forEach(function(v){
                  values.push(v);
                })
              }
            }
          });
          colorScale = d3.scaleOrdinal()
            .range(categoryColors)
            .domain(d3.set(values).values())
        }
      }
    }
    legend
      .data(orderedData)
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
      itemsUpdate.select(".img-wrapper").style("background-color",function(d){
        if(options.nodeColor){
            return applyColorScale(colorScale,d[options.nodeColor]);
        }
        return options.defaultColor;
      })
    }

    var panelTemplate = body.select(".panel-template.auto-color");
    if(!panelTemplate.empty()){
      var color = options.nodeColor && panelTemplate.datum() ? applyColorScale(colorScale,panelTemplate.datum()[options.nodeColor]) : options.defaultColor;
      if(panelTemplate.classed("mode-1")){
        panelTemplate.style("background-color",color);
      }else if(panelTemplate.classed("mode-2")){
        panelTemplate.select(".panel-template > h2").style("background-color",color);
      }
    }

    if(descriptionPanel && frequencyBars && options.frequencies){
      frequencyBars
            .nodes(orderedData)
            .nodeColor(options.nodeColor)
            .colorScale(colorScale);
      content.classed("hide-description",false);
      frequencyBars(descriptionPanel.select(".description-content").html(""));
      descriptionPanel.select(".close-button").style("display","block");
    }

    function applyColorScale(scale, value){
      if(value == null){
        return basicColors.white;
      }
      if(typeof value == "object"){
        value = value[0];
      }
      return scale(value);
    }
  }

  function selectAllItems(){
    (itemsFiltered ? itemsFiltered : nodes).forEach(function(n){
        n.selected = true;
    });
    displayGraph();
  }

  function deselectAllItems(){
    nodes.forEach(function(n){ delete n.selected; });
    displayGraph();
    if(descriptionPanel && options.description && !options.frequencies){
      displayInDescription();
    }
    body.selectAll(".tooltip").remove();
  }

  function filterSelection(){
      var values = nodes.filter(function(n){
          return n.selected;
        })
        .map(function(n){
          return n[options.nodeName];
        });
      if(!values.length){
        topFilterInst.removeFilter();
      }else{
        topFilterInst.newFilter(options.nodeName,values);
      }
  }

  function getSelectOptions(order){
    return Graph.nodenames.filter(function(d){
          return d.substring(0,1)!="_" && d!=options.nodeText && d!=options.nodeInfo && (!options.imageItems || d!=options.imageItems); 
        })
        .sort(order ? order : function(){ return 0; });
  }

  function topOrder(div,data,displayGraph){

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

  function displayLegend(){
    var value,
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

      displayShowPanelButton(parent,function(){
        parent.classed("hide-legend",false);
        contentHeight(parent);
      })

      // ordinal scale
      if(scale.name=="i"){
        parent.select("div.scale").remove();

        var legends = parent.select(".legends");

        var initialize = false;
        if(legends.empty()){
          initialize = true;

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

        legends.select(".goback").style("display", itemsFiltered===false ? "none" : null)

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

        var itemsData = getColumnValues(data,value);

        var items = legend.selectAll(".legend-item")
              .data(itemsData,String)

        var itemsEnter = items.enter()
        .append("div")
            .attr("class","legend-item")
            .style("cursor","pointer")
            .on("click",function(v){
              var checked = d3.select(this).select(".legend-check-box").classed("checked");
              data.forEach(function(d){
                if(Array.isArray(d[value])){
                  if(d[value].indexOf(v)!=-1){
                    d.selected = !checked;
                  }
                }else{
                  if(String(d[value])==v){
                    d.selected = !checked;
                  }
                }
              })
              displayGraph();
            })

        itemsEnter.append("div")
        .attr("class","legend-check-box")

        itemsEnter.append("div")
        .attr("class","legend-bullet")
        .style("background-color",function(value){
          return scale(value);
        })

        itemsEnter.append("span")
        .text(stripTags)

        items.exit().remove();

        items.order();

        var itemsUpdate = itemsEnter.merge(items);
        itemsUpdate.select(".legend-check-box")
        .classed("checked",function(v){
          var aux = data.filter(function(d){
            if(Array.isArray(d[value])){
              return d[value].indexOf(v)!=-1;
            }else{
              return String(d[value])==v;
            }
          });
          if(aux.length){
            return aux.filter(function(d){
              return !d.selected;
            }).length==0;
          }
          return false;
        })

        contentHeight(parent);

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
        parent.select("div.linear-scale").remove();
        displayLinearScale(parent.append("div").attr("class","linear-scale"),
          value,
          scale.range(),
          scale.domain(),
          scalePicker,
          selectionWindow,
          function(){ parent.classed("hide-legend",true); },
          function(d){
            scale.domain(d);
            displayGraph();
          }
        );
      }
    }
    
    function contentHeight(parent){
      if(!parent.classed("hide-legend")){
        var legends = parent.select(".legends");
        var legendsHeight = parent.node().parentNode.offsetHeight-250;
        legends.select(".legends-content").style("height",legends.select(".legend").node().offsetHeight>legendsHeight ? legendsHeight+"px" : null)
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

  function displayTable(){
    if(!body.select("body > .tables").empty()){
      alert("Tables are already displayed");
      return;
    }

    body.classed("maximize-table",true);

    var tables = body.append("div")
            .attr("class","tables")
            .style("height",(docSize.height-20)+"px")

    var header = tables.append("div")
            .attr("class","table-header")

    header.append("div")
            .attr("class","close-button")
            .on("click",closeTable)

    var onlySelectedData = header.append("div")
      .attr("class","only-selected-data")
      .on("click",function(){
        onlySelectedCheck.classed("checked",!onlySelectedCheck.classed("checked"));
        tableInst.onlySelectedData(onlySelectedCheck.classed("checked"));
        tables.call(tableInst);
      })
    onlySelectedData.append("span")
        .text(texts.showonlyselecteditems+" ")
    var onlySelectedCheck = onlySelectedData.append("div")
        .attr("class","legend-check-box")

    header = header.append("div")
          .attr("class","inline-elements")

    header.append("div")
          .attr("class","table-title");

    if(options.showExport2){
      header.call(iconButton()
            .alt("xlsx")
            .float("none")
            .src(b64Icons.xlsx)
            .title(texts.downloadtable)
            .job(tables2xlsx))
            .select("img")
              .style("margin-right","24px")
              .style("margin-bottom","-2px")
    }

    header.append("input")
      .attr("type", "text")
      .attr("placeholder",texts.searchintable)
      .on("keyup",function(){
        var txt = d3.select(this).property("value");
        if(txt.length>1){
          txt = new RegExp(txt,'i');
          var columns = tableInst.columns();
          tableInst.data().forEach(function(node){
            delete node.selected;
            var i = 0;
            while(!node.selected && i<columns.length){
              if(String(node[columns[i++]]).match(txt))
                node.selected = true;
            }
          });
          onlySelectedCheck.classed("checked",true);
          tableInst.onlySelectedData(true);
          tables.call(tableInst);
          displayGraph();
        }
      })

    header.append("button")
            .attr("class","primary tableselection disabled")
            .text(texts.tableselection)
            .on("click",function(){
              selectFromTable();
              onlySelectedCheck.classed("checked",true);
              tableInst.onlySelectedData(true);
              tables.call(tableInst);

              displayGraph();
            })
            .attr("title","ctrl + o")

    header.append("button")
            .attr("class","primary tablefilter disabled")
            .text(texts.filter)
            .on("click",function(){
              selectFromTable();
              filterSelection();
              tableInst.data(itemsFiltered ? itemsFiltered : nodes);
              tables.call(tableInst);
              clearButton.classed("disabled",!itemsFiltered);
            })

    var clearButton = header.append("button")
      .attr("class","primary-outline clear disabled")
      .text(texts.clear)
      .on("click", function(){
        topFilterInst.removeFilter();
        tableInst.data(nodes);
        tables.call(tableInst);
        clearButton.classed("disabled",true);
      });

    var table = tables.append("div")
            .attr("class","table-container")

    var tableInst = tableWrapper()
            .data(itemsFiltered ? itemsFiltered : nodes)
            .onlySelectedData(false)
            .columns(getSelectOptions())
            .update(function(){
              tables.selectAll("button.primary.tableselection, button.primary.tablefilter")
                .classed("disabled",tables.selectAll("tr.selected").empty());
            })

    tables.call(tableInst);
    clearButton.classed("disabled",!itemsFiltered);

    function closeTable(){
      body.classed("maximize-table",false);
      tables.remove();
    }

    function tables2xlsx(){
      var columns = tableInst.columns(),
          items = [columns];

      tableInst.data().forEach(function(d){
        if(!tableInst.onlySelectedData() || d.selected){
          items.push(columns.map(function(col){ return tableInst.renderCell()(d,col); }));
        }
      })

      if(items.length == 1){
        displayWindow()
            .append("p")
              .attr("class","window-message")
              .text(texts.noitemsselected);
      }else{
        downloadExcel({elements: items}, d3.select("head>title").text());
      }
    }

    function selectFromTable(){
      var names = [],
          index = 0,
          table = tables.select("table"),
          trSelected = table.selectAll("tr.selected");
      if(!trSelected.empty()){
            table.selectAll("th").each(function(d,i){
              if(this.textContent == options.nodeName)
                index = i+1;
            })

            trSelected
              .each(function(){
                names.push(d3.select(this).select("td:nth-child("+index+")").text());
              })
              .classed("selected",false);

            nodes.forEach(function(d){
              d.selected = names.indexOf(d[options.nodeName]) != -1;
            });
      }
    }
  }
} // gallery function end

if(typeof multiGraph == 'undefined'){
  window.onload = function(){
    gallery(JSON.parse(d3.select("#data").text()));
  };
}
