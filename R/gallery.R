galleryJSON <- function(gallery){
  json <- list(
    nodes = unname(as.list(gallery$nodes)),
    nodenames = array(colnames(gallery$nodes)),
    options = gallery$options
  )

  #prepare tree
  if(length(gallery$nodes_relatives)){
    json$nodes_relatives <- gallery$nodes_relatives
    if(length(gallery$nodes_relativesTypes)){
      json$nodes_relativesTypes <- gallery$nodes_relativesTypes
    }
  }else if(length(gallery$tree)){
    json$tree <- unname(as.list(gallery$tree))
  }

  return(toJSON(json))
}

galleryCreate <- function(gallery, dir){
  language <- getLanguageScript(gallery)
  script <- "gallery.js"
  style <- "styles.css"
  mode <- 1
  if(!is.null(gallery$options$mode) && gallery$options$mode==2){
    mode <- 2
    script <- "gallery2.js"
    style <- "styles2.css"
  }
  if(!is.null(gallery$tree)){
    if(mode==2){
      script <- c("gallerytree2.js",script)
    }else{
      script <- c("gallerytree.js",script)
    }
  }
  styles <- c("reset.css",style)
  scripts <- c("d3.min.js","jszip.min.js","images.js","colorScales.js","functions.js",language,script)
  if(!is.null(gallery$options$frequencies)){
    scripts <- c(scripts,"d3.layout.cloud.js")
  }
  if(!is.null(gallery$options$tutorial) && !identical(as.logical(gallery$options$tutorial),FALSE)){
    scripts <- c(scripts,"tutorial.js",paste0("tutorial_",language))
    styles <- c(styles,"tutorial.css")
  }
  createHTML(dir, styles, scripts, function(){ return(imgWrapper(gallery,galleryJSON,dir)) })
  if(mode==1 && is.null(gallery$options$note)){
    dir.create(paste0(dir,"/images"),FALSE)
    www <- wwwDirectory()
    file.copy(paste0(www,"/acknowledgement.png"), paste0(dir,"/images"))
  }
}

