function gallery(Graph){

  colorScheme(Graph.options.colorScheme);

  var nodes = transposeNodes(Graph.nodes,Graph.nodenames,Graph.options);

  nodes.forEach(function(node,i){
    node['_index'] = i;
  });

  var body = d3.select("body");

  var Tree = typeof mgmtTree != 'undefined' ? mgmtTree(body, Graph, nodes, updateSelectOptions, deselectAllItems, mousePosition, selectedNames, removeFilter, false, false, 2) : false;

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
  if(Graph.options.main){
    mainTitle.append("a")
      .attr("href","")
      .append("h1")
        .html(Graph.options.main);
  }

  var topbarButtons = topbarContent.append("div").attr("class","topbar-buttons");
  topbarContent.append("div").attr("class","topbar-clear");

  // node multi search
  var searchFunction = Tree ? Tree.getSearchFunction(filterSelection,displayGraph) : filterSelection;

  topbarButtons.append("div")
      .attr("class","topbar-search")
      .call(displayMultiSearch()
        .data(nodes)
        .column(Graph.options.nodeLabel)
        .updateSelection(displayGraph)
        .updateFilter(searchFunction)
        .help(false))

  // filter selection
  var filterSelectionButton = topbarButtons.append("div")
      .append("button")
        .attr("class","filter-selection")
        .attr("aria-label",texts.filterselection)
        .attr("title",texts.filterselection)
        .on("click",filterSelection)
  filterSelectionButton.append("svg")
        .attr("height",24)
        .attr("width",24)
        .attr("viewBox","0 0 24 24")
        .append("path")
          .style("fill","#ffffff")
          .attr("d","M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z")
  filterSelectionButton.append("span")


  // filter button
  topbarButtons.append("div")
      .append("button")
        .attr("class","filter-button")
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
    .attr("class","primary")
    .text(texts.clearfilters)
    .on("click",function(){
      selectedValues.clear();
      selectedValues.applyFilter();
      clearTreeParent();
      displayGraph();
      updateFiltersMarkers();
      sidecontent.selectAll(".plus-minus-button.expanded").dispatch("click");
    })

  function closeFilterPanel(){
    body.classed("display-filterpanel",false);
    sidecontent.selectAll("*").remove();
  }

  // breadCrumbs
  if(Tree){
    Tree.breadcrumbs = new Tree.BreadCrumbs(topbar);
  }

  var gallery = body.append("div")
        .attr("class","grid-gallery-mode2");

  var galleryItems = gallery.append("div")
        .attr("class","gallery-items")

  resetPagination();

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
      displayGraph();
    }
  })

  function resetPagination(){
    pagestep = pagination = Math.floor(galleryItems.node().clientWidth / 385) * 3;
  }

  var footer = body.append("div")
    .attr("class","footer")
  var footer1 = footer.append("div")
    .attr("class","footer-logo1")
  footer1.html(Graph.options.note ? Graph.options.note : '<span style="font-size:2.5em;">NetGallery</span>')
  var footer2 = footer.append("div")
    .attr("class","footer-logo2")
  footer2.html('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 40 30"><g stroke-linejoin="round" stroke="#c1c1c1" stroke-width="2" fill="none"><path d="M11.975 9.6 10 7.475M11.8 12.175l-2.375 3.55M18.175 17.125l-7 1M21.525 13.6l-.275-4.625M24.275 18.6l9.775 6.7M13.05 11.175l7.9-5.925" stroke-width=".5"/></g><g fill="#fff" transform="matrix(.25 0 0 .25 -19.05 35.825)"><circle cy="-123.8" cx="158.8" r="16.5"/><circle cy="-119.8" cx="108.7" r="9.9"/><circle cy="-67.8" cx="106.7" r="14.5"/><circle cy="-99.4" cx="127.8" r="6.6"/><circle cy="-75.7" cx="162.1" r="13.2"/><circle cy="-36.3" cx="219.2" r="9"/></g></svg>');
  footer2.append("span")
    .text("netCoin")

  displayGraph();

  function displayGraph(){
    var filteredData = nodes;
    if(Tree){
      filteredData = Tree.treeFilteredData(filteredData);
      Tree.displayTreeMenu(filteredData);
    }

    var orderedData = filteredData.slice();
    if(Tree && Tree.relatives){
      orderedData.sort(function(a,b){
        var aa = a['_relatives'],
            bb = b['_relatives'];
            comp = 0;
        if(Tree.treeParent.indexOf(aa)!=-1 && Tree.treeParent.indexOf(bb)==-1){
          comp = 1;
        }else if(Tree.treeParent.indexOf(bb)!=-1 && Tree.treeParent.indexOf(aa)==-1){
          comp = -1;
        }else if(Tree.treeParent.indexOf(aa)==-1 && Tree.treeParent.indexOf(bb)==-1){
          comp = bb.length-aa.length;
        }else{
          comp = Tree.treeParent.indexOf(aa)-Tree.treeParent.indexOf(bb);
        }
        if(comp==0 && Graph.options.order){
          aa = a[Graph.options.order];
          bb = b[Graph.options.order];
          return compareFunction(aa,bb,Graph.options.rev);
        }
        if(comp==0 && Graph.options.rev){
          return 1;
        }
        return comp;
      })
    }else{
      if(Graph.options.order){
        orderedData.sort(function(a,b){
          var aa = a[Graph.options.order],
              bb = b[Graph.options.order];
          return compareFunction(aa,bb,Graph.options.rev);
        })
      }else if(Graph.options.rev){
        orderedData.reverse();
      }
    }

    updateTopbarTags();
    galleryItems.selectAll("div.item-card, h3.parent-separator").remove();
    viewMore.style("display","none");

    var showcount = 0,
        indices = [];
    for(var i = 0; i<orderedData.length; i++){
      if(orderedData[i]["_filtered"]){
        continue;
      }

      indices.push(orderedData[i]['_index']);

      if(showcount >= pagination){
        if(viewMore.style("display")=="none"){
          viewMore.style("display",null);
          viewMore.select("span:last-child").text(pagination+" / "+orderedData.filter(function(d){ return !d['_filtered'] }).length);
        }
        continue;
      }

      showcount++;

      if(Tree && Tree.relatives && orderedData[i]['_relatives'] && !galleryItems.selectAll("h3.parent-separator").filter(function(){
        return this.textContent==orderedData[i]['_relatives'];
      }).size()){
        galleryItems.append("h3")
          .attr("class","parent-separator")
          .text(orderedData[i]['_relatives'])
      }

      var itemcard = galleryItems.append("div")
          .attr("class","item-card")

      var iteminner = itemcard.append("div")
        .attr("class","item-card-inner");

      iteminner.append("div")
        .attr("class","card-check check-box")
        .on("click",function(n){
          d3.event.stopPropagation();
          var index = d3.select(this.parentNode.parentNode).attr("card-index");
          selectItem(index);
        })
      var text = orderedData[i][Graph.options.nodeLabel];
      var span = iteminner.append("span")
        .text(text)
        .attr("title",text)
      var imgwrapper = iteminner.append("div")
        .attr("class","img-wrapper")
      var image = imgwrapper.append("img")
      if(Graph.options.imageItems){
        image.on("error",function(){
            d3.select(this).attr("src",b64Icons.image)
              .style("width","60px")
          })
          .attr("src",orderedData[i][Graph.options.imageItems]);
      }else{
        image.attr("src",b64Icons.image)
          .style("width","60px")
      }

      itemcard.classed("selected",orderedData[i]["selected"])
        .attr("card-index",i)

      if(Graph.options.nodeText && orderedData[i][Graph.options.nodeText]){
        itemcard.style("cursor","pointer")
          .on("click.mainframe",function(){
            var index = d3.select(this).attr("card-index");
            openMainFrame(orderedData[index]['_index'],indices);
          })
      }
    }

    if(Tree && Tree.relatives){
      orderedData.forEach(function(d){
        delete d['_relatives'];
      })
      delete Tree.relatives;
    }

    var selectedlen = selectedNames().length;
    if(Tree && Tree.type == "extended"){
      topbarContent.selectAll(".icon-selection").classed("disabled",selectedlen<2);
    }

    filterSelectionButton.classed("disabled",!selectedlen);
    filterSelectionButton.select("span").text(selectedlen);

    function selectItem(i){
      var n = orderedData[i];
      if(!n["selected"]){
        n["selected"] = true;
      }else{
        delete n["selected"];
      }
      displayGraph();
    }
  } // end of displayGraph

  function filterSelection(){
      selectedValues.clear();
      nodes.forEach(function(n){
        if(n["selected"]){
          selectedValues.add(Graph.options.nodeName,n[Graph.options.nodeName]);
        }
      });
      selectedValues.applyFilter();
      clearTreeParent();
      window.scrollTo(0, 0);
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
  }

  function displaySideContent(){
    var selectedOptions = getSelectOptions(sortAsc,Graph,Tree);
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
              clearTreeParent();
              updateFiltersMarkers();
              displayGraph();
            }));
          }else{
            var dat = subNodes.map(function(d){ return d[col]; }),
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
                    clearTreeParent();
                    updateFiltersMarkers();
                    displayGraph();
                  })
              });
            }
          }
    });
  });
  }

  function colorScheme(mode){
    // headerback headertext galleryback buttons cardback
    var pallete = [
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

    if(mode && mode<=pallete.length){
      pallete = pallete[mode-1];
      
      d3.select("head")
        .append("style")
        .text(
'.topbar, .footer { background-color: '+pallete[0]+'; color: '+pallete[1]+'; }' +
'.grid-gallery-mode2 { background-color: '+pallete[2]+'; }' +
'.filter-button, .filter-selection, .icon-selection { border-color: '+pallete[1]+'; color: '+pallete[1]+' }' +
'.filter-button > svg > path, .filter-selection > svg > path { fill: '+pallete[1]+'!important; }' +
'.multi-search > .search-box, .multi-search > .search-box > div.text-wrapper > div.text-content > textarea { background-color: '+pallete[1]+'; color: '+contrast(pallete[1])+'; }' +
'.multi-search > .search-box > div.check-container > span.yes::after { border-color: '+contrast(pallete[1])+'; }' +
'.multi-search > button.search-icon > svg > path { fill: '+pallete[0]+'; }' +
'.icon-selection > svg > rect.fill1 { fill: '+pallete[1]+'!important; }' +
'.icon-selection > svg > rect.stroke1 { stroke: '+pallete[1]+'!important; }' +
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
'.filter-selection > span { background-color: '+pallete[3]+'; }'
        )
    }

    function contrast(color){
      return d3.hsl(color).l > 0.66 ? '#000000' : '#ffffff';
    }
  }

  function openMainFrame(index,navigation,goback){
    var leftindex = false,
        rightindex = false;
    if(typeof goback != 'undefined'){
      leftindex = goback;
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

    if(leftindex!==false){
      mainframe.append("button")
      .attr("class","left-button")
      .on("click",function(){
        openMainFrame(leftindex,navigation);
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
          .attr("src",nodes[index][Graph.options.imageItems])
      }

      if(Tree){
        Tree.treeRelatives(mainframe.select(".info-template > div > .tree-relatives"),function(node){
          openMainFrame(node['_index'],navigation,typeof goback != 'undefined' ? goback : index);
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
          mainframe.select("button.left-button").on("click",function(){
            openMainFrame(index,navigation);
          })
        })
      }
    }

    var mt = parseInt(mainframe.style("margin-top")),
        wh = window.innerHeight-(mt*2),
        mh = parseInt(mainframe.style("max-height")),
        h = wh<mh ? wh : mh;
    mainframe.style("height",h+"px");

    if(wh>mh){
      var nmt = mt + ((wh-mh)/2);
      mainframe.style("margin-top",nmt+"px")
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
      });
    }else{
      data.forEach(function(n){
        for(k in selectedValues){
          var type = keytypes[k];
          if(type=="number"){
            var values = selectedValues[k].values().map(Number);
            if(n[k] && values[0]<=n[k] && values[1]>=n[k]){
              continue;
            }
          }else{
            if(n[k] && intersection(selectedValues[k].values().map(String),(Array.isArray(n[k]) ? n[k] : [n[k]])).length){
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
