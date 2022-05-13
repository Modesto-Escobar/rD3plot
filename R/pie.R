pieJSON <- function(pie){
  return(toJSON(list(data=pie$data,labels=pie$labels,colors=pie$colors,options=pie$options)))
}

pieCreate <- function(pie, dir){
  language <- getLanguageScript(pie)
  createHTML(dir, c("reset.css","styles.css"), c("d3.min.js","images.js","colorScales.js","functions.js",language,"pie.js"), pieJSON(pie))
}

pie_rd3 <- function(x, labels = NULL, colors = NULL, dir = NULL){
  pielist <- list(data = x)
  if(!is.null(labels)){
    if(length(labels)!=length(x)){
      warning("labels: length not matchig with 'x'")
    }else{
      pielist$labels <- labels
    }
  }
  if(!is.null(colors) && isColor(colors)){
    if(length(colors)!=length(x)){
      warning("colors: length not matchig with 'x'")
    }else{
      pielist$colors <- col2hex(colors)
    }
  }
  #TODO: options
  pie <- structure(pielist, class="pie_rd3")
  if (!is.null(dir)) pieCreate(pie, dir)
  return(pie)
}
