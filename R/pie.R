pieJSON <- function(pie){
  return(toJSON(list(data=pie$data,dim=pie$dim,dataw=pie$dataw,labels=pie$labels,colors=pie$colors,options=pie$options)))
}

pieCreate <- function(pie, dir){
  language <- getLanguageScript(pie)
  createHTML(dir, c("reset.css","styles.css"), c("d3.min.js","images.js","colorScales.js","functions.js",language,"pie.js"), pieJSON(pie))
}

pie_rd3 <- function(x, labels = NULL, colors = NULL, main = NULL, note = NULL, showLegend = TRUE, help = NULL, helpOn = FALSE, cex = 1, language = c("en", "es", "ca"), dir = NULL){
  dimensions <- c(1,1,1)
  data <- NULL
  if(is.list(x) && length(intersect(names(x),c("V","W")))==2 && is.array(x[["V"]]) && length(dim(x[["V"]]))==3){
    dimensions <- dim(x[["V"]])
    data <- x[["V"]]
    if(!is.array(x[["W"]]) || length(dim(x[["W"]]))!=3 || dim(x[["W"]])[1]!=dimensions[1] || dim(x[["W"]])[2]!=dimensions[2] || dim(x[["W"]])[3]!=2){
      warning("x: incorrect dimensions in 'W' array")
    }else{
      dataw <- x[["W"]]
    }
  }else if(is.array(x) && length(dim(x))==3){
    dimensions <- dim(x)
    data <- x
  }else if(is.numeric(x)){
    dimensions[3] <- length(x)
    data <- x
  }
  if(is.null(data)){
    stop("x: incorrect data format")
  }
  pielist <- list(data = data, dim = dimensions)
  if(exists("dataw")){
    pielist[["dataw"]] <- dataw
  }
  if(!is.null(labels)){
    if(length(labels)!=dimensions[3]){
     warning("labels: incorrect length")
    }else{
      pielist$labels <- labels
    }
  }
  if(!is.null(colors) && isColor(colors)){
    if(length(colors)!=dimensions[3]){
     warning("colors: incorrect length")
    }else{
      pielist$colors <- col2hex(colors)
    }
  }

  options <- list()
  if (!is.null(main)) options[["main"]] <- main
  if (!is.null(note)) options[["note"]] <- note
  if (!is.null(help)) options[["help"]] <- help
  options[["cex"]] <- check_cex(cex)
  options[["language"]] <- checkLanguage(language)
  options <- showSomething(options,"showLegend",showLegend)
  options <- showSomething(options,"helpOn",helpOn)
  pielist$options <- options

  pie <- structure(pielist, class="pie_rd3")
  if (!is.null(dir)) pieCreate(pie, dir)
  return(pie)
}
