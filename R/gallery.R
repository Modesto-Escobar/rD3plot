galleryJSON <- function(gallery){
  json <- list(
    nodes = unname(as.list(gallery$nodes)),
    nodenames = array(colnames(gallery$nodes)),
    options = gallery$options
  )

  #prepare tree
  if(length(gallery$tree)){
    json$tree <- unname(as.list(gallery$tree))
  }

  return(toJSON(json))
}

galleryCreate <- function(gallery, dir){
  language <- getLanguageScript(gallery)
  styles <- c("reset.css","styles.css")
  scripts <- c("d3.min.js","jspdf.min.js","jszip.min.js","html2canvas.min.js","images.js","colorScales.js","functions.js",language,"gallery.js")
  if(!is.null(gallery$options$frequencies)){
    scripts <- c(scripts,"d3.layout.cloud.js")
  }
  if(!is.null(gallery$options$tutorial) && !identical(as.logical(gallery$options$tutorial),FALSE)){
    scripts <- c(scripts,"tutorial.js",paste0("tutorial_",language))
    styles <- c(styles,"tutorial.css")
  }
  createHTML(dir, styles, scripts, function(){ return(imgWrapper(gallery,galleryJSON,dir)) })
}

gallery_rd3 <- function(nodes, name = NULL, label = NULL, color = NULL,
    border = NULL, ntext = NULL, info = NULL, infoFrame = c("right","left"),
    image = NULL, zoom = 1, itemsPerRow = NULL, main = NULL, note = NULL,
    showLegend = TRUE, frequencies = FALSE,
    help = NULL, helpOn = FALSE, tutorial = FALSE, description = NULL,
    descriptionWidth = NULL, roundedItems = FALSE, controls = 1:6, cex = 1,
    defaultColor = "#1f77b4", language = c("en", "es", "ca"), dir = NULL){

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
  options <- checkColumn(options,"nodeBorder",border)
  options <- checkColumn(options,"nodeText",ntext)
  options <- checkColumn(options,"nodeInfo",info)

  if(is.character(infoFrame) && (infoFrame[1] %in% c("right","left"))){
    options[["infoFrame"]] <- infoFrame[1]
    if(options[["infoFrame"]]=="left" && is.null(description)){
      warning("infoFrame: you must add a description to use the left panel")
    }
  }

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
  options <- showSomething(options,"tutorial",tutorial)
  options <- showSomething(options,"frequencies",frequencies)

  if (!is.null(controls)) options[["controls"]] <- as.numeric(controls)
  options[["cex"]] <- check_cex(cex)
  options[["language"]] <- checkLanguage(language)
  options[["defaultColor"]] <- check_defaultColor(defaultColor)

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
  gallery <- checkItemValue(gallery,"nodes","nodeColor",color,"color",isColor,categoryColors,col2hex)

  if(!is.null(dir)){
    galleryCreate(gallery,dir)
  }
  return(gallery)
}

table2links <- function(x){
      tree <- as.matrix(x)
      tree2 <- list()
      types <- colnames(tree)
      if(!length(types)){
        types <- paste0("Level_",seq_len(ncol(tree)))
      }
      for(i in 1:nrow(tree)){
        if(!is.na(tree[i,1])){
          for(j in 2:ncol(tree)){
            if(!is.na(tree[i,j])){
              aux <- strsplit(tree[i,c(1,j)],"|",fixed=TRUE)
              aux <- expand.grid(aux)
              aux <- cbind(aux,types[1],types[j])
              colnames(aux) <- c("parent","child","type1","type2")
              tree2[[length(tree2)+1]] <- aux
            }
          }
        }
      }
      tree <- do.call(rbind,tree2)
      return(tree)
}

