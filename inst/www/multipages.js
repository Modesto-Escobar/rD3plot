window.onload = function(){
  var data = JSON.parse(document.getElementById("data").textContent);

  if(typeof data.options.names == "string"){
    data.options.names = [data.options.names];
    if(data.options.images){
      data.options.images = [data.options.images];
    }
    if(data.options.descriptions){
      data.options.descriptions = [data.options.descriptions];
    }
    if(data.options.external){
      data.options.external = [data.options.external];
    }
  }

  document.body.style.fontSize = (10*data.options.cex)+"px";

  var idx = window.location.search;
  if(idx){
    idx = idx.substring(1);
    if(!isNaN(idx)){
      idx = parseInt(idx);

      document.body.parentNode.style.height = "100%";
      document.body.style.display = "flex";
      document.body.style.flexDirection = "column";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.backgroundColor = "#ffffff";

      var topbar = document.createElement("div");
      topbar.style.backgroundColor = "#ffffff";
      topbar.style.padding = "6px 12px";
      document.body.appendChild(topbar);

      var home = document.createElement("a");
      home.href = "index.html";
      topbar.appendChild(home);

      var button = document.createElement("button");
      button.textContent = "home";
      button.style.lineHeight = "1.2";
      button.style.fontSize = "100%";
      button.style.borderRadius = "3px";
      button.style.padding = "4px 8px";
      button.style.appearance = "none";
      button.style.backgroundColor = "#2f7bee";
      button.style.border = "none";
      button.style.margin = "0 2px";
      button.style.overflow = "hidden";
      button.style.color = "transparent";
      button.style.width = "2.2em";
      button.style.backgroundRepeat = "no-repeat";
      button.style.backgroundPosition = "center";
      button.style.backgroundImage = "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMTYiIHdpZHRoPSIxNiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNiAxOWgzdi02aDZ2Nmgzdi05bC02LTQuNUw2IDEwWm0tMiAyVjlsOC02IDggNnYxMmgtN3YtNmgtMnY2Wm04LTguNzVaIi8+PC9zdmc+)";
      home.appendChild(button);

      var span = document.createElement("span");
      span.textContent = data.options.names[idx];
      span.style.marginLeft = "1em";
      topbar.appendChild(span);

      var iframe = document.createElement("iframe");
      iframe.src = "pages/"+(data.options.names[idx])+"/index.html";
      iframe.style.flexGrow = 1;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.setAttribute("frameborder",0);
      iframe.setAttribute("marginwidth",0);
      iframe.setAttribute("marginheight",0);
      document.body.appendChild(iframe);
    }
    return;
  }

  var section = document.createElement("section");
  document.body.appendChild(section);
  
  var container = document.createElement("div");
  container.classList.add("container");
  container.classList.add("px-4");
  section.appendChild(container);
  
  var row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("justify-content-center");
  container.appendChild(row);

  var col = document.createElement("div");
  col.classList.add("col-lg-8");
  row.appendChild(col);

  var h2 = document.createElement("h2");
  col.appendChild(h2);

  var center = document.createElement("center");
  center.textContent = data.options.title;
  h2.appendChild(center);

  if(data.options.description){
    var p = document.createElement("p");
    p.classList.add("description");
    p.innerHTML = data.options.description;
    var center = document.createElement("center");
    center.appendChild(p);
    col.appendChild(center);
  }

  var boxcontainer = document.createElement("div");
  boxcontainer.classList.add("s-box-container");
  boxcontainer.classList.add("justify-content-center");
  if(data.options.columns){
    boxcontainer.style.gridTemplateColumns = "repeat("+parseInt(data.options.columns)+", auto)";
  }
  col.appendChild(boxcontainer);

  data.options.names.forEach(function(n,i){
    var box = document.createElement("div");
    box.classList.add("s-box");
    boxcontainer.appendChild(box);

    var a = document.createElement("a");
    if(data.options.external && data.options.external[i]){
      a.href = "index.html?"+i;
    }else{
      a.href = "pages/"+n+"/index.html";
    }
    box.appendChild(a);

    var bar = document.createElement("div");
    bar.classList.add("bar");
    a.appendChild(bar);

    var img = document.createElement("img");
    img.alt = n;
    img.src = (data.options.images && data.options.images[i]) ? data.options.images[i] : "data:image/svg+xml;base64,"+btoa('<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" version="1.1" viewBox="0 0 75 75"><rect width="75" height="75" fill="#777777" /></svg>');
    a.appendChild(img);

    var h1 = document.createElement("h1");
    h1.textContent = n;
    a.appendChild(h1);

    if(data.options.descriptions && data.options.descriptions[i]){
      var p = document.createElement("p");
      p.innerHTML = data.options.descriptions[i];
      box.appendChild(p);
    }

    if(data.options.imgsize){
      img.style.height = data.options.imgsize+"px";
      if(data.options.imgsize>200){
        box.style.width = (data.options.imgsize+100)+"px";
        box.style.height = (data.options.imgsize+100)+"px";
      }
    }
  });

  if(data.options.note){
    var note = document.createElement("div");
    note.style.position = "fixed";
    note.style.bottom = 0;
    note.style.left = 0;
    note.style.right = 0;
    note.style.padding = "1em";
    note.style.backgroundColor = "#ffffff";
    note.innerHTML = data.options.note;
    document.body.appendChild(note);
  }
}
