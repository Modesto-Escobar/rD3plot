function tutorialTour(options){
  var dim = viewport();
  var panelOffset = 82; // both paddings + both borders
  var body = d3.select(document.body);
  body.select("body > .tutorial").remove();
  var topbar = body.select(".gallery-box > .topbar");
  topbar.select(".topbar-icons > .tutorial-icon").remove();

  var maxtop = topbar.node().getBoundingClientRect().height;

  var tutorial = body.append("div")
    .attr("class","tutorial")
    .style("top",(dim.height/4)+"px")
    .style("left",(dim.width/4)+"px")
    .style("width",(dim.width/2-panelOffset)+"px")

  var count = 0;
  var steps = [];

  var tutorialContent = tutorial.append("div").attr("class","tutorial-content")

  var tutorialButtons = tutorial.append("div").attr("class","tutorial-buttons")
  tutorialButtons.append("button")
    .attr("class","primary prev")
    .text("<<")
    .on("click",function(){
      if(count>0){
        count--;
        go2step(count);
      }
    })
  tutorialButtons.append("button")
    .attr("class","primary skip")
    .on("click",function(){
      tutorial_menu();
    })
  tutorialButtons.append("button")
    .attr("class","primary next")
    .text(">>")
    .on("click",function(){
      if(count<steps.length){
        count++;
        go2step(count);
      }
    })

  var tutorialArrow = body.append("div")
      .attr("class","tutorial-arrow")
      .style("display","none")

  var tutorial2 = body.append("div")
    .attr("class","tutorial")
    .style("display","none")
    .style("width",(dim.width/3-panelOffset)+"px")

  // intro
  steps.push(function(){
    tutorialContent.selectAll("*").remove()
    if(options.tutorial.image){
      tutorialContent.append("img")
        .attr("src",options.tutorial.image)
        .style("height","60px")
    }
    tutorialContent.append("h3").text(tutorial_texts['elementsgallery'])
    tutorialContent.append("p").html(tutorial_texts['beforestarting'])
  });

  // description
  steps.push(function(){
    tutorial.style("top",(dim.height/4)+"px")
    tutorial.style("left",(dim.width/4)+"px")
    tutorialContent.selectAll("*").remove()

    tutorialContent.append("p").html(tutorial_texts['mainpage'])
    tutorialContent.append("p").html(options.tutorial.description ? options.tutorial.description : tutorial_texts['collectionofelements'])
    tutorialContent.append("p").html(tutorial_texts['eachfigure'])

    tutorialArrow.style("display","none")
    tutorial2.style("display","none")
  });

  // actions
  if(options.nodeText || options.nodeInfo){
    steps.push(function(){
      tutorial.style("top",(dim.height/4)+"px")
      tutorial.style("left",(dim.width/4)+"px")
      tutorialContent.selectAll("*").remove()

      if(options.nodeText){
        tutorialContent.append("p").html(tutorial_texts['hoveringthemouse']);
      }
      if(options.nodeInfo){
        tutorialContent.append("p").html(tutorial_texts['whenclicking']);
      }
      tutorialArrow.style("display","none")
      tutorial2.style("display","none")
    });
  }

  // search
  if(topbar.select(".multi-search > .search-box").node().offsetWidth){
    steps.push(function(){
      var searchDim = topbar.select(".multi-search > .search-box").node().getBoundingClientRect();
      tutorial.style("left",Math.max(60,searchDim.left)+"px")
      tutorial.style("top",(maxtop+30)+"px")
      tutorialContent.selectAll("*").remove()
      tutorialContent.append("p").html(tutorial_texts['tofindaspecificelement'])
      tutorialContent.append("p").html(tutorial_texts['todomultiplesearches'])

      tutorialArrow.style("display",null)
        .style("left",(searchDim.left+(searchDim.width/2))+"px")
        .style("top",(maxtop-10)+"px")

      tutorial2.style("display","none")
    });
  }

  // filter
  if(topbar.select("h3.top-filter").node().offsetWidth){
    steps.push(function(){
      var filterDim = topbar.select("h3.top-filter").node().getBoundingClientRect();
      tutorialContent.selectAll("*").remove()
      tutorialArrow.style("display",null)
        .style("transform",null)
        .style("margin-left",null)
        .style("left",(filterDim.left+(filterDim.width/2))+"px")
        .style("top",(maxtop-10)+"px")
      var left = Math.max(60,filterDim.left);
      if(left + (dim.width/2) > dim.width){
        left = dim.width/2 - 30;
      }
      tutorial.style("left",left+"px")
      tutorial.style("top",(maxtop+30)+"px")
      tutorialContent.append("p").html(tutorial_texts['figurescanalsobefiltered'])

      tutorial2.selectAll("*").remove()
      tutorial2.style("display",null)
      tutorial2.style("top",(tutorial.node().getBoundingClientRect().bottom+30)+"px")
      tutorial2.style("left",left+"px")
      var div = tutorial2.append("div")
        .attr("class","img-and-text");
      var img = div.append("div");
      img.append("h2").text(texts.Variable);
      var options = img.append("div").attr("class","filter-options");
      [1,2,3].forEach(function(d){
        var item = options.append("div").attr("class","legend-item");
        item.append("div").attr("class","legend-check-box");
        item.append("span").text(texts.Value + " " + d);
      });
      img.append("center").append("button").attr("class","primary").text("Apply");
      div.append("p").html(tutorial_texts['checkingtheboxes'])
      div.append("p").html(tutorial_texts['toremovethefilter'])
      div.append("center")
        .style("pointer-events","none")
        .html('<div class="filter-tags"><div class="tag">Variable</div></div>')
    });
  }

  // legend
  var legends = body.select(".legend-panel > .legends");
  if(!legends.empty() && legends.node().offsetWidth){
    steps.push(function(){
      var legendDim = legends.node().getBoundingClientRect();
      tutorialContent.selectAll("*").remove()
      tutorialContent.append("p").html(tutorial_texts['legend_p1'])

      var tutorialDim = tutorial.node().getBoundingClientRect();
      tutorial.style("left",(dim.width-tutorialDim.width-legendDim.width-80)+"px")
      tutorial.style("top",(maxtop+30)+"px")

      tutorialArrow.style("display",null)
        .style("transform","rotate(90deg)")
        .style("margin-left",0)
        .style("left",(dim.width-legendDim.width-80)+"px")
        .style("top",(maxtop+60)+"px")

      tutorial2.style("display","none")
    });
  }

  // topbar icons
  if(!topbar.selectAll(".topbar-icons > img.icon").empty()){
    steps.push(function(){
    var min = Infinity, max = -Infinity;
    topbar.selectAll(".topbar-icons > img").each(function(){
      min = Math.min(min,this.getBoundingClientRect().left);
      max = Math.max(max,this.getBoundingClientRect().right);
    })
    var left = (min + max) / 2;

    tutorialContent.selectAll("*").remove()
    tutorial.style("top",(maxtop+30)+"px")
    tutorial.style("left",(dim.width/2 - 30)+"px")
    tutorialContent.append("p").html('<span class="highlight">'+tutorial_texts['otherfunctions']+':</span>')
    var ul = tutorialContent.append("ul")
               .attr("class","ul-table")
    if(!topbar.select(".topbar-icons > img.icon[alt=freq]").empty()){
      ul.append("li").html('<span>'+tutorial_texts['statisticalgraphs']+'</span><span><img src="'+b64Icons.chart+'"/></span>')
    }
    if(!topbar.select(".topbar-icons > img.icon[alt=table]").empty()){
      ul.append("li").html('<span>'+tutorial_texts['informativetables']+'</span><span><img src="'+b64Icons.table+'"/></span>')
    }
    if(!topbar.select(".topbar-icons > img.icon[alt=pdf]").empty()){
      ul.append("li").html('<span>'+tutorial_texts['graphexport']+'</span><span><img src="'+b64Icons.pdf+'"/></span>')
    }

    tutorialArrow.style("display",null)
      .style("transform",null)
      .style("margin-left",null)
      .style("left",left+"px")
      .style("top",(maxtop-10)+"px")

    tutorial2.selectAll("*").remove()
    tutorial2.style("display",null)
    tutorial2.append("span").html(tutorial_texts['zoomcontrol'])
    var tutorial2Dim = tutorial2.node().getBoundingClientRect();
    tutorial2.style("top",(dim.height-tutorial2Dim.height-43)+"px")
    tutorial2.style("left",(dim.width-tutorial2Dim.width-120)+"px")
    tutorial2.append("div")
      .attr("class","tutorial-arrow")
      .style("transform","rotate(90deg)")
      .style("margin-left",0)
      .style("left",tutorial2Dim.width+"px")
      .style("top",((tutorial2Dim.height/2)-30)+"px")
    });
  }

  // multigraph
  if(!topbar.select(".multi-select").empty()){
    steps.push(function(){
      tutorialContent.selectAll("*").remove()
      var multigraphDim = topbar.select(".multi-select").node().getBoundingClientRect();
      tutorial.style("top",(maxtop+30)+"px")
      tutorial.style("left",multigraphDim.left+"px")
      tutorialContent.append("p").html(tutorial_texts['inadditiontothismainpage'])
      tutorialContent.append("p").html(tutorial_texts['tonavigatefromonetabtoanother'])

      tutorialArrow.style("display",null)
        .style("left",(multigraphDim.left+(multigraphDim.width/2))+"px")
        .style("top",(maxtop-10)+"px") 

      tutorial2.selectAll("*").remove()
      tutorial2.style("display",null)
      tutorial2.style("top",(tutorial.node().getBoundingClientRect().bottom+30)+"px")
      tutorial2.style("left",multigraphDim.left+"px")
      var div = tutorial2.append("div")
        .attr("class","img-and-text")
      var img = div.append("div"),
          multiselect = img.append("div").attr("class","multi-select");
      multiselect.append("img").attr("src",b64Icons.menu)
      multiselect.append("span").text(texts.graph + " 1")
      var dropdown = img.append("div").attr("class","dropdown");
      [1,2,3].forEach(function(d){
        var option = dropdown.append("div").text(texts.graph + " " + d);
      });
      div.append("p").html(tutorial_texts['inthismenuyoucanselect'])
      div.append("p").html(tutorial_texts['movefromonetoanother'])
    });
  }

  // multipages
  if(options.multipages){
    steps.push(function(){
      tutorialContent.selectAll("*").remove()
      var multigraphDim = topbar.select(".primary.home").node().getBoundingClientRect();
      tutorial.style("top",(maxtop+30)+"px")
      tutorial.style("left",multigraphDim.left+"px")
      tutorialContent.append("p").html(tutorial_texts['inadditiontothispage'])
      tutorialContent.append("p").html(tutorial_texts['tonavigatefromonetoanother'])

      tutorialArrow.style("display",null)
        .style("left",(multigraphDim.left+(multigraphDim.width/2))+"px")
        .style("top",(maxtop-10)+"px")
      tutorial2.style("display","none")
    });
  }

  go2step(0);

  function tutorial_menu(){
    tutorial.remove();
    tutorial2.remove();
    tutorialArrow.remove();
    topbar.select(".topbar-icons").append("div")
      .attr("class","tutorial-icon")
      .on("click",function(){
        tutorial = body.select("body > .tutorial");
        if(tutorial.empty()){
          tutorial = body.append("div")
          .attr("class","tutorial")
          .style("top",60+"px")
          .style("right",60+"px")
          .style("width",240+"px")
          tutorial.append("p").text(tutorial_texts['hello'])
          tutorial.append("p").text(tutorial_texts['doyouneedhelp'])
          tutorial
          .append("button")
            .attr("class","primary")
            .style("width","100%")
            .text(tutorial_texts['seethetutorials'])
            .on("click",function(){
              tutorialTour(options)
            })
          tutorial.append("p")
        }else{
          tutorial.remove();
        }
      })
  }

  function updateButtons(c,l){
    if(c){
      tutorialButtons.select(".prev").style("visibility",null);
    }else{
      tutorialButtons.select(".prev").style("visibility","hidden");
    }
    if(c==(l-1)){
      tutorialButtons.select(".skip").text(tutorial_texts['closetutorial']).style("float","right");
      tutorialButtons.select(".next").style("display","none");
    }else{
      tutorialButtons.select(".skip").text(tutorial_texts['skiptutorial']).style("float",null);
      tutorialButtons.select(".next").style("display",null);
    }
  }

  function go2step(i){
    steps[i]();
    updateButtons(i,steps.length);
  }
}

