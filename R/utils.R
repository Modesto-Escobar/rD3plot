wwwDirectory = function(){
  path <- system.file("www",package="rD3plot")
  return(path)
}

createHTML <- function(directory, styles, dependencies, json, fixed_viewport = FALSE){
  indexfile <- paste(directory, "index.html", sep = "/")
  if(file.exists(directory)){
    if(file.exists(indexfile)){
      content <- scan(file = indexfile, what = character(0), sep = "\n", quiet = TRUE)
      if(sum(content=="<!--netCoin Project-->")==1){
        unlink(directory, recursive = TRUE)
      }else{
        stop(paste0("directory: '",directory,"' already exists"))
      }
    }else{
      stop(paste0("directory: '",directory,"' already exists"))
    }
  }
  dir.create(directory)

  www <- wwwDirectory()
  html <- scan(file = paste(www, "template.html", sep = "/"), what = character(0), sep = "\n", quiet = TRUE)
  name <- strsplit(directory,"/")[[1]]
  name <- name[length(name)]
  html <- sub("titulo", name, html)

  if(fixed_viewport){
    html <- sub("<!--netCoin Project-->", '<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />\n<!--netCoin Project-->', html)
  }

  scripts <- "<!--scripts-->"
  if(length(styles)){
    dir.create(paste(directory, "styles", sep = "/"),FALSE)
  }
  for(i in styles){
    scripts <- paste(scripts, paste0("<link rel=\"stylesheet\" type=\"text/css\" href=\"styles/",i,"\"></link>"), sep = "\n")
    file.copy(paste(www, i, sep = "/"), paste(directory, "styles", sep = "/"))
    if(i=="styles.css" || i=="styles2.css"){
      for(font in c("Roboto-Regular-latin.woff2","Roboto-Regular-latin-ext.woff2")){
        file.copy(paste(www, font, sep = "/"), paste(directory, "styles", sep = "/"))
      }
    }
  }

  if(length(dependencies)){
    dir.create(paste(directory, "scripts", sep = "/"),FALSE)
  }
  for(i in dependencies){
    scripts <- paste(scripts, paste0("<script src=\"scripts/",i,"\"></script>"), sep = "\n")
    file.copy(paste(www, i, sep = "/"), paste(directory, "scripts", sep = "/"))
  }
  html[html=="<!--scripts-->"] <- scripts

  if(!is.null(json)){
    if(is.function(json)){
      json <- json()
    }

    json <- check_utf8(json)

    html[html=="<!--json-->"] <- paste0('<script type="application/json" id="data">',json,'</script>')
  }

  con <- file(indexfile, encoding = "UTF-8")
  writeLines(html,con)
  close(con)
}

check_utf8 <- function(text){
    enc <- Encoding(text)
    if(enc=="latin1" || (l10n_info()[["Latin-1"]] && enc=="unknown")){
      Encoding(text) <- "latin1"
      text <- enc2utf8(text)
    }
    return(text)
}

getLanguageScript <- function(obj){
  if(typeof(obj)=="list" && !is.null(obj$options)){
    language <- obj$options$language
    if(!is.null(language) && language[1] %in% c("es","ca"))
      language <- paste0(language[1],".js")
    else
      language <- "en.js"
    return(language)
  }else
    return(NULL)
}


