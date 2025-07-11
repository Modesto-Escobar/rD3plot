multiGraph <- function(multi,dir){
    items <- names(multi)
    options <- list(names=items)
    external <- rep(FALSE,length(multi))
    for(i in seq_along(multi)){
      if(is.character(multi[[i]]) && file.exists(paste0(multi[[i]],"/index.html"))){
        external[[i]] <- TRUE
      }
    }
    if(sum(external)){
      options$external <- external
    }
    createHTML(dir, "reset.css", "multigraph.js", toJSON(list(options=options)))
    dir.create(paste0(dir,"/data"))
    for(i in seq_along(multi)){
      if(is.character(multi[[i]])){
        if(file.exists(paste0(multi[[i]],"/index.html"))){
          file.copy(multi[[i]], paste0(dir,'/data'), recursive = TRUE)
          file.rename(paste0(dir,'/data/',basename(multi[[i]])),paste0(dir,'/data/',(i-1)))
        }
      }else{
        multi[[i]]$options$multigraph <- list(idx=(i-1),names=items)
        objCreate(multi[[i]],paste0(dir,"/data/",items[i]))
        file.rename(paste0(dir,"/data/",items[i]),paste0(dir,"/data/",(i-1)))
      }
    }
}

polyGraph <- function(multi,mfrow,dir){
  createHTML(dir, NULL, "polygraph.js", toJSON(list(options=list(mfrow=mfrow,n=length(multi)))))
  if(mfrow[1]*mfrow[2]>2){
    for(i in seq_along(multi)){
      multi[[i]]$options$controls <- NULL
    }
  }
  multiGraph(multi,paste0(dir,"/multiGraph"))
}

evolvingWrapper <- function(multi,frame,speed,loop=FALSE,lineplots=NULL){
  if(length(multi)<2){
    stop("Cannot make an evolving network with only one graph")
  }

  if(!all(vapply(multi, inherits, TRUE, what = "network_rd3"))){
    stop("All graphs must be 'network_rd3' objects")
  }

  if(is.null(names(multi)) || !all(!duplicated(names(multi)))){
    message("Graph names will be generated automatically")
    names(multi) <- paste0("graph",seq_along(multi))
  }

  name <- unique(vapply(multi,function(x){ return(x$options$nodeName) },character(1)))
  if(length(name)!=1)
    stop("name: all graphs must have the same name")
  nodenames <- colnames(multi[[1]]$nodes)
  linknames <- colnames(multi[[1]]$links)
  for(m in multi){
    if(!identical(nodenames,colnames(m$nodes)))
      stop("nodes: all graphs must have the same node columns")
    if(!identical(linknames,colnames(m$links)))
      stop("links: all graphs must have the same link columns")
  }

  frames <- names(multi)

  links <- lapply(multi,function(x){ return(x$links) })
  for(i in seq_along(frames)){
    if(!is.null(links[[i]])){
      links[[i]][["_frame_"]] <- i-1
    }
  }
  links <- do.call(rbind,links)
  rownames(links) <- NULL

  nodes <- data.frame(name=unique(unlist(lapply(multi,function(x){ return(x$nodes[[name]]) }))))
  nodes$name <- as.character(nodes$name)
  names(nodes) <- name
  for(n in nodenames){
    if(n!=name){
      nodes[[n]] <- sapply(nodes[[name]],function(x){
        values <- sapply(frames,function(f){
          return(multi[[f]]$nodes[x,n])
        })
        aux <- unique(values)
        if(length(aux)==1)
          return(aux)
        if(length(aux)<1)
          return(NA)
        values <- as.character(values)
        values[is.na(values)] <- ""
        return(paste0(values,collapse="|"))
      })
    }
  }

  options <- multi[[1]]$options
  getAll <- function(opt,item){
      items <- sapply(multi,function(x){
        if(!is.null(x$options[[item]]))
          return(x$options[[item]])
        else
          return(NA)
      })
      if(length(unique(items))!=1)
        opt[[item]] <- items
      return(opt)
  }
  for(i in c("main","note","repulsion","distance","zoom"))
    options <- getAll(options,i)
  options$frames <- frames
  options$frame <- frame
  options$speed <- speed
  if(identical(loop,TRUE)){
    options$loop <- TRUE
  }

  lineplots <- intersect(as.character(lineplots),union(union(names(nodes),names(links)),"degree"))
  if(length(lineplots)){
    options$lineplotsKeys <- lineplots
  }
  net <- structure(list(links=links,nodes=nodes,options=options),class="network_rd3")

  tree <- list()
  for(i in seq_along(frames)){
    if(!is.null(multi[[i]]$tree)){
      tree[[i]] <- multi[[i]]$tree
      tree[[i]][["_frame_"]] <- i-1
    }
  }
  if(length(tree)){
    tree <- do.call(rbind,tree)
    rownames(tree) <- NULL
    net$tree <- tree
  }

  return(net)
}

