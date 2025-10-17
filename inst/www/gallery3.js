function gallery(Graph){
  pageZoom(Graph.options.zoom);

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
          .style("fill","#000000")
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
          .style("fill","#000000")
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
    topbarButtons.append("div")
      .attr("class","topbar-search")
      .call(displaySimpleSearch()
        .data(nodes)
        .column(Graph.options.nodeLabel)
        .updateSelection(displayGraph)
        .updateFilter(function(){
          filterSelection();
          nodes.forEach(function(node){ delete node.selected; });
          displayGraph();
          topbarButtons.select(".show-search-container").style("display",null);
          topbarButtons.select(".topbar-search").style("display",null);
        }))

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
          .style("fill","#000000")
          .attr("d",d4paths.search)
  }

  // filter selection
  if(Graph.options.selection){
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
          .style("fill","#000000")
          .attr("d","M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z")
    filterSelectionButton.append("span")
  }

  // show table
  if(Graph.options.showTable){
    topbarButtons.append("div")
      .append("button")
        .attr("class","topbar-button show-table")
        .attr("aria-label",texts["Table"])
        .attr("title",texts["Table"])
        .on("click",function(){
          window.scrollTo(0, 0);
          displayTable(false);
        })
        .append("svg")
        .attr("height",24)
        .attr("width",24)
        .attr("viewBox","0 0 24 24")
        .append("path")
          .style("fill","#000000")
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
          .style("fill","#000000")
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
      selectedValues.applyFilter();
      displayGraph();
      updateFiltersMarkers();
      sidecontent.selectAll(".plus-minus-button.expanded").dispatch("click");
    })

  function closeFilterPanel(){
    sidepanel.classed("show-frequencies",false);
    body.classed("display-filterpanel",false);
    sidecontent.selectAll("*").remove();
  }

  var gallery = body.append("div")
        .attr("class","grid-gallery-mode3");

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
    var itemw = 230,
        itemh = 304;
    if(Graph.options.zoom){
      itemw = itemw * Graph.options.zoom;
      itemh = itemh * Graph.options.zoom;
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

    var nodeOrder = false;
    if(Graph.options.order){
      nodeOrder = Graph.options.order;
    }else if(Graph.options.nodeOrder){
      if(typeof Graph.options.nodeOrder=="string"){
        nodeOrder = Graph.options.nodeOrder;
      }
    }

    Graph.filteredOrderedData = filteredData.filter(function(n){ return !n['_filtered']; });
    if(nodeOrder){
        Graph.filteredOrderedData.sort(function(a,b){
          var aa = a[nodeOrder],
              bb = b[nodeOrder];
          return compareFunction(aa,bb,Graph.options.rev);
        })
    }else if(Graph.options.rev){
        Graph.filteredOrderedData.reverse();
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

      var itemcard = galleryItems.append("div")
          .attr("class","item-card")

      var iteminner = itemcard.append("div")
        .attr("class","item-card-inner");

      var imgwrapper = iteminner.append("div")
        .attr("class","img-wrapper")
      var text = Graph.filteredOrderedData[i][Graph.options.nodeLabel];
      var span = iteminner.append("span")
        .attr("class","title")
        .text(text)
        .attr("title",text)
      if(Graph.options.nodeSubtitle){
        var subtitle = String(Graph.filteredOrderedData[i][Graph.options.nodeSubtitle]),
            subtitletitle = subtitle? subtitle.replace(/(<([^>]+)>)/gi, "") : null;
        if(!subtitle){
          subtitle = "&nbsp;";
        }
        iteminner.append("span")
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
      selectedValues.applyFilter();
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
    if(Graph.options.selection){
      var selectedlen = selectedNames().length;

      filterSelectionButton.classed("disabled",!selectedlen);
      if(selectedlen && selectedlen>99){
        selectedlen = "99+";
      }
      filterSelectionButton.select("span").text(selectedlen);
    }
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
            self.text("")
            self.call(getSVG()
              .d(d4paths.search)
              .width(16).height(16))
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
      selectedValues.applyFilter();
      updateFiltersMarkers();
      displayGraph();
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
        .nodenames(getSelectOptions(false,Graph).filter(function(d){ return d!=Graph.options.nodeName; }))
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
            selectedValues.applyFilter();
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
    var sheetname = "data";
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
        selectedValues.applyFilter();
        displayGraph();
        displayTable(tableitem);
      });

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
      selectedValues.applyFilter();
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
  }

  function updateReverseOrder(){
    delete Graph.options.rev;
    if(Graph.options.decreasing){
      if(!Array.isArray(Graph.options.decreasing)){
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
      selectedValues.applyFilter();
      displayGraph();
  }

  function displaySideContent(){
    var selectedOptions = getSelectOptions(false,Graph);
    if(Graph.options.nodeType){
      selectedOptions = selectedOptions.filter(function(d){
        return d!=Graph.options.nodeType;
      })
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
        .text(col)
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
    div.append("span").text(col)
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
              selectedValues.applyFilter();
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
                    selectedValues.applyFilter();
                    updateFiltersMarkers();
                    displayGraph();
                  })
              });
            }
          }
    });
  });
  }

  function pageZoom(zoom){
    if(zoom){
      d3.select("head")
        .append("style")
        .text(
".grid-gallery-mode3 > .gallery-items > .item-card { width: "+(230*zoom)+"px; }"
+".grid-gallery-mode3 > .gallery-items > .item-card > .item-card-inner > .img-wrapper { height: "+(270*zoom)+"px; }"
        )
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

      if(Graph.options.imageItems){
        mainframe.select(".info-template > div")
          .insert("img",":first-child")
          .classed("float",Graph.options.mainframeImage==2 ? true : false)
          .attr("src",nodes[index][Graph.options.imageItems])
          .on("load",Graph.options.mainframeImage==0 ? function(){
            if(this.naturalHeight>this.naturalWidth){
              d3.select(this).classed("float",true);
            }
          }:null)
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
  applyFilter: function(){
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
            if(n[k] && intersection(values,(Array.isArray(n[k]) ? n[k] : [n[k]])).length){
              continue;
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

function displaySimpleSearch(){
  var data = [],
      column = "name",
      updateSelection = function(){},
      updateFilter = function(){};

  function exports(sel){

    var searchSel = sel.append("div")
        .attr("class","simple-search");

    var input = searchSel.append("input")
      .attr("type","text");

    var typingTimer;
    var typingInterval = data.length>1000 ? 1000 : 500; 

    input.attr("placeholder",texts.searchanode)
        .on("keydown",function(){
          clearTimeout(typingTimer);
        })
        .on("keyup",function(){
          d3.event.stopPropagation();
        })
        .on("keypress",function(){
          clearTimeout(typingTimer);
          if(getKey(d3.event)=="Enter"){
            searchIcon.dispatch("click");
            this.blur();
            return;
          }
          if(["ArrowLeft","ArrowRight","ArrowDown","ArrowUp"].indexOf(getKey(d3.event))!=-1){
            return;
          }
          
          typingTimer = setTimeout(doneTyping, typingInterval);
        })

    var searchIcon = searchSel.append("button")
      .attr("class","search-icon disabled")
      .call(getSVG()
        .d(d4paths.search)
        .width(16).height(16))
      .on("click",function(){
        doneTyping();
        updateFilter();
        searchIcon.classed("disabled",true);
      })

    function doneTyping () {
          var cutoff = data.length>1000 ? 3 : 1,
              value = input.property("value"),
              found = false;

          if(value.length>=cutoff){
            data.forEach(function(node){ delete node.selected; });

            value = cleanString(value);
            data.forEach(function(node){
                if(cleanString(node[column]).match(value)){
                  node.selected = found = true;
                }
            });

            updateSelection();
          }
          searchIcon.classed("disabled",!found);
    }
  }

  exports.data = function(x) {
    if (!arguments.length) return data;
    data = x;
    return exports;
  };

  exports.column = function(x) {
    if (!arguments.length) return column;
    column = x;
    return exports;
  };

  exports.updateSelection = function(x) {
    if (!arguments.length) return updateSelection;
    updateSelection = x;
    return exports;
  };

  exports.updateFilter = function(x) {
    if (!arguments.length) return updateFilter;
    updateFilter = x;
    return exports;
  };

  return exports;
}

