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
  scripts <- c("d3.min.js","jspdf.min.js","jszip.min.js","html2canvas.min.js","functions.js",language,"colorScales.js","gallery.js")
  if(!is.null(gallery$options$frequencies)){
    scripts <- c(scripts,"d3.layout.cloud.js")
  }
  createHTML(dir, c("reset.css","styles.css"), scripts, function(){ return(imgWrapper(gallery,galleryJSON,dir)) })
}

gallery_rd3 <- function(nodes, name = NULL, label = NULL, color = NULL,
    ntext = NULL, info = NULL, image = NULL, zoom = 1,
    itemsPerRow = NULL, main = NULL, note = NULL,
    showLegend = TRUE, frequencies = FALSE,
    help = NULL, helpOn = FALSE, description = NULL,
    descriptionWidth = NULL, roundedItems = FALSE, controls = 1:2,
    cex = 1, language = c("en", "es", "ca"), dir = NULL){
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

  if(!is.null(itemsPerRow)){
    if(!is.numeric(itemsPerRow) || itemsPerRow<=0){
      warning("itemsPerRow: must be numeric greater than 0")
    }else{
      options[["itemsPerRow"]] <- itemsPerRow
    }
  }
  if (!is.null(main)) options[["main"]] <- main
  if (!is.null(note)) options[["note"]] <- note
  if (!is.null(help)) options[["help"]] <- help
  if (!is.null(description)) options[["description"]] <- description
  if (!is.null(descriptionWidth)){
    if(is.numeric(descriptionWidth) && descriptionWidth>=0 && descriptionWidth<=100){
      options[["descriptionWidth"]] <- descriptionWidth
    }else{
      warning("descriptionWidth: not a valid percentage.")
    }
  }
  options <- showSomething(options,"roundedItems",roundedItems)
  options <- showSomething(options,"showLegend",showLegend)
  options <- showSomething(options,"helpOn",helpOn)
  options <- showSomething(options,"frequencies",frequencies)

  if (!is.null(controls)) options[["controls"]] <- as.numeric(controls)
  if(!is.numeric(cex)){
    cex <- formals(gallery_rd3)[["cex"]]
    warning("cex: must be numeric")
  }
  options[["cex"]] <- check_cex(cex)
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