#create html wrapper for multigraph
rd3_multigraph <- function(..., mfrow = NULL, dir = NULL){
  graphs <- list(...)

  if(!length(graphs)){
    stop("no graphs have been passed")
  }

  addGraph <- function(res,g,n){
    if(is.null(n)){
      n <- paste0("graph",length(res)+1)
    }
    res[[n]] <- g
    return(res)
  }

  res <- list()
  nam <- character()
  for(i in seq_along(graphs)){
    g <- graphs[[i]]
    check <- FALSE
    for(cls in c("network_rd3","timeline_rd3","barplot_rd3","gallery_rd3","pie_rd3","multi_rd3","evolMap")){
      if(inherits(g,cls)){
        check <- TRUE
        break
      }
    }
    if(is.character(g) && file.exists(paste0(g,'/index.html'))){
      check <- TRUE
    }
    if(check){
      if(inherits(g,"multi_rd3")){
        for(j in seq_along(g$graphs)){
          gg <- g$graphs[[j]]
          res <- addGraph(res,gg,names(g$graphs)[j])
        }
      }else{
        res <- addGraph(res,g,names(graphs)[i])
      }
    }else{
      warning('Not supported object found.')
    }
  }

  options <- list()
  if(!is.null(mfrow)){
    if(is.numeric(mfrow) && length(mfrow)==2){
      options$mfrow <- as.numeric(mfrow)
    }else{
      warning("mfrow: must be a numeric vector of two values")
    }
  }

  if (!is.null(dir)){
    if(length(options$mfrow)){
      polyGraph(res,options$mfrow,dir)
    }else{
      multiGraph(res,dir)
    }
  }

  return(structure(list(graphs = res, options = options),class="multi_rd3"))
}

# Evolving network
evolNetwork_rd3 <- function(..., timelinks = NULL, timenodes = NULL,
    timestart = NULL, timeend = NULL,
    frame = 0, speed = 50, loop = FALSE, lineplots = NULL, dir = NULL){
  if(!(is.numeric(frame) && frame>=0)){
      frame <- formals(evolNetwork_rd3)[["frame"]]
      warning("frame: must be integer greater than 0")
  }
  if(!(is.numeric(speed) && speed>=0 && speed<=100)){
      speed <- formals(evolNetwork_rd3)[["speed"]]
      warning("speed: must be numeric between 0 and 100")
  }

  if(is.null(timestart)){
    multi <- list(...)
    for(i in seq_along(multi)){
      if(is.list(multi[[i]]) && all(vapply(multi[[i]], inherits, TRUE, what = "network_rd3"))){
        multi <- multi[[i]]
        break
      }
    }
    net <- evolvingWrapper(multi,frame,speed,loop,lineplots)
  }else{
    if(is.null(timelinks)){
      stop("timelinks: missing timelinks")
    }
    if(!(timestart %in% colnames(timelinks))){
      stop("timestart: missing timestart in timelinks")
    }
    if(!is.null(timeend) && !(timeend %in% colnames(timelinks))){
      stop("timeend: missing timeend in timelinks")
    }
    args <- list(...)
    net <- evolvingWrapper2(timelinks, timenodes, timestart, timeend, frame, speed, loop, lineplots, args)
  }
  if (!is.null(dir)) netCreate(net,dir)
  return(net)
}

