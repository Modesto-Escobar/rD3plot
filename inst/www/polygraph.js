window.onload = function(){
  var body = document.querySelector('body'),
      vp = viewport(),
      width = vp.width,
      height = vp.height;

  var data = JSON.parse(document.getElementById('data').textContent);
  var mfrow = data.options.mfrow;

  width = width/mfrow[1];
  height = height/mfrow[0];

  for(var i=0; i<mfrow[0]; i++){
    for(var j=0; j<mfrow[1]; j++){
      var iframe = document.createElement("iframe");

      iframe.setAttribute("src","multiGraph/index.html?"+((i*mfrow[1])+j));
      iframe.setAttribute("width",width);
      iframe.setAttribute("height",height);
      iframe.setAttribute("frameborder",0);
      iframe.setAttribute("marginwidth",0);
      iframe.setAttribute("marginheight",0);
      iframe.style.display = "block";
      iframe.style.position = "absolute";
      iframe.style.top = i*height+"px";
      iframe.style.left = j*width+"px";

      body.appendChild(iframe);
    }
  }
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