gallery_rd3 <- function(nodes, name = NULL, label = NULL, color = NULL,
    border = NULL, ntext = NULL, info = NULL, infoFrame = c("right","left"),
    image = NULL, zoom = 1, itemsPerRow = NULL, main = NULL, note = NULL,
    showLegend = TRUE, frequencies = FALSE, labelTooltip = TRUE,
    cexTooltip = 1, help = NULL, helpOn = FALSE, tutorial = FALSE,
    description = NULL, descriptionWidth = NULL, roundedItems = FALSE,
    ntextctrl = FALSE, controls = 1:5, cex = 1, defaultColor = "#1f77b4",
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
  options <- checkColumn(options,"nodeBorder",border)
  options <- checkColumn(options,"nodeText",ntext)
  options <- checkColumn(options,"nodeInfo",info)

  if(is.character(infoFrame) && (infoFrame[1] %in% c("right","left"))){
    options[["infoFrame"]] <- infoFrame[1]
  }

  if(!(is.numeric(zoom) && zoom>=0.1 && zoom<=10)){
    zoom <- formals(gallery_rd3)[["zoom"]]
    warning("zoom: must be numeric between 0.1 and 10")
  }
  options[["zoom"]] <- zoom

  if(!is.null(itemsPerRow)){
    if(!is.numeric(itemsPerRow) || any(itemsPerRow<=0)){
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
  options <- showSomething(options,"labelTooltip",labelTooltip)
  options <- showSomething(options,"roundedItems",roundedItems)
  options <- showSomething(options,"showLegend",showLegend)
  options <- showSomething(options,"helpOn",helpOn)
  options <- showSomething(options,"tutorial",tutorial)
  options <- showSomething(options,"frequencies",frequencies)
  options <- showSomething(options,"ntextctrl",ntextctrl)

  if (!is.null(controls)) options[["controls"]] <- as.numeric(controls)
  options[["cex"]] <- check_cex(cex)
  options[["language"]] <- checkLanguage(language)
  options[["defaultColor"]] <- check_defaultColor(defaultColor)

  if(!is.numeric(cexTooltip)){
    cexTooltip <- 1
  }
  options[["cexTooltip"]] <- cexTooltip

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

gallery2_rd3 <- function(nodes, name = NULL, label = NULL, order = NULL,
    decreasing = FALSE, ntext = NULL, mainframeHeight = NULL,
    image = NULL, zoom = NULL, main = NULL, note = NULL, export = FALSE,
    colorScheme = 0, language = c("en", "es", "ca"), dir = NULL){

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
  if(is.character(order)){
    options[["nodeOrder"]] <- order
  }
  if(is.logical(decreasing)){
    options[["decreasing"]] <- decreasing
  }
  options <- checkColumn(options,"nodeText",ntext)
  if(!is.null(options[["nodeText"]])){
    nodes[,options[["nodeText"]]] <- sub('\\|.*','', nodes[,options[["nodeText"]]])
  }

  if(!is.null(mainframeHeight)){
    if(!(is.numeric(mainframeHeight) && mainframeHeight>=0.1 && mainframeHeight<=1)){
      warning("mainframeHeight: must be numeric between 0.1 and 1")
    }
    options[["mainframeHeight"]] <- mainframeHeight
  }

  if(!is.null(zoom)){
    if(!(is.numeric(zoom) && zoom>=0.1 && zoom<=1)){
      warning("zoom: must be numeric between 0.1 and 1")
    }
    options[["zoom"]] <- zoom
  }

  if (!is.null(main)) options[["main"]] <- main
  if (!is.null(note)) options[["note"]] <- note

  options <- showSomething(options,"exportExcel",export)
  options[["colorScheme"]] <- as.numeric(colorScheme)
  options[["language"]] <- checkLanguage(language)

  if (!is.null(image)){
    image <- image[1]
    if(!image %in% colnames(nodes)){
      warning("image: name must match in nodes colnames.")
    }else{
      options[["imageItems"]] <- image
      nodes[,image] <- sub('\\|.*','', nodes[,image])
    }
  }

  options[["mode"]] <- 2

  # create gallery
  gallery <- structure(list(nodes=nodes,options=options),class="gallery_rd3")

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
            }else{
              aux <- cbind(tree[i,1],NA,types[1],NA)
              aux <- unname(aux)
            }
            colnames(aux) <- c("parent","child","type1","type2")
            tree2[[length(tree2)+1]] <- aux
          }
        }
      }
      tree <- do.call(rbind,tree2)
      tree <- unique(tree)
      tree <- tree[apply(tree,1,function(x){
        if(is.na(x[2]) && sum(x[1]==tree[,1])>1){
          return(FALSE)
        }
        return(TRUE)
      }),]
      return(tree)
}

links2table <- function(x){
  if(ncol(x)==4){
    types <- c(paste0(unique(x[,3]),collapse="|"),unique(x[,4]))
    elements <- unique(x[,1])
    tree <- matrix(NA,length(elements),length(types))
    colnames(tree) <- types
    tree[,1] <- elements
    for(i in 1:nrow(tree)){
      for(j in 2:ncol(tree)){
        tree[i,j] <- paste0(x[x[,1]==elements[i] & x[,4]==types[j],2],collapse="|")
      }
    }
    return(tree)
  }else{
    types <- c("parent","children")
    elements <- unique(x[,1])
    tree <- matrix(NA,length(elements),length(types))
    colnames(tree) <- types
    tree[,1] <- elements
    for(i in 1:nrow(tree)){
      tree[i,2] <- paste0(x[x[,1]==elements[i],2],collapse="|")
    }
    return(tree)
  }
}

