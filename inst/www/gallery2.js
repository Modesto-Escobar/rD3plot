function gallery(Graph){

  colorScheme(Graph.options.colorScheme);

  var nodes = transposeNodes(Graph.nodes,Graph.nodenames,Graph.options);

  var body = d3.select("body");

  var Tree = typeof mgmtTree != 'undefined' ? mgmtTree(body, Graph, nodes, updateSelectOptions, deselectAllItems, mousePosition, selectedNames, removeFilter) : false;

  var keytypes = {};
  Graph.nodenames.forEach(function(col){
    keytypes[col] = dataType(nodes.filter(function(d){ return d[col] !== null; }),col);
  })

  var selectedValues = new ValueSelector(nodes,keytypes);

  var pagination, pagestep;

  var topbar = body.append("div")
        .attr("class","topbar");
  var mainTitle = topbar.append("div").attr("class","topbar-container topbar-main");
  if(Graph.options.main){
    mainTitle.append("h1").text(Graph.options.main);
  }

  // Tree union & intersection
  if(Tree){
    Tree.displayUnionIntersectionButtons(function(callback){
      callback(topbar.append("div").attr("class","topbar-container"));
    });
  }

  // node multi search
  var searchFunction = Tree ? Tree.getSearchFunction(filterSelection,displayGraph) : filterSelection;

  topbar.append("div")
    .attr("class","topbar-container")
      .append("div")
      .attr("class","topbar-search")
      .call(displayMultiSearch()
        .data(nodes)
        .column(Graph.options.nodeLabel)
        .updateSelection(displayGraph)
        .updateFilter(searchFunction))

  // filter button
  topbar.append("div")
    .attr("class","topbar-container")
      .append("button")
        .attr("class","filter-button")
        .attr("aria-label","Filter menu")
        .on("click",function(){
          body.classed("display-filterpanel",true);
          displaySideContent();
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

  var sidepanel = filterpanel.append("div")
    .attr("class","filter-side-panel")

  var sideheader = sidepanel.append("div")
    .attr("class","side-panel-header")
  sideheader.append("button")
    .attr("class","filter-close-button")
    .attr("aria-label","Close")
    .html("&times;")
    .on("click",function(){
      body.classed("display-filterpanel",false);
      sidecontent.selectAll("*").remove();
    });

  var sidecontent = sidepanel.append("div")
    .attr("class","side-panel-content")

  var sidebottom = sidepanel.append("div")
    .attr("class","side-panel-bottom")
  sidebottom.append("button")
    .attr("class","primary-outline")
    .text("Clear filters")
    .on("click",removeFilter)

  var gallery = body.append("div")
        .attr("class","grid-gallery-mode2");

  // breadCrumbs
  if(Tree){
    Tree.breadcrumbs = new Tree.BreadCrumbs(gallery);
  }

  var galleryItems = gallery.append("div")
        .attr("class","gallery-items")

  pagestep = pagination = Math.floor(galleryItems.node().clientWidth / 385) * 3;

  var viewMore = gallery.append("button")
        .attr("class","primary-outline")
        .text("View More")
        .on("click",function(){
          pagination = pagination + pagestep;
          displayGraph();
        })

  var footer = body.append("div")
    .attr("class","footer")
  var footer1 = footer.append("div")
    .attr("class","footer-logo1")
  footer1.append("span").text("Net")
    .style("color","#2f7bee")
  footer1.append("span").text("Gallery")
  var footer2 = footer.append("div")
    .attr("class","footer-logo2")
  footer2.append("img")
      .attr("src",b64Icons.netcoin)
  footer2.append("span")
    .text("netCoin")

  displayGraph();

  function displayGraph(){
    galleryItems.selectAll("div.item-card").remove();
    viewMore.style("display","none");

    var filteredData = nodes;
    if(Tree){
      filteredData = Tree.treeFilteredData(filteredData);
      var bc = gallery.select(".breadcrumbs");
      if(!bc.empty()){
        if(bc.selectAll(".breadcrumbs > *:not(button.primary)").empty()){
          var buttons = bc.selectAll(".breadcrumbs > button.primary");
          buttons.style("width",(100/buttons.size())+"%")
        }
      }
    }

    var orderedData = filteredData.slice();
    if(Graph.options.order){
      orderedData.sort(function(a,b){
        var aa = a[Graph.options.order],
            bb = b[Graph.options.order];
        return compareFunction(aa,bb,Graph.options.rev);
      })
    }else if(Graph.options.rev){
      orderedData.reverse();
    }

    var showcount = 0;
    for(var i = 0; i<orderedData.length; i++){
      if(orderedData[i]["_filtered"]){
        continue;
      }

      if(showcount >= pagination){
        viewMore.style("display",null);
        break;
      }

      showcount++;

      var itemcard = galleryItems.append("div")
        .attr("class","item-card")

      var iteminner = itemcard.append("div")
        .attr("class","item-card-inner");

      var itemfront = iteminner.append("div")
        .attr("class","item-card-front")
      itemfront.append("div")
        .attr("class","card-check check-box")
      var text = orderedData[i][Graph.options.nodeLabel];
      var span = itemfront.append("span")
        .text(text)
        .attr("title",text)
      var imgwrapper = itemfront.append("div")
        .attr("class","img-wrapper")
      var image = imgwrapper.append("img")
      if(Graph.options.imageItems){
        image.on("error",function(){
            d3.select(this).attr("src",b64Icons.image)
              .style("width","60px")
              .style("height","60px")
          })
          .attr("src",orderedData[i][Graph.options.imageItems]);
      }else{
        image.attr("src",b64Icons.image)
          .style("width","60px")
          .style("height","60px")
      }

      var itemback = iteminner.append("div")
        .attr("class","item-card-back")

      if(Graph.options.nodeText){
        itemcard.classed("flip",true)
        itemback.html(orderedData[i][Graph.options.nodeText])
        itemback.append("div")
          .attr("class","card-check check-box")
      }

      itemcard.datum(orderedData[i])
        .classed("selected",orderedData[i]["selected"])
        .attr("card-index",i)
        .on("click",function(n){
          var index = d3.select(this).attr("card-index");
          if(!n["selected"]){
            n["selected"] = true;
          }else{
            delete n["selected"];
          }
          displayGraph();
        })  

      if(Tree){
        Tree.popButtonsWrapper(itemcard);
      }
    }

    if(Tree && Tree.type == "extended"){
      topbar.selectAll(".icon-selection").classed("disabled",selectedNames().length<2);
    }

    body.on("click.remove-buttons-popup",function(){
      body.select("body > .buttons-popup").remove();
    })
  } // end of displayGraph

  function filterSelection(){
      selectedValues.clear();
      nodes.forEach(function(n){
        if(n["selected"]){
          selectedValues.add(Graph.options.nodeName,n[Graph.options.nodeName]);
        }
      });
      selectedValues.applyFilter();
      updateTopbarTags();
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

  function updateFiltersMarkers(){
    sidecontent.selectAll(".filter-container").each(function(){
      var div = d3.select(this),
          key = div.attr("filter-key"),
          keysize = selectedValues.size(key),
          text = keysize;
      if(keytypes[key]=="number"){
        text = selectedValues.values(key).join(" - ");
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
        renderTag(container,k + " (" + selectedValues.values(k).join(" - ") + ")",k);
      }else{
        selectedValues.values(k).forEach(function(v){
          renderTag(container,v,k,v);
        });
      }
    });
    var tagsWidth = 0;
    container.selectAll(".tag").each(function(){
      tagsWidth += (this.offsetWidth + 8);
    })
    if(!tagsWidth){
      container.remove();
    }else{
      if(tagsWidth > container.node().offsetWidth){
        container.selectAll(".tag").remove();
        selectedValues.keys().forEach(function(k){
          if(keytypes[k] == "number"){
            renderTag(container,k + " (" + selectedValues.values(k).join(" - ") + ")",k);
          }else{
            renderTag(container,k,k);
          }
        })
      }
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
      updateTopbarTags();
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
    Tree.breadcrumbs.updateSelectedType();
  }

  function deselectAllItems(){
    nodes.forEach(function(n){ delete n.selected; });
    displayGraph();
  }

  function removeFilter(){
      selectedValues.clear();
      selectedValues.applyFilter();
      displayGraph();
      updateTopbarTags();
      if(body.classed("display-filterpanel")){
        updateFiltersMarkers();
        sidecontent.selectAll(".plus-minus-button.expanded").dispatch("click");
      }
  }

  function displaySideContent(){
    var selectedOptions = getSelectOptions(sortAsc,Graph,Tree);

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
    var subNodes = Tree ? Tree.getFilterData() : nodes;
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
                extent = d3.extent(subNodes, function(d){
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
              updateTopbarTags();
              displayGraph();
            }));
          }else{
            var dat = subNodes.map(function(d){ return d[col]; });
            if(type != 'string'){
              dat = dat.reduce(function(a,b) { return b ? a.concat(b) : a; }, []);
            }
            dat = d3.set(dat).values().sort();
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
                  .text(d)
                  .on("click",function(){
                    tag.classed("tag-selected",!tag.classed("tag-selected"));
                    selectedValues[tag.classed("tag-selected") ? 'add' : 'remove'](col,d);
                    selectedValues.applyFilter();
                    updateFiltersMarkers();
                    updateTopbarTags();
                    displayGraph();
                  })
              });
            }
          }
    });
  });
  }

  function colorScheme(mode){
    if(mode){
      // headerback headertext galleryback gallerytext buttons
      var pallete = [
        ["#FF6319CC","#222C37","#222C37","#ffffff","#FF6319"],
        ["#222C37","#ffffff","#FF63191A","#222C37","#FF6319"],
        ["#222C37","#ffffff","#B83C8233","#222C37","#B83C82"],
        ["#B83C82","#ffffff","#222C3733","#B83C82","#B83C82"],
        ["#6639B7","#ffffff","#FF7F331A","#0066A1","#0066A1"],
        ["#0066A1","#ffffff","#FF7F331A","#6639B7","#6639B7"],
        ["#0066A1","#ffffff","#0066A133","#FF7F33","#FF7F33"],
        ["#6585ED","#ffffff","#F5756C1A","#54616A","#54616A"],
        ["#F5756C","#ffffff","#6585ED33","#54616A","#54616A"],
        ["#3A7FA6","#ffffff","#5CADBF1A","#FF6319","#FF6319"],
        ["#46475D","#ffffff","#3A7FA633","#FF6319","#FF6319"]
      ][mode-1];
      
      d3.select("head")
        .append("style")
        .text(
'.topbar { background-color: '+pallete[0]+'; color: '+pallete[1]+'; }' +
'.grid-gallery-mode2 { background-color: '+pallete[2]+'; }' +
'.filter-button { border-color: '+pallete[1]+'; }' +
'.filter-button > svg > path { fill: '+pallete[1]+'!important; }' +
'.icon-selection { border-color: '+pallete[1]+'; }' +
'.multi-search > .search-box, .multi-search > .search-box > div.text-wrapper > div.text-content > textarea { background-color: '+pallete[1]+'; }' +
'.multi-search > button.search-icon > svg > path { fill: '+pallete[0]+'; }' +
'.icon-selection > svg > rect.fill1 { fill: '+pallete[1]+'!important; }' +
'.icon-selection > svg > rect.stroke1 { stroke: '+pallete[1]+'!important; }' +
'.grid-gallery-mode2 > .breadcrumbs { border-bottom-color: '+pallete[3]+'; }' +
'.grid-gallery-mode2 > .breadcrumbs > button.primary { color: '+pallete[3]+'; }' +
'.grid-gallery-mode2 > .breadcrumbs > button.primary.disabled { border-bottom-color: '+pallete[3]+'; }' +
'button.primary { background-color: '+pallete[4]+'; }' +
'button.primary-outline { color: '+pallete[4]+'; border-color: '+pallete[4]+'; }' +
'a { color: '+pallete[4]+' }' +
'button.switch-button.active { background-color: '+pallete[4]+'; }' +
'button.switch-button.active:after { border-color: '+pallete[4]+'; }' +
'.selected .check-box { background-color: '+pallete[4]+'; border-color: '+pallete[4]+'; }' +
'.filterpanel > .filter-side-panel > .side-panel-content > div > .items-container > .radio-item.selected-item:before { border-color: '+pallete[4]+'; }' +
'.grid-gallery-mode2 > .breadcrumbs > span[index] { color: '+pallete[4]+' }'
        )
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
      });
    }else{
      data.forEach(function(n){
        var filtered = true;
        for(k in selectedValues){
          var type = keytypes[k];
          if(type=="number"){
            var values = selectedValues[k].values().map(Number);
            if(n[k] && values[0]<=n[k] && values[1]>=n[k]){
              filtered = false;
              break;
            }
          }else{
            if(n[k] && intersection(selectedValues[k].values().map(String),(Array.isArray(n[k]) ? n[k] : [n[k]])).length){
              filtered = false;
              break;
            }
          }
        }
        if(filtered){
          n['_filtered'] = true;
        }else{
          delete n['_filtered'];
        }
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

