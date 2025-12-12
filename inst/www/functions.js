function fileDownload(blob,name){
  if(window.navigator.msSaveBlob){
    window.navigator.msSaveBlob(blob, name);
  }else{
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function(){
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
}

function pdfPolygon(path, x, y, scale, style){
    if(path.indexOf("A")!=-1){
      this.circle(x, y, 4.514*scale[0], style);
    }else{
      var closed = path.indexOf("Z")!=-1,
          points = [];
      path = path.replace(/M|Z/g,"").split(/[Lhv]/); 
      for(var i = 0; i<path.length; i++){
        var p = path[i].split(/[,| ]/).filter(function(d){ return d.length>0; }),
        pLen = p.length;
        if(pLen==1){
          points.push(points[points.length-1].map(function(d,j){ return i%2!=0 ^ j ? d+parseInt(p[0]) : d; }));
        }
        if(pLen==2){
          points.push([+p[0],+p[1]]);
        }
        if(pLen>2){
          for(var j = 0; j<pLen; j=j+2){
            points.push([+p[j],+p[j+1]]);
          }
        }
      }

      var acc = [],
        x1 = points[0][0],
        y1 = points[0][1],
        cx = x1,
        cy = y1;
      for(var i=1; i<points.length; i++) {
          var point = points[i],
            dx = point[0]-cx,
            dy = point[1]-cy;
          acc.push([dx, dy]);
          cx += dx;
          cy += dy;
      }
      this.lines(acc, x+(x1*scale[0]), y+(y1*scale[1]), scale, style, closed);
    }
}

function applyOpacity(rgb,alpha,old){
  if(!old)
    old = {r:255,g:255,b:255};
  var blending = function(newC,old){
    return alpha * newC + (1 - alpha) * old;
  }
  return d3.rgb(blending(rgb.r,old.r),blending(rgb.g,old.g),blending(rgb.b,old.b));
}

function viewport(){
  var e = window,
      a = 'inner';
  if ( !( 'innerWidth' in window ) ){
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width : e[a+'Width'] , height : e[a+'Height'] }
}

// apply a format to display numbers
function formatter(d){
  if(typeof d == 'number'){
    var dabs = Math.abs(d);
    if((dabs>0 && dabs<1e-2) || (dabs>1e+7)){
      d = d.toExponential(2);
    }else{
      d = (d % 1 === 0)?d:d.toFixed(2);
    }
  }
  return String(d);
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function getKey(event){
  if(false && typeof event.key != "undefined"){
    // TODO: modern browsers
    var key = event.key;

    // alternative names in Internet Explorer
    var alt = {
      "Esc": "Escape",
      "Spacebar": " ",
      "Left": "ArrowLeft",
      "Up": "ArrowUp",
      "Right": "ArrowRight",
      "Down": "ArrowDown",
      "Del": "Delete"
    }
    if(alt.hasOwnProperty(key))
      key = alt[key];

    if(key.length==1){
      key = key.toLowerCase()
    }

    return key;
  }else{
    // old browsers
    var key = event.which || event.keyCode;

    // equivalence key codes - names
    var keyCodes = {
  '8': "Backspace",
  '9': "Tab",
  '13': "Enter",
  '16': "Shift",
  '17': "Control",
  '18': "Alt",
  '19': "Pause",
  '20': "CapsLock",
  '27': "Escape",
  '32': " ",
  '33': "PageUp",
  '34': "PageDown",
  '35': "End",
  '36': "Home",
  '37': "ArrowLeft",
  '38': "ArrowUp",
  '39': "ArrowRight",
  '40': "ArrowDown",
  '45': "Insert",
  '46': "Delete",
  '48': "0",
  '49': "1",
  '50': "2",
  '51': "3",
  '52': "4",
  '53': "5",
  '54': "6",
  '55': "7",
  '56': "8",
  '57': "9",
  '60': "<",
  '65': "a",
  '66': "b",
  '67': "c",
  '68': "d",
  '69': "e",
  '70': "f",
  '71': "g",
  '72': "h",
  '73': "i",
  '74': "j",
  '75': "k",
  '76': "l",
  '77': "m",
  '78': "n",
  '79': "o",
  '80': "p",
  '81': "q",
  '82': "r",
  '83': "s",
  '84': "t",
  '85': "u",
  '86': "v",
  '87': "w",
  '88': "x",
  '89': "y",
  '90': "z",
  '96': "0",
  '97': "1",
  '98': "2",
  '99': "3",
  '100': "4",
  '101': "5",
  '102': "6",
  '103': "7",
  '104': "8",
  '105': "9",
  '106': "*",
  '107': "+",
  '108': ".",
  '109': "-",
  '110': ".",
  '111': "/",
  '171': "+",
  '173': "-",
  '187': "+",
  '189': "-",
  '190': "."
    //TODO: complete list
    };

    return keyCodes[String(key)];
  }
}

function downloadExcel(data,name){
  var sheets = ["void"],
      contentTypes = [],
      workbook = [],
      workbookRels = [],
      sheetXML = function(dat){
        var xml = [];
        dat.forEach(function(d){
          xml.push('<row>');
          d.forEach(function(dd){
            if(typeof dd == 'number')
              xml.push('<c t="n"><v>'+dd+'</v></c>');
            else
              xml.push('<c t="inlineStr"><is><t>'+escapeHtml(dd)+'</t></is></c>');
          });
          xml.push('</row>');
        });
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData>'+xml.join('')+'</sheetData></worksheet>';
      }

  for(var d in data)
    sheets.push(d);

  var zip = new JSZip(),
      rels = zip.folder("_rels"),
      xl = zip.folder("xl"),
      xlrels = xl.folder("_rels"),
      xlworksheets = xl.folder("worksheets");

  rels.file(".rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');

  for(var i = 1; i < sheets.length; i++){
    contentTypes.push('<Override PartName="/xl/worksheets/sheet'+i+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>');
    workbook.push('<sheet name="'+sheets[i]+'" sheetId="'+i+'" r:id="rId'+i+'"/>');
    workbookRels.push('<Relationship Id="rId'+i+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet'+i+'.xml"/>');
    xlworksheets.file("sheet"+i+".xml", sheetXML(data[sheets[i]]));
  }

  zip.file("[Content_Types].xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'+contentTypes.join('')+'</Types>');

  xl.file("workbook.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets>'+workbook.join('')+'</sheets></workbook>');

  xlrels.file("workbook.xml.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+workbookRels.join('')+'</Relationships>');

  zip.generateAsync({type:"blob", mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
  .then(function(content) {
      fileDownload(content, name + '.xlsx');
  });
}

function displayWindow(w,h){
  var docSize = viewport(),
      bg = d3.select("body").append("div")
        .attr("class","window-background")
        .style("width",docSize.width+"px")
        .style("height",docSize.height+"px")

  var win = bg.append("div")
    .attr("class","window")
    .on("click",function(){ d3.event.stopPropagation(); })
    .style("margin-top",(docSize.height/5)+"px")
    .style("width",(w ? w : (docSize.width/2))+"px");

  win.append("div")
    .attr("class","close-button")
    .on("click", function(){ bg.remove() });

  win = win.append("div")
    .attr("class","window-content")

  if(h){
    win.style("height", h+"px");
  }else{
    win.style("max-height", (docSize.height/2)+"px");
  }

  return win;
}

function brushSlider(){
  var domain,
      current,
      callback,
      ordinal = false,
      mode = 1;

  function exports(sel){
    sel.selectAll(".slider").remove();

    var cex = parseInt(sel.style("font-size"))/10,
        margin = mode==1 ? [21 + 15*cex, 40, 0, 10] : [0,0,0,0],
        width = sel.node().clientWidth - margin[3] - margin[1],
        height = mode==1 ? 21 : 0;

    if(!current)
      current = domain.slice();

    var x = d3.scaleLinear()
        .range([0, width])
        .domain(domain)
        .clamp(true);

    sel.style("height", height+margin[0]+margin[2] + "px");
  
    var slider = sel.append("div")
      .attr("class", "slider mode"+mode)
      .style("width", width + "px")
      //.style("height", height + "px")
      .style("position", "relative")
      .style("top", margin[0]+"px")
      .style("left", margin[3]+"px");
    
    var sliderTray = slider.append("div")
      .attr("class", "slider-tray");
    
    var sliderExtent = false;

    if(mode==1){
      sliderExtent = slider.append("span")
        .attr("class","slider-extent")

      slider.append("span")
      .attr("class","slider-min")
      .style("left", -5*cex+"px")
      .style("top", -20*cex + "px")
      .text(formatter(domain[0]))

      slider.append("span")
      .attr("class","slider-max")
      .style("left", width-5*cex+"px")
      .style("top", -20*cex + "px")
      .text(formatter(domain[1]))
    }

    if(mode==2){
      sliderExtent = sliderTray.append("span")
        .attr("class","slider-extent")
    }

    var sliderHandle = slider.selectAll(".slider-handle")
    .data(current)
      .enter().append("div")
    .attr("class", "slider-handle")
    .style("position","absolute")
    .style("top", "3px")
    
    sliderHandle.append("div")
    .attr("class", "slider-handle-icon")

    sliderHandle.each(function(d,i){
      d3.select(this).append("span")
      .attr("class","slider-text")
      .style("top", -25*cex + "px")
      .style("left", -4*cex+"px")
      .on("click",function(d){
        var self = d3.select(this);
        if(self.select("input").empty()){
          var value = formatter(d);
          var input = self.append("input")
            .attr("type","text")
            .property("value",value)
            .on("blur",function(){
              self.select("input").remove();
            })
            .node()
          input.onkeydown = function(event){
              var key = getKey(event);
              if(key == 'Enter'){
                var val = parseFloat(this.value);
                if(isNaN(val) || val<domain[0] || val>domain[1])
                  return false;
                current[i] = val;
                callback(updateHandlers());
                return false; 
              }
              if(isNaN(parseInt(key)) && ["Backspace","Tab","End","Home","ArrowLeft","ArrowRight","Delete","."].indexOf(key)==-1)
                return false;
          }
          input.focus();
          input.select();
        }
      })
    })

    sliderHandle.call(d3.drag()
    .on("drag", function(d,i) {
      current[i] = x.invert(d3.mouse(sliderTray.node())[0]);
      if(ordinal){
        current[i] = Math.round(current[i]);
      }
      callback(updateHandlers());
    }));

    updateHandlers();

    function updateHandlers(){
      sliderHandle.data(current);
      sliderHandle.style("left",function(d){ return x(d) + "px"; });
      sliderHandle.select(".slider-text").text(function(d){ return formatter(d); });
      var extent = d3.extent(current);
      if(sliderExtent){
        sliderExtent
        .style("width", (x(extent[1])-x(extent[0]))+"px")
        .style("left",x(extent[0])+"px");
      }
      return extent;
    }
  }

  exports.dispatch = function(){
    callback(d3.extent(current));
  }

  exports.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x;
    return exports;
  };

  exports.current = function(x) {
    if (!arguments.length) return current;
    current = x;
    return exports;
  };

  exports.callback = function(x) {
    if (!arguments.length) return callback;
    callback = x;
    return exports;
  };

  exports.ordinal = function(x) {
    if (!arguments.length) return ordinal;
    ordinal = x ? true : false;
    return exports;
  };

  exports.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x;
    return exports;
  };

  return exports;
}

function dataType(data,key,deep){
  var type = [];
  for(var i = 0; i<data.length; i++){
      if(data[i][key] !== null){
        var t = typeof data[i][key];
        if(deep && t=="object"){
          data[i][key].forEach(function(d){
            if(d !== null){
              type.push(typeof d);
            }
          })
        }else{
          type.push(t);
        }
      }
  }
  type = d3.set(type).values();
  if(type.length == 1){
    return type[0];
  }else if(type.indexOf("object")!=-1){
    return "object";
  }else{
    return 'undefined';    
  }
}

function getOptions(data){
  return d3.keys(data[0]).filter(function(d){ return d.substring(0,1)!="_"; }).sort(sortAsc);
}

function displayPicker(options,option,callback){
    var attr = options[option],
        scaleKeys = d3.keys(colorScales),
        r = 14,
        itemsPerRow = 8,
        row,
        win = displayWindow((r*2+12)*itemsPerRow);

    win.append("h2").text(texts.selectacolorscale+"\""+attr+"\"");

    var picker = win.append("div")
      .attr("class","picker");

    scaleKeys.forEach(function(d){
      if(!row || row.selectAll("span").size()>=itemsPerRow){
        row = picker.append("div").attr("class","row");
      }

      var canvas = row.append("span")
        .style("width",(r*2+1)+"px")
        .style("height",(r*2+1)+"px")
        .property("val",d)
        .classed("active",options["colorScale"+option]==d)
        .on("click",function(){
          picker.selectAll("span").classed("active",false);
          d3.select(this).classed("active",true);
        })
        .append("canvas")
          .attr("width",r*2)
          .attr("height",r*2)
          .text(d)
          .node();

      var ctx = canvas.getContext("2d");

      // Create gradient
      var grd = ctx.createLinearGradient(0,0,canvas.width,0),
          colors = colorScales[d];
      colors.forEach(function(c,i){
        grd.addColorStop(i/(colors.length-1),c);
      })

      // Fill with gradient
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(r,r,r,0,2*Math.PI);
      ctx.fill();
    });

    pickerSelectButton(win, function(){
      options["colorScale"+option] = picker.select("span.active").property("val");
      callback();
    });
}

function displayPickerColor(value,active,callback){
    var r = 14,
        itemsPerRow = 10,
        row,
        win = displayWindow((r*2+12)*itemsPerRow),
        colorPicker = false;

    win.append("h2").text(texts.selectacolor+"\""+value+"\"");

    var picker = win.append("div")
      .attr("class","picker");

    categoryColors.forEach(function(d){
      if(!row || row.selectAll("span").size()>=itemsPerRow){
        row = picker.append("div").attr("class","row");
      }

      row.append("span")
        .style("width",(r*2+1)+"px")
        .style("height",(r*2+1)+"px")
        .property("val",d)
        .classed("active",active==d)
        .on("click",function(){
          picker.selectAll("span").classed("active",false);
          d3.select(this).classed("active",true);
          active = d;
          if(colorPicker){
            colorPicker.color.hexString = active;
          }
        })
        .style("background-color",d)
    });

    if(window.iro){
      var iroContainer;

      win.append("center")
      .append("button")
        .attr("class","custom-color")
        .text(texts.selectcustomcolor)
        .on("click",function(){
          iroContainer.style("display",iroContainer.style("display")=="block" ? "none" : "block")
        })

      var iroContainer = win.append("center")
        .attr("id","iro-picker")
        .style("display","none")

      colorPicker = new window.iro.ColorPicker('#iro-picker', {
        width: 200,
        color: active
      });

      colorPicker.on('input:change', function(color) {
        picker.selectAll("span").classed("active",false);
        active = color.hexString;
      });
    }

    pickerSelectButton(win, function(){
      callback(active);
    });
}

function displayPickerShape(value,active,options,callback){
    var r = 14,
        itemsPerRow = 7,
        row,
        win = displayWindow((r*2+12)*itemsPerRow);

    win.append("h2").text(texts.selectashape+"\""+value+"\"");

    var picker = win.append("div")
      .attr("class","picker");

    options.forEach(function(d){
      if(!row || row.selectAll("span").size()>=itemsPerRow){
        row = picker.append("div").attr("class","row");
      }

      var canvas = row.append("span")
        .style("width",(r*2+1)+"px")
        .style("height",(r*2+1)+"px")
        .property("val",d)
        .classed("active",active==d)
        .on("click",function(){
          picker.selectAll("span").classed("active",false);
          d3.select(this).classed("active",true);
        })
        .append("canvas")
          .attr("width",r*2)
          .attr("height",r*2)
          .text(d)
          .node();

      var ctx = canvas.getContext("2d");

      ctx.translate(r, r);
      ctx.fillStyle = basicColors.black;
      ctx.beginPath();
      d3.symbol().type(d3["symbol"+d]).size(r*10).context(ctx)();
      ctx.closePath();
      ctx.fill();
    });

    pickerSelectButton(win, function(){
      callback(picker.select("span.active").property("val"));
    });
}

function pickerSelectButton(win, callback){
    win.append("center")
      .append("button")
        .attr("class","primary")
        .text(texts.select)
        .on("click",function(){
          callback();
          d3.select("div.window-background").remove();
        })
}

function topFilter(){

  var data = [],
      datanames = [],
      displayGraph = function(){},
      selectedValues = {},
      selFilter,
      filterTags;

  function exports(div){

    div.append("h3").attr("class","top-filter").text(texts.filter + ":")

    var changeAttrSel = function(val){
      if(d3.select("body>div>div.window").empty()){

        var w = 300,
            panel = displayWindow(w);

        panel.append("h2").text(val)

        var content = panel.append("div")
          .attr("class", "filter-options")
          .style("height",w+"px");
        

        var type = dataType(data.filter(function(d){ return d[val] !== null; }),val);
        if(type == 'number'){
          var discrete = true,
              extent = d3.extent(data, function(d){
                if(discrete && d[val]%1!=0){
                  discrete = false;
                }
                return d[val];
              }),
              tempValues;
          content.call(brushSlider()
            .domain(extent)
            .current(selectedValues[val])
            .ordinal(discrete)
            .callback(function(s){ tempValues = s; }));
        }else{
          var dat = data.map(function(d){ return d[val]; });
          if(type != 'string')
            dat = dat.reduce(function(a,b) { return b ? a.concat(b) : a; }, []);
          dat = d3.set(dat).values().sort();

          var options = content.selectAll("div")
              .data(dat)
            .enter().append("div")
              .attr("class","legend-item")
              .property("value",String)
              .style("cursor","pointer")
              .on("click",function(){
                var box = d3.select(this).select(".legend-check-box");
                box.classed("checked",!box.classed("checked"))
              })
          options.append("div")
              .attr("class","legend-check-box")
              .classed("checked",function(d){ return (selectedValues[val] && selectedValues[val].indexOf(d)!=-1); })
          options.append("span")
              .attr("title",String)
              .text(String);
        }

        panel.append("center")
          .append("button")
          .attr("class","primary")
          .text(texts.apply)
          .on("click",function(){
            add2filter();
            displayGraph(getFilteredData());
            displayTags();
          })
      }

      selFilter.node().selectedIndex = 0;

      function add2filter(){
            selectedValues[val] = [];
            if(typeof tempValues != 'undefined'){
              data.forEach(function(d){
                if((d[val] >= tempValues[0]) && (d[val] <= tempValues[1] )){
                  selectedValues[val].push(d[val]);
                }
              });
            }else{
              options.selectAll(".legend-check-box.checked").each(function(){
                  selectedValues[val].push(d3.select(this.parentNode).property("value"));
              })
            }
            if(selectedValues[val].length == 0){
              delete selectedValues[val];
              data.forEach(function(d){ delete d._filtered; });
            }
            d3.select("div.window-background").remove();
      }
    }

    selFilter = div.append("div")
      .attr("class","select-wrapper")
      .append("select")
        .on("change",function(){ changeAttrSel(this.value); })

    updateSelect();

    renderFilterTagsContainer(d3.select(div.node().parentNode.parentNode));
  }

  function displayTags(){
    if(filterTags){
      var tags = filterTags.selectAll(".tag").data(d3.keys(selectedValues).filter(function(d){ return d.substring(0,1)!="_" }),String)
      tags.enter().append("div")
        .attr("class","tag")
        .attr("filter",String)
        .text(String)
        .on("click",function(d){
            delete selectedValues[d];
            data.forEach(function(d){ delete d._filtered; });
            displayGraph(getFilteredData());
            displayTags();
         })

      tags.exit().remove()
    }
  }

  function updateSelect(){
      if(selFilter){
        selFilter.selectAll("option").remove();
        var options = datanames.slice();
        options.unshift("-"+texts.none+"-");
        selFilter.selectAll("option")
        .data(options)
          .enter().append("option")
        .property("disabled",function(d,i){ return !i; })
        .property("value",String)
        .text(String)
      }
  }

  function getFilteredData(additive){
    var keys = d3.keys(selectedValues);
    if(keys.length){
      return data.filter(function(d){
        if(d._filtered){
          return false;
        }
        for(var i = 0; i<keys.length; i++){
          var value = false,
              k = keys[i],
              dk = d[k];
          if(dk===null){
            dk = String(dk);
          }
          var dtype = typeof dk;
          if(dtype == 'number'){
            if(selectedValues[k].map(Number).indexOf(dk)!=-1){
              value = true;
            }
          }else if(dtype == 'object'){
            for(var j = 0; j<selectedValues[k].length; j++){
              var p = selectedValues[k][j];
              if(dk.indexOf(String(p))!=-1){
                value = true;
                break;
              }
            }
          }else{
            if(selectedValues[k].map(String).indexOf(dk)!=-1){
              value = true;
            }
          }
          if(!additive){
            if(!value){
              d._filtered = true;
              return false;
            }
          }else{
            if(value){
              delete d._filtered;
              return true;
            }
          }
        }
        if(additive){
          d._filtered = true;
          return false;
        }else{
          delete d._filtered;
          return true;
        }
      });
    }else{
      data.forEach(function(d){
        delete d._filtered;
      });
    }
    return false;
  }

  function renderFilterTagsContainer(topbar){
    if(!filterTags && topbar.classed("topbar")){
      filterTags = topbar.append("div").attr("class","filter-tags");
    }
  }

  exports.filterTagsTopbar = function(topbar){
    renderFilterTagsContainer(topbar);
  }

  exports.removeFilter = function(){
      selectedValues = {};
      data.forEach(function(d){ delete d._filtered; });
      displayGraph(false);
      displayTags();
  }

  exports.data = function(x) {
    if (!arguments.length) return data;
    data = x;
    return exports;
  };

  exports.datanames = function(x) {
    if (!arguments.length) return datanames;
    datanames = x;
    updateSelect();
    return exports;
  };

  exports.displayGraph = function(x) {
    if (!arguments.length) return displayGraph;
    displayGraph = x;
    return exports;
  };

  exports.newFilter = function(key,values){
    selectedValues = {};
    if(key){
      selectedValues[key] = values;
    }
    displayGraph(getFilteredData());
    displayTags();
  }

  exports.addFilter = function(key,values){
    if(key){
      selectedValues[key] = values;
    }
    displayGraph(getFilteredData());
    displayTags();
  }

  exports.getFilter = function(key){
    if(key){
      if(selectedValues[key]){
        return selectedValues[key];
      }
    }
    return [];
  }

  exports.storeFilter = function(key,values){
    if(key){
      selectedValues[key] = values;
    }
  }

  exports.storeNumericFilter = function(key,min,max){
    if(key){
      selectedValues[key] = [];
      data.forEach(function(d){
        if((d[key] >= min) && (d[key] <= max )){
          selectedValues[key].push(d[key]);
        }
      });
    }
  }

  exports.applyFilter = function(additive){
    displayGraph(getFilteredData(additive));
    displayTags();
  }

  return exports;
}

function sortAsc(a,b){
  return compareFunction(a,b);
}

function compareFunction(a,b,rev){
  if(a===null){
    return 1;
  }
  if(b===null){
    return -1;
  }
  if(rev){
    var aux = b;
    b = a;
    a = aux;
  }
  if(!isNaN(+a) && !isNaN(+b)){
    a = +a;
    b = +b;
  }
  if(typeof a == "number" && typeof b == "number"){
    return a-b;
  }else{
    var aa = String(a).substring(0,1)==".",
        bb = String(b).substring(0,1)==".";
    if(aa && !bb){
      return 1;
    }else if(bb && !aa){
      return -1;
    }else{
      return String(a).localeCompare(String(b));
    }
  }
}

function getTranslation(transform) {
  var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  
  g.setAttributeNS(null, "transform", transform);
 
  var matrix = g.transform.baseVal.consolidate().matrix;
  
  return [matrix.e, matrix.f];
}

function CanvasRecorder(canvas, video_bits_per_sec) {
    this.start = startRecording;
    this.stop = stopRecording;
    this.save = download;

    var recordedBlobs = [];
    var supportedType = null;
    var mediaRecorder = null;

    try {
      var stream = canvas.captureStream();
    } catch (e) {
      alert("canvas.captureStream() is not supported by this browser.");
    }
    if (typeof stream == undefined || !stream) {
      this.start = null;
      return;
    }

    function startRecording() {
        if(typeof MediaRecorder == "undefined"){
          alert('MediaRecorder is not supported by this browser.');
          return false;
        }

        var types = [
            "video/webm;codecs=vp9",
            "video/webm;codecs=vp8",
            "video/webm;codecs=daala",
            "video/webm;codecs=h264",
            "video/webm",
            "video/vp8",
            "video/mpeg"
        ];

        for (var i in types) {
            if (MediaRecorder.isTypeSupported(types[i])) {
                supportedType = types[i];
                break;
            }
        }
        if (supportedType == null) {
            alert("No supported type found for MediaRecorder");
            return false;
        }
        var options = { 
            mimeType: supportedType,
            videoBitsPerSecond: video_bits_per_sec || 2500000 // 2.5Mbps
        };

        recordedBlobs = [];
        try {
            mediaRecorder = new MediaRecorder(stream, options);
        } catch (e) {
            alert('MediaRecorder is not supported by this browser.');
            console.error('Exception while creating MediaRecorder:', e);
            return false;
        }

        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start(100); // collect 100ms of data blobs
        return true;
    }

    function handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }

    function stopRecording() {
        mediaRecorder.stop();
    }

    function download(file_name) {
        var name = file_name || 'recording.webm';
        var blob = new Blob(recordedBlobs, { type: supportedType });
        fileDownload(blob,name);
    }
}

// polyfill for toBlob canvas method
if (!HTMLCanvasElement.prototype.toBlob) {
   Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
     value: function (callback, type, quality) {
       var canvas = this;
       setTimeout(function() {
         var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
         len = binStr.length,
         arr = new Uint8Array(len);

         for (var i = 0; i < len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
         }

         callback( new Blob( [arr], {type: type || 'image/png'} ) );
       });
     }
  });
}

function iconButton(){
  var alt,
      src,
      title,
      job,
      width,
      height,
      float = "right";

  function exports(sel){
    sel.append("img")
      .attr("class","icon")
      .attr("alt", alt ? alt : null)
      .attr("width", width ? width : 14)
      .attr("height", height ? height : 14)
      .style("float", float)
      .attr("src", src ? src : null)
      .attr("title", title ? title : null)
      .on("click", job ? job : null);
  }

  exports.alt = function(x) {
    if (!arguments.length) return alt;
    alt = x;
    return exports;
  };

  exports.src = function(x) {
    if (!arguments.length) return src;
    src = x;
    return exports;
  };

  exports.title = function(x) {
    if (!arguments.length) return title;
    title = x;
    return exports;
  };

  exports.job = function(x) {
    if (!arguments.length) return job;
    job = x;
    return exports;
  };

  exports.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return exports;
  };

  exports.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return exports;
  };

  exports.float = function(x) {
    if (!arguments.length) return float;
    float = x;
    return exports;
  };

  return exports;
}

var d4paths = {
  prev: "m0 0v8h2v-4-4h-2zm2 4l6 4v-8l-6 4z",
  loop: "m3.1329 0.11716c1.4338-0.3575 2.8643 0.13082 3.821 1.1291 0.016065-0.012301 0.02753-0.019619 0.044241-0.032512 0.19187-0.16783 0.32621-0.30606 0.34546-0.32639-0.018073 0.019362-0.00687 0.00203 0.015492-0.023997 0.015502-0.021231 0.034417-0.038778 0.055946-0.055555 0.0079-0.00693 0.016534-0.01328 0.023703-0.017987 0.019283-0.011702 0.04117-0.020392 0.061919-0.026211 0.00511-0.001976 0.00913-0.002279 0.015163-0.003784 0.018339-0.004223 0.036004-0.006387 0.054644-0.006941 0.0022 0.00015449 0.00452-0.00048293 0.0066-0.0003508 0.090806-0.00008196 0.18058 0.045761 0.23114 0.13028 0.019144 0.030939 0.028822 0.064832 0.034029 0.098891l0.0003034 0.00121c0.00665 0.029486 0.011777 0.062358 0.012262 0.097616l0.025111 1.5426 0.00786 0.4839 0.00609 0.428 0.00204 0.13782c0.00526 0.28514-0.1953 0.40539-0.44493 0.26661l-0.5562-0.3094-0.1576-0.0883-0.3631-0.202-1.1159-0.621-0.0729-0.0396c-0.00854-0.00477-0.01378-0.00977-0.021154-0.01486l-0.047364-0.02846 0.00223-0.00185c-0.030207-0.020909-0.058561-0.045189-0.078568-0.078338-0.00532-0.0088-0.00821-0.019071-0.012329-0.027845-0.035072-0.065482-0.038349-0.1348-0.00875-0.20186 0.020393-0.056041 0.058174-0.10543 0.11323-0.13822 0 0 0.35195-0.064373 0.82303-0.2844-0.6664-0.601-1.5941-0.879-2.5376-0.6437-1.5201 0.379-2.4368 1.9029-2.0578 3.423 0.379 1.5202 1.9038 2.4354 3.424 2.0563 0.61-0.152 1.0836-0.5201 1.4542-0.9666 0 0 0.12103-0.16311 0.36112-0.058319 0.2402 0.1048 0.3184 0.1446 0.6025 0.2669 0.284 0.1224 0.1453 0.2773 0.1453 0.2773-0.5341 0.768-1.3034 1.3799-2.2784 1.623-2.1373 0.5329-4.317-0.7768-4.8499-2.9141-0.53294-2.1373 0.77677-4.317 2.9141-4.85z",
  pause: "m1 0v8h2v-8h-2zm4 0v8h2v-8h-2z",
  play: "M1,0L1,8L7,4Z",
  next: "m0 0v8l6-4-6-4zm6 4v4h2v-8h-2v4z",
  rec: "m8 4a4 4 0 0 1 -4 4 4 4 0 0 1 -4 -4 4 4 0 0 1 4 -4 4 4 0 0 1 4 4z",
  stop: "M0,0L8,0L8,8L0,8Z",
  resetzoom: "m9.1504 0.003906c-0.5261-0.01666-1.0639 0.03781-1.6016 0.17187-3.2061 0.79954-5.1705 4.0693-4.3711 7.2754 0.1447 0.5801 0.3727 1.1176 0.6641 1.6074l-3.5234 3.5234c-0.42548 0.42548-0.42548 1.1097 0 1.5352l0.56445 0.56445c0.42548 0.42548 1.1097 0.42548 1.5352 0l3.5273-3.5273c1.3126 0.77848 2.9169 1.0646 4.5078 0.66797 1.4626-0.36467 2.6168-1.2835 3.418-2.4355 0 0 0.20923-0.23241-0.2168-0.41602-0.426-0.1833-0.544-0.243-0.904-0.4002s-0.543 0.0879-0.543 0.0879c-0.556 0.6698-1.265 1.2212-2.18 1.4488-2.2801 0.569-4.5678-0.8031-5.1364-3.0836-0.5685-2.2802 0.8057-4.5662 3.086-5.1347 1.4153-0.35297 2.807 0.0633 3.8066 0.96484-0.70666 0.33006-1.2344 0.42773-1.2344 0.42773-0.08258 0.04919-0.13933 0.12297-0.16992 0.20703-0.0444 0.1006-0.03894 0.20452 0.01367 0.30274 0.0062 0.01315 0.0097 0.02782 0.01758 0.04102 0.03002 0.04973 0.07383 0.08777 0.11914 0.11914l-0.0039 0.002 0.07031 0.04297c0.01106 0.0076 0.02038 0.01428 0.0332 0.02148l0.10938 0.06055 1.6738 0.93164 0.54297 0.30273 0.23828 0.13281 0.83398 0.46289c0.37446 0.20818 0.67392 0.0293 0.66602-0.39844l-0.002-0.20703-0.0098-0.64258-0.01172-0.72656-0.03711-2.3125c0.001-0.0529-0.006-0.1022-0.016-0.1464l-0.002-0.002c-0.008-0.0511-0.022-0.1021-0.051-0.1485-0.075-0.1268-0.209-0.1954-0.345-0.1953-0.0033-0.000198-0.0066 0.000231-0.0098 0-0.02796 0.00072-0.05453 0.0034-0.08203 0.0098-0.0091 0.0023-0.01574 0.0029-0.02344 0.0059-0.03113 0.0087-0.06483 0.0215-0.09375 0.03906-0.01075 0.0071-0.02328 0.01702-0.03516 0.02734-0.03229 0.02515-0.06072 0.05213-0.08398 0.08398-0.03355 0.039-0.05055 0.0642-0.02344 0.03516-0.02888 0.0305-0.22976 0.23848-0.51758 0.49023-0.02507 0.01933-0.04231 0.03037-0.06641 0.04883-1.076-1.1231-2.553-1.8152-4.1308-1.8652z",
  search: "m3.1978-0.000032c-1.7605 0-3.1978 1.4354-3.1978 3.1936s1.4373 3.1936 3.1978 3.1936c0.59181 0 1.1454-0.1644 1.6218-0.44656 0.0028 0.003 0.0043 0.0064 0.0073 0.0094l1.8824 1.8799c0.22707 0.22676 0.59217 0.22676 0.81923 0l0.30122-0.30083c0.22706-0.22678 0.22706-0.5914 0-0.81816l-1.8803-1.8778c-0.0032-0.0019-0.0071-0.0024-0.01042-0.0042 0.2883-0.47928 0.45652-1.0378 0.45652-1.6353 0-1.7582-1.4373-3.1936-3.1978-3.1936zm0 0.93684c1.2537 0 2.2597 1.0047 2.2597 2.2568s-1.006 2.2578-2.2597 2.2578-2.2597-1.0057-2.2597-2.2578 1.006-2.2568 2.2597-2.2568z",
  info: "m4 0a4 4 0 0 0 -4 4 4 4 0 0 0 4 4 4 4 0 0 0 4 -4 4 4 0 0 0 -4 -4zm0 1.4855a0.8 0.8 0 0 1 0.8002 0.8002 0.8 0.8 0 0 1 -0.8002 0.8002 0.8 0.8 0 0 1 -0.8002 -0.8002 0.8 0.8 0 0 1 0.8002 -0.8002zm-1.1429 1.9431h1.7143v2.0558h0.57143v0.80131h-0.57143-1.1429-0.57143v-0.80131h0.57143v-1.4844h-0.57143v-0.57143z"
}

function getSVG(d,w,h){
  var d = "",
      w = 8,
      h = 8;

  function exports(sel){
    var svg = sel.append("svg")
      .attr("xmlns","http://www.w3.org/2000/svg")
      .attr("width",w)
      .attr("height",h)
      .attr("viewBox","0 0 8 8")
      .append("path")
        .attr("d",d)
  }

  exports.d = function(x) {
    if (!arguments.length) return d;
    d = x;
    return exports;
  };

  exports.width = function(x) {
    if (!arguments.length) return w;
    w = x;
    return exports;
  };

  exports.height = function(x) {
    if (!arguments.length) return h;
    h = x;
    return exports;
  };

  return exports;
}

function displayMultiSearch(){
  var data = [],
      column = "name",
      updateSelection = function(){},
      updateFilter = function(){},
      help = true;

  function exports(sel){

    var searchSel = sel.append("div")
        .attr("class","multi-search");

    var searchBox = searchSel.append("div")
      .attr("class","search-box")

    var checkContainer = searchBox.append("div")
      .attr("class","check-wrapper")
      .append("div")
        .attr("class","check-container")

    var typingTimer;
    var typingInterval = data.length>1000 ? 1000 : 500; 

    var searchBoxInput = searchBox.append("div")
      .attr("class","text-wrapper")
      .on("click",function(){
        searchBoxInput.node().focus();
      })
      .append("div")
      .attr("class","text-content")
      .append("textarea")
        .attr("placeholder",texts.searchanode)
        .on("focus",function(){
          searchBox.classed("focused",true);
        })
        .on("blur",function(){
          this.scrollTop = 0;
          searchBox.classed("focused",false);
          checkContainer.style("margin-top",null);
        })
        .on("keydown",function(){
          clearTimeout(typingTimer);
        })
        .on("keyup",function(){
          d3.event.stopPropagation();
          if(searchBoxInput.property("value").length<3){
            checkContainer.selectAll("span").remove();
          }
        })
        .on("keypress",function(){
          clearTimeout(typingTimer);
          if(getKey(d3.event)=="Enter"){
            if(d3.event.shiftKey ^ !help){
              searchIcon.dispatch("click");
              this.blur();
              return;
            }
          }
          if(["ArrowLeft","ArrowRight","ArrowDown","ArrowUp"].indexOf(getKey(d3.event))!=-1){
            return;
          }
          
          typingTimer = setTimeout(doneTyping, typingInterval);
        })
        .on("scroll",function(){
          checkContainer.style("margin-top",String(-this.scrollTop)+"px");
        })
        .on("paste",function(){
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, typingInterval);
        })

    if(help){
      searchBox.append("p").text("shift + Enter to filter");
    }

    var searchIcon = searchSel.append("button")
      .attr("class","search-icon disabled")
      .call(getSVG()
        .d(d4paths.search)
        .width(16).height(16))
      .on("click",function(){
        doneTyping();
        updateFilter();
        checkContainer.selectAll("span").remove();
        searchIcon.classed("disabled",true);
        searchBox.select("textarea").property("value","");
      })

    function doneTyping () {
          var cutoff = data.length>1000 ? 3 : 1,
              values = searchBoxInput.property("value").split("\n");

          if(values.length && !values[values.length-1]){
            values.pop();
          }

          checkContainer.selectAll("span").remove();
          if(values.length){
            data.forEach(function(node){ delete node.selected; });

            values.forEach(function(value){
              var found = false,
                  subvalues = cleanString(value).split(" ").filter(function(d){ return d.length>=cutoff; });
              if(subvalues.length){
                data.forEach(function(node){
                  var prevselected = node.selected;
                  node.selected = true;
                  subvalues.forEach(function(d){
                    if(!cleanString(node[column]).match(d)){
                      node.selected = false;
                    }
                  });
                  if(node.selected){
                    found = true;
                  }else if(prevselected){
                    node.selected = true;
                  }
                });
              }
              checkContainer.append("span")
                .attr("class",found ? "yes": "no")
            });

            updateSelection();
          }
          searchIcon.classed("disabled",!checkContainer.selectAll("span.yes").size());
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

  exports.help = function(x) {
    if (!arguments.length) return help;
    help = x ? true : false;
    return exports;
  };

  return exports;
}

function cleanString(value){
    return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function intersection(a, b){
    var aa = a.slice(), bb = b.slice();
    aa.sort();
    bb.sort();

    var ai=0, bi=0;
    var result = [];

    while( ai < aa.length && bi < bb.length ){
       if      (aa[ai] < bb[bi] ){ ai++; }
       else if (aa[ai] > bb[bi] ){ bi++; }
       else{
         result.push(aa[ai]);
         ai++;
         bi++;
       }
    }

    return result;
}

function makeZoomButton(svg, y, n){
    var w = +svg.attr("width"),
        h = +svg.attr("height");

    var zoombutton = svg.append("g")
      .attr("class","zoombutton "+n)
      .attr("transform","translate("+(w-35)+","+(h-y)+")")

    zoombutton.append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("rx",3)
      .attr("ry",3)
      .attr("width",30)
      .attr("height",30)

    return zoombutton;
}

function makeZoomIn(svg,y){
  var zoomin = makeZoomButton(svg,y,"zoomin");
  zoomin.append("rect")
      .attr("x",7)
      .attr("y",12)
      .attr("width",16)
      .attr("height",6)
  zoomin.append("rect")
      .attr("x",12)
      .attr("y",7)
      .attr("width",6)
      .attr("height",16)
  return zoomin;
}

function makeZoomReset(svg,y){
  var zoomreset = makeZoomButton(svg,y,"zoomreset");
  zoomreset.append("path")
      .attr("transform","translate(7,6)")
      .style("fill",basicColors.white)
      .attr("d",d4paths.resetzoom)
  return zoomreset;
}

function makeZoomOut(svg,y){
  var zoomout = makeZoomButton(svg,y,"zoomout");
  zoomout.append("rect")
      .attr("x",7)
      .attr("y",12)
      .attr("width",16)
      .attr("height",6)
  return zoomout;
}

function uniqueRangeDomain(data,domainCol,rangeCol){
    var aux = d3.map(data,function(d){ return d[domainCol]+"|"+d[rangeCol]; })
      .keys()
      .map(function(d){ return d.split("|"); });
    return {domain: aux.map(function(d){ return d[0]; }), range: aux.map(function(d){ return d[1]; })};
}

function stripTags(text){
  text = String(text);
  if(text=="null"){
    return "NA";
  }
  return text.replace(/(<([^>]+)>)/ig,"");
}

function displayLinearScale(sel, value, range, domain, selectScale, selectAttribute, closePanel, changeDomain, simplify, slider){
  domain = d3.extent(domain);
  var panel;

  if(simplify){
    panel = sel.select(".scale-content");
    if(panel.empty()){
      panel = sel.append("div")
        .attr("class","scale-content");

      renderScaleGradient(panel);
      renderDomain(panel,0);
      renderDomain(panel,1);
    }
  }else{
    panel = sel.select(".scale");
    if(panel.empty()){
      panel = sel.append("div")
          .attr("class","scale")

      if(closePanel){
        panel.append("div")
            .attr("class","highlight-header")
            .text(texts.Scale)
            .append("div")
              .attr("class","close-button")
              .on("click",closePanel)
      }

      var div = panel.append("div")
        .attr("class","scale-content")
        .style("padding-right","12px");

      div.append("div")
          .attr("class","title")
          .text(texts["Color"] + " / "+value)
          .style("cursor", selectAttribute ? "pointer" : null)
          .on("click", selectAttribute ? selectAttribute : null);

      renderScaleGradient(div);
      renderDomain(div,0);
      renderDomain(div,1);
    }
  }

  panel.select("div.legend-scale-gradient")
      .datum(range)
      .style("background-image",function(d){ return "linear-gradient(to right, " + d.join(", ") + ")"; })
  panel.select(".domain1 > span").text(formatter(domain[0]));
  panel.select(".domain2 > span").text(formatter(domain[1]));
  if(slider){
    var slidercontainer = panel.select(".slider-container");
    slidercontainer.call(brushSlider()
            .domain(domain)
            .current(domain)
            .callback(slider)
            .mode(2))
  }

  function renderScaleGradient(div){
      if(slider){
        div.style("padding-top","12px")
          .append("div").attr("class","slider-container");
      }

      var legendScaleGradient = div.append("div")
        .attr("class","legend-scale-gradient")
        .style("height","10px")
        .style("width","100%")

      if(selectScale){
        legendScaleGradient
          .style("cursor","pointer")
          .on("click",selectScale)
      }
  }

  function renderDomain(div,i){
    var container = document.createElement('div')
    container.classList.add('domain'+(i+1))

    var span = document.createElement('span');

    container.appendChild(span);
    div.node().appendChild(container);

    if(changeDomain){
      var domInput = document.createElement('input');
      domInput.style.width = "80%";
      domInput.type = "text";

      domInput.addEventListener("keydown",function(event){
        if(this.parentNode && getKey(event)=="Enter"){
            domain[i] = +domInput.value;
            close(event);
            changeDomain(domain);
        }
      })

      domInput.addEventListener("blur",close)

      span.addEventListener("click",function(){
        event.preventDefault();
        domInput.value = "";
        span.parentNode.removeChild(span);
        container.appendChild(domInput);
        domInput.focus();
      })

      function close(event){
        event.preventDefault();
        if(domInput.parentNode){
          domInput.parentNode.removeChild(domInput);
        }
        container.appendChild(span);
      }
    }
  }
}

function addGradient(defs,id,range){
    var offset = 100/(range.length-1);

    var gradient = defs.select("linearGradient#"+id);
    if(gradient.empty()){
      var gradient = defs.append("linearGradient")
      .attr("id",id)
      .attr("x1","0%")
      .attr("y1","0%")
      .attr("x2","100%")
      .attr("y2","0%");
    }

    var stops = gradient.selectAll("stop")
                  .data(range,String)

    stops.exit().remove()

    stops.enter().append("stop")
      .merge(stops)
        .attr("offset",function(d,i){
          return (offset*i)+"%";
        })
        .style("stop-color",String);

    stops.order();
}


function displayInfoPanel(){
  var docSize,
      infoWidth = 0,
      infoHeight = 0,
      infopanel,
      contentDiv,
      paddingOffset = 0,
      transitionDuration = 500,
      closeAction = false;

  function exports(sel){
    infopanel = sel.append("div")
      .attr("class","infopanel")
      .style("display","none")

    panelSize();

    infopanel.append("div")
      .attr("class","drag")
      .call(d3.drag()
        .on("start", function() {
          docSize = viewport();
          contentDiv.style("display","none");
        })
        .on("drag", function() {
          var left = d3.mouse(sel.node())[0]-parseInt(infopanel.style("border-left-width"));
          if(left>(docSize.width*2/4) && left<(docSize.width*3/4)){
            infoWidth = docSize.width-left;
            infopanel.style("left",(docSize.width-infoWidth)+"px");
          }
        })
        .on("end", function() {
          contentDiv.style("display",null);
        })
      )

    infopanel.append("div")
          .attr("class","close-button")
          .on("click", closePanel);

    contentDiv = infopanel.append("div")
      .attr("class","panel-content")
      .append("div")

    d3.select(window).on("resize.infopanel",panelSize)
  }

  function panelSize(){
    if(infopanel){
      docSize = viewport();
      infoWidth = docSize.width * 1/3;
      infoHeight = docSize.height
      - (parseInt(infopanel.style("top"))*2)
      - parseInt(infopanel.style("border-top-width"))
      - parseInt(infopanel.style("border-bottom-width"))
      - parseInt(infopanel.style("padding-top"))
      - parseInt(infopanel.style("padding-bottom"));
      infopanel.style("height",infoHeight+"px");
      infopanel.style("left",(infopanel.style("display")=="none" ? docSize.width : docSize.width-infoWidth)+"px")
    }
  }

  function closePanel(){
    if(infopanel.style("display")!="none"){
      contentDiv.html("");
      infopanel.transition().duration(transitionDuration)
        .style("left",viewport().width+"px")
        .on("end",function(){
          infopanel.style("display","none");
          if(closeAction){
            closeAction();
          }
        })
    }
  }

  function openPanel(callback){
    if(infopanel.style("display")=="none"){
      contentDiv.style("display","none");
      infopanel.style("display",null);
      infopanel.transition().duration(transitionDuration)
        .style("left",(viewport().width-infoWidth)+"px")
        .on("end",callback ? function(){ contentDiv.style("display",null); } : null)
    }
    if(callback){
      callback(contentDiv);
    }
  }

  exports.changeInfo = function(info){
    if(info){
      openPanel(function(div){ div.html(info); });
    }else{
      closePanel();
    }
  }

  exports.open = function(callback){
    openPanel(callback);
  }

  exports.close = function(){
    closePanel();
  }

  exports.closeAction = function(x) {
    if (!arguments.length) closeAction ? closeAction() : false;
    closeAction = typeof x == "function" ? x : false;
    return exports;
  };

  exports.getWidth = function() {
    return infoWidth;
  };

  exports.selection = function(){
    return infopanel;
  }

  return exports;
}

function attrSelectionWindow(){
  var visual = "",
      active = "",
      list = [],
      clickAction = function(){ };

  function exports(){
    var win = displayWindow(400);
    win.append("h2")
      .text(texts.selectattribute+texts[visual])
    var ul = win.append("ul")
      .attr("class","visual-selector")
    var options = list.map(function(d){ return [d,d]; });
    options.unshift(["_none_","-"+texts.none+"-"]);
    ul.selectAll("li")
        .data(options)
      .enter().append("li")
        .text(function(d){ return d[1]; })
        .property("val",function(d){ return d[0]; })
        .classed("active",function(d){
          return d[0]==active;
        })
        .on("click",function(attr){
          ul.selectAll("li").classed("active",false);
          d3.select(this).classed("active",true);
          clickAction(attr[0]);
          d3.select("div.window-background").remove();
        })
  }

  exports.visual = function(x) {
    if (!arguments.length) return visual;
    visual = x;
    return exports;
  };

  exports.active = function(x) {
    if (!arguments.length) return active;
    active = x;
    return exports;
  };

  exports.list = function(x) {
    if (!arguments.length) return list;
    list = x;
    return exports;
  };

  exports.clickAction = function(x) {
    if (!arguments.length) return clickAction;
    clickAction = x;
    return exports;
  };

  return exports;
}

// display frequency bars
function displayFreqBars(){
  var options = {},
      nodenames,
      nodes,
      updateSelection,
      filterHandler,
      colorScale,
      nodeColor,
      applyShape,
      applyColor,
      frequencies = "relative",
      wordclouds = d3.set(),
      div;
  
  function exports(sel){
    sel.selectAll("*").remove();
    div = sel.append("div");
    div.attr("class","frequency-barplots");
    var header = div.append("div")
      .attr("class","freq-header")
    header.append("div")
      .append("div")
      .attr("class","select-wrapper")
      .append("select")
      .on("change",function(){
        frequencies = this.value;
        exports(sel);
      })
      .selectAll("option")
        .data(["absolute","relative"])
      .enter().append("option")
        .property("selected",function(d){ return frequencies==d; })
        .property("value",String)
        .text(String)

    var headerButtons = header.append("div")
    if(filterHandler && filterHandler.removeFilter && (!filterHandler.checkFilter || filterHandler.checkFilter())){
        headerButtons.append("button")
          .attr("class","primary clear")
          .text(texts.clearfilters)
          .on("click",function(){
            filterHandler.removeFilter();
          })
    }

  var renderPercentage = frequencies=="relative" ? "%" : "";

  nodenames.forEach(function(name){
    var type = dataType(nodes,name);
    if(type=="string" || type=="object"){
      var values = {},
          selectedValues = {};
      nodes.forEach(function(node){
        var loadValue = function(val){
            val = String(val);
            if(!values.hasOwnProperty(val)){
              values[val] = 1;
            }else{
              values[val] += 1;
            }
            if(node.selected){
              if(!selectedValues.hasOwnProperty(val)){
                selectedValues[val] = 1;
              }else{
                selectedValues[val] += 1;
              }
            }
        }
        if(node[name] && type=="object" && typeof node[name] == "object"){
          node[name].forEach(loadValue);
        }else{
          loadValue(node[name]);
        }
      });

      var maxvalue = d3.max(d3.values(values)),
          keyvalues = d3.keys(values).sort(function(a,b){
            a = values[a];
            b = values[b];
            return a > b ? -1 : a < b ? 1 : a <= b ? 0 : NaN;
          });

        var selectedValues2 = [];
        for(v in selectedValues){
          if(selectedValues[v]==values[v]){
            selectedValues2.push(v);
          }
        }

        if(frequencies=="relative"){
          var selectedlength = nodes.filter(function(n){ return n.selected; }).length;

          for(v in values){
            values[v] = values[v]/nodes.length*100;
          }
          for(v in selectedValues){
            selectedValues[v] = selectedValues[v]/selectedlength*100;
          }

          maxvalue = d3.max([d3.max(d3.values(values)),d3.max(d3.values(selectedValues))]);
        }

        var barplot = getBarPlot(name,true,true);

        barplot.datum(selectedValues2);

        var selectNodes = function(v){
              selectOnClick(function(node){
                if(node[name] && type=="object" && typeof node[name] == "object"){
                  if(node[name].indexOf(v)!=-1){
                    node.selected = true;
                  }
                }else{
                  if(String(node[name])==v){
                    node.selected = true;
                  }
                }
              });
        };

        // display wordcloud
        if(wordclouds.has(name)){
          // set the dimensions and margins of the graph
          var w = (sel.node().offsetWidth - 72),
              h = 300;

          // append the svg object
          var svg = barplot.append("svg")
              .attr("class","wordcloud")
              .attr("width", w)
              .attr("height", h)
                .append("g")
                  .attr("transform", "translate(" + w/2 + "," + h/2 + ")")

          var data = keyvalues.map(function(k){
            return {text: k, count: values[k]};
          });

        var font = "Roboto",
            xScale = d3.scaleLinear()
           .domain([0, d3.max(d3.values(values))])
           .range([8,50]);

        var layout = d3.layout.cloud()
    .size([w, h])
    .words(data)
    .padding(2)
    .random(function(){ return 0.5; })
    .rotate(function(d,i){ return (i%2) * 90; })
    .font(font)
    .fontSize(function(d){ return xScale(d.count); })
    .on("end", function (words) {

        svg.selectAll("text")
      .data(words, function(d){ return d.text; })
        .enter().append("text")
      .text(function(d) { return d.text; })
      .attr("text-anchor", "middle")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", font)
      .style("fill", function(d) { return nodeColor==name && colorScale ? colorScale(d.text) :  basicColors.darkGrey; })
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .style("cursor","pointer")
      .on("click",function(d){
        selectNodes(d.text);
      })

          });

          layout.start();

        }else{

        keyvalues.forEach(function(v,i){
          var percentage = values[v]/maxvalue*100,
              percentage2 =  0;

          if(selectedValues[v]){
            percentage2 = selectedValues[v]/maxvalue*100;
          }

          var getValue = function(values,value){
            return frequencies=="relative" ? formatter(values[value])+"%" : values[value];
          }

          var row = barplot.append("div")
            .attr("class","freq-bar")
            .style("display",i>9 ? "none" : null)
            .attr("title",v+": "+getValue(values,v) + (selectedValues[v] ? "\nSelection: "+getValue(selectedValues,v) : ""))
            .on("click",function(){
              selectNodes(v);
            })
          row.append("div")
            .attr("class","freq1")
            .style("width",percentage+"%")
            .style("background-color",nodeColor==name && colorScale ? colorScale(v) : null)
            .html("&nbsp;");
          row.append("div")
            .attr("class","freq2")
            .style("width",percentage2+"%")
            .html("&nbsp;");
          row.append("span")
            .text(v)
        })


        if(keyvalues.length>10){
          var moreLessBars = barplot.append("div")
            .attr("class","show-more-less-bars")
          var moreBars = moreLessBars.append("span")
            .attr("class","show-more-bars")
            .style("cursor","pointer")
            .text(texts.Show + " " + Math.min(keyvalues.length-10,10) + " " + texts.more)
            .on("click",function(){
              var count = 0;
              barplot.selectAll(".freq-bar")
                .style("display",function(d){
                  if(d3.select(this).style("display")=="none"){
                    if(count>=10){
                      return "none";
                    }else{
                      count++;
                    }
                  }
                });
              if(count<10){
                moreBars.style("visibility","hidden")
                  .style("cursor",null);
              }else{
                moreBars.text(texts.Show + " " + Math.min(barplot.selectAll(".freq-bar").filter(function(){
                  return d3.select(this).style("display")=="none";
                }).size(),10) + " " + texts.more)
              }
              lessBars.style("visibility",null)
                .style("cursor","pointer");
            });
          var lessBars = moreLessBars.append("span")
            .attr("class","show-less-bars")
            .style("visibility","hidden")
            .text(texts.Show + " " + texts.less)
            .on("click",function(){
              barplot.selectAll(".freq-bar")
                .style("display",function(d,i){
                  if(i>9){
                    return "none";
                  }
                });
              lessBars.style("visibility","hidden")
                .style("cursor",null);
              moreBars.style("visibility",null)
                .style("cursor","pointer")
                .text(texts.Show + " " + Math.min(keyvalues.length-10,10) + " " + texts.more)
            });
        }

        var axis = barplot.append("div")
          .attr("class","freq-axis")

        var x = d3.scaleLinear()
          .domain([0,maxvalue])

        x.ticks(5).forEach(function(t){
          axis.append("span").style("left",(t/maxvalue*100)+"%").text(t+renderPercentage);
        })

      }
    }else if(type=="number"){
      var values = nodes.filter(function(n){ return n[name]!==null; }).map(function(node){ return +node[name]; }),
          selectedValues = nodes.filter(function(n){ return n[name]!==null && n.selected; }).map(function(node){ return +node[name]; });

      var barplot = getBarPlot(name);

      // set the dimensions and margins of the graph
      var margin = {top: 10, right: 10, bottom: 30, left: 40},
          w = (sel.node().offsetWidth - 72) - margin.left - margin.right,
          h = 200 - margin.top - margin.bottom;

      // append the svg object
      var svg = barplot.append("svg")
          .attr("width", w + margin.left + margin.right)
          .attr("height", h + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // X axis: scale and draw
      var domain = d3.extent(values,function(d) { return d; });
      // prepare domain for the histogram
      if(domain[0]==domain[1]){
        domain = [domain[0]-1,domain[1]+1];
      }else{
        domain[1] = domain[1] + ((domain[1]-domain[0])/10);
      }
      var x = d3.scaleLinear()
        .domain(domain)
        .range([0, w]);

      svg.append("g")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x)
        .ticks(Math.floor(w/60))
        .tickFormat(function(d){
          return formatter(d);
        }));

      // set the parameters for the histogram
      var histogram = d3.histogram()
        .value(function(d) { return d; })
        .domain(x.domain())
        .thresholds(x.ticks(10));

      // And apply this function to data to get the bins
      var bins = histogram(values),
          bins2 = selectedValues.length ? histogram(selectedValues) : [];

      var selectedValues2 = [];
      for(var i = 0; i<bins2.length; i++){
        if(bins2[i].length==bins[i].length){
          nodes.forEach(function(d){
            var val = Number(d[name]);
            if(selectedValues2.indexOf(val)==-1 && (val >= bins2[i].x0 && val < bins2[i].x1)){
              selectedValues2.push(val);
            }
          })
        }
      }
      barplot.datum(selectedValues2);

      for(var i = 0; i<bins.length; i++){
          bins[i].y = frequencies=="relative" ? bins[i].length/nodes.length*100 : bins[i].length;
          if(selectedValues.length){
            bins[i].y2 = frequencies=="relative" ? bins2[i].length/selectedValues.length*100 : bins2[i].length;
          }
      }

      // Y axis: scale and draw
      var y = d3.scaleLinear()
        .range([h, 0])
        .domain([0, d3.max(bins, function(d) { return d.y; })]);

      svg.append("g")
      .call(d3.axisLeft(y)
        .tickFormat(function(d){
          return d + renderPercentage;
        }));

      // append the bar rectangles to the svg element
      var columns = svg.selectAll("g.freq-bar")
        .data(bins)
        .enter()
        .append("g")
          .attr("class","freq-bar")
          .attr("transform", function(d) { return "translate(" + x(d.x0) + ",0)"; })
          .style("cursor","pointer")
          .on("click",function(d,i){
              selectOnClick(function(node){
                if(node[name]>=d.x0 && node[name]<d.x1){
                  node.selected = true;
                }
              });
          })

      var getValue = function(v){
        return formatter(v) + (frequencies=="relative" ? "%" : "");
      }

      columns.append("title")
            .text(function(d,i){
              return "[" + d.x0 + "," + d.x1 + ")" + ": " + getValue(d.y) + (d.y2 ? "\nSelection: " + getValue(d.y2) : "");
            })

      columns.append("rect")
          .attr("class","freq1")
          .attr("x", 1)
          .attr("y", function(d) { return y(d.y); })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1; })
          .attr("height", function(d) { return h - y(d.y); })
          .style("fill", nodeColor==name && colorScale ? function(d){
            return colorScale((d.x0+d.x1)/2);
          } : null)

      if(selectedValues.length){
        columns.append("rect")
          .attr("class","freq2")
          .attr("x", 1 + 4)
          .attr("y", function(d) { return y(d.y2); })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 -8 ; })
          .attr("height", function(d) { return h - y(d.y2); })
          .style("fill", basicColors.mediumGrey)
      }
    }
  })
  }

  function selectOnClick(callback){
    if(!(d3.event.ctrlKey || d3.event.metaKey)){
      nodes.forEach(function(node){
        delete node.selected;
      })
    }
    nodes.forEach(callback);
    updateSelection();
  }

  function getBarPlot(name,shape,wordcloud){
      var barplot = div.selectAll("div.bar-plot").filter(function(){ return this.variable==name; });
      if(barplot.empty()){
        barplot = div.append("div")
          .attr("class","bar-plot")
          .property("variable",name);
        var h2 = barplot.append("h2").text(name);
        if(wordcloud && d3.hasOwnProperty("layout") && d3.layout.hasOwnProperty("cloud")){
          h2.append("img")
          .attr("title","wordcloud")
          .attr("src",b64Icons.wordcloud)
          .on("click",function(){
            var divparent = d3.select(div.node().parentNode);
            if(wordclouds.has(name)){
              wordclouds.remove(name);
              exports(divparent);
            }else{
              wordclouds.add(name);
              if(applyColor){
                applyColor(name);
              }else{
                exports(divparent);
              }
            }
          })
        }
        if(shape && applyShape){
          h2.append("img")
          .attr("title",texts.Shape)
          .attr("src",b64Icons.shapes)
          .on("click",function(){
            applyShape(name);
          })
        }
        if(applyColor){
          h2.append("img")
          .attr("title",texts.Color)
          .attr("src",b64Icons.drop)
          .on("click",function(){
            applyColor(name);
          })
        }
        if(filterHandler && filterHandler.addFilter){
          h2.append("img")
          .attr("title",texts.filter)
          .attr("src",b64Icons.filter)
          .on("click",function(){
            filterHandler.addFilter(name,barplot.datum());
          })
        }
      }else{
        barplot.selectAll(".bar-plot > h2 ~ *").remove();
      }
    return barplot;
  }

  exports.nodenames = function(x) {
    if (!arguments.length) return nodenames;
    nodenames = x;
    return exports;
  };

  exports.nodes = function(x) {
    if (!arguments.length) return nodes;
    nodes = x;
    return exports;
  };

  exports.updateSelection = function(x) {
    if (!arguments.length) return updateSelection;
    updateSelection = x;
    return exports;
  };

  exports.filterHandler = function(x) {
    if (!arguments.length) return filterHandler;
    filterHandler = x;
    return exports;
  };

  exports.colorScale = function(x) {
    if (!arguments.length) return colorScale;
    colorScale = x;
    return exports;
  };

  exports.nodeColor = function(x) {
    if (!arguments.length) return nodeColor;
    nodeColor = x;
    return exports;
  };

  exports.applyColor = function(x) {
    if (!arguments.length) return applyColor;
    applyColor = x;
    return exports;
  };

  exports.applyShape = function(x) {
    if (!arguments.length) return applyShape;
    applyShape = x;
    return exports;
  };

  return exports;
}

function showControls(options,n){
    if(options.hasOwnProperty("controls")){
        if(options.controls===0)
          return undefined;
        if(options.controls==-n)
          return undefined;
        if(options.controls==n)
          return true;
        if(Array.isArray(options.controls)){
          if(options.controls.indexOf(-n)!=-1)
            return undefined;
          if(options.controls.indexOf(n)!=-1)
            return true;
        }
    }
    return false;
}

function displayShowPanelButton(sel,callback){
  if(sel.select(".show-panel-button").empty()){
    var showPanelButton = sel.append("div")
      .attr("class","show-panel-button")
      .on("click",callback)
    showPanelButton.append("span");
    showPanelButton.append("span");
    showPanelButton.append("span");
  }
}

function displayTopBar(){
  var topbar,
      topIcons,
      topBoxes,
      netCoinIcon,
      netCoin = true,
      fixed = false,
      title = false,
      goback = false,
      multigraph = false;

  function exports(sel){
    topbar = sel.append("div")
      .attr("class","topbar")
    topbar.classed("fixed-topbar",fixed)
    topIcons = topbar.append("div")
      .attr("class","topbar-icons")
    topBoxes = topbar.append("div")
      .attr("class","topbar-boxes")

    display_netCoinIcon();

    if(goback){
      exports.addBox(function(box){
        box.append("button").attr("class","primary home").text(texts.goback).attr("title",texts.goback).on("click",function(){
          window.location.href = "../../index.html";
        })
      })
    }

    if(multigraph){
      exports.addBox(function(box){
        multiGraphSelect(box,multigraph.idx,multigraph.names);
      });
    }

    if(title){
        exports.addBox(function(box){
          box.append("h2").text(title);
        })
    }

    d3.select(window).on("resize.topbar-collapse", collapseTopbar);
  }

  function display_netCoinIcon(){
    if(netCoin){
      netCoinIcon = topIcons.append("div")
        .attr("class", "netCoin-icon")
        .style("float", "right")
        .style("margin", "5px 10px")
      netCoinIcon.append("img")
      .attr("width",30)
      .attr("height",22.5)
      .attr("src",b64Icons.netcoin)
      .style("vertical-align", "middle")
      netCoinIcon.append("a")
      .attr("target","_blank")
      .attr("href","https://sociocav.usal.es/blog/nca/")
      .style("font-size","15px")
      .text("netCoin")
    }
  }

  function collapseTopbar(){
    if(netCoinIcon){
      netCoinIcon.style("display", null);
    }
    var boxes = topBoxes.selectAll(".topbar-box").style("display",null);
    if(netCoinIcon && isOverflowing()){
      netCoinIcon.style("display","none");
    }
    for(var j=boxes.size()-1; j>=0; j--){
      if(!isOverflowing()){
        break;
      }
      boxes.filter(function(d,i){
        return i==j;
      }).style("display","none");
    }

    function isOverflowing(){
      var iconsWidth = netCoinIcon ? netCoinIcon.node().offsetWidth : 0;
      topIcons.selectAll(".icon").each(function(){
        iconsWidth += (this.offsetWidth+10);
      });

      var boxesWidth = 0;
      boxes.each(function(){
        boxesWidth += this.offsetWidth;
      })

      return boxesWidth > (topBoxes.node().offsetWidth - iconsWidth);
    }
  }

  exports.addIcon = function(x) {
    topIcons.call(x);
    collapseTopbar();
    return exports;
  };

  exports.addBox = function(x,name) {
    var box = false;
    if(name){
      box = topBoxes.select(".topbar-box."+name);
      if(box.empty()){
        box = false;
      }else{
        box.selectAll("*").remove();
      }
    }
    if(!box){
      box = topBoxes.append("div")
        .attr("class","topbar-box"+(name ? " "+name : ""))
    }
    box.call(x);
    collapseTopbar();
    return exports;
  }

  exports.removeBox = function(name){
    topBoxes.select(".topbar-box."+name).remove();
    return exports;
  }

  exports.fixed = function(x){
    if (!arguments.length) return fixed;
    fixed = x ? true : false;
    return exports;
  }

  exports.topbar = function(){
    return topbar;
  }

  exports.height = function(){
    return topbar.node().offsetHeight;
  }

  exports.title = function(x){
    if (!arguments.length) return title;
    title = x;
    return exports;
  }

  exports.goback = function(x){
    if (!arguments.length) return goback;
    goback = x ? true : false;
    return exports;
  }

  exports.multigraph = function(x){
    if (!arguments.length) return multigraph;
    multigraph = x;
    return exports;
  }

  exports.netCoin = function(x){
    if (!arguments.length) return netCoin;
    netCoin = x ? true : false;
    return exports;
  }

  return exports;
}

function getColumnValues(data,col){
  var itemsData = [];
  data.forEach(function(d){
    if(d[col]!==null){
      if(typeof d[col] == "object"){
        d[col].forEach(function(dd){
          itemsData.push(dd);
        });
      }else{
        itemsData.push(d[col]);
      }
    }
  });
  return d3.set(itemsData).values().sort(sortAsc);
}

function displayLinePlots(){
  var items = [],
      frames = [],
      colors = [],
      variables = [],
      getName = function(item){ return ""; },
      colorHandler = false,
      bipolar = false;

  function exports(sel){
    sel.selectAll("*").remove();

    var tooltip = sel.append("div")
      .attr("class","tooltip")
      .style("display","none")

    // set the dimensions and margins of the graphs
    var margin = {top: 10, right: 10, bottom: 40, left: 70},
        w = sel.node().offsetWidth - 10 - margin.left - margin.right,
        h = 200 - margin.top - margin.bottom;

    // X axis: scale
    var x = d3.scaleLinear()
          .domain([0,frames.length-1])
          .range([0, w]);

    if(colorHandler){
      var oldKey = colorHandler.key();
    }

    variables.forEach(function(key){
      var type = dataType(items,key,true);
      if(type=="undefined"){
        return;
      }
      var data = items.map(function(d){
        var dkey = d[key];
        if(!(Array.isArray(dkey) && dkey.length==frames.length)){
          return frames.map(function(){ return dkey; });
        }
        return dkey;
      });
      var mergedData = d3.merge(data);
      var h2 = sel.append("h2").text(key);
      if(type=="number"){
        // append the svg object
        var svg = sel.append("div")
          .attr("class","lineplot")
          .style("height", (h + margin.top + margin.bottom) + "px")
          .append("div")
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)

        svg.append("defs")
          .append("clipPath")
            .attr("id","linePlotClip")
            .append("rect")
              .attr("width",w)
              .attr("height",h)

        var g = svg.append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // draw X axis
        g.append("g")
        .attr("transform", "translate(0," + h + ")")
        .attr("class","x axis")
        .call(d3.axisBottom(x).tickFormat(function(d){ return frames[d]; }))
          .selectAll("text")
            .attr("transform", "rotate(45)")
            .style("text-anchor", "start")
            .append("title")
              .text(function(d){
                return frames[d];
              });

        // Y axis: scale and axis container
        var dataExtent = d3.extent(mergedData,function(d) { return d; });
        if(bipolar){
          if(dataExtent[0]>0){
            dataExtent[0] = 0;
          }
          if(dataExtent[1]<0){
            dataExtent[1] = 0;
          }
        }
        var y = d3.scaleLinear()
            .range([h, 0])
            .domain(dataExtent);

        g.append("g")
          .attr("class","y axis")

        var polylines = g.append("g")
          .attr("class","polylines")
          .attr("clip-path", "url(#linePlotClip)");

        // draw Y scale brush
        var brush = d3.brushY()
        .extent([[0,0], [10,h]])
        .on("brush", brushed)
        .on("end", brushend)

        var brushg = svg.append("g")
        .attr("transform", "translate(0," + margin.top + ")")
        .attr("class", "brush")
        .call(brush);

        var handle = brushg.selectAll(".handle--custom")
        .data([{type: "n"}, {type: "s"}])
      .enter().append("circle")
        .attr("class", "handle--custom")
        .attr("fill", basicColors.mediumBlue)
        .attr("cursor", "ns-resize")
        .attr("r",5)

        brush.move(brushg, [0,h]);

        function brushed() {

            var s = d3.event.selection;

            // Y axis: scale and draw
            var newExtent = s.map(y.invert).reverse();

            var y2 = d3.scaleLinear()
              .range([h, 0])
              .domain(newExtent);

            g.select(".y.axis")
            .call(d3.axisLeft(y2)
              .tickFormat(function(d){
                return formatter(d);
              }));

          // draw lines
          polylines.selectAll("polyline").remove();
          data.forEach(function(dd,i){
            var points = dd.map(function(d,i){
              if(d!==null){
                return x(i)+","+y2(d);
              }
              return false;
            }).filter(function(d){ return d; });
            if(points){
              var line = polylines.append("polyline")
                .attr("points",points.join(" "))
                .style("stroke",colors.length ? colors[i] : basicColors.black)
                .style("stroke-width","2px")
                .style("fill","none")
                .style("cursor","pointer")
              line.on("mouseenter",function(){
                tooltip.style("display",null)
                  .style("left",(d3.mouse(sel.node())[0]+10)+"px")
                  .style("top",(d3.mouse(sel.node())[1]+10)+"px")
                  .text(getName(items[i]))
              })
              line.on("mouseleave",function(){
                tooltip.style("display","none")
              })
            }
          });

            handle.attr("display", null).attr("transform",function(d,i){
              return "translate(5,"+s[i]+")";
            })
        }

        function brushend() {
          var s = d3.event.selection;
          if(s == null){
            brush.move(brushg, [0,h]);
          }
        }
      }else{

        var order = 0,
            orders = ["alphabetic","numeric","end","start"];

        h2.append("img")
          .attr("src",b64Icons.sort)
          .attr("title",orders[order])
          .on("click",function(){
            order++;
            if(order>3){
              order = 0;
            }
            d3.select(this).attr("title",orders[order])
            drawBars();
          })

        var uniqueData = d3.set(mergedData.filter(function(d){ return d; }).map(String)).values(),
            color = d3.scaleOrdinal()
            .domain(uniqueData)
            .range(categoryColors)
        var frequencies = {};
        mergedData.forEach(function(d){
          if(frequencies.hasOwnProperty(d)){
            frequencies[d]++;
          }else{
            frequencies[d] = 1;
          }
        });
        uniqueData.sort(function(a,b){
          a = frequencies[a];
          b = frequencies[b]
          return a > b ? -1 : a < b ? 1 : a <= b ? 0 : NaN;
        });

        data = data.map(function(d,i){
          return { name: getName(items[i]), color: (colors.length ? colors[i] : basicColors.white), data: d };
        });

        var lineBars = sel.append("div")
          .attr("class", "line-bars-container")
        drawBars();

        var axis = sel.append("div")
            .attr("class","axis-ordinal")

        x.ticks().forEach(function(i){
          axis.append("span")
            .style("left",((i+0.5)/frames.length*100)+"%")
            .attr("title",frames[i])
            .text(frames[i]);
        })

        function drawBars(){
          if(order==1){
            data.sort(function(a,b){
              var aa, bb;
              for(var i=0; i<uniqueData.length; i++){
                aa = a.data.filter(function(d){ return d==uniqueData[i]; }).length;
                bb = b.data.filter(function(d){ return d==uniqueData[i]; }).length;
                if(aa < bb){
                  return 1;
                }
                if(aa > bb){
                  return -1;
                }
              }
              return 0;
            })
          }else if(order==2){
            data.sort(function(a,b){
              var aa, bb;
              for(var i=a.data.length-1; i>=0; i--){
                aa = uniqueData.indexOf(a.data[i]);
                bb = uniqueData.indexOf(b.data[i]);
                if(aa==-1){
                  aa = Infinity;
                }
                if(bb==-1){
                  bb = Infinity;
                }
                if(aa > bb){
                  return 1;
                }
                if(aa < bb){
                  return -1;
                }
              }
              return 0;
            })
          }else if(order==3){
            data.sort(function(a,b){
              var aa, bb;
              for(var i=0; i<a.data.length; i++){
                aa = uniqueData.indexOf(a.data[i]);
                bb = uniqueData.indexOf(b.data[i]);
                if(aa==-1){
                  aa = Infinity;
                }
                if(bb==-1){
                  bb = Infinity;
                }
                if(aa > bb){
                  return 1;
                }
                if(aa < bb){
                  return -1;
                }
              }
              return 0;
            })
          }else{
            data.sort(function(a,b){
              return compareFunction(a.name,b.name);
            })
          }

          if(colorHandler){
            colorHandler.key(key)
              .computeScale()
          }

          lineBars.selectAll(".line-bars").remove();
          data.forEach(function(dd,i){
            var div = lineBars.append("div")
              .attr("class","line-bars");

            dd.data.forEach(function(d){
              var bcolor = basicColors.white;
              if(d){
                if(colorHandler){
                  var obj = {};
                  obj[key] = d;
                  bcolor = colorHandler(obj);
                }else{
                  bcolor = color(d);
                }
              }
              var bar = div.append("div")
                .attr("class","line-bar")
                .style("width",(100/frames.length)+"%")
                .style("background-color",bcolor)
                .style("cursor","pointer")
              if(d){
                bar.on("mouseenter",function(){
                  tooltip.style("display",null)
                    .style("left",(d3.mouse(sel.node())[0]+10)+"px")
                    .style("top",(d3.mouse(sel.node())[1]+10)+"px")
                    .text(String(d))
                })
                bar.on("mouseleave",function(){
                  tooltip.style("display","none")
                })
              }
            });

            div.append("div")
              .attr("class","line-bar-text")
              .style("color",dd.data[0] && d3.hsl(div.select(".line-bar:first-child").style("background-color")).l<0.5? basicColors.white : basicColors.black)
              .text(dd.name)

            div.append("div")
              .attr("class","line-bar-bullet")
              .style("background-color",dd.color)
          });
        }
      }
    });
    if(colorHandler){
      colorHandler.key(oldKey)
        .computeScale();
    }
  }

  exports.frames = function(x){
    if (!arguments.length) return frames;
    frames = x;
    if(!Array.isArray(frames)){
      frames = [frames];
    }
    return exports;
  }

  exports.variables = function(x){
    if (!arguments.length) return variables;
    variables = x;
    if(!Array.isArray(variables)){
      variables = [variables];
    }
    return exports;
  }

  exports.items = function(x){
    if (!arguments.length) return items;
    items = x;
    if(!Array.isArray(items)){
      items = [items];
    }
    return exports;
  }

  exports.getName = function(x){
    if (!arguments.length) return getName;
    getName = x;
    return exports;
  }

  exports.bipolar = function(x){
    if (!arguments.length) return bipolar;
    bipolar = x;
    return exports;
  }

  exports.colorHandler = function(x){
    if (!arguments.length) return colorHandler;
    colorHandler = x;
    return exports;
  }

  exports.colors = function(x){
    if (!arguments.length) return colors;
    colors = x ? x : [];
    if(!Array.isArray(colors)){
      colors = [colors];
    }
    return exports;
  }

  return exports;
}

