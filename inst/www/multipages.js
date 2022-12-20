window.onload = function(){
  var data = JSON.parse(document.getElementById("data").textContent);

  if(typeof data.options.names == "string"){
    data.options.names = [data.options.names];
    if(data.options.images){
      data.options.images = [data.options.images];
    }
  }

  document.body.style.fontSize = (10*data.options.cex)+"px";

  var section = document.createElement("section");
  document.body.appendChild(section);
  
  var container = document.createElement("div");
  container.classList.add("container");
  container.classList.add("px-4");
  section.appendChild(container);
  
  var row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("justify-content-center");
  section.appendChild(row);

  var col = document.createElement("div");
  col.classList.add("col-lg-8");
  row.appendChild(col);

  var h2 = document.createElement("h2");
  col.appendChild(h2);

  var center = document.createElement("center");
  center.textContent = data.options.title;
  h2.appendChild(center);

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
    a.href = "pages/"+n+"/index.html";
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
  });
}
