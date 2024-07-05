function mgmtTree(Graph, nodes, updateSelectOptions, deselectAllItems, removeFilter, displayTooltip, resetZoom){
  if(!updateSelectOptions){
    updateSelectOptions = function(){};
  }
  if(!deselectAllItems){
    deselectAllItems = function(){};
  }
  if(!removeFilter){
    removeFilter = function(){};
  }

  var Tree = false,
      options = Graph.options;

  if(Graph.nodes_relatives){
    nodes.forEach(function(n,i){
        if(Graph.nodes_relatives[i].length && Graph.nodes_relatives[i][0]){
          n['_relatives'] = Graph.nodes_relatives[i];
          if(Graph.nodes_relativesTypes && Graph.nodes_relativesTypes[i]){
            n['_relativesTypes'] = Graph.nodes_relativesTypes[i];
          }
        }
    });

    Tree = {};
    Tree.treeParent = [];
    if(options.nodeTypes){
      Tree.history = [];
      Tree.typeFilter = "";
      if(options.initialType){
        if(options.nodeTypes.indexOf(options.initialType)!=-1){
          Tree.typeFilter = options.initialType;
        }else{
          delete options.initialType
        }
      }
    }else{
      return false;
    }

    Tree.resetOptions = function(){
      Tree.breadcrumbs.empty();
      ['treeParent','typeFilter','history'].forEach(function(k){
        if(Tree.hasOwnProperty(k)){
          if(typeof Tree[k] == "string"){
            Tree[k] = "";
          }else{
            Tree[k] = [];
          }
        }
      });
    }

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

    Tree.BreadCrumbs = function(sel){
      this.breadcrumbs = sel.append("div")
              .attr("class","breadcrumbs")
    }

    Tree.BreadCrumbs.prototype = {
      empty: function(){
        this.breadcrumbs.selectAll("*").remove();
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
        if(typeFilter && treeParent && treeParent.length){
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
              return Array.isArray(d[options.nodeType]) ? d[options.nodeType].indexOf(typeFilter)!=-1 : d[options.nodeType]==typeFilter;
            }
          }
        }

        var filter = function(){ return true };

        if(treeParent && treeParent.length){

          filter = function(d){
            if(!d['_relatives']){
              return false;
            }

            if(!intersection(d['_relatives'],treeParent).length && treeParent.indexOf(d[options.nodeName])==-1){
                return false;
            }

            if(!typeFilter){
             return true;
            }

            var dtype = d[options.nodeType];
            if(Array.isArray(dtype)){
              if(d['_relativesTypes'].filter(function(e,i){
                return typeFilter==e && treeParent.indexOf(d['_relatives'][i])!=-1;
              }).length){
                return true;
              }
            }else if(typeFilter==dtype){
              return true;
            }

            return false;
          };

        }else if(typeFilter){

          filter = function(d){
            return Array.isArray(d[options.nodeType]) ? d[options.nodeType].indexOf(typeFilter)!=-1 : d[options.nodeType]==typeFilter;
          };

        }

        return filter;
    }

    Tree.displayTreeMenu = function(filteredData){
          Tree.breadcrumbs.empty();
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
              n['_current_relatives'] = [];
              Tree.treeParent.forEach(function(e){
                if([n].filter(Tree.applyExtendedFilter([e],Tree.typeFilter)).length){
                  n['_current_relatives'].push(e);
                }
              });
            })
          }else{
            delete Tree.relatives;
          }
    }

    Tree.treeFilteredData = function(filteredData){
        return filteredData.filter(Tree.applyExtendedFilter(Tree.treeParent,Tree.typeFilter));
    }

    Tree.getSearchFunction = function(filterSelection,displayGraph){
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
  return Tree;
}