function tableWrapper(){
  var currentData = [],
      selectedData = [],
      columns = [],
      item = "elements",
      update = false,
      selectAction = false,
      onlySelectedData = true,
      renderCell = function(item,key){
        var txt = item[key];
        if(txt == null){
          return "";
        }
        if(typeof txt == 'object'){
          return txt.join("; ");
        }
        if(typeof txt == 'number'){
          return formatter(txt);
        }
        return String(txt);
      },
      tableContainer,
      table,
      rightAlign,
      last = -1,
      pagination = false,
      pagelength = 25,
      paginationDiv,
      columnwidths = [],
      id = false,
      columnHidden,
      columnsDict = {};

  function exports(tables){
    tableContainer = tables.select("div.table-container");

    tableContainer.on("wheel",function(){
      var idx = d3.event.deltaY > 0 ? 3 : 2;
      tables.select(".table-pagination > button:nth-child("+idx+")").node().click();
    })

    d3.select("body").on("keydown.table-pagination-shortcut",function(){
      var key = getKey(d3.event);
      switch(key){
        case "PageUp":
          d3.event.preventDefault();
          var btn = tables.select(".table-pagination > button:nth-child(2)");
          if(!btn.empty()){
            btn.node().click();
          }
          return;
        case "PageDown":
          d3.event.preventDefault();
          var btn = tables.select(".table-pagination > button:nth-child(3)");
          if(!btn.empty()){
            btn.node().click();
          }
          return;
      }
    })

    if(tableContainer.empty()){
      return;
    }

    selectedData = currentData.filter(function(d,i){
        d.index = i;
        delete d._selected;
        return !onlySelectedData || d.selected;
    })

    rightAlign = columns.map(function(col){
          if(dataType(currentData,col) == 'number'){
            return true;
          }
          return false;
        });

    columnHidden = columns.map(function(d){
      if(d.substring(0,1)=="_" && !columnsDict.hasOwnProperty(d)){
        return true;
      }
      return false;
    });

    var tableTitle = tables.select("div.table-title")
    tableTitle.selectAll("span").remove();
    var text = texts[item+"attributes"];
    if(!text){
      text = texts["elementsattributes"];
    }
    tableTitle.append("span").text(text)
    if(onlySelectedData){
      tableTitle.append("span").text(" ("+selectedData.length+" "+texts.outof+" "+currentData.length+")")
    }
    tables.select(".table-pagination").remove();
    tableContainer.selectAll("table, p").remove();
    if(selectedData.length==0){
      var text = texts["no"+item+"selected"];
      if(!text){
        text = texts["noelementsselected"];
      }
      tableContainer.append("p").text(text);
    }else{
      var cellheight = parseInt(tables.style("line-height")) + 9;
      pagelength = Math.floor(tableContainer.node().offsetHeight / cellheight) - 2;
      if(selectedData.length>pagelength){
        pagination = 1;
        paginationDiv = tables.append("center").attr("class","table-pagination");
        paginationDiv.append("button").text("<<").on("click",function(){
          pagination = 1;
          drawTable();
        });
        paginationDiv.append("button").text("<").on("click",function(){
          if(pagination > 1){
            pagination = pagination - 1;
            drawTable();
          }
        });
        paginationDiv.append("button").text(">").on("click",function(){
          if(pagination < Math.ceil(selectedData.length / pagelength)){
            pagination = pagination + 1;
            drawTable();
          }
        });
        paginationDiv.append("button").text(">>").on("click",function(){
          pagination = Math.ceil(selectedData.length / pagelength);
          drawTable();
        });
      }
      table = tableContainer.append("table");
      table.on("mousedown", function(){ d3.event.stopPropagation(); })
      drawHeader();
      var tbody = table.append("tbody");
      drawTable();
    }

    if(update){
      update();
    }
  }

  function drawTable(){
    var tbody = table.select("tbody");
    tbody.selectAll("tr").remove();
    var start = 0,
        stop = selectedData.length;
    if(pagination){
      stop = pagelength * pagination;
      start = pagelength * (pagination-1);
      if(stop>selectedData.length){
        stop = selectedData.length
      }
    }
    for(var i=start; i<stop; i++){
      var d = selectedData[i],
          tr = tbody.append("tr")
        .datum(d.index)
        .classed("selected",function(dd){
          return currentData[dd]._selected;
        });
      if(id && columns.indexOf(id)!=-1){
        tr.attr("rowname",d[id]);
      }
      columns.forEach(function(col,i){
          if(columnHidden[i]){
            return false;
          }
          var txt = renderCell(d,col);
          tr.append("td")
              .classed("text-right",rightAlign[i] ? true : false)
              .on("mousedown",function(){ d3.event.preventDefault(); })
              .append("div")
                .attr("title",txt ? txt : null)
                .html(!txt ? "&nbsp;" : txt)
      });
      tr.on("click",function(origin){
          var selections = false,
              rowIndex = this.rowIndex-1;
          if(d3.event.shiftKey && last!=-1){
            selections = d3.range(Math.min(last,rowIndex),Math.max(last,rowIndex)+1);
          }
          tbody.selectAll("tr").classed("selected", function(d,i){
            var selected = d3.select(this).classed("selected");
            if(selections){
              if(d3.event.ctrlKey || d3.event.metaKey){
                selected = selected || selections.indexOf(i)!=-1;
              }else{
                selected = selections.indexOf(i)!=-1;
              }
            }else{
              if(d3.event.ctrlKey || d3.event.metaKey){
                selected = selected ^ d == origin;
              }else{
                selected = d == origin;
                if(selectAction){
                  selectAction(currentData[origin]);
                }
              }
            }
            currentData[d]._selected = selected;                
            return selected;
          })

          if(update){
            update();
          }

          last = d3.select(this).classed("selected") ? rowIndex : -1;
        });
    }
    computeColumnWidth();
  }

  function drawHeader() {
        var thead = table.append("thead").append("tr"),
            desc0 = columns.map(function(){ return false; }),
            desc = desc0.slice();
        columns.forEach(function(d,i){
          var visibleName = d;
          if(columnsDict.hasOwnProperty(d)){
            visibleName = columnsDict[d];
          }
          if(columnHidden[i]){
            return false;
          }
          var sort1 = function(a,b){
                if(a[d]==null) return 1;
                if(b[d]==null) return -1;
                return compareFunction(a[d],b[d],desc[i]);
              };
          thead.append("th")
            .attr("class","sorting"+(rightAlign[i] ? " text-right" : ""))
            .on("click",function(){
              selectedData.sort(sort1);
              var desci = desc[i];
              desc = desc0.slice();
              thead.selectAll("th").classed("sorting",true)
                .classed("sorting_desc",false)
                .classed("sorting_asc",false);
              desc[i] = !desci;
              d3.select(this)
                .classed("sorting_desc",desci)
                .classed("sorting_asc",!desci);
              drawTable();
            })
            .append("div")
              .attr("title",visibleName)
              .text(visibleName)
        });
  }

  function computeColumnWidth(){
    var thead = table.select("thead"),
        tbody = table.select("tbody");

    if(!columnwidths.length){
      var maxwidth = Math.max(table.node().offsetWidth / thead.selectAll("tr > th").size(),300);
      thead.selectAll("tr > th").each(function(d,i){
        columnwidths[i] = Math.min(this.offsetWidth,maxwidth);
      });
      tbody.selectAll("tr").each(function(){
        d3.select(this).selectAll("td").each(function(d,i){
          var w = Math.min(this.offsetWidth+10,maxwidth);
          if(w > columnwidths[i]){
            columnwidths[i] = w;
          }
        });
      })
    }

    thead.selectAll("tr > th > div").style("width",function(d,i){
      return columnwidths[i]+"px";
    });
    tbody.selectAll("tr").each(function(){
      d3.select(this).selectAll("td > div").style("width",function(d,i){
        return columnwidths[i]+"px";
      });
    })
  }

  exports.data = function(x){
    if (!arguments.length) return currentData;
    currentData = x;
    return exports;
  }

  exports.columns = function(x){
    if (!arguments.length) return columns;
    columns = x;
    return exports;
  }

  exports.item = function(x){
    if (!arguments.length) return item;
    item = x;
    return exports;
  }

  exports.update = function(x){
    if (!arguments.length) return update;
    update = x;
    return exports;
  }

  exports.selectAction = function(x){
    if (!arguments.length) return selectAction;
    selectAction = x;
    return exports;
  }

  exports.renderCell = function(x){
    if (!arguments.length) return renderCell;
    renderCell = x;
    return exports;
  }

  exports.onlySelectedData = function(x){
    if (!arguments.length) return onlySelectedData;
    onlySelectedData = x ? true : false;
    return exports;
  }

  exports.id = function(x){
    if (!arguments.length) return id;
    id = x;
    return exports;
  }

  exports.columnsDict = function(x){
    if (!arguments.length) return columnsDict;
    columnsDict = x;
    return exports;
  }

  return exports;
}

