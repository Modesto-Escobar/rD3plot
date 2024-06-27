function mgmtTree(body, Graph, nodes, updateSelectOptions, deselectAllItems, mousePosition, selectedNames, removeFilter, displayTooltip, resetZoom, mode){
  if(!updateSelectOptions){
    updateSelectOptions = function(){};
  }
  if(!deselectAllItems){
    deselectAllItems = function(){};
  }
  if(!mousePosition){
    mousePosition = function(){};
  }
  if(!selectedNames){
    selectedNames = function(){ return []; };
  }
  if(!removeFilter){
    removeFilter = function(){};
  }
  if(!displayTooltip){
    displayTooltip = function(){};
  }
  if(!resetZoom){
    resetZoom = function(){};
  }
  if(!mode){
    mode = 1;
  }

  var Tree = false,
      options = Graph.options;

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
            .attr("item",name)
            .on("click",function(){
              d3.event.stopPropagation();
            });
      appendButtons(popup);
      mousePosition(popup);

      function appendButtons(sel){
        types.forEach(function(t,i){
          sel.append("button")
          .attr("class","primary")
          .text(t)
          .on("click",function(){
            removeFilter();
            callback(t,i);
            sel.remove();
            Tree.breadcrumbs.empty();
            deselectAllItems();
          })
        })
      }
    }

    Tree.popButtonsWrapper = function(sel){
      sel.style("cursor","url("+b64Icons.mouse2+"), auto")
        .on("contextmenu",function(n){
          d3.event.preventDefault();
          Tree.popButtons(n);
        })

      var timer;
      var touchduration = 500; //length of time we want the user to touch before we do something

      sel.on("touchstart",function() {
          timer = setTimeout(onlongtouch, touchduration); 
      });

      sel.on("touchend",function() {
          //stops short touches from firing the event
          if (timer){
              clearTimeout(timer); // clearTimeout, not cleartimeout..
          }
      });

      function onlongtouch() {
        Tree.popButtons(n);
      }
    }

  if(mode == 2){
    Tree.treeRelatives = function(treerelatives,callback){
      if(!treerelatives.empty()){
        treerelatives.selectAll(".tree-relatives > span").each(function(){
          var self = d3.select(this),
              n = nodes[+self.attr("nodename")];
          if(n[options.nodeText]){
            self.attr("class","linked")
              .on("click",function(){
                callback(n);
              })
          }
        })
      }
    }
  }else{
    Tree.treeRelatives = function(node){
      var name = node[options.nodeName];

      var tooltip = body.selectAll(".tooltip").filter(function(){ return d3.select(this).attr("nodeName")==name; });
      if(tooltip.size()==1){
        tooltip.selectAll(".info-template .tree-relatives > span").each(function(){
          var self = d3.select(this),
              n = nodes[+self.attr("nodename")];
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

    Tree.BreadCrumbs = function(sel){
      this.breadcrumbs = sel.append("div")
              .attr("class","breadcrumbs")
    }

    Tree.BreadCrumbs.prototype = {
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
            removeFilter();
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
            removeFilter();
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
                text
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
      addButton: function(text,content,callback){
        var thiz = this;
        thiz.breadcrumbs.append("button")
          .attr("class","primary")
          .text(text)
          .attr("content",content ? content : null)
          .on("click",function(){
            removeFilter();
            callback();
            thiz.empty();
            deselectAllItems();
            resetZoom();
          })
        thiz.updateSelectedType();
      },
      updateSelectedType: function(){
        var thiz = this;
        thiz.breadcrumbs.selectAll("button.primary[content]").each(function(){
          var button = d3.select(this);
          button.classed("disabled",Tree.typeFilter && Tree.typeFilter == button.attr("content"));
        });
      }
    }

    Tree.applyExtendedFilter = function(treeParent,typeFilter){
        if(mode == 2 && typeFilter && treeParent && treeParent.length){
          if(Tree.treeParentType){
            if(typeFilter==Tree.treeParentType){
              return function(d){
                return treeParent.indexOf(d[options.nodeName])!=-1;
              }
            }
          }else{
            return function(d){
              if(treeParent.indexOf(d[options.nodeName])==-1){
                return false;
              }
              for(var i = 0; i<Graph.tree[0].length; i++){
                if((Graph.tree[0][i]==d[options.nodeName] && Graph.tree[2][i]==typeFilter) ||
                   (Graph.tree[1][i]==d[options.nodeName] && Graph.tree[3][i]==typeFilter)){
                  return true;
                }
              }
              return false;
            }
          }
        }

        var parents = [],
            children = [],
            filter = function(){ return true },
            onlyUnique = function(value, index, array) {
                return array.indexOf(value) === index;
            },
            getRelatives = function(name){
              for(var i = 0; i<Graph.tree[0].length; i++){
                if(Graph.tree[1][i]==name){
                  parents.push(Graph.tree[0][i]);
                }
                if(Graph.tree[0][i]==name){
                  children.push(Graph.tree[1][i]);
                }
              }
              parents = parents.filter(onlyUnique);
              children = children.filter(onlyUnique);
            };

        if(treeParent && treeParent.length){
          var gparents = [],
              typeFilterFound = function(d,i){
                if(!typeFilter){
                  return true;
                }
                if(Graph.tree[0][i]==d[options.nodeName] && Graph.tree[2][i]==typeFilter && treeParent.indexOf(Graph.tree[1][i])!=-1){
                  return true;
                }
                if(Graph.tree[3][i]==typeFilter &&
                      ((Graph.tree[1][i]==d[options.nodeName] && treeParent.indexOf(Graph.tree[0][i])!=-1) ||
                      (Graph.tree[1][i]==d[options.nodeName] && gparents.indexOf(Graph.tree[0][i])!=-1))){
                  return true;
                }
                return false;
              }

          for(var i = 0; i<Graph.tree[0].length; i++){
            if(treeParent.indexOf(Graph.tree[1][i])!=-1){
              gparents.push(Graph.tree[0][i]);
            }
          }
          gparents = gparents.filter(onlyUnique);
          if(treeParent.length>1 && Tree.intersection){
            gparents = gparents.filter(function(e,i){
              return gparents.filter(function(d){ return d==e; }).length==treeParent.length;
            });
          }

          filter = function(d){
            if(!Tree.intersection && treeParent.indexOf(d[options.nodeName])!=-1 && (!typeFilter || typeFilter==d[options.nodeType] || (Array.isArray(d[options.nodeType]) && d[options.nodeType].indexOf(typeFilter)!=-1))){
              return true;
            }

            parents = [];
            children = [];
            getRelatives(d[options.nodeName]);

            if(treeParent.length>1 && Tree.intersection){
              if(intersection(parents,treeParent).length!=treeParent.length && intersection(children,treeParent).length!=treeParent.length && !intersection(parents,gparents).length){
                return false;
              }
            }else{
              if(!intersection(parents,treeParent).length && !intersection(children,treeParent).length && !intersection(parents,gparents).length){
                return false;
              }
            }

            for(var i = 0; i<Graph.tree[0].length; i++){
              if(!typeFilterFound(d,i)){
                continue;
              }
              if((Graph.tree[1][i]==d[options.nodeName] &&
                  (gparents.indexOf(Graph.tree[0][i])!=-1 || parents.indexOf(Graph.tree[0][i])!=-1)) ||
                  (Graph.tree[0][i]==d[options.nodeName] && children.indexOf(Graph.tree[1][i])!=-1)){
                return true;
              }
            }

            return false;
          };
        }else if(typeFilter){
          filter = function(d){
            var found = false;
            for(var i = 0; i<Graph.tree[0].length; i++){
                if(Graph.tree[0][i]==d[options.nodeName] && Graph.tree[2][i]==typeFilter){
                  found = true;
                  break;
                }
                if(Graph.tree[1][i]==d[options.nodeName] && Graph.tree[3][i]==typeFilter){
                  found = true;
                  break;
                }
            }
            return found;
          }
        }

        return filter;
    }

    Tree.getFilterData = function(){
      if(Tree.typeFilter || (Tree.treeParent && Tree.treeParent.length)){
        return nodes.filter(Tree.applyExtendedFilter(Tree.treeParent,Tree.typeFilter));
      }
      return nodes;
    }

  if(mode == 2){
    Tree.displayTreeMenu = function(filteredData){
      Tree.breadcrumbs.empty();
      if(Tree.type=="extended"){
          if(!Tree.treeParent.length){
            var names = filteredData.filter(function(n){ return !n['_filtered']; })
                  .map(function(n){ return n[Graph.options.nodeName]; });
            if(names.length && names.length!=filteredData.length){
              Tree.treeParent = names;
              Tree.treeParentType = Tree.typeFilter;
            }
          }
          options.nodeTypes.forEach(function(type){
              var n = nodes.filter(Tree.applyExtendedFilter(Tree.treeParent,type)).length;
              Tree.breadcrumbs.addButton(type + " ("+n+")",type,function(){
                Tree.typeFilter = type;
                updateSelectOptions();
              });
              if(!n){
                Tree.breadcrumbs.breadcrumbs.select("button[content="+type+"]").classed("empty",true);
              }
          });

          if(Tree.treeParent.length && Tree.treeParent.length<50 && Tree.treeParentType && Tree.treeParentType!=Tree.typeFilter){
            Tree.relatives = true;
            filteredData.forEach(function(n){
              n['_relatives'] = [];
              Tree.treeParent.forEach(function(e){
                if([n].filter(Tree.applyExtendedFilter([e],Tree.typeFilter)).length){
                  n['_relatives'].push(e);
                }
              });
            })
          }else{
            delete Tree.relatives;
          }
      }
    }
  }else{
    Tree.displayTreeMenu = function(){
      Tree.cleanButtonsPopup();
      if(!Tree.breadcrumbs.isEmpty()){
        return;
      }
      if(Tree.type=="deepextended"){
        if(Tree.path.length){
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
      }else if(Tree.type=="extended"){
          if(Tree.treeParent.length){
            Tree.breadcrumbs.addHome(function(){
                Tree.treeParent = [];
                Tree.typeFilter = options.initialType ? options.initialType : "";
                Tree.history = [];
                updateSelectOptions();
              });
            if(Tree.typeFilter){
              Tree.breadcrumbs.addButton(Tree.typeFilter,false,function(){
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
              Tree.breadcrumbs.addButton(type,type,function(){
                Tree.treeParent = [];
                Tree.typeFilter = type;
                Tree.history.push([Tree.treeParent,Tree.typeFilter]);
                updateSelectOptions();
              });
            });
          }
      }else{
          if(Tree.treeParent.length){
            Tree.breadcrumbs.addHome(function(){
              Tree.treeParent = [];
            });
            Tree.breadcrumbs.addPath(Tree.treeParent,function(i){
              Tree.treeParent = Tree.treeParent.filter(function(d,j){ return j<=i; });
            });
          }
      }
    }
  }

    Tree.treeFilteredData = function(filteredData){
      if(Tree.type=="deepextended"){
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
        filteredData = filteredData.filter(Tree.applyExtendedFilter(Tree.treeParent,Tree.typeFilter));
      }else{ // Tree.type=="simple"
        filteredData = filteredData.filter(function(d){
          if(!Tree.treeParent.length){
            return Graph.tree[1].indexOf(d[options.nodeName])==-1;
          }
          return Graph.tree[0].filter(function(e,i){ return Tree.treeParent[Tree.treeParent.length-1]==e && Graph.tree[1][i]==d[options.nodeName]; }).length;
        });
      }
      return filteredData;
    }

    Tree.getSearchFunction = function(filterSelection,displayGraph){
      if(Tree.type == "deepextended"){
        return function(){
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
      }
      if(Tree.type == "extended"){
        return function(){
          var currentType = Tree.typeFilter,
              newType;
          Tree.resetOptions();
          var types = nodes.filter(function(n){
              return n.selected;
          }).map(function(d){
            return Array.isArray(d[options.nodeType]) ? d[options.nodeType] : [d[options.nodeType]];
          });
          types = d3.set(d3.merge(types)).values();
          if(types.length==1){
            newType = types[0];
          }else if(types.indexOf(currentType)!=-1){
            newType = currentType;
          }else{
            newType = options.nodeTypes.filter(function(d){
              return types.indexOf(d)!=-1;
            })[0];
          }
          updateSelectOptions();
          filterSelection();
          Tree.typeFilter = newType;
        }
      }
    }

    Tree.displayUnionIntersectionButtons = function(createContainer){
      if(Tree.type=="extended"){

      createContainer(function(container){
        appendButton(container,"union",function(){
          delete Tree.intersection;
        });
        appendButton(container,"intersection",function(){
          Tree.intersection = true;
        });
      });

      function appendButton(sel,name,callback){
        sel.append("button")
        .attr("class","icon-selection disabled")
        .attr("title",name)
        .on("click",function(){
          callback();
          buttonsWindow();
        })
        .append("svg")
          .attr("width",24)
          .attr("height",24)
          .html(svgContent(name))
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
                removeFilter();
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

      function svgContent(name){
        if(name=="intersection"){
          return '<rect x="8" y="8" width="8" height="8" class="fill1" style="fill:#2f7bee;stroke:none" /><rect x="4" y="4" width="12" height="12" class="stroke1" style="fill:none;stroke-width:1;stroke:#000000" /><rect x="7" y="7" width="12" height="12" class="stroke1" style="fill:none;stroke-width:1;stroke:#000000" />';
        }
        if(name=="union"){
          return '<rect x="4" y="4" width="12" height="12" class="fill1" style="fill:#2f7bee;stroke:none" /><rect x="7" y="7" width="12" height="12" class="fill1" style="fill:#2f7bee;stroke:none" /><rect x="4" y="4" width="12" height="12" class="stroke1" style="fill:none;stroke-width:1;stroke:#000000" /><rect x="7" y="7" width="12" height="12" class="stroke1" style="fill:none;stroke-width:1;stroke:#000000" />';
        }
        return '';
      }
      }
    }
  }
  return Tree;
}