toJSON <- function(x){

  prepare_number <- function(x){
    if(!length(x)){
      return("null")
    }
    mod <- suppressWarnings(x%%1)
    if(is.nan(mod)){
      warning("Non-finite values not supported")
      return("null")
    }
    if(mod!=0){
      x <- signif(x,4)
    }
    return(toString(x))
  }

  sanitize_string <- function(x){
    x <- unname(x)
    n <- suppressWarnings(as.numeric(x))
    if(is.na(n)){
      x <- gsub("[[:cntrl:]]","",x)
      x <- deparse(x)
      if(l10n_info()[["Latin-1"]]){
        x <- gsub("([^\\])\\\\[0-7]{3}","\\1_",x)
        x <- gsub("<U\\+([0-9a-fA-F]{4})>","\\\\u\\1",x)
      }
      if(l10n_info()[["UTF-8"]]){
        x <- gsub("([^\\])\\\\x([0-9a-fA-F]{2})","\\1_",x)
      }
      return(x)
    }else
      return(prepare_number(n))
  }

  json <- ""
  if(inherits(x,"POSIXt")){
    json <- toJSON(as.character(x))
  }else if(length(x)<=1){
    if(is.null(x)||identical(is.na(x),TRUE)){
        json <- "null"
    }else if(is.vector(x)){
        if(is.numeric(x)){
          json <- prepare_number(x)
        }else if(is.logical(x)){
          if(x){
            json <- "true"
          }else{
            json <- "false"
          }
        }else if(is.character(x)){
          json <- sanitize_string(x)
        }else if(is.list(x)){
          if(length(x)==0){
            json <- "{}"
          }else if(is.null(names(x))){
            json <- paste0("[", toJSON(x[[1]]), "]", collapse = "")
          }else{
            aux <- paste0('"',names(x),'":',toJSON(x[[1]]))
            json <- paste0("{", aux, "}", collapse = "")
          }
        }
    }else if(is.factor(x)){
        json <- sanitize_string(as.character(x))
    }else if(is.array(x)){
        aux <- "null"
        if(length(dim)==1)
          aux <- toJSON(x[1])
        else if(length(dim)==2 && dim(x)[1] > 0 && dim(x)[2] > 0)
          aux <- toJSON(x[1,1])
        json <- paste0("[",aux,"]", collapse = "")
    }else if(is.data.frame(x)){
        aux <- apply(x, 1, function(x)  paste0('{', paste0('"',names(x)[1],'":',toJSON(x)), '}', collapse = ""))
        aux <- paste0(aux , collapse = ",")
        json <- paste0("[", aux, "]", collapse = "")
    }
  }else if(is.data.frame(x)){      
      aux <- lapply(seq_len(dim(x)[1]), function(x,z)
        paste0("{", paste0(lapply(seq_along(z[x,]), function(x,y,n)
          paste0('"',n[[x]],'":',toJSON(y[[x]])),
        y=z[x,], n=names(z)), collapse = ","), "}", collapse = ""),
      z=x)
      aux <- paste0(aux , collapse = ",")
      json <- paste0("[", aux, "]", collapse = "")
  }else if(is.list(x)){
      if(is.null(names(x))){
        aux <- vapply(x, function(x){
          if(is.vector(x)||is.factor(x))
            toJSON(array(x))
          else
            toJSON(x)
        }, character(1))
        aux <- paste0(aux, collapse = ",")
        json <- paste0("[", aux, "]", collapse = "")
      }else{
        aux <- vapply(x, toJSON, character(1))
        aux <- paste0('"',names(x),'":',aux)
        aux <- paste0(aux , collapse = ",")
        json <- paste0("{", aux, "}", collapse = "")
      }      
  }else if(is.array(x)){
      aux <- apply(x, 1, toJSON)
      aux <- paste0(aux, collapse = ",")
      json <- paste0("[", aux, "]", collapse = "")
  }else if(is.vector(x)||is.factor(x)){
      aux <- paste0(vapply(x, toJSON, character(1)), collapse = ",")
      json <- paste0("[", aux, "]", collapse = "")
  }
  return(json)
}

checkLanguage <- function(language){
  language <- language[1]
  if(!(language %in% c("en","es","ca"))){
      warning(paste0("language: '",language,"' is not supported"))
      language <- "en"
  }
  return(language)
}

check_cex <- function(cex){
  if(!is.numeric(cex)){
    cex <- 1
    warning("cex: must be numeric")
  }else if(cex>2){
    warning("cex: the font may be too large for proper display")
  }
  return(cex)
}

tempDir <- function(){
  dir.create("temp", showWarnings = FALSE)
  return(paste("temp",round(as.numeric(Sys.time())),sep="/"))
}

capitalize <- function(word){
  return(paste0(toupper(substr(word,1,1)),tolower(substr(word,2,nchar(word)))))
}

symbolTypes <- function(){
  return(c(
    "Circle",
    "Square",
    "Diamond",
    "Triangle",
    "Cross",
    "Star",
    "Wye"
  ))
}

isShape <- function(shape){
  shape <- capitalize(shape)
  shapes1 <- symbolTypes()
  comp <- sapply(shape,function(x){ return(x %in% shapes1) })
  if(all(comp)){
    return(TRUE)
  }
  return(FALSE)
}

getShapes <- function(items){
  shapes1 <- symbolTypes()
  if(!is.numeric(items)){
    items <- as.numeric(as.factor(items))
  }
  items <- ((items-1) %% length(shapes1))+1
  return(shapes1[items])
}

isColor <- function(color){
  if(!length(color)){
    return(FALSE)
  }
  return(tryCatch({
    col2rgb(color)
    return(TRUE)
  }, error=function(cond){
    return(FALSE)
  }))
}

