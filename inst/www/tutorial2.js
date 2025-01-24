function tutorialTour(options){
  var dim = viewport();
  var panelOffset = 82; // both paddings + both borders
  var body = d3.select(document.body);
  body.select("body > .tutorial").remove();
  var topbar = body.select("body > .topbar");

  var maxtop = topbar.node().getBoundingClientRect().height,
      tutorialWidth = 690;

  var tutorial = body.append("div")
    .attr("class","tutorial")
    .style("width",(tutorialWidth-80)+"px")

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
      tutorial.remove();
      tutorial2.remove();
      tutorialArrow.remove();
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
    .style("width",(dim.width/2-panelOffset)+"px")

  // intro
  steps.push(function(){
    tutorial.style("top",(dim.height/4)+"px")
    tutorial.style("left",((dim.width-tutorialWidth)/2)+"px")
    tutorialContent.selectAll("*").remove()
    if(options.tutorial.image){
      tutorialContent.append("img")
        .attr("src",options.tutorial.image)
        .style("height","60px")
    }
    tutorialContent.append("h3").text(tutorial_texts['elementsgallery'])
    tutorialContent.append("p").html(tutorial_texts['beforestarting'])
    tutorialArrow.style("display","none")
    tutorial2.style("display","none")
  });

  // description
  if(options.tutorial.description){
    steps.push(function(){
      tutorial.style("top",(dim.height/4)+"px")
      tutorial.style("left",((dim.width-tutorialWidth)/2)+"px")
      tutorialContent.selectAll("*").remove()

      tutorialContent.append("p").html(tutorial_texts['mainpage'])
      tutorialContent.append("p").html(options.tutorial.description)
      tutorialContent.append("p").html(tutorial_texts['eachfigure'])

      tutorialArrow.style("display","none")
      tutorial2.style("display","none")
    });
  }

  // actions
  if(options.nodeText){
    steps.push(function(){
      tutorial.style("top",(dim.height/4)+"px")
      tutorial.style("left",((dim.width-tutorialWidth)/2)+"px")
      tutorialContent.selectAll("*").remove()

      if(options.nodeText){
        tutorialContent.append("p").html(tutorial_texts['hoveringthemouse']);
      }
      tutorialArrow.style("display","none")
      tutorial2.style("display","none")
    });
  }

  // search
  if(topbar.select(".multi-search > .search-box").node().offsetWidth){
    steps.push(function(){
      var searchDim = topbar.select(".multi-search > .search-box").node().getBoundingClientRect();
      tutorial.style("left",(dim.width-tutorialWidth-80)+"px")
      tutorial.style("top",(maxtop+10)+"px")
      tutorialContent.selectAll("*").remove()
      tutorialContent.append("p").html(tutorial_texts['tofindaspecificelement'])
      tutorialContent.append("p").html(tutorial_texts['todomultiplesearches'])

      tutorialArrow.style("display",null)
        .style("left",(searchDim.left+(searchDim.width/2))+"px")
        .style("top",(maxtop-40)+"px")

      tutorial2.style("display","none")
    });
  }

  // filter
  var topFilter = topbar.select(".topbar-button.filter-button");
  if(!topFilter.empty() && topFilter.node().offsetWidth){
    steps.push(function(){
      var filterDim = topFilter.node().getBoundingClientRect();
      tutorialContent.selectAll("*").remove()
      tutorialArrow.style("display",null)
        .style("transform",null)
        .style("margin-left",null)
        .style("left",(filterDim.left+(filterDim.width/2))+"px")
        .style("top",(maxtop-40)+"px")
      var left = Math.max(60,filterDim.left);
      if(left + (dim.width/2) > dim.width){
        left = dim.width/2 - 30;
      }
      tutorial.style("left",left+"px")
      tutorial.style("top",(maxtop+10)+"px")
      tutorialContent.append("p").html(tutorial_texts['figurescanalsobefiltered'])
    });
  }

  // topbar icons
  var xlsxButton = topbar.select(".topbar-button.excel-export");
  if(!xlsxButton.empty()){
    steps.push(function(){
      var xlsxButtonSize = xlsxButton.node().getBoundingClientRect();

      tutorialContent.selectAll("*").remove()
      tutorial.style("top",(maxtop+10)+"px")
      tutorial.style("left",((dim.width-tutorialWidth)/2)+"px")
      tutorialContent.append("p").html(tutorial_texts['otherfunctions'])

      tutorialArrow.style("display",null)
      .style("transform",null)
      .style("margin-left",null)
      .style("left",(xlsxButtonSize.left + (xlsxButtonSize.width/2))+"px")
      .style("top",(maxtop-40)+"px")
    });
  }

  // multigraph
  if(!topbar.select(".multi-select").empty()){
    steps.push(function(){
      tutorialContent.selectAll("*").remove()
      var multigraphDim = topbar.select(".multi-select").node().getBoundingClientRect();
      tutorial.style("top",(maxtop+10)+"px")
      tutorial.style("left",multigraphDim.left+"px")
      tutorialContent.append("p").html(tutorial_texts['inadditiontothismainpage'])
      tutorialContent.append("p").html(tutorial_texts['tonavigatefromonetabtoanother'])

      tutorialArrow.style("display",null)
        .style("left",(multigraphDim.left+(multigraphDim.width/2))+"px")
        .style("top",(maxtop-40)+"px") 

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
      var multigraphDim = topbar.select(".topbar-button.multipages-home").node().getBoundingClientRect();
      tutorial.style("top",(maxtop+10)+"px")
      tutorial.style("left",multigraphDim.left+"px")
      tutorialContent.append("p").html(tutorial_texts['inadditiontothispage'])
      tutorialContent.append("p").html(tutorial_texts['tonavigatefromonetoanother'])

      tutorialArrow.style("display",null)
        .style("left",(multigraphDim.left+(multigraphDim.width/2))+"px")
        .style("top",(maxtop-40)+"px")
      tutorial2.style("display","none")
    });
  }

  go2step(0);

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

