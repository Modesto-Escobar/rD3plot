galleryJSON <- function(gallery){
  json <- list(
    nodes = unname(as.list(gallery$nodes)),
    nodenames = array(colnames(gallery$nodes)),
    options = gallery$options
  )
  return(toJSON(json))
}

galleryCreate <- function(gallery, dir){
  language <- getLanguageScript(gallery)
  createHTML(dir, c("reset.css","styles.css"), c("d3.min.js","jspdf.min.js","jszip.min.js","html2canvas.min.js","functions.js",language,"colorScales.js","gallery.js"), function(){ return(imgWrapper(gallery,galleryJSON,dir)) })
}

gallery_rd3 <- function(nodes, name = NULL, label = NULL, color = NULL,
    ntext = NULL, info = NULL, image = NULL,
    zoom = 1, main = NULL, note = NULL, showLegend = TRUE, 
    help = NULL, helpOn = FALSE, description = NULL,
    roundedItems = FALSE,
    language = c("en", "es", "ca"), dir = NULL){
  if(is.null(name)){
    name <- colnames(nodes)[1]
  }
  rownames(nodes) <- nodes[[name]]

  # options
  options <- list(nodeName = name)
  if(is.null(label)){
    options[["nodeLabel"]] <- name
  }else{
    options <- checkColumn(options,"nodeLabel",label)
  }
  options <- checkColumn(options,"nodeText",ntext)
  options <- checkColumn(options,"nodeInfo",info)

  if(!(is.numeric(zoom) && zoom>=0.1 && zoom<=10)){
    zoom <- formals(gallery_rd3)[["zoom"]]
    warning("zoom: must be numeric between 0.1 and 10")
  }
  options[["zoom"]] <- zoom

  if (!is.null(main)) options[["main"]] <- main
  if (!is.null(note)) options[["note"]] <- note
  if (!is.null(help)) options[["help"]] <- help
  if (!is.null(description)) options[["description"]] <- description
  options <- showSomething(options,"roundedItems",roundedItems)
  options <- showSomething(options,"showLegend",showLegend)
  options <- showSomething(options,"helpOn",helpOn)
  options[["language"]] <- checkLanguage(language)

  if (!is.null(image)){
    image <- image[1]
    if(!image %in% colnames(nodes)){
      warning("image: name must match in nodes colnames.")
    }else{
      options[["imageItems"]] <- image
    }
  }

  # create gallery
  gallery <- structure(list(nodes=nodes,options=options),class="gallery_rd3")

  # more options
  gallery <- checkNodeVariable(gallery,"nodeColor",color,"color",isColor,categoryColors,col2hex)

  if (!is.null(dir)) galleryCreate(gallery,dir)
  return(gallery)
}

asGallery <- function(net){
  if(inherits(net,"network_rd3")){
    nodes <- net$nodes
    options <- net$options
    gallery <- gallery_rd3(nodes = nodes, name = options$nodeName, label = options$nodeLabel,
      color = options$nodeColor, ntext = options$nodeText, info = options$nodeInfo, image = options$imageItems,
      zoom = options$zoom, main = options$main, note = options$note,
      help = options$help, helpOn = options$helpOn, roundedItems = options$roundedItems,
      language = options$language)
    return(gallery)
  }else{
    stop("net: must be a network object")
  }
}