treeGallery_rd3 <- function(tree, deep = FALSE, initialType = NULL, tableformat = FALSE, ...){
  arguments <- list(...)

  tree <- tree[rowSums(is.na(tree)) != ncol(tree), ]

  dir <- NULL
  if(!is.null(arguments$dir)){
    dir <- arguments$dir
    arguments$dir <- NULL
  }

  if(!deep && tableformat){
    tree <- table2links(tree)
  }

  if(is.null(arguments$nodes)){
    if(deep){
      nodes <- as.vector(as.matrix(tree))
      nodes <- unlist(strsplit(nodes,"|",fixed=TRUE))
    }else{
      nodes <- as.vector(as.matrix(tree[,1:2]))
    }
    nodes <- unique(nodes)
    nodes <- nodes[!is.na(nodes)]
    arguments$nodes <- data.frame(name=nodes)
  }

  gallery <- do.call(gallery_rd3,arguments)

  name <- gallery$options$nodeName

  if(deep){
      tree <- as.matrix(tree)
      tree2 <- list()
      types <- colnames(tree)
      if(!length(types)){
        types <- paste0("Level_",seq_len(ncol(tree)))
      }
      for(i in seq_len(nrow(tree))){
        aux <- strsplit(tree[i,],"|",fixed=TRUE)
        aux <- expand.grid(aux)
        tree2[[length(tree2)+1]] <- aux
      }
      tree <- do.call(rbind,tree2)
      tree <- unique(tree)
      tree <- tree[apply(tree,1,function(x){
        !length(setdiff(x[!is.na(x)],gallery$nodes[[name]]))
      }),]
      if(nrow(tree)==0){
        warning("tree: missing nodes in every tree row")
      }else{
        gallery$options$deepTree <- TRUE
        gallery$tree <- as.data.frame(t(tree))
        gallery$nodes[["type"]] <- sapply(gallery$nodes[[name]],function(x){
            aux <- types[as.logical(apply(tree,2,function(y){ sum(x==y,na.rm=TRUE) }))]
            return(paste0(aux,collapse="|"))
        })
        gallery$options$nodeTypes <- types
      }
  }else{
    tree <- unique(tree)
    tree <- tree[tree[,1] %in% gallery$nodes[[name]] & tree[,2] %in% gallery$nodes[[name]] & as.character(tree[,2])!=as.character(tree[,1]),]
    if(nrow(tree)==0){
        warning("tree: no row (Source and Target) matches the name column of the nodes")
    }else{
        gallery$tree <- data.frame(Source=tree[,1],Target=tree[,2])
        if(ncol(tree)==4){
          gallery$tree$Type1 <- tree[,3]
          gallery$tree$Type2 <- tree[,4]
          names <- c(tree[,1],tree[,2])
          types <- c(tree[,3],tree[,4])
          gallery$nodes[["type"]] <- sapply(gallery$nodes[[name]],function(x){
            aux <- unique(types[names==x])
            return(paste0(aux,collapse="|"))
          })
          gallery$options$nodeTypes <- unique(types)
        }
    }

    if(!is.null(initialType)){
      gallery$options$initialType <- as.character(initialType)[1]
    }
  }

  if(!is.null(dir)){
    galleryCreate(gallery,dir)
  }
  return(gallery)
}

add_tutorial_rd3 <- function(x, image=NULL, description=NULL){
  if(!inherits(x,"gallery_rd3")){
    stop("x: a gallery must be provided")
  }

  x$options$tutorial <- list()
  if(!is.null(image) && is.character(image) && file.exists(image)){
    mime <- c("image/jpeg","image/jpeg","image/png","image/svg","image/gif")
    names(mime) <- c("jpeg","jpg","png","svg","gif")
    imgname <- sub("^.*/","",image)
    extension <- sub("^.*\\.","",imgname)
    if(extension %in% names(mime)){
      src <- paste0("data:",mime[extension],";base64,",base64encode(image))
      x$options$tutorial$image <- src
    }else{
      warning("image: image format not supported")
    }
  }
  if(!is.null(description) && is.character(description)){
    x$options$tutorial$description <- description
  }
  if(!length(x$options$tutorial)){
    x$options$tutorial <- TRUE
  }
  return(x)
}