col2hex <- function(color){
  return(apply(col2rgb(color),2,function(x){
    tolower(rgb(x[1],x[2],x[3],maxColorValue=255))
  }))
}

rescale <- function(x) {
  to <- c(0, 1)
  from <- range(x, na.rm = TRUE, finite = TRUE)
  return((x - from[1]) / diff(from) * diff(to) + to[1])
}

categoryColors <- function(items){
    colors1 <- c(
  "#1f77b4", # blue
  "#ff7f0e", # orange
  "#2ca02c", # green
  "#e377c2", # pink
  "#d62728", # red
  "#bcbd22", # lime
  "#9467bd", # purple
  "#8c564b", # brown
  "#7f7f7f", # grey
  "#17becf", # cyan
  "#aec7e8", # light blue
  "#ffbb78", # light orange
  "#98df8a", # light green
  "#f7b6d2", # light pink
  "#ff9896", # light red
  "#dbdb8d", # light lime
  "#c5b0d5", # light purple
  "#c49c94", # light brown
  "#c7c7c7", # light grey
  "#9edae5" # light cyan
    )
    if(!is.numeric(items)){
      items <- as.numeric(as.factor(items))
    }
    items <- ((items-1) %% length(colors1))+1
    return(colors1[items])
}

toColorScale <- function(items){
  if(is.numeric(items)){
    return(hsv(1,1,rescale(items)))
  }else{
    return(categoryColors(items))
  }
}

# checking options
checkColumn <- function(opt,item,variable){
    val <- NULL
    if(!is.null(variable)){
      if(!(variable=="" || identical(variable,FALSE))){
          val <- variable
      }
    }
    opt[[item]] <- val
    return(opt)
}

checkItemValue <- function(net,items,itemprop,value,propName,isItem,autoItems,sanitize){
    prepareVar <- function(var){
          if(is.numeric(var) || is.factor(var)){
            var <- autoItems(var)
          }else if(is.character(var) && isItem(var)){
            var <- sanitize(var)
          }else{
            var <- NULL
            warning(paste0(propName,": this value cannot be a ",propName))
          }
          return(var)
    }
    if(is.null(value)){
      net$options[[itemprop]] <- NULL
    }else if(is.matrix(value) || is.data.frame(value)){
      if(nrow(value)==nrow(net[[items]])){
        for(k in colnames(value)){
          var <- prepareVar(value[[k]])
          if(!is.null(var)){
            if(k %in% colnames(net[[items]])){
              itemlegend <- as.character(net[[items]][[k]])
            }else{
              itemlegend <- as.character(value[[k]])
            }
            net[[items]][[k]] <- itemlegend
            net[[items]][[paste0("_",itemprop,"_",k)]] <- var
          }
        }
        net$options[[itemprop]] <- colnames(value)[1]
      }else{
        warning(paste0(propName,": number of rows doesn't match with ",items))
      }
    }else if(length(value)>1 || (isItem(value) && !(value %in% colnames(net[[items]])))){
        if(length(value)==1){
          value <- rep(value,nrow(net[[items]]))
        }
        if(length(value)==nrow(net[[items]])){
          if(!is.null(names(value))){
            itemlegend <- names(value)
          }else{
            itemlegend <- as.character(value)
          }
          value <- prepareVar(value)
          if(!is.null(value)){
            net[[items]][[paste0("-",itemprop,"-")]] <- itemlegend
            net[[items]][[paste0("_",itemprop,"_-",itemprop,"-")]] <- value
            net$options[[itemprop]] <- paste0("-",itemprop,"-")
          }
        }else{
          warning(paste0(propName,": value length doesn't match with ",items,"' number of rows"))
        }
    }else{
      net$options <- checkColumn(net$options,itemprop,value)
    }
    return(net)
}

showSomething <- function(opt,item,show){
    if(identical(show,TRUE)){
      opt[[item]] <- TRUE
    }else{
      opt[[item]] <- NULL
    }
    return(opt)
}

check_defaultColor <- function(defaultColor){
  if(!is.null(defaultColor)){
    if(isColor(defaultColor)){
      return(col2hex(defaultColor))
    }else{
      warning("defaultColor: you must pass a valid color")
    }
  }
  return(NULL)
}

