#create json
networkJSON<-function(net){

  links <- net$links
  tree <- net$tree
  nodes <- net$nodes
  layouts <- net$layouts
  options <- net$options

  name <- as.character(nodes[[options$nodeName]])

  #prepare links
  if(length(links)){

    idx <- seq_along(name)-1
    names(idx) <- name
    source <- idx[as.character(links$Source)]
    target <- idx[as.character(links$Target)]

    links$Source <- source
    links$Target <- target
  }

  #prepare tree
  if(length(tree)){
      sourcenames <- as.character(tree$Source)
      targetnames <- as.character(tree$Target)

      checkdup <- targetnames
      if("_frame_" %in% names(tree))
        checkdup <- paste0(targetnames,tree[["_frame_"]])

      if(all(!duplicated(checkdup))){
        nlinks <- nrow(net$tree)
        source <- numeric(nlinks)
        target <- numeric(nlinks)
        for(i in seq_len(nlinks)){
          source[i] <- which(sourcenames[i]==name)-1
          target[i] <- which(targetnames[i]==name)-1
        }

        tree$Source <- source
        tree$Target <- target

        tree <- as.list(tree)
        names(tree) <- NULL
      }else{
        tree <- NULL
        warning("tree: there must be only one parent per node")
      }
  }

  nodenames <- colnames(nodes)
  nodes <- as.list(nodes)
  names(nodes) <- NULL
  json <- list(nodes = nodes, nodenames = array(nodenames))
  if(length(links)){
    linknames <- colnames(links)
    links <- as.list(links)
    names(links) <- NULL
    json$links <- links
    json$linknames <- linknames
  }
  if(length(tree)){
    json$tree <- tree
  }
  if(length(layouts)){
    json$layouts <- layouts
  }
  json$options <- options
  
  return(toJSON(json))
}

# add layout
netAddLayout <- function(net,layout){
  if(inherits(layout,"list") &&
       all(sapply(layout,inherits,what="matrix")) &&
       all(sapply(layout,is.numeric)) &&
       all(sapply(layout,ncol)==2) &&
       all(sapply(layout,nrow)==nrow(net$nodes))){
    if(is.null(names(layout))){
      names(layout) <- paste0("layout",seq_along(layout))
    }
    net$layouts <- layout
  }else if(inherits(layout,"matrix") &&
       is.numeric(layout) &&
       ncol(layout)==2 &&
       nrow(layout)==nrow(net$nodes)){
    net$nodes[["fx"]] <- layout[,1]
    net$nodes[["fy"]] <- layout[,2]
  }else{
    warning("layout: each layout must be a numeric matrix and have a pair of coordinates per node")
  }
  return(net)
}

getRawName <- function(filepath){
  filename <- strsplit(basename(filepath), split="\\.")[[1]]
  ext <- filename[length(filename)]
  filename <- paste0(filename[-length(filename)],collapse=".")
  return(paste(paste0(as.character(charToRaw(filename)),collapse=""),ext,sep="."))
}

#copy images to net graph
imgWrapper <- function(net,callback,dir){
  imgDir <- paste(dir,"images",sep="/")
  if("imageItems" %in% names(net$options)){
    dir.create(imgDir, showWarnings = FALSE)
    if(is.null(net$options[["imageNames"]])){
      net$options[["imageNames"]] <- net$options[["imageItems"]]
      net$options[["imageItems"]] <- paste0(net$options[["imageItems"]],"_url")
      for(i in seq_along(net$options[["imageItems"]])){
        net$nodes[[net$options[["imageItems"]][i]]] <- net$nodes[[net$options[["imageNames"]][i]]]
        net$nodes[[net$options[["imageNames"]][i]]] <- sub("\\.[a-zA-Z0-9]+$","",basename(as.character(net$nodes[[net$options[["imageNames"]][i]]])))
      }
    }
    for(img in net$options[["imageItems"]]){
      net$nodes[[img]] <- vapply(as.character(net$nodes[[img]]),function(filepath){
        rawname <- getRawName(filepath)
        file.copy(filepath, paste(imgDir,rawname,sep="/"), overwrite = FALSE)
        paste("images",rawname,sep="/")
      },character(1))
    }
  }
  if(!is.null(net$options[["background"]])){
    if(file.exists(net$options[["background"]])){
      filepath <- net$options[["background"]]
      rawname <- getRawName(filepath)
      dir.create(imgDir, showWarnings = FALSE)
      file.copy(filepath, paste(imgDir,rawname,sep="/"))
      net$options[["background"]] <- paste0('url("',paste("images",rawname,sep="/"),'")')
    }
  }
  return(callback(net))
}