evolvingWrapper2 <- function(timelinks, timenodes, timestart, timeend, frame = 0, speed = 50, loop = FALSE, lineplots = NULL, args = list()){
  args <- args[intersect(names(args),names(formals(network_rd3)))]
  timelinks <- timelinks[!is.na(timelinks[[timestart]]),]
  linkstimestart <- timelinks[[timestart]]
  getFrames <- function(frames){
    frames <- unique(frames)
    frames <- frames[!is.na(frames)]
    framesnum <- suppressWarnings(as.numeric(frames))
    if(!sum(is.na(framesnum))){
      frames <- sort(framesnum)
      frames <- as.character(frames)
    }
    return(frames)
  }
  if(!is.null(timeend)){
    linkstimeend <- timelinks[[timeend]]
    frames <- getFrames(c(linkstimestart,linkstimeend))
    linkstimeend[is.na(linkstimeend)] <- frames[length(frames)]
  }else{
    frames <- getFrames(linkstimestart)
    linkstimeend <- rep(frames[length(frames)],length(linkstimestart))
  }
  linkstimestart <- factor(linkstimestart,levels=frames)
  linkstimestart <- as.numeric(linkstimestart)
  linkstimeend <- factor(linkstimeend,levels=frames)
  linkstimeend <- as.numeric(linkstimeend)
  timelinks[[timestart]] <- NULL
  if(!is.null(timeend)){
    timelinks[[timeend]] <- NULL
  }
  totallinks <- list()
  for(i in seq_along(frames)){
    currentlinks <- timelinks[linkstimestart<=i & linkstimeend>=i,]
    if(nrow(currentlinks)){
      currentlinks[['_frame_']] <- i-1
      totallinks[[i]] <- currentlinks
    }
  }
  timelinks <- do.call(rbind,totallinks)
  if(is.null(args$source)){
    args$source <- colnames(args$links)[1]
  }
  if(is.null(args$target)){
    args$target <- colnames(args$links)[2]
  }
  if(!is.null(args$links)){
    args$links <- merge(args$links,timelinks,by=c(args$source,args$target))
  }else{
    args$links <- timelinks
  }

  if(!is.null(timenodes)){
    if(timestart %in% colnames(timenodes)){
      if(is.null(args$name)){
        args$name <- colnames(timenodes)[1]
      }
      nodenames <- unique(timenodes[[args$name]])
      nodes <- data.frame(name=nodenames)
      colnames(nodes)[1] <- args$name
      rownames(nodes) <- nodenames
      timenodes[['_timestart_']] <- timenodes[[timestart]]
      if(!is.null(timeend) && timeend %in% colnames(timenodes)){
        timenodes[['_timeend_']] <- timenodes[[timeend]]
      }else{
        timenodes[['_timeend_']] <- rep(frames[length(frames)],nrow(timenodes))
      }
      timenodes[['_timestart_']] <- factor(timenodes[['_timestart_']],levels=frames)
      timenodes[['_timeend_']] <- factor(timenodes[['_timeend_']],levels=frames)
      timenodes <- timenodes[!is.na(timenodes[['_timestart_']]) & !is.na(timenodes[['_timeend_']]),]
      timenodes[['_timestart_']] <- as.numeric(timenodes[['_timestart_']])
      timenodes[['_timeend_']] <- as.numeric(timenodes[['_timeend_']])
      for(col in setdiff(colnames(timenodes),c(args$name,'_timestart_','_timeend_',timestart,timeend))){
        nodes[[col]] <- NA
        for(n in nodenames){
          values <- character(length(frames))
          subtimenodes <- timenodes[timenodes[[args$name]]==n, c(col,'_timestart_','_timeend_'), drop=FALSE]
          for(f in seq_along(frames)){
            value <- subtimenodes[subtimenodes[,2]<=f & subtimenodes[,3]>=f, , drop=FALSE]
            if(nrow(value)>1){
              value <- value[value[,2]==max(value[,2]),1][1]
            }else{
              value <- value[1,1]
            }
            values[f] <- value
          }
          values <- paste0(values, collapse="|")
          nodes[n,col] <- values
        }
      }
      if(!is.null(args$nodes)){
        args$nodes <- merge(args$nodes,nodes,by=args$name,all=TRUE)
      }else{
        args$nodes <- nodes
      }
      allnodes <- data.frame(name=unique(c(args$links[[args$source]],args$links[[args$target]])))
      colnames(allnodes)[1] <- args$name
      args$nodes <- merge(allnodes,args$nodes,by=args$name,all.x=TRUE)
    }else{
      warning("timenodes: missing timestart in timenodes")
    }
  }

  special_cases <- list()
  for(i in c("main","note","repulsion","distance","zoom")){
    if(!is.null(args[[i]]) && length(args[[i]])>1){
      if(length(args[[i]])==length(frames)){
        special_cases[[i]] <- args[[i]]
      }else{
        stop(paste0(i,": length must be 1 or match with time frames"))
      }
      args[[i]] <- NULL
    }
  }

  net <- do.call(network_rd3,args)

  if(length(special_cases)){
    for(i in names(special_cases)){
      net$options[[i]] <- special_cases[[i]]
    }
  }

  net$options$frames <- frames
  net$options$frame <- frame
  net$options$speed <- speed
  if(identical(loop,TRUE)){
    net$options$loop <- TRUE
  }
  lineplots <- intersect(as.character(lineplots),union(union(names(net$nodes),names(net$links)),"degree"))
  if(length(lineplots)){
    net$options$lineplotsKeys <- lineplots
  }

  return(net)
}