treeGalleryWrapper <- function(tree, deep, initialType, tableformat, gallery_mode, ...){
  arguments <- list(...)

  tree <- tree[rowSums(is.na(tree)) != ncol(tree), ]

  dir <- NULL
  if(!is.null(arguments$dir)){
    dir <- arguments$dir
    arguments$dir <- NULL
  }

  if("controls" %in% names(formals(gallery_mode)) && is.null(arguments$controls)){
    arguments$controls <- 1:4
  }

  if(!deep && tableformat){
    tree <- table2links(tree)
  }

  if(deep){
    nodes <- as.vector(as.matrix(tree))
    nodes <- unlist(strsplit(nodes,"|",fixed=TRUE))
  }else{
    nodes <- as.vector(as.matrix(tree[,1:2]))
  }
  nodes <- unique(nodes)
  nodes <- nodes[!is.na(nodes)]
  nodes <- data.frame(name=nodes)

  if(!is.null(arguments$nodes)){
    name <- arguments$name
    if(is.data.frame(arguments$nodes)){
      if(is.null(name)){
        name <- colnames(arguments$nodes)[1]
      }
      colnames(nodes)[1] <- name
      nodeorder <- c(intersect(arguments$nodes[[name]],nodes[[name]]),setdiff(nodes[[name]],arguments$nodes[[name]]))
      nodes <- merge(nodes, arguments$nodes, by=name, all.x=TRUE)
    }else if(is.list(arguments$nodes)){
      if(is.null(name)){
        name <- "_name"
        for(n in names(arguments$nodes)){
          colnames(arguments$nodes[[n]])[1] <- name
        }
      }
      colnames(nodes)[1] <- name
      nodenamesbytype <- list()
      allnodenames <- unlist(lapply(arguments$nodes,colnames))
      dupnames <- setdiff(unique(allnodenames[duplicated(as.vector(allnodenames))]),name)
      initialnodes <- as.character(nodes[[name]])
      nodeorder <- character()
      for(n in names(arguments$nodes)){
        nodenamesbytype[[n]] <- names(arguments$nodes[[n]])
        tochange <- colnames(arguments$nodes[[n]]) %in% dupnames
        colnames(arguments$nodes[[n]])[tochange] <- paste0(n,".",colnames(arguments$nodes[[n]])[tochange])
        nodeorder <- c(nodeorder,arguments$nodes[[n]][[name]])
        nodes <- merge(nodes, arguments$nodes[[n]], by=name, all.x=TRUE)
      }
      nodeorder <- unique(nodeorder)
      nodeorder <- c(intersect(nodeorder,initialnodes),setdiff(initialnodes,nodeorder))
      for(d in dupnames){
        nodes[[d]] <- NA
        for(n in names(arguments$nodes)){
          col <- paste0(n,".",d)
          if(col %in% colnames(nodes)){
            nodes[,d] <- apply(nodes,1,function(x){
              if(is.na(x[d]) && is.na(x[col])){
                return(NA)
              }
              if(is.na(x[d]) && !is.na(x[col])){
                return(x[col])
              }
              if(!is.na(x[d]) && is.na(x[col])){
                return(x[d])
              }
              aux <- unlist(strsplit(c(as.character(x[d]),as.character(x[col])),"|",fixed=TRUE))
              paste0(unique(aux),collapse="|")
            })
            nodes[[col]] <- NULL
          }
        }
        if(all(is.na(nodes[[d]]))){
          nodes[[d]] <- NULL
        }
      }
    }

    rownames(nodes) <- as.character(nodes[[name]])
    nodes <- nodes[nodeorder,]
  }

  arguments$nodes <- nodes

  gallery <- do.call(gallery_mode,arguments)

  name <- gallery$options$nodeName

  typeList <- c("type","tipo","tipus")
  names(typeList) <- c("en","es","ca")
  nodeType <- typeList[1]
  if(!is.null(gallery$options$language)){
    nodeType <- typeList[gallery$options$language]
  }
  gallery$options$nodeType <- nodeType

  checkColumnType <- function(gallery){
    if(nodeType %in% colnames(gallery$nodes)){
      warning(paste0("nodes: Column named '",nodeType,"' will be overwritten"))
    }
  }

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

      gallery$options$deepTree <- TRUE
      gallery$tree <- as.data.frame(t(tree))
      checkColumnType(gallery)
      gallery$nodes[[nodeType]] <- sapply(gallery$nodes[[name]],function(x){
        aux <- types[as.logical(apply(tree,2,function(y){ sum(x==y,na.rm=TRUE) }))]
        return(paste0(aux,collapse="|"))
      })
      gallery$options$nodeTypes <- types
  }else{
    tree <- unique(tree)
    tree[,1] <- as.character(tree[,1])
    tree[,2] <- as.character(tree[,2])
    #tree <- tree[tree[,2]!=tree[,1],]
    gallery$tree <- data.frame(Source=tree[,1],Target=tree[,2])
    if(ncol(tree)==4){
          gallery$tree$Type1 <- tree[,3]
          gallery$tree$Type2 <- tree[,4]
          names <- c(tree[,1],tree[,2])
          types <- c(tree[,3],tree[,4])
          checkColumnType(gallery)
          gallery$nodes[[nodeType]] <- sapply(gallery$nodes[[name]],function(x){
            aux <- unique(types[names==x])
            aux <- aux[!is.na(aux)]
            return(paste0(aux,collapse="|"))
          })
          types <- unique(types)
          types <- types[!is.na(types)]
          gallery$options$nodeTypes <- types
    }

    if(!is.null(initialType)){
      gallery$options$initialType <- as.character(initialType)[1]
    }
  }

  if(exists("nodenamesbytype") && !is.null(gallery$options$nodeTypes)){
    commonnames <- intersect(gallery$options$nodeTypes, names(nodenamesbytype))
    if(!length(commonnames)){
      warning("nodes: all tree node types missing in this list")
    }else{
      gallery$options$nodeNamesByType <- nodenamesbytype
    }
  }

  if(is.logical(arguments$roundedItems) && length(arguments$roundedItems)==length(gallery$options$nodeTypes)){
    gallery$options$roundedItems <- arguments$roundedItems
  }

  if(!is.null(dir)){
    galleryCreate(gallery,dir)
  }

  class(gallery) <- c("treeGallery_rd3",class(gallery))
  return(gallery)
}

