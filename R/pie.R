pieJSON <- function(pie){
  json <- list(data=pie$data, dim=pie$dim, colnames=pie$colnames, rownames=pie$rownames, dataw=pie$dataw)
  if(length(pie$nodes)){
    nodenames <- colnames(pie$nodes)
    nodes <- as.list(pie$nodes)
    names(nodes) <- NULL
    json$nodes <- nodes
    json$nodenames <- nodenames
  }
  if(length(pie$links)){
    linknames <- colnames(pie$links)
    links <- as.list(pie$links)
    names(links) <- NULL
    json$links <- links
    json$linknames <- linknames
  }
  json$options <- pie$options
  return(toJSON(json))
}

pieCreate <- function(pie, dir){
  language <- getLanguageScript(pie)
  createHTML(dir, c("reset.css","styles.css"), c("d3.min.js","images.js","colorScales.js","functions.js",language,"pie.js"), pieJSON(pie))
}

pie_rd3 <- function(v, w = NULL, labels = NULL, colors = NULL, nodes = NULL, links = NULL, name = NULL, source = NULL, target = NULL, lcolor = NULL, ablineX = NULL, ablineY = NULL, hideUpper = FALSE, main = NULL, note = NULL, showLegend = TRUE, help = NULL, helpOn = FALSE, cex = 1, language = c("en", "es", "ca"), dir = NULL){
  dimensions <- c(1,1,1)
  data <- NULL
  if(is.array(v) && length(dim(v))==3){
    dimensions <- dim(v)
    data <- v
  }else if(is.numeric(v)){
    dimensions[3] <- length(v)
    data <- v
  }
  if(is.null(data)){
    stop("v: incorrect data format")
  }

  if(!is.null(w)){
    if(!is.array(w) || length(dim(w))!=3 || dim(w)[1]!=dimensions[1] || dim(w)[2]!=dimensions[2] || dim(w)[3]!=2){
      warning("w: incorrect dimensions")
    }else{
      dataw <- w
    }
  }

  pielist <- list(data = data, dim = dimensions)
  if(!is.null(colnames(data))){
    pielist[["colnames"]] <- colnames(data)
  }
  if(!is.null(rownames(data))){
    pielist[["rownames"]] <- rownames(data)
  }
  if(exists("dataw")){
    pielist[["dataw"]] <- dataw
  }

  options <- list()

  if(!is.null(nodes)){
    if(is.null(name)){
      name <- colnames(nodes)[1]
    }

    nodes[[name]] <- as.character(nodes[[name]])
    matches <- intersect(nodes[[name]],union(colnames(data),rownames(data)))
    if(length(matches)){
      options$nodeName <- name
      rownames(nodes) <- nodes[[name]]
      nodes <- nodes[matches,]
      pielist[["nodes"]] <- nodes
    }else{
      nodes <- NULL
      warning("nodes: no match with 'v'")
    }
  }

  if(!is.null(links)){
    if(dimensions[1]==1 && dimensions[2]==1){
      links <- NULL
      warning("links: not enough dimensions to apply link information")
    }else{
      links <- as.data.frame(links)

      if(is.null(source)){
        source <- colnames(links)[1]
      }
      links[[source]] <- as.character(links[[source]])
      links <- links[links[[source]] %in% rownames(data),]
      options$linkSource <- source

      if(is.null(target)){
        target <- colnames(links)[2]
      }
      links[[target]] <- as.character(links[[target]])
      links <- links[links[[target]] %in% colnames(data),]
      options$linkTarget <- target

      if(!nrow(links)){
        links <- NULL
        warning("links: no row (source and target) matches the rownames and colnames of data")
      }else{
        pielist[["links"]] <- links
      }
    }
  }

  if(!is.null(labels)){
    if(length(labels)!=dimensions[3]){
     warning("labels: incorrect length")
    }else{
      options$labels <- labels
    }
  }
  if(!is.null(colors) && isColor(colors)){
    if(length(colors)!=dimensions[3]){
     warning("colors: incorrect length")
    }else{
      options$colors <- col2hex(colors)
    }
  }

  if(!is.null(ablineX)){
    if(ablineX<1 || ablineX>=dimensions[1]){
      warning("ablineX: incorrect values")
    }else{
      options[["ablineX"]] <- as.integer(ablineX)
    }
  }
  if(!is.null(ablineY)){
    if(ablineY<1 || ablineY>=dimensions[2]){
      warning("ablineY: incorrect values")
    }else{
      options[["ablineY"]] <- as.integer(ablineY)
    }
  }

  if (!is.null(main)) options[["main"]] <- main
  if (!is.null(note)) options[["note"]] <- note
  if (!is.null(help)) options[["help"]] <- help
  options[["cex"]] <- check_cex(cex)
  options[["language"]] <- checkLanguage(language)
  options <- showSomething(options,"hideUpper",hideUpper)
  options <- showSomething(options,"showLegend",showLegend)
  options <- showSomething(options,"helpOn",helpOn)
  pielist$options <- options

  pie <- structure(pielist, class="pie_rd3")

  pie <- checkItemValue(pie,"links","linkColor",lcolor,"lcolor",isColor,categoryColors,col2hex)

  if (!is.null(dir)) pieCreate(pie, dir)
  return(pie)
}
