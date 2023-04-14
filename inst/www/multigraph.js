window.onload = function(){
  var data = JSON.parse(document.getElementById("data").textContent);

  if(typeof data.options.names == "string"){
    data.options.names = [data.options.names];
    if(data.options.external){
      data.options.external = [data.options.external];
    }
  }

  var input = window.location.search,
      idx = 0;
  if(input!=""){
    idx = parseInt(input.substring(1));
    if(isNaN(idx) || idx>=data.options.names.length){
      idx = 0;
    }
  }

  if(data.options.external && data.options.external[idx]){
      document.body.parentNode.style.height = "100%";
      document.body.style.display = "flex";
      document.body.style.flexDirection = "column";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.fontSize = "10px";
      document.body.style.fontFamily = "sans-serif";

      var topbar = document.createElement("div");
      topbar.style.backgroundColor = "#ffffff";
      topbar.style.padding = "6px 12px";
      document.body.appendChild(topbar);

    var sel = document.createElement("div");
    sel.classList.add("multi-select");
    topbar.appendChild(sel);

    var multiSelect = document.createElement("select");
    sel.appendChild(multiSelect);
    data.options.names.forEach(function(item,i){
      var option = document.createElement("option");
      option.textContent = item;
      option.value = i;
      if(i==idx){
        option.selected = true;
      }
      multiSelect.appendChild(option);
    });
    multiSelect.addEventListener("change",function(){
      window.location.href = "index.html?"+this.value;
    });

    var img = document.createElement("img");
    img.src = "data:image/svg+xml;base64,"+btoa('<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path fill="#2F7BEE" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>');
    sel.appendChild(img);

    var span = document.createElement("span");
    span.textContent = data.options.names[idx];
    sel.appendChild(span);

    var style = document.createElement("style");
    style.innerHTML = 
    ".multi-select { display: inline-block; position: relative; }"+
    ".multi-select > img { vertical-align: text-bottom; margin-bottom: -2px; }"+
    ".multi-select > span { font-weight: bold; font-size: 1.6em; margin-left: 10px; }"+
    ".multi-select > select { position: absolute; width: 100%; opacity: 0; cursor: pointer; }";
    document.head.appendChild(style);

      var iframe = document.createElement("iframe");
      iframe.src = "data/"+idx+"/index.html";
      iframe.style.flexGrow = 1;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.setAttribute("frameborder",0);
      iframe.setAttribute("marginwidth",0);
      iframe.setAttribute("marginheight",0);
      document.body.appendChild(iframe);

    document.body.onkeydown = function(event){
      if((event.ctrlKey || event.metaKey) && event.shiftKey){
        var step = 0;
        if((event.key && event.key=="ArrowUp") || ((event.which || event.keyCode) == 38)){
          step = -1;
        }else if((event.key && event.key=="ArrowDown") || ((event.which || event.keyCode) == 40)){
          step = 1;
        }
        if(step){
            var current = multiSelect.selectedIndex + step;
            if(current<0){
              current = data.options.names.length-1;
            }
            if(current>=data.options.names.length){
              current = 0;
            }
            window.location.href = "index.html?"+current;
            return;
        }
      }
    }
  }else{
      window.location.href = "data/"+idx+"/index.html";
  }
}