function defaultColorManagement(defaultColor){
    if(defaultColor){
      if(Array.isArray(defaultColor)){
        colorScales['custom1'] = defaultColor.slice(0,3);
        defaultColor.reverse();
        colorScales['custom2'] = defaultColor.slice(0,3);
        defaultColor.reverse();
        return defaultColor[0];
      }
      return defaultColor;
    }
    return categoryColors[0];
}

function multiGraphSelect(sel,current,items){
    if(typeof items == "string"){
      items = [items];
    }
    sel = sel.append("div").attr("class","multi-select")
    var select = sel.append("select")
    select.selectAll("option")
      .data(items)
      .enter().append("option")
        .property("value",function(d,i){ return i; })
        .text(function(d){ return d; })
        .each(function(d,i){
          if(i==current){
            this.selected = true; 
          }
        })
    select.on("change",function(){ window.location.href = "../../index.html?"+this.value; })
    sel.append("img")
        .attr("src",b64Icons.menu)
    sel.append("span")
      .html(items[current])

    d3.select("body").on("keydown.multishortcut",function(){
      if((d3.event.ctrlKey || d3.event.metaKey) && d3.event.shiftKey){
        var key = getKey(d3.event);
        switch(key){
          case "ArrowUp":
          case "ArrowDown":
            var idx = select.node().selectedIndex;
            idx = (key=="ArrowUp"?idx-1:idx+1);
            if(idx<0){
              idx = items.length-1;
            }
            if(idx>=items.length){
              idx = 0;
            }
            window.location.href = "../../index.html?"+idx;
            return;
        }
      }
    });
}