#create html wrapper for network graph
netCreate <- function(net, dir){
  #get language
  language <- getLanguageScript(net)

  createHTML(dir, c("reset.css","styles.css"), c("d3.min.js","jspdf.min.js","jszip.min.js","iro.min.js","functions.js",language,"colorScales.js","network.js"),function(){ return(imgWrapper(net,networkJSON,dir)) })
}

# network graph function 
network_rd3 <- function(nodes = NULL, links = NULL, tree = NULL,
        community = NULL, layout = NULL,
        name = NULL, label = NULL, group = NULL, labelSize = NULL,
        size = NULL, color = NULL, shape = NULL, legend = NULL,
        orderA = NULL, orderD = NULL, ntext = NULL, info = NULL,
        image = NULL, imageNames = NULL,
        nodeBipolar = FALSE, nodeFilter = NULL, degreeFilter = NULL,
        source = NULL, target = NULL,
        lwidth = NULL, lweight = NULL, lcolor = NULL, ltext = NULL,
        linkBipolar = FALSE, linkFilter = NULL,
        repulsion = 25, distance = 10, zoom = 1,
        fixed = showCoordinates, limits = NULL,
        main = NULL, note = NULL, showCoordinates = FALSE, showArrows = FALSE,
        showLegend = TRUE, frequencies = FALSE, showAxes = FALSE,
        axesLabels = NULL, scenarios = NULL, help = NULL, helpOn = FALSE,
        mode = c("network","heatmap"), controls = 1:4, cex = 1,
        background = NULL, defaultColor = "#1f77b4",
        language = c("en","es","ca"), dir = NULL)
{
  if(is.null(links) &&  is.null(nodes)){
    stop("You must explicit a nodes or links data frame.")
  }

  options <- list()

  if(!is.null(links)){
    if(is.null(source)){
      source <- colnames(links)[1]
    }
    if(is.null(target)){
      target <- colnames(links)[2]
    }

    options$linkSource <- source
    options$linkTarget <- target

    links[,source] <- as.character(links[,source])
    links[,target] <- as.character(links[,target])

    if(is.null(nodes)){
      nodes <- data.frame(name=union(links[,source],links[,target]))
      if(!is.null(name)){
        names(nodes)[1] <- name
      }
    }
  }

  if(is.null(name)){
    name <- colnames(nodes)[1]
  }
  nodes[[name]] <- as.character(nodes[[name]])
  options$nodeName <- name

  if(!all(!duplicated(nodes[[name]]))){
    nodes[[name]] <- make.unique(nodes[[name]])
    warning("name: must be unique in nodes")
  }

  rownames(nodes) <- nodes[[name]]

  if(!is.null(links)){
    links <- links[links[,source] %in% nodes[[name]] & links[,target] %in% nodes[[name]] & links[,target]!=links[,source],]
    if(nrow(links)==0){
      links <- NULL
      warning(paste0("links: no row (source and target) matches the '",name,"' column of the nodes"))
    }
  }

  
  # graph options

  checkNodeColumn <- function(opt,item,column,nodes){
    val <- NULL
    if(!is.null(column)){
      if(!(column=="" || identical(column,FALSE))){
        if(column %in% union(colnames(nodes),"degree")){
          val <- column
        }else{
          warning(paste0(item,": '",column,"' is not in nodes data frame"))
        }
      }
    }
    opt[[item]] <- val
    return(opt)
  }

  checkLinkColumn <- function(opt,item,column,links){
    val <- NULL
    if(!is.null(column)){
      if(!(column=="" || identical(column,FALSE))){
        if(column %in% colnames(links)){
          val <- column
        }else{
          warning(paste0(item,": '",column,"' is not in links data frame"))
        }
      }
    }
    opt[[item]] <- val
    return(opt)
  }

  showSomething <- function(opt,item,show){
    if(identical(show,TRUE)){
      opt[[item]] <- TRUE
    }else{
      opt[[item]] <- NULL
    }
    return(opt)
  }

  if(!is.numeric(cex)){
    cex <- formals(network_rd3)[["cex"]]
    warning("cex: must be numeric")
  }
  options[["cex"]] <- cex

  if(!(is.numeric(distance) && distance>=0 && distance<=100)){
    distance <- formals(network_rd3)[["distance"]]
    warning("distance: must be numeric between 0 and 100")
  }
  options[["distance"]] <- distance

  if(!(is.numeric(repulsion) && repulsion>=0 && repulsion<=100)){
    repulsion <- formals(network_rd3)[["repulsion"]]
    warning("repulsion: must be numeric between 0 and 100")
  }
  options[["repulsion"]] <- repulsion

  if(!(is.numeric(zoom) && zoom>=0.1 && zoom<=10)){
    zoom <- formals(network_rd3)[["zoom"]]
    warning("zoom: must be numeric between 0.1 and 10")
  }
  options[["zoom"]] <- zoom

  if(!is.null(scenarios)){
    if(is.numeric(scenarios)){
      options[["scenarios"]] <- scenarios
    }else{
      warning("scenarios: must be numeric")
    }
  }

  if (!is.null(limits)){
    if(length(limits)!=4){
      print("limits: must be a numeric list of length 4")
    }else{
      options[["limits"]] <- as.numeric(limits)
    }
  }
  if (!is.null(main)) options[["main"]] <- main
  if (!is.null(note)) options[["note"]] <- note
  if (!is.null(help)) options[["help"]] <- help
  if (!is.null(background)) options[["background"]] <- background
  
  options[["language"]] <- checkLanguage(language)

  if(is.null(help) && options[["language"]]=="es"){
    options[["help"]] <- paste0(scan(file = paste(wwwDirectory(), "help_es.html", sep = "/"), what = character(0), sep = "\n", quiet = TRUE),collapse="")
  }

  options <- showSomething(options,"nodeBipolar",nodeBipolar)
  options <- showSomething(options,"linkBipolar",linkBipolar)
  options <- showSomething(options,"helpOn",helpOn)
  options <- showSomething(options,"frequencies",frequencies)
  options[["defaultColor"]] <- defaultColor
  options[["controls"]] <- as.numeric(controls)
  options[["mode"]] <- tolower(substr(as.character(mode),1,1))
  if (!is.null(axesLabels)) options[["axesLabels"]] <- as.character(axesLabels)

  options <- showSomething(options,"fixed",fixed)

  options <- showSomething(options,"showCoordinates",showCoordinates)
  options <- showSomething(options,"showArrows",showArrows)
  options <- showSomething(options,"showLegend",showLegend)
  options <- showSomething(options,"showAxes",showAxes)

  # node options
  if(is.null(label)){
    options[["nodeLabel"]] <- name
  }else{
    options <- checkNodeColumn(options,"nodeLabel",label,nodes)
  }
  options <- checkNodeColumn(options,"nodeLabelSize",labelSize,nodes)
  options <- checkNodeColumn(options,"nodeGroup",group,nodes)
  options <- checkNodeColumn(options,"nodeSize",size,nodes)
  options <- checkNodeColumn(options,"nodeColor",color,nodes)
  options <- checkNodeColumn(options,"nodeShape",shape,nodes)
  options <- checkNodeColumn(options,"nodeLegend",legend,nodes)
  options <- checkNodeColumn(options,"nodeText",ntext,nodes)
  options <- checkNodeColumn(options,"nodeInfo",info,nodes)
  options <- checkNodeColumn(options,"nodeOrderA",orderA,nodes)
  options <- checkNodeColumn(options,"nodeOrderD",orderD,nodes)

  if (!is.null(image)){
    if(length(setdiff(image,colnames(nodes)))){
      warning("image: names must match in nodes colnames.")
    }else{
      options[["imageItems"]] <- image
      if(!is.null(imageNames)){
        if(length(imageNames)==length(image))
          options[["imageNames"]] <- imageNames
        else
          warning("imageNames: length must match with 'image' vector")
      }
    }
  }

  # link options
  options <- checkLinkColumn(options,"linkWidth",lwidth,links)
  options <- checkLinkColumn(options,"linkWeight",lweight,links)
  options <- checkLinkColumn(options,"linkColor",lcolor,links)
  options <- checkLinkColumn(options,"linkText",ltext,links)

  # filters
  if(!is.null(nodeFilter) || !is.null(linkFilter) || !is.null(degreeFilter)){
    hideLinks <- function(){
      if(!is.null(links)){
        hiddenNodes <- as.character(nodes[nodes[,"hidden"],name])
        links[(as.character(links[,source]) %in% hiddenNodes) | (as.character(links[,target]) %in% hiddenNodes),"hidden"] <- TRUE
      }
    }

    nodes[,"hidden"] <- FALSE
    if (!is.null(links)){
      links[,"hidden"] <- FALSE
    }

    if (!is.null(nodeFilter)){
      nodes[,"hidden"] <- !with(nodes,eval(parse(text=nodeFilter)))
      hideLinks()
    }

    if (!is.null(links) && !is.null(linkFilter)){
      links[,"hidden"] <- links[,"hidden"] | !with(links,eval(parse(text=linkFilter)))
    }

    if (!is.null(degreeFilter)){
      degreeFilter <- as.numeric(degreeFilter)
      if(length(degreeFilter)==1){
        degreeFilter <- c(degreeFilter,Inf)
      }
      if(is.null(links)){
        if(min(degreeFilter)>0){
          nodes[,"hidden"] <- TRUE
        }
      }else{
        nodes[,"degree"] <- rep(0,nrow(nodes))
        degrees <- table(c(as.character(links[!links[,"hidden"],source]),as.character(links[!links[,"hidden"],target])))
        nodes[names(degrees),"degree"] <- degrees
        nodes[,"hidden"] <- nodes[,"hidden"] | !(nodes[,"degree"]>=degreeFilter[1] & nodes[,"degree"]<=degreeFilter[2])
        nodes[,"degree"] <- NULL
        hideLinks()
      }
    }

    if(!sum(nodes[,"hidden"]))
      nodes[,"hidden"] <- NULL
    if(!sum(links[,"hidden"]))
      links[,"hidden"] <- NULL
  }

  #create net object
  net <- structure(list(links=links,nodes=nodes,options=options),class="network_rd3")

  #check tree
  if(!is.null(tree)){
    tree <- tree[tree[,1] %in% nodes[[name]] & tree[,2] %in% nodes[[name]] & as.character(tree[,2])!=as.character(tree[,1]),]
    if(nrow(tree)==0){
      warning("tree: no row (Source and Target) matches the name column of the nodes")
    }else{
      net$tree <- data.frame(Source=tree[,1],Target=tree[,2])
    }
  }

  #layout
  if (!is.null(layout)) {
    if(is.character(layout)){ 
      layoutName <- layoutControl(layout)
      if(exists("layoutName")){
        if(layoutName=="fo") layout <- coords[[layoutName]](toIgraph(net), criteria=lweight) 
        else layout <- coords[[layoutName]](toIgraph(net))
        if(layoutName=="su")layout=layout$layout
      }
    }
    net <- netAddLayout(net,layout)
  }

  #community
  community <- congloControl(community)
  if (!is.null(community)) {
    net$nodes$community <- igraph::membership(conglos[[community]](toIgraph(net)))
    net$nodes$community <- paste0("G.",sprintf(paste0("%0",nchar(max(net$nodes$community)),"d"),net$nodes$community))
    if (!("community" %in% unlist(net$options[c("nodeShape","nodeColor")])))
       net$options$nodeGroup <- "community"
  }

  if (!is.null(dir)) netCreate(net,dir)
  return(net)
}