treeGallery_rd3 <- function(tree, deep = FALSE, initialType = NULL, tableformat = FALSE, ...){
  return(treeGalleryWrapper(tree, deep, initialType, tableformat, gallery_rd3, ...))
}

treeGallery2_rd3 <- function(tree, initialType = NULL, tableformat = FALSE, ...){
  if(ncol(tree)==2 && !tableformat){
    if(is.null(colnames(tree))){
      colnames(tree) <- c("Parent","Children")
    }
    tree[,3] <- colnames(tree)[1]
    tree[,4] <- colnames(tree)[2]
  }
  gallery <- treeGalleryWrapper(tree, FALSE, initialType, tableformat, gallery2_rd3, ...)
  tree <- gallery$tree
  tree <- tree[!is.na(tree[,1]) & !is.na(tree[,2]),]
  nodes <- gallery$nodes
  relatives <- list()
  relativesTypes <- list()
  relativesTypes2 <- list()
  for(i in seq_len(nrow(nodes))){
    name <- nodes[i,gallery$options$nodeName]
    aux1 <- character(0)
    aux2 <- character(0)
    aux3 <- character(0)
    if(name %in% tree[,1]){
      aux1 <- tree[tree[,1]==name,2]
      aux2 <- tree[tree[,1]==name,3]
      aux3 <- tree[tree[,1]==name,4]
    }
    if(name %in% tree[,2]){
      target <- !is.na(tree[,2]) & tree[,2]==name
      parents <- tree[target,1]
      pType <- tree[target,4]
      pType2 <- tree[target,3]
      aux1 <- c(aux1,parents)
      aux2 <- c(aux2,pType)
      aux3 <- c(aux3,pType2)
      for(j in seq_along(parents)){
        target <- tree[,1]==parents[j] & tree[,2]!=name
        siblings <- tree[target,2]
        stypes <- rep(pType[j],length(siblings))
        stypes2 <- tree[target,4]
        aux1 <- c(aux1,siblings)
        aux2 <- c(aux2,stypes)
        aux3 <- c(aux3,stypes2)
      }
    }
    relatives[[i]] <- aux1
    if(length(unique(aux2))>1){
      relativesTypes[[as.character(i-1)]] <- aux2
    }
    relativesTypes2[[i]] <- aux3
  }
  gallery$nodes_relatives <- relatives
  if(length(unlist(relativesTypes))){
    gallery$nodes_relativesTypes <- relativesTypes
  }
  gallery$nodes_relativesTypes2 <- relativesTypes2
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
