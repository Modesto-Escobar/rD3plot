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
      pagination = false;

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

  var Tree = false;
  if(Graph.tree){
    Graph.tree = Graph.tree.map(function(d){
      return d.map(String);
    });
    Tree = {};
    if(options.deepTree){
      Tree.path = [];
      Tree.typeFilter = options.nodeTypes[0];
      Tree.type = "deepextended";
    }else{
      Tree.treeParent = [];
      Tree.type = "simple";
      if(options.nodeTypes){
        Tree.type = "extended";
        Tree.history = [];
        Tree.typeFilter = "";
        if(options.initialType){
          if(options.nodeTypes.indexOf(options.initialType)!=-1){
            Tree.typeFilter = options.initialType;
          }else{
            delete options.initialType
          }
        }
      }
    }

    if(Array.isArray(options.roundedItems)){
      roundedItems = function(){
        return Tree.typeFilter ? options.roundedItems[options.nodeTypes.indexOf(Tree.typeFilter)] : false;
      }
    }

    Tree.resetOptions = function(){
      Tree.breadcrumbs.empty();
      ['path','treeParent','typeFilter','history'].forEach(function(k){
        if(Tree.hasOwnProperty(k)){
          if(typeof Tree[k] == "string"){
            Tree[k] = "";
          }else{
            Tree[k] = [];
          }
        }
      });
    }

    if(Tree.type == "deepextended"){
      Tree.getTreePath = function(name,level,newlevel){
        return Graph.tree.map(function(d,k){
                      return [d[0],k];
                    }).filter(function(d){
                      if(!Tree.path.length){
                        return d[0] == name;
                      }else{
                        if(level>=newlevel){
                          var tmpPath = Graph.tree.filter(function(d,k){ return Tree.path.indexOf(k)!=-1 && d.indexOf(name)!=-1; })[0];
                          var end = level>newlevel ? newlevel+1 : newlevel;
                          return tmpPath.slice(0,end).join("|") == Graph.tree[d[1]].slice(0,end).join("|");
                        }else{
                          return Tree.path.indexOf(d[1])!=-1 && Graph.tree[d[1]].indexOf(name)!=-1;
                        }
                      }
                    }).map(function(d){
                      return d[1];
                    });
      }
    }

    Tree.popButtons = function(node){
      var name = node[options.nodeName],
          type = node[options.nodeType],
          types = [];

      if(Tree.type=="extended"){
        var loadLowerTypes = function(nam){
          Graph.tree[3].forEach(function(t,i){
            if(Graph.tree[0][i]==nam){
              types.push(t);
              loadLowerTypes(Graph.tree[1][i]);
            }
          });
        };
        var loadSiblingTypes = function(nam){
          var gparents = Graph.tree[0].filter(function(e,i){ return nam==Graph.tree[1][i]; });
          Graph.tree[3].forEach(function(t,i){
            if(gparents.indexOf(Graph.tree[0][i])!=-1){
              types.push(t);
            }
          });
        };
        var loadUpperTypes = function(nam){
          Graph.tree[2].forEach(function(t,i){
            if(Graph.tree[1][i]==nam){
              types.push(t);
              loadUpperTypes(Graph.tree[0][i]);
            }
          });
        };
                
        loadLowerTypes(name);
        loadSiblingTypes(name);
        loadUpperTypes(name);
        types = d3.set(types).values();
      }else if(Tree.type=="deepextended"){
        types = options.nodeTypes;
      }else{
        types = Graph.tree[0].indexOf(name)!=-1 ? ["children"] : [];
      }

      if(!types.length){
        return;
      }

      var callback;

      if(Tree.type=="extended"){
        callback = function(t){
          Tree.treeParent = [name];
          Tree.typeFilter = t;
          Tree.history.push([Tree.treeParent,Tree.typeFilter]);
          updateSelectOptions();
        }
      }else if(Tree.type=="deepextended"){
        callback = function(t,i){
          var current = name;
          var level = options.nodeTypes.indexOf(type);
          Tree.typeFilter = t;
          updateSelectOptions();
          Tree.path = Tree.getTreePath(current,level,i);
        }
      }else{
        callback = function(){
          nodes.forEach(function(n){ delete n.selected; });
          Tree.treeParent.push(name);
          deselectAllItems();
        }
      }

      var popup = body.select("body > .buttons-popup");
      if(!popup.empty()){
        popup.remove();
      }
      popup = body.append("div")
            .attr("class","buttons-popup")
            .attr("item",name);
      appendButtons(popup);
      mousePosition(popup);

      function appendButtons(sel){
        types.forEach(function(t,i){
          sel.append("button")
          .attr("class","primary")
          .text(t)
          .on("click",function(){
            topFilterInst.removeFilter();
            callback(t,i);
            sel.remove();
            Tree.breadcrumbs.empty();
            deselectAllItems();
          })
        })
      }
    }

    Tree.treeRelatives = function(node){
      var name = node[options.nodeName];

      var tooltip = body.selectAll(".tooltip").filter(function(){ return d3.select(this).attr("nodeName")==name; });
      if(tooltip.size()==1){
        tooltip.selectAll(".info-template .tree-relatives > span").each(function(){
          var self = d3.select(this),
              n = nodes.filter(function(n){ return n[options.nodeName]==self.attr("nodename"); })[0];
          if(n[options.nodeText]){
            self.style("cursor","pointer")
              .on("click",function(){
                displayTooltip(n);
                Tree.treeRelatives(n);
              })
          }
        })
      }
    }

    Tree.cleanButtonsPopup = function(){
      var popup = body.select("body > .buttons-popup");
      if(!popup.empty()){
        var names = selectedNames();
        var item = popup.attr("item");
        if(names.indexOf(item)==-1){
          popup.remove();
        }
      }
    }

    function BreadCrumbs(sel){
      this.breadcrumbs = sel.append("div")
              .attr("class","breadcrumbs")
    }

    BreadCrumbs.prototype = {
      empty: function(){
        this.breadcrumbs.selectAll("*").remove();
      },
      isEmpty: function(){
        return this.breadcrumbs.selectAll("*").empty();
      },
      addHome: function(callback){
        var thiz = this;
        if(Tree.history){
          thiz.breadcrumbs.append("button")
          .attr("class","primary return")
          .html("&larr;")
          .attr("title",texts.goback)
          .on("click",function(){
            topFilterInst.removeFilter();
            Tree.history.pop();
            if(!Tree.history.length){
              Tree.treeParent = [];
              Tree.typeFilter = options.initialType ? options.initialType : "";
              Tree.history = [];
            }else{
              Tree.treeParent = Tree.history[Tree.history.length-1][0];
              Tree.typeFilter = Tree.history[Tree.history.length-1][1];
            }
            updateSelectOptions();
            thiz.empty();
            deselectAllItems();
          })
        }
        thiz.breadcrumbs.append("button")
          .attr("class","primary home")
          .text(texts.home)
          .attr("title",texts.home)
          .on("click",function(){
            topFilterInst.removeFilter();
            callback();
            thiz.empty();
            deselectAllItems();  
          })
      },
      addPath: function(path,callback){
        var thiz = this;
        path.forEach(function(parents,i){
            thiz.breadcrumbs.append("span").text(" > ");
            if(!Array.isArray(parents)){
              parents = [parents];
            }
            parents.forEach(function(parent,j){
              if(j){
                thiz.breadcrumbs.append("span").text(" | ");
              }
              var label = options.nodeLabel ? nodes.filter(function(dd){
                    return dd[options.nodeName]==parent;
                  })[0][options.nodeLabel] : parent,
                  text = thiz.breadcrumbs.append("span").text(label);
              if(callback){
                text.style("cursor","pointer")
                .style("color",basicColors.mediumBlue)
                .attr("index",i)
                .attr("index2",j)
                .on("click",function(){
                  var idx = +d3.select(this).attr("index"),
                      idx2 = +d3.select(this).attr("index2");
                  callback(idx,idx2);
                  thiz.empty();
                  deselectAllItems();
                })
              }
            });
          });
      },
      addButton: function(text,callback){
        var thiz = this;
        thiz.breadcrumbs.append("button")
          .attr("class","primary")
          .text(text)
          .on("click",function(){
            topFilterInst.removeFilter();
            callback();
            thiz.empty();
            deselectAllItems();
            resetZoom();
          })
        thiz.updateSelectedType();
      },
      updateSelectedType: function(){
        var thiz = this;
        thiz.breadcrumbs.selectAll("button.primary").each(function(){
          var button = d3.select(this);
          button.classed("disabled",!Tree.treeParent.length && Tree.typeFilter && Tree.typeFilter == button.text());
        });
      }
    }

    Tree.applyExtendedFilter = function(treeParent,typeFilter){
        var parents = [],
            children = [],

            filter = function(){ return true },
            getParents = function(name){
              for(var i = 0; i<Graph.tree[0].length; i++){
                if(Graph.tree[1][i]==name){
                  parents.push(Graph.tree[0][i]);
                  getParents(Graph.tree[0][i]);
                }
              }
            },
            getChildren = function(name){
              for(var i = 0; i<Graph.tree[0].length; i++){
                if(Graph.tree[0][i]==name){
                  children.push(Graph.tree[1][i]);
                  getChildren(Graph.tree[1][i]);
                }
              }
            }
        if(treeParent.length){

          filter = function(d){
            if(!Tree.intersection && treeParent.indexOf(d[options.nodeName])!=-1 && (!typeFilter || typeFilter==d[options.nodeType] || (Array.isArray(d[options.nodeType]) && d[options.nodeType].indexOf(typeFilter)!=-1))){
              return true;
            }
            parents = [];
            children = [];
            getParents(d[options.nodeName]);
            getChildren(d[options.nodeName]);
            var gparents = Graph.tree[0].filter(function(e,i){ return treeParent.indexOf(Graph.tree[1][i])!=-1; });
            if(treeParent.length>1 && Tree.intersection){
              gparents = d3.set(gparents).values().filter(function(e,i){
                return gparents.filter(function(d){ return d==e; }).length==treeParent.length;
              });
              if(intersection(parents,treeParent).length!=treeParent.length && intersection(children,treeParent).length!=treeParent.length && !intersection(parents,gparents).length){
                return false;
              }
            }else{
              gparents = d3.set(gparents).values();
              if(!intersection(parents,treeParent).length && !intersection(children,treeParent).length && !intersection(parents,gparents).length){
                return false;
              }
            }
            if(typeFilter){
              var typesparent = Graph.tree[2].filter(function(e,i){ return treeParent.indexOf(Graph.tree[1][i])!=-1 && Graph.tree[0][i]==d[options.nodeName]; }),
                  typeschildren = Graph.tree[3].filter(function(e,i){ return treeParent.indexOf(Graph.tree[0][i])!=-1 && Graph.tree[1][i]==d[options.nodeName]; }),
                  typessiblings = Graph.tree[3].filter(function(e,i){ return gparents.indexOf(Graph.tree[0][i])!=-1 && Graph.tree[1][i]==d[options.nodeName]; }),
                  types = d3.set(d3.merge([typesparent,typeschildren,typessiblings])).values();
              if(types.indexOf(typeFilter)==-1){
                return false;
              }
            }
            if(Graph.tree[0].filter(function(e,i){ return (gparents.indexOf(e)!=-1 || parents.indexOf(e)!=-1) && Graph.tree[1][i]==d[options.nodeName]; }).length){
              return true;
            }

            if(Graph.tree[1].filter(function(e,i){ return children.indexOf(e)!=-1 && Graph.tree[0][i]==d[options.nodeName]; }).length){

              return true;
            }
            return false;
          };
        }else if(typeFilter){
          filter = function(d){
            var typesparent = Graph.tree[2].filter(function(e,i){ return Graph.tree[0][i]==d[options.nodeName]; }),
                typeschildren = Graph.tree[3].filter(function(e,i){ return Graph.tree[1][i]==d[options.nodeName]; }),
                types = d3.set(d3.merge([typesparent,typeschildren])).values();
            if(types.indexOf(typeFilter)==-1){
              return false;
            }
            return true;
          }
        }

        return filter;
    }
  }

  options.showTopbar = showControls(options,1);
  options.showExport2 = showControls(options,2);
  options.showTable = showControls(options,3);
  options.showProjectIcon = showControls(options,4);
  options.showTopbarButtons = showControls(options,5);

  var topFilterInst = topFilter()
    .data(getFilterData())
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
          topColorSelectInst.change(val);
        })
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

  var elementsCountInst = elementsCount();

  var topOrderInst = topOrder()
      .data(nodes)
      .datanames(getSelectOptions(sortAsc))
      .displayGraph(displayGraph);

  var topColorSelectInst = topColorSelect()
      .datanames(getSelectOptions(sortAsc))
      .displayGraph(displayGraphColor);

  // top bar
  var topBar = displayTopBar()
    .title(options.main);
  if(options.multigraph){
    topBar.multigraph(options.multigraph);
  }
  if(options.multipages){
    topBar.goback(true);
  }
  if(!options.showProjectIcon){
    topBar.netCoin(false);
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

  if(options.showTable){
    topBar.addIcon(iconButton()
        .alt("table")
        .width(24)
        .height(24)
        .src(b64Icons.table)
        .title(texts.Table)
        .job(function(){
          displayTable(Tree ? (options.nodeTypes && Tree.typeFilter ? Tree.typeFilter : "table") : false);
        }));
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
  var searchFunction = filterSelection;
  if(Tree){
    if(Tree.type == "deepextended"){
      searchFunction = function(){
        Tree.resetOptions();
        var node = nodes.filter(function(n){
            return n.selected;
          })[0];
        for(var i=0; i<Graph.tree.length; i++){
          var j = Graph.tree[i].indexOf(node[options.nodeName]);
          if(j!=-1){
            Tree.path = [i];
            Tree.typeFilter = options.nodeTypes[j];
            updateSelectOptions();
            break;
          }
        }
        displayGraph();
      }
    }else if(Tree.type == "extended"){
      searchFunction = function(){
        Tree.resetOptions();
        var node = nodes.filter(function(n){
            return n.selected;
          });
        if(node.length){
          node = node[0];
          Tree.typeFilter = node[options.nodeType];
          Tree.history.push([Tree.treeParent,Tree.typeFilter]);
          updateSelectOptions();
          filterSelection();
        }
      }
    }
  }

  if(Tree){
    topBar.addBox(function(box){
      Tree.breadcrumbs = new BreadCrumbs(box);
    });

    if(Tree.type=="extended"){
      topBar.addBox(function(box){
        appendButton(box,"union",function(){
          delete Tree.intersection;
        });
        appendButton(box,"intersection",function(){
          Tree.intersection = true;
        });
      });

      function appendButton(sel,name,callback){
        sel.append("img")
          .attr("class","icon-selection disabled")
          .attr("width",24)
          .attr("height",24)
          .attr("src",b64Icons[name])
          .attr("alt",name)
          .attr("title",name)
          .on("click",function(){
            callback();
            buttonsWindow();
          })
      }

      function buttonsWindow(){
        var names = selectedNames();
        if(names.length){
          var win = displayWindow();
          var div = win.append("div")
            .attr("class","type-buttons");
          options.nodeTypes.forEach(function(t,i){
            var button = div.append("button")
              .attr("class","primary")
              .text(t)
            if(nodes.filter(Tree.applyExtendedFilter(names,t)).length){
              button.on("click",function(){
                topFilterInst.removeFilter();
                Tree.treeParent = names;
                Tree.typeFilter = t;
                Tree.history.push([Tree.treeParent,Tree.typeFilter]);
                updateSelectOptions();
                d3.select(win.node().parentNode.parentNode).remove();
                Tree.breadcrumbs.empty();
                deselectAllItems();
              })
            }else{
              button.classed("disabled",true);
            }
          });
          var window = d3.select(win.node().parentNode),
              w1 = parseInt(window.style("width")),
              w2 = 0;
          div.selectAll("button").each(function(){
            w2 = w2 + this.getBoundingClientRect().width + 4;
          })
          if(w2 < w1){
            window.style("width",w2+"px");
          }
        }
      }
    }
  }

  topBar.addBox(displayMultiSearch()
        .data(itemsFiltered ? itemsFiltered : nodes)
        .column(options.nodeLabel)
        .updateSelection(displayGraph)
        .updateFilter(searchFunction));

  // count elements
  topBar.addBox(elementsCountInst);

  // node order
  //topBar.addBox(topOrderInst);

  // colors
  //topBar.addBox(topColorSelectInst);

  // node filter in topBar
  //topBar.addBox(topFilterInst);

  if(options.showTopbarButtons && !Tree){
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
  }

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

  if(options.cex){
    galleryItems.style("font-size", 10*options.cex + "px")
  }

  var colorLegend = displayLegend()
                 .type("Color")
                 .displayScalePicker(function(){
                   displayPicker(options,"nodeColor",displayGraphColor);
                 })
                 .selectionWindow(attrSelectionWindow()
                   .list(getSelectOptions(sortAsc))
                   .clickAction(function(val){
                     topColorSelectInst.change(val);
                   }));

  var legendLegend = displayLegend()
                 .type("Legend")
                 .selectionWindow(attrSelectionWindow()
                   .list(getSelectOptions(sortAsc))
                   .clickAction(function(val){
                     if(val=="_none_"){
                       delete options.nodeLegend;
                     }else{
                       options.nodeLegend = val;
                     }
                     displayGraph();
                   }));

  var orderLegend = displayLegend()
                 .type("Order")
                 .selectionWindow(attrSelectionWindow()
                   .list(getSelectOptions(sortAsc))
                   .clickAction(function(val){
                     topOrderInst.change(val);
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
    footer.append("div")
      .style("text-align","left")
    .append("img")
      .attr("src","images/acknowledgement.png")
      .style("height","24px")
      .style("margin","0 0 -10px 0")
    var central = footer.append("div");
    central.append("img")
      .attr("height",20)
      .style("vertical-align","middle")
      .attr("src",b64Icons.netcoinblack)
    central.append("span")
      .text("netCoin")
    footer.append("div")
  }

  if(options.help && options.helpOn){
    infoPanel.changeInfo(options.help);
  }

  if(options.itemsPerRow){
    if(Array.isArray(options.itemsPerRow)){
      itemsPerRow = function(){
        return Tree.typeFilter ? options.itemsPerRow[options.nodeTypes.indexOf(Tree.typeFilter)] : options.itemsPerRow[0];
      }
    }

    options.zoom = 1;

    var currentItemsPerRow = itemsPerRow(),
        prevk = options.zoom;
    
    getCurrentHeight = function(k){
          if(k == 1){
            currentItemsPerRow = itemsPerRow();
          }else{
            if(k < prevk){
              currentItemsPerRow = currentItemsPerRow+1;
            }else if(k > prevk){
              currentItemsPerRow = currentItemsPerRow-1;
            }
          }
          prevk = k;
          var h = Math.floor((gallery.node().offsetWidth-24) / currentItemsPerRow)-18;
          if(options.imageRatio){
            h = h / options.imageRatio;
          }
          return h;
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

    if(Tree){
      Tree.cleanButtonsPopup();
      if(Tree.type=="deepextended"){
        if(Tree.path.length && Tree.breadcrumbs.isEmpty()){
          Tree.breadcrumbs.addHome(function(){
            Tree.path = [];
            Tree.typeFilter = options.nodeTypes[0];
            updateSelectOptions();
          });
          var idx = options.nodeTypes.indexOf(Tree.typeFilter),
              path = options.nodeTypes.slice(0,idx).map(function(){ return []; });
          Tree.path.forEach(function(i){
            for(var j=0; j<idx; j++){
              path[j].push(Graph.tree[i][j]);
            }
          });
          path = path.map(function(d){
            return d3.set(d).values();
          })
          Tree.breadcrumbs.addPath(path,function(i,j){
            var selected = path[i][j],
                level = options.nodeTypes.indexOf(Tree.typeFilter);

            Tree.path = Tree.getTreePath(selected,level,i);
            Tree.typeFilter = options.nodeTypes[i];
            updateSelectOptions();
          });
        }

        var names = [];
        if(!Tree.path.length){
          names = Graph.tree.map(function(d){
            return d[0];
          });
        }else{
          names = Graph.tree.filter(function(d,i){
            return Tree.path.indexOf(i)!=-1;
          })
          names = d3.merge(names);
        }
        if(Tree.typeFilter){
          var idx = options.nodeTypes.indexOf(Tree.typeFilter);
          names = names.filter(function(name){
            return Graph.tree.map(function(row){
              return row[idx];
            }).indexOf(name)!=-1;
          });
        }
        filteredData = filteredData.filter(function(d){
            return names.indexOf(d[options.nodeName])!=-1;
        });

      }else if(Tree.type=="extended"){
        if(Tree.breadcrumbs.isEmpty()){
          if(Tree.treeParent.length){
            Tree.breadcrumbs.addHome(function(){
                Tree.treeParent = [];
                Tree.typeFilter = options.initialType ? options.initialType : "";
                Tree.history = [];
                updateSelectOptions();
              });
            if(Tree.typeFilter){
              Tree.breadcrumbs.addButton(Tree.typeFilter,function(){
                Tree.treeParent = [];
                Tree.typeFilter = Tree.typeFilter;
                Tree.history.push([Tree.treeParent,Tree.typeFilter]);
                updateSelectOptions();
              });
            }
            Tree.breadcrumbs.addPath([Tree.treeParent],function(i,j){
              Tree.treeParent = [Tree.treeParent[j]];
              Tree.typeFilter = "";
              Tree.history.push([Tree.treeParent,Tree.typeFilter]);
              updateSelectOptions();
            });
          }else{
            options.nodeTypes.forEach(function(type){
              Tree.breadcrumbs.addButton(type,function(){
                Tree.treeParent = [];
                Tree.typeFilter = type;
                Tree.history.push([Tree.treeParent,Tree.typeFilter]);
                updateSelectOptions();
              });
            });
          }
        }

        filteredData = filteredData.filter(Tree.applyExtendedFilter(Tree.treeParent,Tree.typeFilter));

      }else{ // Tree.type=="simple"
        if(Tree.breadcrumbs.isEmpty()){
          if(Tree.treeParent.length){
            Tree.breadcrumbs.addHome(function(){
              Tree.treeParent = [];
            });
            Tree.breadcrumbs.addPath(Tree.treeParent,function(i){
              Tree.treeParent = Tree.treeParent.filter(function(d,j){ return j<=i; });
            });
          }
        }

        filteredData = filteredData.filter(function(d){
          if(!Tree.treeParent.length){
            return Graph.tree[1].indexOf(d[options.nodeName])==-1;
          }
          return Graph.tree[0].filter(function(e,i){ return Tree.treeParent[Tree.treeParent.length-1]==e && Graph.tree[1][i]==d[options.nodeName]; }).length;
        });
      }
    }

    elementsCountInst.value(filteredData.length).update();

    var orderedData = filteredData.slice();
    if(options.order){
      orderedData.sort(function(a,b){
        var aa = a[options.order],
            bb = b[options.order];
        return compareFunction(aa,bb,options.rev);
      })
    }else if(options.rev){
      orderedData.reverse();
    }

    var displayData = orderedData;
    if(pagination){
      var limit  = Math.max(1000,(width/(currentGridHeight+12) * height/(currentGridHeight+12)));
      displayData = orderedData.filter(function(d,i){ return i<pagination*limit; });
    }

    galleryItems.classed("rounded-items",roundedItems());

    var items = galleryItems.selectAll(".item").data(displayData, function(d){ return d[options.nodeName]; });

    var itemsEnter = items.enter()
          .append("div")
          .attr("class","item")

    var imgWrapper = itemsEnter
        .append("div")
          .attr("class","img-wrapper")
    if(options.imageItems){
      imgWrapper.append("img")
          .on("load", !options.imageRatio && !roundedItems() && !itemsPerRow() ? function(){
            this.ratio = 1;
            if(this.complete && this.naturalHeight!==0){
              this.ratio = this.naturalWidth / this.naturalHeight;
            }
            d3.select(this.parentNode.parentNode).style("width",(currentGridHeight*this.ratio)+"px");
          } : null)
          .attr("src",function(n){ return n[options.imageItems]; });
    }

    itemsEnter.append("span")
        .text(function(d){ return d[options.nodeLabel]; })

    if(options.labelTooltip){
      itemsEnter.attr("title",function(d){ return d[options.nodeLabel]; })
    }

    items.exit().remove();

    var itemsUpdate = itemsEnter.merge(items);
    itemsUpdate.classed("selected",function(n){
      return n.selected;
    });

    itemsUpdate.order();

    itemsUpdate
      .select(".img-wrapper")
        .style("height",currentGridHeight+"px")
        .style("border-width", typeof options.nodeBorder == "number" ? options.nodeBorder+"px" : null);

    itemsUpdate.style("width",function(){
      var img = this.querySelector("img"),
          ratio = options.imageRatio ? options.imageRatio : (img && img.ratio ? img.ratio : 1);
      return (currentGridHeight*ratio)+"px";
    });

    itemsUpdate.selectAll(".item > span").style("font-size",(currentGridHeight/72)+"em")

    itemsUpdate.style("cursor","pointer")
      .on("click",function(n){
          d3.event.stopPropagation();
          if(d3.event.ctrlKey || d3.event.metaKey){
            displayData.forEach(function(n){ delete n.selected; });
            n.selected = true;
          }else if(d3.event.shiftKey){
            n.selected = true;
            var ext = d3.extent(displayData.map(function(d,i){ return [i,d.selected]; }).filter(function(d){ return d[1]; }).map(function(d){ return d[0]; }));
            d3.range(ext[0],ext[1]).forEach(function(i){
              displayData[i].selected = true;
            });
          }else{
            if(n.selected){
              delete n.selected;
            }else{
              n.selected = true;
            }
          }
          if(options.nodeInfo){
            if(options.infoFrame=="left"){
              if(descriptionPanel && !options.frequencies){
                displayInDescription(n[options.nodeInfo]);
                var template = descriptionPanel.select(".description-content > .panel-template, .description-content > .info-template");
                if(!template.empty()){
                  template.selectAll("a[target=rightframe]").on("mousedown",function(){
                    infoPanel.changeInfo('<iframe name="rightframe"></iframe>');
                  });
                  template.selectAll("a[target=leftframe]").on("mousedown",function(){
                    descriptionPanel.select(".description-content").append("iframe").attr("name","leftframe");
                  }).on("mouseup",function(){
                    template.style("display","none");
                  })
                }
              }
            }else{
              infoPanel.changeInfo(n[options.nodeInfo]);
            }
            body.select(".panel-template.auto-color").datum(n);
            if(options.imageItems){
              body.select(".panel-template img[src=_auto_]").attr("src",n[options.imageItems]);
            }
          }
          if(options.ntextctrl && !(d3.event.ctrlKey || d3.event.metaKey)){
            body.selectAll(".tooltip").remove();
          }
          if(options.nodeText && n[options.nodeText]){
            displayTooltip(n);
          }
          if(Tree){
            Tree.treeRelatives(n);
          }
          displayGraph();
      })

    if(Tree){
      itemsUpdate.style("cursor","url("+b64Icons.mouse2+"), auto")
        .on("contextmenu",function(n){
          d3.event.preventDefault();
          Tree.popButtons(n);
        })

      var timer;
      var touchduration = 500; //length of time we want the user to touch before we do something

      itemsUpdate.on("touchstart",function() {
          timer = setTimeout(onlongtouch, touchduration); 
      });

      itemsUpdate.on("touchend",function() {
          //stops short touches from firing the event
          if (timer){
              clearTimeout(timer); // clearTimeout, not cleartimeout..
          }
      });

      function onlongtouch() {
        Tree.popButtons(n);
      }
    }


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

    colorLegend
      .data(orderedData)
      .value(options.nodeColor)
      .scale(colorScale)
    legendPanel.call(colorLegend);

    legendLegend
      .data(orderedData)
      .value(options.nodeLegend)
    legendPanel.call(legendLegend);

    orderLegend
      .value(options.order)
    legendPanel.call(orderLegend);

    var emptylegend = true;
    if(options.rev){
      emptylegend = false;
    }else{
      legendPanel.selectAll(".legends-content > .legend").each(function(){
        if(d3.select(this).property("key")){
          emptylegend = false;
        }
      });    
    }
    if(!legendPanel.classed("hide-legend") && emptylegend){
      legendPanel.classed("hide-legend",true);
    }

    if(options.imageItems){
      itemsUpdate.select(".img-wrapper").style("border-color",function(d){
        if(!d.selected && options.nodeColor){
            return applyColorScale(colorScale,d[options.nodeColor],true);
        }
        return null;
      })
    }else{
      itemsUpdate.select(".img-wrapper").style("background-color",function(d){
        return applyColorScale(colorScale,d[options.nodeColor],true);
      })
    }

    panelTemplateAutoColor(body,function(n){
      return n ? applyColorScale(colorScale,n[options.nodeColor]) : options.defaultColor;
    });

    if(descriptionPanel && frequencyBars && options.frequencies){
      frequencyBars
            .nodes(orderedData)
            .nodeColor(options.nodeColor)
            .colorScale(colorScale);
      content.classed("hide-description",false);
      frequencyBars(descriptionPanel.select(".description-content").html(""));
      descriptionPanel.select(".close-button").style("display","block");
    }

    if(Tree && Tree.type == "extended"){
      galleryBox.selectAll(".topbar .icon-selection").classed("disabled",selectedNames().length<2);
    }
  } // end of displayGraph

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
      var values = selectedNames();
      topFilterInst.removeFilter();
      if(values.length){
        topFilterInst.newFilter(options.nodeName,values);
      }
  }

  function selectedNames(){
      return nodes.filter(function(n){
          return n.selected;
        })
        .map(function(n){
          return n[options.nodeName];
        });
  }

  function getSelectOptions(order){
    return Graph.nodenames.filter(function(d){
          if(d.substring(0,1)=="_"){
            return false;
          }
          if(d==options.nodeName){
            return true;
          }
          if(options.imageItems && d==options.imageItems){
            return false;
          }
          if((d==options.nodeText || d==options.nodeInfo) && d!=options.nodeLabel){
            return false;
          }
          if(Tree && Tree.typeFilter && options.nodeNamesByType && (!options.nodeNamesByType.hasOwnProperty(Tree.typeFilter) || options.nodeNamesByType[Tree.typeFilter].indexOf(d)==-1) && d!=options.nodeType){
            return false;
          }
          return true;
        })
        .sort(order ? order : function(){ return 0; });
  }

  function topOrder(){
    var data = [],
        datanames = [],
        displayFunction = function(){},
        orderSelect,
        reverseSwitch;

    function exports(div){
      div.append("h3").text(texts.Order + ":")
      orderSelect = div.append("div")
        .attr("class","select-wrapper")
      .append("select")
      .on("change",function(){
        options.order = this.value;
        if(options.order=="-"+texts.default+"-")
          options.order = false;
        displayFunction();
      })

      updateSelect();

      div.append("h3")
      .text(texts.Reverse)
      reverseSwitch = div.append("button")
      .attr("class","switch-button")
      .classed("active",options.rev)
      .on("click",reverseOrder)
    }

    function updateSelect(){
      if(orderSelect){
        orderSelect.selectAll("option").remove();
        var opt = datanames.slice();
        opt.unshift("-"+texts.default+"-");
        orderSelect.selectAll("option")
          .data(opt)
        .enter().append("option")
          .property("selected",function(d){
            return d==options.order;
          })
          .property("value",String)
          .text(String)
      }
    }

    function reverseOrder(){
        options.rev = !options.rev;
        if(reverseSwitch){
          reverseSwitch.classed("active",options.rev);
        }
        displayFunction();
    }

    exports.reverse = function(){
      reverseOrder();
    }

    exports.data = function(x) {
      if (!arguments.length) return data;
      data = x;
      return exports;
    };

    exports.value = function(x) {
      if (!arguments.length) return options.order;
      options.order = x;
      if(orderSelect){
        orderSelect.property("value",x)
      }
      return exports;
    };

    exports.change = function(x) {
      if(arguments.length){
        options.order = Graph.nodenames.indexOf(x)!=-1 ? x : false;
      }
      if(orderSelect){
        orderSelect
          .property("value",options.order)
          .dispatch("change");
      }else{
        displayFunction();
      }
      return exports;
    };

    exports.datanames = function(x) {
      if (!arguments.length) return datanames;
      datanames = x;
      updateSelect();
      return exports;
    };

    exports.displayGraph = function(x) {
      if (!arguments.length) return displayFunction;
      displayFunction = x;
      return exports;
    };

    return exports;
  }

  function topColorSelect(){
    var colorSelect;
        datanames = [],
        displayFunction = function(){};

    function exports(box){
      box.append("h3").text(texts.Color + ":")

      colorSelect = box.append("div")
        .attr("class","select-wrapper")
      .append("select")
      .on("change",function(){
        options.nodeColor = this.value;
        if(options.nodeColor=="_none_"){
          delete options.nodeColor;
        }
        displayFunction();
      })
      updateSelect();
    }

    function updateSelect(){
      if(colorSelect){
        colorSelect.selectAll("option").remove();
        var opt = datanames.map(function(d){ return [d,d]; });
        opt.unshift(["_none_","-"+texts.none+"-"]);
        colorSelect.selectAll("option")
          .data(opt)
        .enter().append("option")
          .property("value",function(d){ return d[0]; })
          .text(function(d){ return d[1]; })
          .property("selected",function(d){ return d[0]==options.nodeColor ? true : null; })
      }
    }

    exports.change = function(x) {
      if(arguments.length){
        options.nodeColor = Graph.nodenames.indexOf(x)!=-1 ? x : false;
      }
      if(colorSelect){
        colorSelect
          .property("value",options.nodeColor)
          .dispatch("change");
      }else{
        displayFunction();
      }
      return exports;
    };

    exports.datanames = function(x) {
      if (!arguments.length) return datanames;
      datanames = x;
      updateSelect();
      return exports;
    };

    exports.displayGraph = function(x) {
      if (!arguments.length) return displayFunction;
      displayFunction = x;
      return exports;
    };

    return exports;
  }

  function elementsCount(){
    var value = 0,
        element;

    function exports(box){
      box.append("h3").text(texts.Elements + ":")
      element = box.append("span").attr("class","elements-count");
    }

    exports.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return exports;
    };

    exports.update = function() {
      if (element){
        element.text(value);
      }
      return exports;
    };
    
    return exports;
  }

  function displayLegend(){
    var value,
        type,
        data,
        scale,
        scalePicker,
        selectionWindow;

    function exports(parent){
        displayShowPanelButton(parent,function(){
          parent.classed("hide-legend",false);
          contentHeight(parent);
        })

        selectionWindow
        .visual(type)
        .active(value)

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
                topFilterInst.removeFilter();
              })

          legends.append("div").attr("class","legends-content")
        }

        legends.select(".goback").style("display", itemsFiltered===false ? "none" : null)

        var content = legends.select(".legends-content");
        var legend = legends.select(".legend.legend"+type);

        if(legend.empty()){
          legend = content.append("div")
            .attr("class","legend legend"+type)
          legend.append("div")
            .attr("class","title")
            .style("cursor","pointer")
            .on("click",selectionWindow)

          legend.append("hr")
            .attr("class","legend-separator")
        }

        legend.property("key",value);
        legend.select(".title").html("<b>" + texts[type] + ":</b> " + (value ? value : (data ? "-"+texts.none+"-" : "-"+texts.default+"-")));

        // linear scale
        if(scale && scale.name=="h"){
          legend.selectAll(".legend-item").remove();
          displayLinearScale(legend,
            value,
            scale.range(),
            scale.domain(),
            scalePicker,
            false,
            false,
            function(d){
              scale.domain(d);
              displayGraph();
            },
            true,
            function(s){
              legend.property("selectedValues",s);
              mgmtBottomButtons(legends,s.join(",")!=d3.extent(scale.domain()).join(","));
            }
          );
        }else if(data){
          legend.selectAll(".scale-content").remove();

          var itemsData = value ? getColumnValues(data,value) : [];

          var items = legend.selectAll(".legend-item")
              .data(itemsData,String)

          var itemsEnter = items.enter()
        .append("div")
            .attr("class","legend-item")
            .style("cursor","pointer")
            .on("click",function(v){
              var checkbox = d3.select(this).select(".legend-check-box"),
                  checked = checkbox.classed("checked");
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
              checkbox.classed("checked",!checked);
              displayGraph();
            })

          itemsEnter.append("div")
        .attr("class","legend-check-box")

          itemsEnter.append("div")
        .attr("class","legend-bullet")
        .style("background-color",scale ? function(value){
          return scale(value);
        } : basicColors.black)

          itemsEnter.append("span")
        .text(stripTags)

          items.exit().remove();

          items.order();
        }else if(type=="Order"){
          if(legend.select(".switch-reverse-order").empty()){
            var div = legend.append("div").attr("class","switch-reverse-order")
            div.append("h3")
            .style("display","inline-block")
            .text(texts.Reverse)
            div.append("button")
            .attr("class","switch-button")
            .on("click",topOrderInst.reverse)
          }
          legend.select(".switch-button").classed("active",options.rev);
        }

        contentHeight(parent);

        if(initialize){
          var legendBottomControls = legends.append("div")
          .attr("class","legend-bottom-controls")

          var legendSelectAll = legendBottomControls.append("div")
          .attr("class","legend-selectall")
          .style("cursor","pointer")
          .on("click",function(){
              var checkbox = d3.select(this).select(".legend-check-box"),
                  checked = !checkbox.classed("checked");
              content.selectAll(".legend-item > .legend-check-box").classed("checked",checked);
              data.forEach(function(d){
                d.selected = checked ? true : false;
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
            topFilterInst.removeFilter();
            var selectedValues = {},
                selectedNumericValues = {};
            legends.selectAll(".legend").each(function(){
              var legend = d3.select(this),
                  key = legend.property("key");
              if(!legend.select(".scale-content").empty()){
                var values = legend.property("selectedValues");
                if(values.length==2){
                  selectedNumericValues[key] = values;
                }
              }else{
                legend.selectAll(".legend-item > .checked").each(function(d){
                  if(!selectedValues[key]){
                    selectedValues[key] = [];
                  }
                  selectedValues[key].push(d);
                });
              }
            });
            for(var k in selectedValues){
              topFilterInst.storeFilter(k,selectedValues[k]);
            }
            for(var k in selectedNumericValues){
              topFilterInst.storeNumericFilter(k,selectedNumericValues[k][0],selectedNumericValues[k][1]);
            }
            topFilterInst.applyFilter(true);
          })
          .attr("title",texts.filterInfo)
        }

        mgmtBottomButtons(legends);
        legend.select("hr.legend-separator").style("border",(!value || !data) ? "none" : null);

    }

    function mgmtBottomButtons(legends, scaleSelection){
        var content = legends.select(".legends-content"),
            allboxes = content.selectAll(".legend-item > .legend-check-box"),
            allboxessize = allboxes.size(),
            somechecked = content.selectAll(".legend-item > .checked").size(),
            allScales = content.selectAll(".legend > .scale-content");
        legends.select(".legend-selectall > .legend-check-box").classed("checked",somechecked)
        legends.select(".legend-bottom-button").classed("disabled",(!somechecked || somechecked==allboxessize) && !scaleSelection);
        legends.select(".legend-bottom-controls").style("display",allboxes.empty() && allScales.empty() ? "none" : null);
    }

    function contentHeight(parent){
      if(!parent.classed("hide-legend")){
        var legendsHeight = parent.node().parentNode.offsetHeight-250;
        parent.select(".legends > .legends-content").style("max-height", legendsHeight+"px");
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

  function displayTable(tableitem){
    if(!body.select("body > .tables").empty()){
      alert("Tables are already displayed");
      return;
    }

    body.selectAll(".tooltip").remove();
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

    if(tableitem){
      var tabs = ["table","nodes"];
      if(options.nodeTypes){
        tabs = options.nodeTypes.slice();
        tabs.unshift("table");
      }
      header.append("span")
        .style("padding","0 2em")
        .style("display","inline-block")
      tabs.forEach(function(t){
        header.append("button")
          .attr("class","primary"+(tableitem == t ? " disabled" : ""))
          .text(t)
          .on("click",function(){
            closeTable();
            displayTable(t);
          })
      });
    }

    var table = tables.append("div")
            .attr("class","table-container")

    var tableInst = tableWrapper()
            .data(itemsFiltered ? itemsFiltered : nodes)
            .onlySelectedData(false)
            .columns(Graph.nodenames.filter(filterColumns))
            .id(options.nodeName)
            .update(function(){
              tables.selectAll("button.primary.tableselection, button.primary.tablefilter")
                .classed("disabled",tables.selectAll("tr.selected").empty());
            })

    if(tableitem){
      tableInst.item(tableitem);
      if(tableitem=="table"){
        var columns = [],
            data = [];

        if(options.deepTree){
          columns = options.nodeTypes.slice();
          for(var i=0; i<Graph.tree.length; i++){
            var row = {};
            columns.forEach(function(d,j){
              row[d] = getNodeLabel(Graph.tree[i][j]);
            });
            data.push(row);
          }
        }else{
          if(options.nodeTypes){
            columns = [d3.set(Graph.tree[2]).values().join(" | ")];
            d3.set(Graph.tree[3]).values().forEach(function(d){
              columns.push(d);
            });
            var parents = {};
            for(var i=0; i<Graph.tree[0].length; i++){
              var key = Graph.tree[0][i];
              if(!parents[key]){
                parents[key] = {};
                parents[key][columns[0]] = getNodeLabel(key);
              }
              var type = Graph.tree[3][i],
                  text = getNodeLabel(Graph.tree[1][i]);
              parents[key][type] = parents[key][type] ? parents[key][type] + " | " + text : text;
            }
            for(var key in parents){
              data.push(parents[key]);
            }
          }else{
            columns = ["Parent","Child"];
            for(var i=0; i<Graph.tree[0].length; i++){
              var row = {};
              columns.forEach(function(d,j){
                row[d] = getNodeLabel(Graph.tree[j][i]);
              });
              data.push(row);
            }
          }
        }

        tableInst.data(data)
          .columns(columns);

        function getNodeLabel(name){
          return options.nodeLabel ? nodes.filter(function(d){ return d[options.nodeName]==name; })[0][options.nodeLabel] : name;
        }
      }else if(options.nodeTypes && options.nodeTypes.indexOf(tableitem)!=-1){
        var columns = [],
            data = [];

        if(options.nodeNamesByType && options.nodeNamesByType.hasOwnProperty(tableitem)){
          columns = options.nodeNamesByType[tableitem].filter(filterColumns);
          columns.push(options.nodeType);
        }else{
          columns = Graph.nodenames.filter(filterColumns);
        }
        data = nodes.filter(function(n){
          if(Array.isArray(n[options.nodeType])){
            return n[options.nodeType].indexOf(tableitem)!=-1;
          }
          return n[options.nodeType]==tableitem;
        }).map(function(n){
          var subset = {};
          columns.forEach(function(c){
            subset[c] = n.hasOwnProperty(c) ? n[c] : null;
          });
          if(n.selected){
            subset.selected = true;
          }
          return subset;
        });
        tableInst.data(data)
          .columns(columns);
      }
    }

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
          table = tables.select("table"),
          trSelected = table.selectAll("tr.selected");
      if(!trSelected.empty()){
            trSelected.each(function(){
                names.push(d3.select(this).attr("rowname"));
            })
            .classed("selected",false);

            nodes.forEach(function(d){
              d.selected = names.indexOf(d[options.nodeName]) != -1;
            });
      }
    }

    function filterColumns(d){
      if(d==options.nodeName){
        return true;
      }
      if(d.substring(0,1)=="_"){
        return false;
      }
      if(options.imageItems && d==options.imageItems){
        return false;
      }
      if((d==options.nodeText || d==options.nodeInfo) && d!=options.nodeLabel){
        return false;
      }
      return true;
    }
  }

  function mousePosition(sel){
    var coor = d3.mouse(body.node());

    mgmtPosition();

    var imgs = sel.selectAll("img");
    if(imgs.size()){
      var count = 0;
      imgs.on("load",function(){
        count++;
        if(count==imgs.size()){
          mgmtPosition();
        }
      });
    }

    function mgmtPosition(){
      if(coor[0]>(body.node().offsetWidth/2)){
        sel.style("left",(coor[0]-sel.node().offsetWidth-10)+"px")
      }else{
        sel.style("left",(coor[0]+10)+"px")
      }
      if(coor[1]>(body.node().offsetHeight/2)){
        sel.style("top",(coor[1]-sel.node().offsetHeight-10)+"px")
      }else{
        sel.style("top",(coor[1]+10)+"px")
      }
    }
  }

  function relocateTooltip(tooltip){
    var tooltips = body.selectAll("body > .tooltip"),
        x = false;

    prev(tooltips.size()-2);

    if(x!==false){
      tooltip.transition()
          .duration(500)
          .style("left",x+"px")
    }

    function prev(i){
      if(i==-1){
        return;
      }
      var bounds = tooltip.node().getBoundingClientRect(),
          prevtooltip = tooltips.filter(function (d, j) { return j === i; }),
          prevbounds = prevtooltip.node().getBoundingClientRect(),
          leftcollision = bounds.x >= prevbounds.x && bounds.x <= (prevbounds.x+prevbounds.width),
          rightcollision = (bounds.x+bounds.width) >= prevbounds.x && (bounds.x+bounds.width) <= (prevbounds.x+prevbounds.width),
          topcollision = bounds.y >= prevbounds.y && bounds.y <= (prevbounds.y+prevbounds.height),
          bottomcollision = (bounds.y+bounds.height) >= prevbounds.y && (bounds.y+bounds.height) <= (prevbounds.y+prevbounds.height);
      if(topcollision || bottomcollision){
        if(leftcollision){
          x = prevbounds.x+prevbounds.width;
          if((x+bounds.width) > width){
            x = width-bounds.width;
          }
        }else if(rightcollision){
          x = prevbounds.x-bounds.width;
          if(x < 0){
            x = 0;
          }
        }
      }
      if(x===false){
        prev(i-1);
      }
    }
  }

  function updateSelectOptions(){
    var opt = getSelectOptions(sortAsc);
    topOrderInst.datanames(opt);
    topColorSelectInst.datanames(opt);
    topFilterInst.datanames(opt);
    topFilterInst.data(getFilterData());
    colorLegend.selectionWindow().list(opt);
    legendLegend.selectionWindow().list(opt);
    orderLegend.selectionWindow().list(opt);
    topColorSelectInst.change();
    topOrderInst.change();
    Tree.breadcrumbs.updateSelectedType();
  }

  function getFilterData(){
    if(Tree && Tree.typeFilter){
      return nodes.filter(function(n){
        if(Array.isArray(n[options.nodeType])){
          return n[options.nodeType].indexOf(Tree.typeFilter)!=-1;
        }else{
          return n[options.nodeType]==Tree.typeFilter;
        }
      });
    }
    return nodes;
  }

  function displayTooltip(n){
    body.selectAll(".tooltip").filter(function(){
      return d3.select(this).attr("nodeName")==n[options.nodeName];
    }).remove();

    var tooltip = body.append("div")
              .attr("class","tooltip")
              .attr("nodeName",n[options.nodeName])
              .style("cursor","grab")
              .style("display","block")
              .html(n[options.nodeText])

    var template = tooltip.select(".info-template, .panel-template");
    if(!template.empty()){
      template.selectAll("a[target=rightframe]").on("mousedown",function(){
        infoPanel.changeInfo('<iframe name="rightframe"></iframe>');
      });
      if(descriptionPanel){
        template.selectAll("a[target=leftframe]").on("mousedown",function(){
          displayInDescription('<iframe name="leftframe"></iframe>');
        });
      }
      if(options.imageItems){
        template.select("img[src=_auto_]").attr("src",n[options.imageItems]);
      }
    }

    tooltip.append("div")
              .attr("class","close-button")
              .on("click",function(){
                d3.event.stopPropagation();
                tooltip.remove();
                if(Tree){
                  infoPanel.close();
                  delete n.selected;
                  displayGraph();
                }
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
    mousePosition(tooltip);
    tooltipTemplateAutoColor(tooltip,applyColorScale(colorScale,n[options.nodeColor]));
    relocateTooltip(tooltip);
  }

  function applyColorScale(scale, value, forceTypeFilter){
      if(!options.nodeColor){
        return options.defaultColor;
      }
      if(value == null){
        return basicColors.white;
      }
      if(forceTypeFilter && Tree && options.nodeColor==options.nodeType && Tree.typeFilter){
        return scale(Tree.typeFilter);
      }
      if(typeof value == "object"){
        value = value[0];
      }
      return scale(value);
  }

  function roundedItems(){
    return options.roundedItems;
  }

  function itemsPerRow(){
    return options.itemsPerRow;
  }

} // gallery function end

window.onload = function(){
  gallery(JSON.parse(d3.select("#data").text()));
};
