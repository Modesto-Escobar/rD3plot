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
  if(is.null(gallery$options$note)){
    dir.create(paste0(dir,"/images"),FALSE)
    www <- wwwDirectory()
    file.copy(paste0(www,"/acknowledgement.png"), paste0(dir,"/images"))
  }
}

gallery_rd3 <- function(nodes, name = NULL, label = NULL, color = NULL,
    border = NULL, ntext = NULL, info = NULL, infoFrame = c("right","left"),
    image = NULL, zoom = 1, itemsPerRow = NULL, main = NULL, note = NULL,
    showLegend = TRUE, frequencies = FALSE, labelTooltip = TRUE,
    help = NULL, helpOn = FALSE, tutorial = FALSE, description = NULL,
    descriptionWidth = NULL, roundedItems = FALSE, ntextctrl = FALSE,
    controls = 1:6, cex = 1, defaultColor = "#1f77b4",
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
      for(n in names(arguments$nodes)){
        nodenamesbytype[[n]] <- names(arguments$nodes[[n]])
        tochange <- colnames(arguments$nodes[[n]]) %in% dupnames
        colnames(arguments$nodes[[n]])[tochange] <- paste0(n,".",colnames(arguments$nodes[[n]])[tochange])
        nodes <- merge(nodes, arguments$nodes[[n]], by=name, all.x=TRUE)
      }
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

    mainitems <- unique(as.character(tree[,1]))
    names <- as.character(nodes[[name]])
    nodeorder <- c(mainitems,setdiff(names,mainitems))
    rownames(nodes) <- names
    nodes <- nodes[nodeorder,]
  }

  arguments$nodes <- nodes

  if(is.null(arguments$ntextctrl)){
    arguments$ntextctrl <- TRUE
  }

  gallery <- do.call(gallery_rd3,arguments)

  name <- gallery$options$nodeName

  checkColumnType <- function(gallery){
    if("type" %in% colnames(gallery$nodes)){
      warning("nodes: Column named 'type' will be overwritten")
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
      gallery$nodes[["type"]] <- sapply(gallery$nodes[[name]],function(x){
        aux <- types[as.logical(apply(tree,2,function(y){ sum(x==y,na.rm=TRUE) }))]
        return(paste0(aux,collapse="|"))
      })
      gallery$options$nodeTypes <- types
  }else{
    tree <- unique(tree)
    tree[,1] <- as.character(tree[,1])
    tree[,2] <- as.character(tree[,2])
    tree <- tree[tree[,2]!=tree[,1],]
    gallery$tree <- data.frame(Source=tree[,1],Target=tree[,2])
    if(ncol(tree)==4){
          gallery$tree$Type1 <- tree[,3]
          gallery$tree$Type2 <- tree[,4]
          names <- c(tree[,1],tree[,2])
          types <- c(tree[,3],tree[,4])
          checkColumnType(gallery)
          gallery$nodes[["type"]] <- sapply(gallery$nodes[[name]],function(x){
            aux <- unique(types[names==x])
            return(paste0(aux,collapse="|"))
          })
          gallery$options$nodeTypes <- unique(types)
    }

    if(!is.null(initialType)){
      gallery$options$initialType <- as.character(initialType)[1]
    }
  }

  if(name=="_name" && !is.null(gallery$options$nodeTypes)){
    for(ntype in rev(gallery$options$nodeTypes)){
      gallery$nodes[[ntype]] <- NULL
      gallery$nodes[[ntype]] <- NA
      typematch <- vapply(gallery$nodes[["type"]],function(x){
        aux <- unlist(strsplit(x,"|",fixed=TRUE))
        if(length(aux)==1){
          return(x==ntype)
        }else{
          return(ntype %in% aux)
        }
      },logical(1))
      gallery$nodes[typematch,ntype] <- gallery$nodes[typematch,name]
      cnames <- colnames(gallery$nodes)
      cnames <- cnames[c(-1,-length(cnames))]
      gallery$nodes <- gallery$nodes[,c(name,ntype,cnames)]
      if(exists("nodenamesbytype") && !is.null(nodenamesbytype[[ntype]])){
        nodenamesbytype[[ntype]] <- c(nodenamesbytype[[ntype]][1],ntype,nodenamesbytype[[ntype]][-1])
      }
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

  if(!is.null(dir)){
    galleryCreate(gallery,dir)
  }

  class(gallery) <- c("treeGallery_rd3",class(gallery))
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