# igraph -> network_rd3
rd3_fromIgraph <- function(G, ...){
  if (inherits(G,"igraph")){

    #arguments
    arguments <- list(...)

    #main
    if(is.null(arguments$main) && !is.null(G$name))
      arguments$main <- G$name

    #network direction
    if(is.null(arguments$showArrows) && igraph::is_directed(G))
      arguments$showArrows <- TRUE

    #nodes
    nodeNames <- igraph::V(G)$name
    if(is.null(nodeNames))
      nodeNames <- as.character(seq_along(igraph::V(G)))
    nodes <- data.frame(name=nodeNames)
    if(is.null(arguments$name))
      arguments$name <- "name"
    names(nodes)[1] <- arguments$name

    #links
    links <- igraph::get.edgelist(G)
    links <- data.frame(Source=links[,1],Target=links[,2])

    #vertex attributes
    nargs <- c(label="label", label.cex="labelSize", size="size", color="color", shape="shape")
    for(i in igraph::list.vertex.attributes(G)){
      nodes[[i]] <- igraph::get.vertex.attribute(G,i)
      if(i %in% names(nargs) && !(nargs[i] %in% names(arguments)))
        arguments[[nargs[i]]] <- i
    }

    #edges attributes
    largs <- c(width="lwidth", weight="lweight", color="lcolor", label="ltext")
    for(i in igraph::list.edge.attributes(G)){
      links[[i]] <- igraph::get.edge.attribute(G,i)
      if(i %in% names(largs) && !(largs[i] %in% names(arguments)))
        arguments[[largs[i]]] <- i
    }

    #net elaborarion
    arguments$nodes <- nodes
    arguments$links <- links
    return(do.call(network_rd3,arguments))
  }else
    warning("is not an igraph object")
}

# network_rd3 -> igraph
rd3_toIgraph <- function(net){
  if (inherits(net,"network_rd3")){
    nodes <- net$nodes
    links <- net$links
    if(is.null(links)){
      links <- data.frame(Source=character(), Target=character())
    }
    options <- net$options

    #network direction
    if(exists("showArrows",net$options)){
      directed <- net$options$showArrows
    }else{
      directed <- FALSE
    }

    #nodes
    nargs <- c(name="nodeName", label="nodeLabel", label.cex="nodeLabelSize", size="nodeSize", color="nodeColor", shape="nodeShape")
    for(n in names(nargs)){
      col <- options[[nargs[[n]]]]
      if(!is.null(col) && col %in% colnames(nodes)){
        nodes[[n]] <- nodes[[col]]
      }
    }
    if("fx" %in% colnames(nodes)){
      colnames(nodes)[which(colnames(nodes)=="fx")] <- "x"
    }
    if("fy" %in% colnames(nodes)){
      colnames(nodes)[which(colnames(nodes)=="fy")] <- "y"
    }
    nodes <- nodes[,c("name",setdiff(colnames(nodes),"name"))]

    #links
    links <- links[,union(c("Source","Target"),colnames(links))]
    colnames(links)[1:2] <- c("from","to")
    largs <- c(width="lwidth", weight="lweight", color="lcolor", label="ltext")
    for(l in names(largs)){
      col <- options[[largs[[l]]]]
      if(!is.null(col) && col %in% colnames(links))
        links[[l]] <- links[[col]]
    }

    #handle colors
    if("color" %in% colnames(nodes)){
      nodes[,"color"] <- toColorScale(nodes[,"color"])
    }
    if("color" %in% colnames(links)){
      links[,"color"] <- toColorScale(links[,"color"])
    }

    #igraph network
    return(igraph::graph_from_data_frame(links, directed=directed, vertices=nodes))
  }else{
    warning("Is not a network_rd3 object")
  }
}

base64encode <- function(filename) {
  to.read = file(filename, "rb")
  fsize <- file.size(filename)
  sbit <- readBin(to.read, raw(), n = fsize, endian = "little")
  close(to.read)
  b64c <- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  shfts <- c(18,12,6,0)
  sand <- function(n,s) bitwAnd(bitwShiftR(n,s),63)+1
  slft <- function(p,n) bitwShiftL(as.integer(p),n)
  subs <- function(s,n) substring(s,n,n)
  npad <- ( 3 - length(sbit) %% 3) %% 3
  sbit <- c(sbit,as.raw(rep(0,npad)))
  pces <- lapply(seq(1,length(sbit),by=3),function(ii) sbit[ii:(ii+2)])
  encv <- paste0(sapply(pces,function(p) paste0(sapply(shfts,function(s)(subs(b64c,sand(slft(p[1],16)+slft(p[2],8)+slft(p[3],0),s)))))),collapse="")
  if (npad > 0) substr(encv,nchar(encv)-npad+1,nchar(encv)) <- paste0(rep("=",npad),collapse="")
  return(encv)
}

