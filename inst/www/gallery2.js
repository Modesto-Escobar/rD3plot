function gallery(Graph){
  colorScheme(Graph.options.colorScheme);
  Graph.options.scale = pageZoom(Graph.options.scale);

  var nodes = transposeNodes(Graph.nodes,Graph.nodenames,Graph.options);

  nodes.forEach(function(node,i){
    node['_index'] = i;
  });

  Graph.filteredOrderedData = nodes.slice();

  if(Graph.options.nodeOrder){
    if(typeof Graph.options.nodeOrder == "string" && Graph.nodenames.indexOf(Graph.options.nodeOrder)==-1){
      delete Graph.options.nodeOrder;
    }
    if(Array.isArray(Graph.options.nodeOrder)){
      if(!Graph.options.nodeTypes || !Graph.options.nodeNamesByType || Graph.options.nodeOrder.length!=Graph.options.nodeTypes.length){
        delete Graph.options.nodeOrder;
      }else{
        for(var i=0; i<Graph.options.nodeOrder.length; i++){
          if(Graph.options.nodeOrder[i] && Graph.options.nodeNamesByType[Graph.options.nodeTypes[i]].indexOf(Graph.options.nodeOrder[i])==-1){
            Graph.options.nodeOrder[i] = null;
          }
        }
      }
    }
  }

  if(Graph.options.decreasing && Array.isArray(Graph.options.decreasing) && (!Graph.options.nodeTypes || Graph.options.decreasing.length!=Graph.options.nodeTypes.length)){
    delete Graph.options.decreasing;
  }

  var body = d3.select("body");

  var Tree = typeof mgmtTree != 'undefined' ? mgmtTree(Graph, nodes, updateSelectOptions, deselectAllItems, removeFilter) : false;

  updateReverseOrder();

  var keytypes = {};
  Graph.nodenames.forEach(function(col){
    keytypes[col] = dataType(nodes.filter(function(d){ return d[col] !== null; }),col);
  })

  var selectedValues = new ValueSelector(nodes,keytypes);

  var pagination, pagestep;

  var topbar = body.append("div")
        .attr("class","topbar");
  var topbarContent = topbar.append("div")
        .attr("class","topbar-topcontent");
  var mainTitle = topbarContent.append("div").attr("class","topbar-main");
  if(Graph.options.multipages){
    mainTitle.append("div")
      .append("button")
      .attr("class","topbar-button multipages-home")
      .attr("aria-label",texts.goback)
      .attr("title",texts.goback)
      .on("click",function(){
        window.location.href = "../../index.html";
      })
      .append("svg")
        .attr("height",24)
        .attr("width",24)
        .attr("viewBox","0 0 24 24")
        .append("path")
          .style("fill","#ffffff")
          .attr("d","M6 19h3v-6h6v6h3v-9l-6-4.5L6 10Zm-2 2V9l8-6 8 6v12h-7v-6h-2v6Zm8-8.75Z")
  }
 if(Graph.options.multigraph){
    var multiGraphContainer = mainTitle.append("div"); 
    multiGraphSelect(multiGraphContainer, Graph.options.multigraph.idx, Graph.options.multigraph.names);
    multiGraphContainer.select(".multi-select")
      .append("svg")
        .attr("height",24)
        .attr("width",24)
        .attr("viewBox","0 0 24 24")
        .append("path")
          .style("fill","#ffffff")
          .attr("d","M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z")
  }
  if(Graph.options.main){
    mainTitle.append("a")
      .attr("href","")
      .append("h1")
        .html(Graph.options.main);
  }

  var topbarButtons = topbarContent.append("div").attr("class","topbar-buttons");
  topbarContent.append("div").attr("class","topbar-clear");

  topbarButtons.append("div")
    .attr("class","pagination")
    .append("span")

  // node multi search
  if(Graph.options.search){
    var searchFunction = Tree ? Tree.getSearchFunction(filterSelection,displayGraph) : filterSelection;

    topbarButtons.append("div")
      .attr("class","topbar-search")
      .call(displayMultiSearch()
        .data(nodes)
        .column(Graph.options.nodeLabel)
        .updateSelection(displayGraph)
        .updateFilter(function(){
          if(!nodes.filter(function(node){ return node.selected; }).length){
            if(!topbarButtons.select(".topbar-search > .multi-search > .search-box.noresults").size()){
              var searchbox = topbarButtons.select(".topbar-search > .multi-search > .search-box");
              var noresults = searchbox.classed("noresults",true)
                .append("p").text(texts.noresults);
              setTimeout(function(){
                searchbox.classed("noresults",false)
                noresults.remove();
              }, 5000);
            }
          }else{
            searchFunction();
            nodes.forEach(function(node){ delete node.selected; });
            displayGraph();
            highlightBreadcrumbsButtons();
          }
          topbarButtons.select(".show-search-container").style("display",null);
          topbarButtons.select(".topbar-search").style("display",null);
        })
        .help(false))

    var searchButton = topbarButtons.append("div")
      .attr("class","show-search-container")
      .append("button")
        .attr("class","topbar-button show-search-button")
        .attr("aria-label","search")
        .attr("title","search")
        .on("click",function(){
          topbarButtons.select(".show-search-container").style("display","none");
          topbarButtons.select(".topbar-search").style("display","inline-block");
        })
    searchButton.append("svg")
        .attr("height",24)
        .attr("width",24)
        .attr("viewBox","0 0 8 8")
        .append("path")
          .style("fill","#ffffff")
          .attr("d",d4paths.search)
  }

  // filter selection
  var filterSelectionButton = topbarButtons.append("div")
      .append("button")
        .attr("class","topbar-button filter-selection")
        .attr("aria-label",texts.filterselection)
        .attr("title",texts.filterselection)
        .on("click",filterSelection)
        .classed("disabled",true)
  filterSelectionButton.append("svg")
        .attr("height",24)
        .attr("width",24)
        .attr("viewBox","0 0 24 24")
        .append("path")
          .style("fill","#ffffff")
          .attr("d","M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z")
  filterSelectionButton.append("span")

  // show table
  if(Graph.options.showTable){
    topbarButtons.append("div")
      .append("button")
        .attr("class","topbar-button show-table")
        .attr("aria-label",texts["Table"])
        .attr("title",texts["Table"])
        .on("click",function(){
          window.scrollTo(0, 0);
          displayTable(Tree ? Tree.typeFilter : false);
        })
        .append("svg")
        .attr("height",24)
        .attr("width",24)
        .attr("viewBox","0 0 24 24")
        .append("path")
          .style("fill","#ffffff")
          .attr("d","M19,7H9C7.9,7,7,7.9,7,9v10c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V9C21,7.9,20.1,7,19,7z M19,9v2H9V9H19z M13,15v-2h2v2H13z M15,17v2h-2v-2H15z M11,15H9v-2h2V15z M17,13h2v2h-2V13z M9,17h2v2H9V17z M17,19v-2h2v2H17z M6,17H5c-1.1,0-2-0.9-2-2V5 c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v1h-2V5H5v10h1V17z")
  }

  // show frequencies
  if(Graph.options.frequencies){
      topbarButtons.append("div")
      .append("button")
        .attr("class","topbar-button show-frequencies")
        .on("click",function(){
          displayFrequencies();
        })
        .attr("title","frequencies")
        .append("img")
          .attr("src",b64Icons.chart)
          .attr("alt","freq")
          .attr("width","24")
          .attr("height","24")
          .style("filter","brightness(0) invert(1)")
  }

  // filter button
  topbarButtons.append("div")
      .append("button")
        .attr("class","topbar-button filter-button")
        .attr("aria-label",texts.filtermenu)
        .attr("title",texts.filtermenu)
        .on("click",function(){
          window.scrollTo(0, 0);
          body.classed("display-filterpanel",true);
          displaySideContent();
          updateFiltersMarkers();
        })
        .append("svg")
        .attr("height",24)
        .attr("width",24)
        .attr("viewBox","0 0 24 24")
        .append("path")
          .style("fill","#ffffff")
          .attr("d","M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z")

  var filterpanel = body.append("div")
        .attr("class","filterpanel");

  filterpanel.on("click",closeFilterPanel)

  var sidepanel = filterpanel.append("div")
    .attr("class","filter-side-panel")
    .on("click",function(){
       d3.event.stopPropagation();
    })

  var sideheader = sidepanel.append("div")
    .attr("class","side-panel-header")
  sideheader.html("&nbsp;")
  sideheader.append("button")
    .attr("class","close-button")
    .attr("aria-label",texts.close)
    .attr("title",texts.close)
    .on("click",closeFilterPanel);

  var sidecontent = sidepanel.append("div")
    .attr("class","side-panel-content")

  var sidebottom = sidepanel.append("div")
    .attr("class","side-panel-bottom")
  sidebottom.append("button")
    .attr("class","primary clear")
    .text(texts.clearfilters)
    .on("click",function(){
      selectedValues.clear();
      selectedValues.applyFilter(Graph.options);
      clearTreeParent();
      displayGraph();
      updateFiltersMarkers();
      sidecontent.selectAll(".plus-minus-button.expanded").dispatch("click");
    })

  function closeFilterPanel(){
    sidepanel.classed("show-frequencies",false);
    body.classed("display-filterpanel",false);
    sidecontent.selectAll("*").remove();
  }

  // breadCrumbs
  if(Tree){
    Tree.breadcrumbs = new Tree.BreadCrumbs(topbar);

    function highlightBreadcrumbsButtons(){
      var buttons = Tree.breadcrumbs.breadcrumbs.selectAll("button.primary:not(.empty)");
      buttons.classed("blinkblink",true);
      setTimeout(function(){
        buttons.classed("blinkblink",false);
      }, 10000);
    }
  }

  var gallery = body.append("div")
        .attr("class","grid-gallery-mode2");

  var galleryItems = gallery.append("div")
        .attr("class","gallery-items")

  var viewMore = gallery.append("div")
    .attr("class","loading-icon")
    .html(getLoadingSVG())
  viewMore.append("span")
  viewMore.insert("span","svg")

  window.addEventListener("scroll",function(){
    if(window.pageYOffset==0){
      body.style("margin-top",null)
      body.classed("fixed-topbar",false);
      updateTopbarTags();
    }else if(!body.classed("fixed-topbar")){
      body.style("margin-top",topbar.node().offsetHeight+"px")
      body.classed("fixed-topbar",true);
      updateTopbarTags();
    }
    if(window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 250){
      pagination = pagination + pagestep;
      renderCards(pagination);
      if(viewMore.style("display")=="none"){
        body.classed("fixed-footer",false);
      }
    }else if(!body.classed("fixed-footer")){
      body.classed("fixed-footer",true);
    }
  })

  function resetPagination(){
    window.scrollTo(0, 0);
    var itemw = 385,
        itemh = 468;
    if(Graph.options.scale){
      itemw = itemw * Graph.options.scale;
      itemh = itemh * Graph.options.scale;
    }
    var itemsX = Math.floor(window.innerWidth / itemw),
        itemsY = Math.floor(window.innerHeight / itemh);
    pagestep = itemsX * itemsY;
    pagination = pagestep * 2;
  }

  var footer = body.append("div")
    .attr("class","footer")
  var footer1 = footer.append("div")
    .attr("class","footer-logo1")
  footer1.html(Graph.options.note ? Graph.options.note : '<span class="no-note">NetGallery</span>')
  var footer2 = footer.append("div")
    .attr("class","footer-logo2")
  footer2.html('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 40 30"><g stroke-linejoin="round" stroke="#c1c1c1" stroke-width="2" fill="none"><path d="M11.975 9.6 10 7.475M11.8 12.175l-2.375 3.55M18.175 17.125l-7 1M21.525 13.6l-.275-4.625M24.275 18.6l9.775 6.7M13.05 11.175l7.9-5.925" stroke-width=".5"/></g><g fill="#fff" transform="matrix(.25 0 0 .25 -19.05 35.825)"><circle cy="-123.8" cx="158.8" r="16.5"/><circle cy="-119.8" cx="108.7" r="9.9"/><circle cy="-67.8" cx="106.7" r="14.5"/><circle cy="-99.4" cx="127.8" r="6.6"/><circle cy="-75.7" cx="162.1" r="13.2"/><circle cy="-36.3" cx="219.2" r="9"/></g></svg>');
  footer2.append("span")
    .text("netCoin")
  footer2.append("span")
    .attr("class","pagination")
  body.classed("fixed-footer",true);

  displayGraph();

  if(typeof tutorialTour != "undefined"){
    tutorialTour(Graph.options);
  }

  function displayGraph(){
    resetPagination();

    var filteredData = nodes;
    if(Tree){
      if(Tree && Tree.relatives){
        filteredData.forEach(function(d){
          delete d['_current_relatives'];
        })
        delete Tree.relatives;
      }
      filteredData = Tree.treeFilteredData(filteredData);
      Tree.displayTreeMenu(filteredData);
    }

    var nodeOrder = false;
    if(Graph.options.order){
      nodeOrder = Graph.options.order;
    }else if(Graph.options.nodeOrder){
      if(typeof Graph.options.nodeOrder=="string"){
        nodeOrder = Graph.options.nodeOrder;
      }else{
        nodeOrder = Graph.options.nodeOrder[Graph.options.nodeTypes.indexOf(Tree.typeFilter)];
        if(!nodeOrder){
          nodeOrder = false;
        }
      }
    }
    if(nodeOrder && Graph.options.nodeNamesByType && Tree.typeFilter && Graph.options.nodeNamesByType[Tree.typeFilter].indexOf(nodeOrder)==-1){
      nodeOrder = false;
    }

    Graph.filteredOrderedData = filteredData.filter(function(n){ return !n['_filtered']; });
    if(Tree && Tree.relatives){
      Graph.filteredOrderedData.sort(function(a,b){
        var aa = a['_current_relatives'],
            bb = b['_current_relatives'];
            comp = 0;
        if(bb.length>1 || aa.length>1){
          comp = bb.length-aa.length;
        }else if(Tree.treeParent.indexOf(aa[0])!=-1 && Tree.treeParent.indexOf(bb[0])==-1){
          comp = 1;
        }else if(Tree.treeParent.indexOf(bb[0])!=-1 && Tree.treeParent.indexOf(aa[0])==-1){
          comp = -1;
        }else{
          comp = Tree.treeParent.indexOf(aa[0])-Tree.treeParent.indexOf(bb[0]);
        }
        if(comp==0 && nodeOrder){
          aa = a[nodeOrder];
          bb = b[nodeOrder];
          return compareFunction(aa,bb,Graph.options.rev);
        }
        if(comp==0 && Graph.options.rev){
          return 1;
        }
        return comp;
      })
    }else{
      if(nodeOrder){
        Graph.filteredOrderedData.sort(function(a,b){
          var aa = a[nodeOrder],
              bb = b[nodeOrder];
          return compareFunction(aa,bb,Graph.options.rev);
        })
      }else if(Graph.options.rev){
        Graph.filteredOrderedData.reverse();
      }
    }

    updateTopbarTags();

    renderCards(pagination);
  } // end of displayGraph

  function renderCards(nitems){
    galleryItems.selectAll("div.item-card, h3.parent-separator").remove();
    viewMore.style("display","none");

    var showcount = 0;
    for(var i = 0; i<Graph.filteredOrderedData.length; i++){

      if(showcount >= nitems){
        if(viewMore.style("display")=="none"){
          viewMore.style("display",null);
        }
        break;
      }

      showcount++;

      if(Tree && Tree.relatives && Graph.filteredOrderedData[i]['_current_relatives'] && !galleryItems.selectAll("h3.parent-separator").filter(function(){
        return d3.select(this).attr("relatives-id")==Graph.filteredOrderedData[i]['_current_relatives'].join("|");
      }).size()){
        var label = Graph.options.nodeLabel ? Graph.filteredOrderedData[i]['_current_relatives'].map(function(r){
          return nodes.filter(function(n){
            return n[Graph.options.nodeName]==r;
          })[0][Graph.options.nodeLabel];
        }) : Graph.filteredOrderedData[i]['_current_relatives'];
        galleryItems.append("h3")
          .attr("class","parent-separator")
          .attr("relatives-id",Graph.filteredOrderedData[i]['_current_relatives'].join("|"))
          .text(label.join(" & "))
      }

      var itemcard = galleryItems.append("div")
          .attr("class","item-card")

      var iteminner = itemcard.append("div")
        .attr("class","item-card-inner");

      iteminner.append("div")
        .attr("class","card-check check-box")
        .on("click",function(n){
          d3.event.stopPropagation();
          var thisitemcard = d3.select(this.parentNode.parentNode);
          var n = Graph.filteredOrderedData[thisitemcard.attr("card-index")];
          if(!n["selected"]){
            n["selected"] = true;
          }else{
            delete n["selected"];
          }
          thisitemcard.classed("selected",n["selected"]);
          updateSelectionTools();
        })
      var text = Graph.filteredOrderedData[i][Graph.options.nodeLabel];
      var span = iteminner.append("span")
        .attr("class","title")
        .text(text)
        .attr("title",text)
      var imgwrapper = iteminner.append("div")
        .attr("class","img-wrapper")
      if(Graph.options.nodeSubtitle){
        var subtitle = Graph.filteredOrderedData[i][Graph.options.nodeSubtitle],
            subtitletitle = subtitle? subtitle.replace(/(<([^>]+)>)/gi, "") : null;
        if(!subtitle){
          subtitle = "&nbsp;";
        }
        var subtitle = iteminner.append("span")
          .attr("class","subtitle")
          .html(subtitle)
          .attr("title",subtitletitle)
      }
      var image = imgwrapper.append("img")
      if(Graph.options.imageItems){
        image.on("error",function(){
            d3.select(this).attr("src",b64Icons.image)
              .style("width","60px")
          })
          .attr("src",Graph.filteredOrderedData[i][Graph.options.imageItems]);
        if(Graph.options.imageCopy){
          imgwrapper.append("span")
            .attr("class","copyright")
            .attr("title",Graph.filteredOrderedData[i][Graph.options.imageCopy])
            .html("&copy;")
        }
      }else{
        image.attr("src",b64Icons.image)
          .style("width","60px")
      }

      itemcard.classed("selected",Graph.filteredOrderedData[i]["selected"])
        .attr("card-index",i)

      if(Graph.options.nodeText && Graph.filteredOrderedData[i][Graph.options.nodeText]){
        itemcard.style("cursor","pointer")
          .on("click.mainframe",function(){
            var index = d3.select(this).attr("card-index");
            openMainFrame(Graph.filteredOrderedData[index]['_index'],getMainFrameNavigation());
          })
      }
    }

    updateSelectionTools();
    updatePaginationViewer();
  }

  function filterSelection(){
      selectedValues.clear();
      nodes.forEach(function(n){
        if(n["selected"]){
          selectedValues.add(Graph.options.nodeName,n[Graph.options.nodeName]);
        }
      });
      selectedValues.applyFilter(Graph.options);
      clearTreeParent();
      displayGraph();
  }

  function selectedNames(){
      return nodes.filter(function(n){
          return n.selected;
        })
        .map(function(n){
          return n[Graph.options.nodeName];
        });
  }

  function updateSelectionTools(){
    var selectedlen = selectedNames().length;

    filterSelectionButton.classed("disabled",!selectedlen);
    if(selectedlen && selectedlen>99){
      selectedlen = "99+";
    }
    filterSelectionButton.select("span").text(selectedlen);
  }

  function updatePaginationViewer(){
    var total = Graph.filteredOrderedData.length;
    var pag = galleryItems.selectAll(".item-card").size();
    footer.select("span.pagination").text(pag+" / "+total);
    topbarButtons.select("div.pagination > span").text(pag+" / "+total);
  }

  function roundNumeric(d){
    d = +d;
    return (d % 1 === 0) ? d : d.toFixed(1);
  }

  function updateFiltersMarkers(){
    sidecontent.selectAll(".filter-container").each(function(){
      var div = d3.select(this),
          key = div.attr("filter-key"),
          keysize = selectedValues.size(key),
          text = keysize;
      if(keytypes[key]=="number"){
        text = selectedValues.values(key).map(roundNumeric).join(" - ");
      }
      div.select(".filter-name > span").text(keysize ? " ("+text+")" : "");
    });
  }

  function updateTopbarTags(){
    var container = topbar.select(".topbar-tag-container");
    if(container.empty()){
      container = topbar.append("div")
        .attr("class","topbar-tag-container");
    }
    container.selectAll(".tag").remove();
    renderParentTag(container);
    selectedValues.keys().forEach(function(k){
      if(keytypes[k] == "number"){
        renderTag(container,k + " (" + selectedValues.values(k).map(roundNumeric).join(" - ") + ")",k);
      }else if(k==Graph.options.nodeName){
        renderTag(container,k,k);
      }else{
        selectedValues.values(k).forEach(function(v){
          renderTag(container,v,k,v);
        });
      }
    });
    changeSearchIcon();
    var tags = container.selectAll(".tag");
    if(tags.size()==0){
      container.remove();
    }else{
      var tagsWidth = 0;
      tags.each(function(){
        tagsWidth += (this.offsetWidth + 8);
      })
      if(tagsWidth > container.node().offsetWidth){
        container.selectAll(".tag").remove();
        renderParentTag(container);
        selectedValues.keys().forEach(function(k){
          if(keytypes[k] == "number"){
            renderTag(container,k + " (" + selectedValues.values(k).map(roundNumeric).join(" - ") + ")",k);
          }else{
            renderTag(container,k,k);
          }
        })
        changeSearchIcon();
      }
    }

    function changeSearchIcon(){
      container.selectAll(".tag").each(function(){
        var self = d3.select(this);
        if(!self.text() || self.text().indexOf("_")===0){
          if(Tree && Tree.typeFilter){
            self.text(Tree.typeFilter)
          }else{
            self.text("")
            self.call(getSVG()
              .d(d4paths.search)
              .width(16).height(16))
          }
        }
      });
    }

    function renderTag(container,text,k,v){
        container.append("span")
        .attr("class","tag")
        .attr("filter-key",k)
        .attr("filter-value",typeof v != 'undefined' ? v : null)
        .text(text)
        .on("click",function(){
          tagClickAction(this,typeof v != 'undefined' ? true : false);
        })
    }

    function tagClickAction(thiz,value){
      var self = d3.select(thiz);
      if(value){
        selectedValues.remove(self.attr("filter-key"),self.attr("filter-value"));
      }else{
        selectedValues.remove(self.attr("filter-key"));
      }
      selectedValues.applyFilter(Graph.options);
      clearTreeParent();
      updateFiltersMarkers();
      displayGraph();
    }

    function renderParentTag(container){
      if(Tree && Tree.treeParent && Tree.treeParent.length && !selectedValues.keys().length){
        var span = container.append("span")
        .attr("class","tag")
        .text(Tree.treeParentType)
        .on("click",function(){
          clearTreeParent();
          displayGraph();
        })      
      }
    }
  }

  function clearTreeParent(){
    if(Tree && Tree.treeParent){
      Tree.treeParent = [];
      delete Tree.treeParentType;
    }
  }

  function plusMinusButton(div,callback){
    var plusMinusButton = div.append("span").html("&plus;")
      .attr("class","plus-minus-button")
      .on("click",function(){
        plusMinusButton.classed("expanded",!plusMinusButton.classed("expanded"));
        if(plusMinusButton.classed("expanded")){
          plusMinusButton.html("&minus;");
          var container = div.append("div")
            .attr("class","items-container");
          callback(container);
        }else{
          plusMinusButton.html("&plus;");
          div.select(".items-container").remove();
        }
      })
  }

  function displayFrequencies(){
    var frequencyBars = displayFreqBars()
        .nodenames(getSelectOptions(false,Graph,Tree).filter(function(d){ return d!=Graph.options.nodeName; }))
        .updateSelection(function(){
          galleryItems.selectAll(".item-card").each(function(n){
            var thisitemcard = d3.select(this);
            var n = Graph.filteredOrderedData[thisitemcard.attr("card-index")];
            thisitemcard.classed("selected",n["selected"]);
          });
          updateSelectionTools();
          frequencyBars(sidecontent);
        })
        .filterHandler({
          addFilter: function(name,values){
            filterSelection();
            displayFrequencies();
          },
          removeFilter: function(){
            selectedValues.clear();
            selectedValues.applyFilter(Graph.options);
            clearTreeParent();
            displayGraph();
            displayFrequencies();
          },
          checkFilter: function(){
            return selectedValues.keys().length;
          }
        })
        .nodes(Graph.filteredOrderedData);

    window.scrollTo(0, 0);
    body.classed("display-filterpanel",true);
    sidepanel.classed("show-frequencies",true);

    frequencyBars(sidecontent);
  }

  function displayTable(tableitem){
    body.select("body > .tables").remove();

    var tables = body.style("overflow", "hidden")
            .append("div")
              .attr("class","tables")

    var tabletopheader = tables.append("div")
        .attr("class","table-top-header")

    tabletopheader.append("button")
          .attr("class","close-button")
          .attr("aria-label",texts.close)
          .attr("title",texts.close)
          .on("click",closeTable);

    var onlySelected = selectedNames().length ? true : false;

    var onlySelectedData = tabletopheader.append("div")
      .attr("class","only-selected-data")
      .classed("selected",onlySelected)
      .on("click",function(){
        onlySelectedData.classed("selected",!onlySelectedData.classed("selected"));
        tableInst.onlySelectedData(onlySelectedData.classed("selected"));
        tables.call(tableInst);
      })
    onlySelectedData.append("span")
        .text(texts.showonlyselecteditems+" ")
    onlySelectedData.append("div")
        .attr("class","check-box")

    if(Graph.options.multigraph || Graph.options.main){
      if(Graph.options.multigraph){
        multiGraphSelect(tabletopheader, Graph.options.multigraph.idx, Graph.options.multigraph.names);
        tabletopheader.select(".multi-select")
          .append("svg")
        .attr("height",24)
        .attr("width",24)
        .attr("viewBox","0 0 24 24")
        .append("path")
          .attr("d","M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z")
      }
      if(Graph.options.main){
        tabletopheader
        .append("span")
          .html(Graph.options.main);
      }
    }

    var header = tables.append("div")
            .attr("class","table-header")

    if(Graph.options.exportExcel){
      header.append("button")
            .attr("class","excel-export")
            .attr("aria-label","xlsx")
            .attr("title","xlsx")
            .on("click",function(){

    var excel = {};
    var cols = tableInst.columns();
    var sheetname = Tree ? Tree.typeFilter : "data";
    excel[sheetname] = [];
    var row = [];
    cols.forEach(function(c){
            row.push(String(c));
    });
    excel[sheetname].push(row);
    tableInst.data().forEach(function(n){
              row = [];
              cols.forEach(function(c){
                row.push(String(n[c]));
              });
              excel[sheetname].push(row);
    });
    downloadExcel(excel, d3.select("head>title").text());

            })
            .append("img")
              .attr("src",b64Icons["xlsx"])
    }

    header.append("input")
      .attr("type", "text")
      .attr("placeholder",texts.searchintable)
      .on("keyup",function(){
        var txt = cleanString(d3.select(this).property("value"));
        onlySelectedData.classed("selected",false);
        tableInst.onlySelectedData(false);
        tables.call(tableInst);
        if(txt.length>1){
          var columns = tableInst.columns();
          tableInst.data().forEach(function(node,j){
            delete node.selected;
            var i = 0;
            while(!node.selected && i<columns.length){
              if(cleanString(node[columns[i++]]).match(txt)!==null){
                node.selected = true;
              }
            }
          });
          onlySelectedData.classed("selected",true);
          tableInst.onlySelectedData(true);
        }else{
          Graph.filteredOrderedData.forEach(function(d){
            d.selected = false;
          });
        }
        tables.call(tableInst);
        displayGraph();
      })

    header.append("button")
            .attr("class","primary tableselection disabled")
            .text(texts.select)
            .on("click",function(){
              selectFromTable();
              if(tableitem=="_relations_" ){
                closeTable();
              }else{
                displayTable(tableitem);
              }
            })

    header.append("button")
            .attr("class","primary tablefilter disabled")
            .text(texts.filter)
            .on("click",function(){
              filterFromTable();
              if(tableitem=="_relations_" ){
                closeTable();
              }else{
                displayTable(tableitem);
              }
            })

    header.append("button")
      .attr("class","primary-outline clear")
      .classed("disabled",!selectedValues.keys().length)
      .text(texts.clearfilters)
      .on("click", function(){
        selectedValues.clear();
        selectedValues.applyFilter(Graph.options);
        clearTreeParent();
        displayGraph();
        displayTable(tableitem);
      });

    if(Tree && tableitem){
      header.append("button")
        .attr("class","primary")
        .text(texts["Relations"])
        .classed("disabled",tableitem=="_relations_")
        .style("margin-left","24px")
        .on("click",function(){
          selectedValues.clear();
          selectedValues.applyFilter(Graph.options);
          clearTreeParent();
          body.select(".topbar > .breadcrumbs > button[content="+Graph.options.nodeTypes[0]+"]").node().click();
          displayTable("_relations_");
        })

      Graph.options.nodeTypes.forEach(function(type){
        header.append("button")
        .attr("class","primary")
        .text(type)
        .classed("disabled",tableitem==type)
        .on("click",function(){
          body.select(".topbar > .breadcrumbs > button[content="+type+"]").node().click();
          displayTable(type);
        })
      });
    }

    var table = tables.append("div")
            .attr("class","table-container")

    var tableInst = tableWrapper()
            .data(Graph.filteredOrderedData)
            .onlySelectedData(onlySelected)
            .columns(Graph.nodenames.filter(filterColumns))
            .id(Graph.options.nodeName)
            .update(function(){
              tables.selectAll("button.primary.tableselection, button.primary.tablefilter")
                .classed("disabled",tables.selectAll("tr.selected").empty());
            })

    if(tableitem){
      var columns = [],
          data = [];

      if(tableitem=="_relations_"){
        nodes.forEach(function(d){
          if(d[Graph.options.nodeType]==Graph.options.nodeTypes[0]){
            var row = {};
            row["_id"] = d[Graph.options.nodeName];
            //row["selected"] = d.selected;
            Graph.options.nodeTypes.forEach(function(t){
              row[t] = [];
            });
            row[Graph.options.nodeTypes[0]].push(d[Graph.options.nodeLabel]);
            var relatives = Graph.nodes_relatives[d["_index"]],
                relativesTypes = Graph.nodes_relativesTypes[d["_index"]];
            relatives.forEach(function(r,i){
              row[relativesTypes[i]].push(Graph.options.nodeLabel==Graph.options.nodeName ? r : nodes.filter(function(n){
                return n[Graph.options.nodeName]==r;
              })[0][Graph.options.nodeLabel]);
            });
            Graph.options.nodeTypes.forEach(function(t){
              row[t] = row[t].join("; ");
            });
            data.push(row);
          }
        });
        columns = Graph.options.nodeTypes.slice();
        columns.unshift("_id");
        tableInst.data(data)
          .columns(columns)
          .id("_id");
      }else{

      if(Graph.options.nodeTypes && Graph.options.nodeTypes.indexOf(tableitem)!=-1){
        if(Graph.options.nodeNamesByType && Graph.options.nodeNamesByType.hasOwnProperty(tableitem)){
          columns = Graph.options.nodeNamesByType[tableitem].filter(filterColumns);
          columns.push(Graph.options.nodeType);
        }else{
          columns = Graph.nodenames.filter(filterColumns);
        }
        data = Graph.filteredOrderedData.filter(function(n){
          if(Array.isArray(n[Graph.options.nodeType])){
            return n[Graph.options.nodeType].indexOf(tableitem)!=-1;
          }
          return n[Graph.options.nodeType]==tableitem;
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
        var columnsDict = {};
        if(Graph.options.nodeName=="_name"){
          columnsDict[Graph.options.nodeName] = tableitem;
        }
        tableInst.data(data)
          .columns(columns)
          .columnsDict(columnsDict)
      }

      }
    }

    tables.call(tableInst);

    function closeTable(){
        tables.remove();
        body.style("overflow", null);
    }

    function selectFromTable(){
      var tableData = tableInst.data();
      Graph.filteredOrderedData.forEach(function(d,i){
        d.selected = tableData[i]._selected;
      });
      displayGraph();
    }

    function filterFromTable(){
      tableInst.data().forEach(function(d){
        if(d._selected){
          selectedValues.add(Graph.options.nodeName,d._name);
        }
      });
      selectedValues.applyFilter(Graph.options);
      clearTreeParent();
      displayGraph();
      updateFiltersMarkers();
    }

    function filterColumns(d){
      if(d==Graph.options.nodeName){
        return true;
      }
      if(d.substring(0,1)=="_"){
        return false;
      }
      if(Graph.options.imageItems && d==Graph.options.imageItems){
        return false;
      }
      if((d==Graph.options.nodeText || d==Graph.options.nodeInfo) && d!=Graph.options.nodeLabel){
        return false;
      }
      return true;
    }
  }

  function mousePosition(sel){
      var coor = d3.mouse(body.node());

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

  function updateSelectOptions(){
    delete Graph.options.order;
    updateReverseOrder();
    Tree.breadcrumbs.updateSelectedType();
  }

  function updateReverseOrder(){
    delete Graph.options.rev;
    if(Graph.options.decreasing){
      if(!Array.isArray(Graph.options.decreasing) || Graph.options.decreasing[Graph.options.nodeTypes.indexOf(Tree.typeFilter)]){
        Graph.options.rev = true;
      }
    }
  }

  function deselectAllItems(){
    nodes.forEach(function(n){ delete n.selected; });
    displayGraph();
  }

  function removeFilter(){
      selectedValues.clear();
      selectedValues.applyFilter(Graph.options);
      displayGraph();
  }

  function displaySideContent(){
    var selectedOptions = getSelectOptions(false,Graph,Tree);
    if(Graph.options.nodeType){
      selectedOptions = selectedOptions.filter(function(d){
        return d!=Graph.options.nodeType;
      })
    }
    if(Graph.options.nodeName=="_name" && Tree && Tree.typeFilter && Graph.options.nodeLabel=="_name"){
      selectedOptions.unshift("_name");
    }

    // order
  var ordercontainer = sidecontent.append("div")
    .attr("class","order-container")
  ordercontainer.append("span").text(texts["Order"])
  plusMinusButton(ordercontainer,function(container){
    container.append("span")
        .attr("class","radio-item"+(!Graph.options.order ? " selected-item" : ""))
        .text("-"+texts['default']+"-")
        .attr("order-key","-"+texts['default']+"-")
        .on("click",function(){
          delete Graph.options.order;
          changeRadioSelected(this);
          displayGraph();
        })

    selectedOptions.forEach(function(col){
      container.append("span")
        .attr("class","radio-item"+(Graph.options.order && Graph.options.order==col ? " selected-item" : ""))
        .text(getText(col))
        .attr("order-key",col)
        .on("click",function(){
          Graph.options.order = d3.select(this).attr("order-key");
          changeRadioSelected(this);
          displayGraph();
        })
    });

    var revorder = container.append("div")
      .attr("class","rev-order")
    revorder.append("span")
      .text(texts['Reverse'])
    revorder.append("button")
      .attr("class","switch-button")
      .classed("active",Graph.options.rev)
      .on("click",function(){
        var self = d3.select(this);
        self.classed("active",!self.classed("active"));
        if(self.classed("active")){
          Graph.options.rev = true;
        }else{
          delete Graph.options.rev;
        }
        displayGraph();
      })

    function changeRadioSelected(thiz){
      container.selectAll(".radio-item").classed("selected-item",false);
      d3.select(thiz).classed("selected-item",true);
    }
  });

    // filters
  selectedOptions.forEach(function(col){
    var type = keytypes[col];
    var div = sidecontent.append("div")
      .attr("class","filter-container")
      .attr("filter-key",col);
    div.append("span").text(getText(col))
      .attr("class","filter-name")
      .append("span")
    plusMinusButton(div,function(container){
          if(type == 'number'){
            var discrete = true,
                extent = d3.extent(Graph.filteredOrderedData, function(d){
                  if(discrete && d[col]%1!=0){
                    discrete = false;
                  }
                  return d[col];
                }),
                tempValues;
            container.call(brushSlider()
            .domain(extent)
            .current(extent)
            .ordinal(discrete)
            .mode(2)
            .callback(function(s){
              selectedValues.remove(col);
              selectedValues.add(col,s[0]);
              selectedValues.add(col,s[1]);
              selectedValues.applyFilter(Graph.options);
              clearTreeParent();
              updateFiltersMarkers();
              displayGraph();
            }));
          }else{
            var dat = Graph.filteredOrderedData.map(function(d){ return d[col]; }),
                crosstab = {};
            if(type != 'string'){
              dat = dat.reduce(function(a,b) { return b ? a.concat(b) : a; }, []);
            }
            dat.forEach(function(d){
              if(!crosstab.hasOwnProperty(d)){
                crosstab[d] = 1;
              }else{
                crosstab[d] += 1;
              }
            });
            dat = d3.keys(crosstab).sort();
            if(dat.length>20){
              var simpleSearch = container.append("div")
                .attr("class","simple-search")
              simpleSearch.append("input")
                .attr("class","search-box")
                .on("input",function(){
                  displayTags(this.value);
                })
              simpleSearch.append("button")
                .attr("class","search-icon disabled")
                .call(getSVG()
                  .d(d4paths.search)
                  .width(16).height(16))
            }

            if(type != 'string'){
              if(!Graph.options.jointfilter){
                Graph.options.jointfilter = {};
              }
              if(!Graph.options.jointfilter.hasOwnProperty(col)){
                Graph.options.jointfilter[col] = false;
              }
    var jointfilter = container.append("div")
      .attr("class","joint-filter")
    jointfilter.append("span")
      .text(texts['jointfilter'])
    jointfilter.append("button")
      .attr("class","switch-button")
      .classed("active",Graph.options.jointfilter[col])
      .on("click",function(){
        var self = d3.select(this);
        self.classed("active",!self.classed("active"));
        Graph.options.jointfilter[col] = self.classed("active");
        selectedValues.applyFilter(Graph.options);
        updateFiltersMarkers();
        displayGraph();
      })
            }

            displayTags();

            function displayTags(filter){
              container.selectAll(".tag").remove();
              dat.forEach(function(d){
                if(filter && !d.toLowerCase().includes(filter.toLowerCase())){
                  return;
                }

                var tag = container.append("span")
                  .attr("class","tag"+(selectedValues.has(col,d) ? " tag-selected" : ""))
                  .text(d+(crosstab[d]>1 ? " ("+crosstab[d]+")" : ""))
                  .on("click",function(){
                    tag.classed("tag-selected",!tag.classed("tag-selected"));
                    selectedValues[tag.classed("tag-selected") ? 'add' : 'remove'](col,d);
                    selectedValues.applyFilter(Graph.options);
                    updateFiltersMarkers();
                    clearTreeParent();
                    displayGraph();
                  })
              });
            }
          }
    });
  });

    function getText(col){
      var text = col;
      if(col=="_name" && Tree && Tree.typeFilter){
        text = Tree.typeFilter;
      }
      return text;
    }
  }

  function pageZoom(zoom){
    if(window.innerWidth<385){
      zoom = window.innerWidth / 385;
    }
    if(zoom){
      d3.select("head")
        .append("style")
        .text(
".grid-gallery-mode2 > .gallery-items > .item-card { width: "+(305*zoom)+"px; height: unset; margin: "+(40*zoom)+"px}" +
".grid-gallery-mode2 > .gallery-items > .item-card > .item-card-inner > .img-wrapper { height: "+(272*zoom)+"px; }" +
".grid-gallery-mode2 > .gallery-items > .item-card > .item-card-inner > span { font-size: "+(1.25*zoom)+"em; height: "+(34*zoom)+"px; }" +
".grid-gallery-mode2 > .gallery-items > .item-card > .item-card-inner > .card-check.check-box { margin: "+(24*zoom)+"px; width: "+(24*zoom)+"px; height: "+(24*zoom)+"px; border-radius: "+(4*zoom)+"px; }" +
".grid-gallery-mode2 > .gallery-items > .item-card > .item-card-inner { padding: "+(24*zoom)+"px; width: unset; height: unset; }"
        )
      return zoom;
    }
    return 1;
  }

  function colorScheme(mode){
    // headerback headertext galleryback buttons cardback
    // default: #2F7BEE, #FFFFFF, #E7F1FD, #2F7BEE, #DEE5ED
    var pallete = [
        ["#2F7BEE","#FFFFFF","#E7F1FD","#2F7BEE","#DEE5ED"],
        ["#A53F2B","#FFFFFF","#FFFFFF","#003366","#EFEFEF"],
        ["#FF8247","#222C37","#222C37","#FF6319","#DEE5ED"],
        ["#222C37","#FFFFFF","#FFEFE7","#FF6319","#DEE5ED"],
        ["#222C37","#FFFFFF","#F1D8E6","#B83C82","#DEE5ED"],
        ["#B83C82","#FFFFFF","#D2D4D7","#B83C82","#DEE5ED"],
        ["#6639B7","#FFFFFF","#FFF2EA","#0066A1","#DEE5ED"],
        ["#0066A1","#FFFFFF","#FFF2EA","#6639B7","#DEE5ED"],
        ["#0066A1","#FFFFFF","#CCE0EC","#FF7F33","#DEE5ED"],
        ["#6585ED","#FFFFFF","#FEF1F0","#54616A","#DEE5ED"],
        ["#F5756C","#FFFFFF","#E0E7FC","#54616A","#DEE5ED"],
        ["#3A7FA6","#FFFFFF","#EEF7F9","#FF6319","#DEE5ED"],
        ["#46475D","#FFFFFF","#D7E5ED","#FF6319","#DEE5ED"]
      ];

    mode = +mode;
    if(mode>pallete.length){
      mode = 0;
    }

    pallete = pallete[mode];

    d3.select("head")
        .append("style")
        .text(
'.topbar, .footer { background-color: '+pallete[0]+'; color: '+pallete[1]+'; }' +
'.grid-gallery-mode2 { background-color: '+pallete[2]+'; }' +
'.topbar-button, .topbar-main > div > .multi-select { border-color: '+pallete[1]+'; color: '+pallete[1]+' }' +
'.topbar-button > svg > path, .topbar-main > div > .multi-select > svg > path { fill: '+pallete[1]+'!important; }' +
'.topbar-button { border-color: '+pallete[1]+'; color: '+pallete[1]+' }' +
'.topbar-button > svg > path { fill: '+pallete[1]+'!important; }' +
'.multi-search > .search-box, .multi-search > .search-box > div.text-wrapper > div.text-content > textarea { background-color: '+pallete[1]+'; color: '+contrast(pallete[1])+'; }' +
'.multi-search > .search-box > div.check-container > span.yes::after { border-color: '+contrast(pallete[1])+'; }' +
'.multi-search > button.search-icon > svg > path { fill: '+pallete[0]+'; }' +
'.topbar > .breadcrumbs { border-bottom-color: '+pallete[1]+'; }' +
'.topbar > .breadcrumbs > button.primary { color: '+pallete[1]+'; }' +
'.topbar > .breadcrumbs > button.primary.disabled { border-bottom-color: '+pallete[1]+'; }' +
'button.primary, .slider-extent, button.switch-button.active { background-color: '+pallete[3]+'; }' +
'button.primary-outline { color: '+pallete[3]+'; border-color: '+pallete[3]+'; }' +
'a { color: '+pallete[3]+' }' +
'button.switch-button.active:after { border-color: '+pallete[3]+'; }' +
'.selected .check-box { background-color: '+pallete[3]+'; border-color: '+pallete[3]+'; }' +
'.radio-item.selected-item:before { border-color: '+pallete[3]+'; }' +
'.grid-gallery-mode2 > .gallery-items > .item-card > .item-card-inner, .grid-gallery-mode2 > .gallery-items > .item-card > .item-card-inner > .item-card-back { background-color: '+pallete[4]+'; color: '+contrast(pallete[4])+'; }' +
'.grid-gallery-mode2 > .gallery-items > .item-card > .item-card-inner > span:after { background: linear-gradient(to right, transparent 90%, '+pallete[4]+'); }' +
'.loading-icon > svg > g > rect { fill: '+contrast(pallete[2])+'; }' +
'.info-template > div > .tree-relatives > span.linked { color: '+pallete[3]+' }' +
'.topbar > .topbar-topcontent > .topbar-main > a > h1 { color: '+pallete[1]+'; }' +
'.footer > .footer-logo2 > svg > g[transform] { fill: '+pallete[1]+'; }' +
'.topbar-button.filter-selection > span { background-color: '+pallete[3]+'; }' +
'body > div.tables > .table-top-header > .multi-select > svg > path { fill: '+pallete[0]+'; }' +

'div.tutorial > .img-and-text > div:first-child { border-color: '+pallete[3]+'; }' +
'div.tutorial span.highlight { color: '+pallete[3]+'; }' +
'div.tutorial-icon { background-color: '+pallete[0]+'; }' +
'svg.tutorial-arrow > path { fill: '+pallete[3]+'; }' +
'.frequency-barplots > .bar-plot > .freq-bar > div.freq1 { background-color: '+checkBrightness(pallete[0])+'; }' +
'.frequency-barplots > .bar-plot > svg > g > g.freq-bar > rect.freq1 { fill: '+checkBrightness(pallete[0])+'; }'
        )

    function checkBrightness(color){
      color = d3.hsl(color);
      if(color.l < 0.66){
        color.l = 0.66;
      }
      return color;
    }

    function contrast(color){
      return d3.hsl(color).l > 0.66 ? '#000000' : '#ffffff';
    }

    function b64Iconsresetfilter(iconSize,iconColor){
      return "data:image/svg+xml;base64,"+btoa('<svg width="'+iconSize+'" height="'+iconSize+'" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.035 10.5L18.375 14.16L14.715 10.5L13.125 12.09L16.785 15.75L13.125 19.41L14.715 21L18.375 17.34L22.035 21L23.625 19.41L19.965 15.75L23.625 12.09L22.035 10.5ZM7.5 31.5L9 31.5L9 34.5L12 34.5L12 31.5L24 31.5L24 34.5L27 34.5L27 31.5L28.5 31.5C30.165 31.5 31.485 30.15 31.485 28.5L31.5 7.5C31.5 5.85 30.165 4.5 28.5 4.5L7.5 4.5C5.85 4.5 4.5 5.85 4.5 7.5L4.5 28.5C4.5 30.15 5.85 31.5 7.5 31.5ZM7.5 7.5L28.5 7.5L28.5 24L7.5 24L7.5 7.5Z" fill="'+iconColor+'"/></svg>');
    }
  }

  function getMainFrameNavigation(){
    return Graph.filteredOrderedData.map(function(d){
      return d['_index'];
    });
  }

  function openMainFrame(index,navigation,goback){
    var leftindex = false,
        rightindex = false;
    if(typeof goback == 'undefined'){
      goback = [];
    }
    if(goback.length){
      if(goback.length>1){
        leftindex = goback[goback.length-1];
      }
    }else if(navigation){
      leftindex = navigation.indexOf(index)-1;
      rightindex = navigation.indexOf(index)+1;
      if(leftindex<=-1){
        leftindex = false;
      }else{
        leftindex = navigation[leftindex];
      }
      if(rightindex>=navigation.length){
        rightindex = false;
      }else{
        rightindex = navigation[rightindex];
      }
    }

    body.select(".mainframe-background").remove();
    body.style("overflow","hidden");

    var background = body.append("div")
        .attr("class","mainframe-background");

    background.on("click",closeMainFrame)

    var mainframe = background.append("div")
      .attr("class","mainframe")
      .on("click",function(){
         d3.event.stopPropagation();
      })

    mainframe.append("button")
      .attr("class","close-button")
      .attr("aria-label",texts.close)
      .attr("title",texts.close)
      .on("click",closeMainFrame);

    if(goback.length){
      mainframe.append("button")
      .attr("class","left2-button")
      .on("click",function(){
        openMainFrame(goback[0],navigation);
      })
    }

    if(leftindex!==false){
      mainframe.append("button")
      .attr("class","left-button")
      .on("click",function(){
        if(goback.length){
          goback.pop();
        }
        openMainFrame(leftindex,navigation,goback);
      })
    }

    if(rightindex!==false){
      mainframe.append("button")
      .attr("class","right-button")
      .on("click",function(){
        openMainFrame(rightindex,navigation);
      })
    }

    mainframe.append("div")
      .attr("class","mainframe-content")
      .html(nodes[index][Graph.options.nodeText]);

    var infoTemplate = mainframe.select(".mainframe-content > .info-template");
    if(!infoTemplate.empty()){

      infoTemplate
        .attr("lang",Graph.options.language)
        .style("hyphens","auto");

      if(Graph.options.imageItems){
        mainframe.select(".info-template > div")
          .insert("img",":first-child")
          .classed("float",Graph.options.mainframeImage==2 ? true : false)
          .attr("src",nodes[index][Graph.options.imageItems])
          .on("load",Graph.options.mainframeImage==0 ? function(){
            if(this.naturalHeight>=this.naturalWidth){
              d3.select(this).classed("float",true);
            }
          }:null)
      }

      if(Tree){
        Tree.treeRelatives(mainframe.select(".info-template > div > .tree-relatives"),function(node){
          goback.push(index);
          openMainFrame(node['_index'],navigation,goback);
        });
      }

      var mainframelinks = mainframe.selectAll("a[target=mainframe]");
      if(!mainframelinks.empty()){
        var iframe = document.createElement('iframe');
        iframe.name = 'mainframe';
        iframe.style.height = 0;
        infoTemplate.node().parentNode.insertBefore(iframe, infoTemplate.node());
        mainframelinks.on("mouseup",function(){
          iframe.style.height = null;
          infoTemplate.style("display","none");
          mainframe.select("button.right-button").remove();
          mainframe.select("button.left-button").remove();
          mainframe.append("button")
            .attr("class","left2-button")
          .on("click",function(){
            openMainFrame(index,navigation);
          })
        })
      }
    }

    var mt = parseInt(mainframe.style("margin-top")),
        wh = window.innerHeight-(mt*2),
        mh = parseInt(mainframe.style("max-height")),
        h = wh<mh ? wh : mh;
    if(Graph.options.mainframeHeight){
      h = h*Graph.options.mainframeHeight;
    }
    if(wh<h){
      h = wh;
    }
    mainframe.style("height",h+"px");

    if(wh>h){
      var nmt = mt + ((wh-h)/2);
      mainframe.style("margin-top",nmt+"px")
    }

    if(Graph.options.mainframeWidth){
      var w = parseInt(mainframe.style("max-width")),
          ww = window.innerWidth-(mt*2);
      w = w*Graph.options.mainframeWidth;
      if(ww<w){
        w = ww;
      }
      mainframe.style("max-width",w+"px");
      mainframe.style("width",w+"px");
    }

    function closeMainFrame(){
      background.remove();
      body.style("overflow",null);
    }
  }
} // gallery function end

window.onload = function(){
  gallery(JSON.parse(d3.select("#data").text()));

};

function ValueSelector(nodes,keytypes){
  this.selectedValues = {};
  this.data = nodes;
  this.keytypes = keytypes;
}

ValueSelector.prototype = {
  add: function(key, val){
    if(!this.selectedValues.hasOwnProperty(key)){
      this.selectedValues[key] = d3.set();
    }
    this.selectedValues[key].add(val);
  },
  values: function(key){
    if(this.selectedValues.hasOwnProperty(key)){
      return this.selectedValues[key].values();
    }
    return [];
  },
  has: function(key,val){
    if(this.selectedValues.hasOwnProperty(key) && this.selectedValues[key].has(val)){
      return true;
    }
    return false;
  },
  remove: function(key, val){
    if(this.selectedValues.hasOwnProperty(key)){
      if(typeof val != "undefined"){
        this.selectedValues[key].remove(val);
        if(this.selectedValues[key].empty()){
          delete this.selectedValues[key];
        }
      }else{
        delete this.selectedValues[key];
      }
    }
  },
  applyFilter: function(options){
    var selectedValues = this.selectedValues,
        keytypes = this.keytypes,
        data = this.data;
    if(d3.keys(selectedValues).length === 0){
      data.forEach(function(n){
        delete n['_filtered'];
        delete n['selected'];
      });
    }else{
      data.forEach(function(n){
        delete n['selected'];
        for(k in selectedValues){
          var type = keytypes[k];
          if(type=="number"){
            var values = selectedValues[k].values().map(Number);
            if(n[k] && values[0]<=n[k] && values[1]>=n[k]){
              continue;
            }
          }else{
            var values = selectedValues[k].values().map(String);
            if(n[k]===null && values.indexOf("null")!=-1){
              continue;
            }
            if(n[k]==="" && values.indexOf("")!=-1){
              continue;
            }
            if(n[k]){
              var len = intersection(values,(Array.isArray(n[k]) ? n[k] : [n[k]])).length;
              if(type=="object" && options && options.jointfilter && options.jointfilter[k]){
                if(len==values.length){
                  continue;
                }
              }else{
                if(len){
                  continue;
                }
              }
            }
          }
          n['_filtered'] = true;
          return;
        }
        delete n['_filtered'];
      });
    }
  },
  size: function(key){
    if(this.selectedValues.hasOwnProperty(key)){
      return this.selectedValues[key].size();
    }
    return 0;
  },
  clear: function(){
    this.selectedValues = {};
  },
  keys: function(){
    return d3.keys(this.selectedValues);
  }
}

function getLoadingSVG(w,h){
  if(!w){
    w = 100;
  }
  if(!h){
    h = 100;
  }
  var str = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 100 100">
<g transform="rotate(0 50 50)">
  <rect x="44" y="24" rx="6" ry="6" width="12" height="12" fill="#000000">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(40 50 50)">
  <rect x="44" y="24" rx="6" ry="6" width="12" height="12" fill="#000000">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.7s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(80 50 50)">
  <rect x="44" y="24" rx="6" ry="6" width="12" height="12" fill="#000000">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="44" y="24" rx="6" ry="6" width="12" height="12" fill="#000000">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(160 50 50)">
  <rect x="44" y="24" rx="6" ry="6" width="12" height="12" fill="#000000">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(200 50 50)">
  <rect x="44" y="24" rx="6" ry="6" width="12" height="12" fill="#000000">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="44" y="24" rx="6" ry="6" width="12" height="12" fill="#000000">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.2s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(280 50 50)">
  <rect x="44" y="24" rx="6" ry="6" width="12" height="12" fill="#000000">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.1s" repeatCount="indefinite"></animate>
  </rect>
</g><g transform="rotate(320 50 50)">
  <rect x="44" y="24" rx="6" ry="6" width="12" height="12" fill="#000000">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
  </rect>
</g>
</svg>
`;

  return str;
}