# display multigraph with an index page
rd3_multiPages <- function(x, title = NULL, columns = NULL, imageSize = NULL, description = NULL, note = NULL, cex = 1, dir = tempDir(), show = FALSE){
  if(inherits(x,"multi_rd3")){
    multi <- x$graphs
    options <- list(names=names(multi))
    options$cex <- check_cex(cex)
    if(!is.null(title)){
      options$title <- title
    }
    images <- rep(NA,length(multi))
    descriptions <- rep(NA,length(multi))
    external <- rep(FALSE,length(multi))
    img2copy <- character()
    for(i in seq_along(multi)){
      if(is.list(multi[[i]])){
        if(is.character(multi[[i]]$description)){
          descriptions[[i]] <- multi[[i]]$description
        }
        if(is.character(multi[[i]]$image) && file.exists(multi[[i]]$image)){
          images[[i]] <- paste0("images/",basename(multi[[i]]$image))
          img2copy <- c(img2copy,multi[[i]]$image)
        }
      }
      if(is.character(multi[[i]]) && file.exists(paste0(multi[[i]],"/index.html"))){
        external[[i]] <- TRUE
      }
    }
    if(!all(is.na(images))){
      options$images <- images
    }
    if(!all(is.na(descriptions))){
      options$descriptions <- descriptions
    }
    if(sum(external)){
      options$external <- external
    }
    if(!is.null(columns)){
      if(is.numeric(columns)){
        options$columns <- as.numeric(columns[1])
      }else{
        warning("columns: must be a numeric vector")
      }
    }
    if(!is.null(description)){
      options$description <- as.character(description)
    }
    if(!is.null(note)){
      options$note <- as.character(note)
    }
    if(!is.null(imageSize)){
      if(is.numeric(imageSize)){
        options$imgsize <- as.numeric(imageSize)
      }else{
        warning("imageSize: must be a numeric vector")
      }
    }
    createHTML(dir, c("bootstrap.scrolling.nav.css","multipages.css"), "multipages.js", toJSON(list(options=options)))
    dir.create(paste0(dir,"/pages"))
    for(n in names(multi)){
      if(is.character(multi[[n]])){
        if(file.exists(paste0(multi[[n]],"/index.html"))){
          file.copy(multi[[n]], paste0(dir,'/pages'), recursive = TRUE)
        }
      }else{
        multi[[n]]$options$multipages <- TRUE
        objCreate(multi[[n]],paste0(dir,"/pages/",n))
      }
    }
    if(length(img2copy)){
      dir.create(paste0(dir,"/images"))
      for(img in img2copy){
        file.copy(img,paste0(dir,"/images"))
      }
    }
    if(interactive() && identical(show,TRUE)){
      browseURL(normalizePath(paste(dir, "index.html", sep = "/")))
    }else{
      message(paste0("The graph has been generated in the \"",normalizePath(dir),"\" path."))
    }
  }else{
    stop('x: not supported object.')
  }
}

rd3_addImage <- function(x,img){
  if(!is.character(img) || !file.exists(img)){
    stop('img: file not found.')
  }
  if(inherits(x,c("network_rd3","timeline_rd3","barplot_rd3","gallery_rd3","pie_rd3","evolMap"))){
    x$image <- img
    return(x)
  }else{
    stop('x: not supported object.')
  }
}

rd3_addDescription <- function(x,description){
  if(inherits(x,c("network_rd3","timeline_rd3","barplot_rd3","gallery_rd3","pie_rd3","evolMap"))){
    x$description <- as.character(description)
    return(x)
  }else{
    stop('x: not supported object.')
  }
}