function tooltipTemplateAutoColor(tooltip,color){
  var h2 = tooltip.select(".tooltip > .info-template > h2.auto-color");
  if(!h2.empty()){
    h2.style("background-color",color);
    h2.style("color",d3.hsl(color).l > 0.75 ? basicColors.black : basicColors.white);
  }
}

function panelTemplateAutoColor(body,getColor){
    var panelTemplate = body.select(".panel-template.auto-color");
    if(!panelTemplate.empty()){
      var color = getColor(panelTemplate.datum());
      var h2 = panelTemplate.select(".panel-template > h2");
      if(panelTemplate.classed("mode-1")){
        panelTemplate.style("background-color",color);
      }else if(panelTemplate.classed("mode-2")){
        h2.style("background-color",color);
      }
      h2.style("color",d3.hsl(color).l > 0.75 ? basicColors.black : basicColors.white);
    }
}

function transposeNodes(Graphnodes,nodenames,options){
  var splitMultiVariable = function(d){
      for(var p in d) {
        if(p!=options.nodeName && p!=options.nodeText && p!=options.nodeInfo){
          if(typeof d[p] == "string" && d[p].indexOf("|")!=-1){
            d[p] = d[p].split("|").filter(function(d){ return d; }).map(function(d){ return isNaN(+d) ? d : +d; });
          }
        }
      }
  }

  var nodes = [],
      len = Graphnodes[0].length;
  for(var i = 0; i<len; i++){
      var node = {};
      nodenames.forEach(function(d,j){
        node[d] = Graphnodes[j][i];
      })
      splitMultiVariable(node);
      node[options.nodeName] = String(node[options.nodeName]);
      nodes.push(node);
  }
  return nodes;
}

function getSelectOptions(order,Graph,Tree){
    return Graph.nodenames.filter(function(d){
          if(d.substring(0,1)=="_"){
            return false;
          }
          if(d==Graph.options.nodeName){
            return true;
          }
          if(Graph.options.imageItems && d==Graph.options.imageItems){
            return false;
          }
          if((d==Graph.options.nodeText || d==Graph.options.nodeInfo) && d!=Graph.options.nodeLabel){
            return false;
          }
          if(Tree && Tree.typeFilter && Graph.options.nodeNamesByType && (!Graph.options.nodeNamesByType.hasOwnProperty(Tree.typeFilter) || Graph.options.nodeNamesByType[Tree.typeFilter].indexOf(d)==-1) && d!=Graph.options.nodeType){
            return false;
          }
          return true;
        })
        .sort(order ? order : function(){ return 0; });
}
