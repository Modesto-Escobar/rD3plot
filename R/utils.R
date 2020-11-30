wwwDirectory = function(){
  path <- system.file("www",package="rD3plot")
  return(path)
}

createHTML <- function(directory, styles, dependencies, json){
  indexfile <- paste(directory, "index.html", sep = "/")
  if(file.exists(directory)){
    if(length(dir(directory))==0 || file.exists(indexfile)){
      unlink(directory, recursive = TRUE)
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

  scripts <- "<!--scripts-->"
  if(length(styles)){
    dir.create(paste(directory, "styles", sep = "/"),FALSE)
  }
  for(i in styles){
    scripts <- paste(scripts, paste0("<link rel=\"stylesheet\" type=\"text/css\" href=\"styles/",i,"\"></link>"), sep = "\n")
    file.copy(paste(www, i, sep = "/"), paste(directory, "styles", sep = "/"))
    if(i=="styles.css"){
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
    if(is.function(json))
      json <- json()

    enc <- Encoding(json)
    if(enc=="latin1" || (l10n_info()[["Latin-1"]] && enc=="unknown")){
      Encoding(json) <- "latin1"
      json <- enc2utf8(json)
    }

    html[html=="<!--json-->"] <- paste0('<script type="application/json" id="data">',json,'</script>')
  }

  con <- file(indexfile, encoding = "UTF-8")
  writeLines(html,con)
  close(con)
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
    mod <- suppressWarnings(x%%1)
    if(is.nan(mod)){
      warning("Non-finite values not supported")
      return("null")
    }
    if(mod!=0)
      x <- signif(x,4)
    return(toString(x))
  }

  sanitize_string <- function(x){
    x <- unname(x)
    n <- suppressWarnings(as.numeric(x))
    if(is.na(n)){
      x <- gsub("[[:cntrl:]]","",x)
      x <- tryCatch(gsub("[\U00010000-\Uffffffff]","",x),error=function(cond){ return(x) })
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

tempDir <- function(){
  dir.create("temp", showWarnings = FALSE)
  return(paste("temp",round(as.numeric(Sys.time())),sep="/"))
}

rescale <- function(x) {
  to <- c(0, 1)
  from <- range(x, na.rm = TRUE, finite = TRUE)
  return((x - from[1]) / diff(from) * diff(to) + to[1])
}

toColorScale <- function(items){
  if(is.numeric(items)){
    return(hsv(1,1,rescale(items)))
  }else{
    colors <- c(
  "#1f77b4", # blue
  "#2ca02c", # green
  "#d62728", # red
  "#9467bd", # purple
  "#ff7f0e", # orange
  "#8c564b", # brown
  "#e377c2", # pink
  "#7f7f7f", # grey
  "#bcbd22", # lime
  "#17becf", # cyan
  "#aec7e8", # light blue
  "#98df8a", # light green
  "#ff9896", # light red
  "#c5b0d5", # light purple
  "#ffbb78", # light orange
  "#c49c94", # light brown
  "#f7b6d2", # light pink
  "#c7c7c7", # light grey
  "#dbdb8d", # light lime
  "#9edae5" # light cyan
     )
    items <- as.numeric(as.factor(items))
        items <- ((items-1) %% length(colors))+1
    return(colors[items])
  }
}

# igraph -> network_rd3
fromIgraph <- function(G, ...){
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
toIgraph <- function(net){
  if (inherits(net,c("network_rd3","netCoin"))){
    nodes <- net$nodes
    links <- net$links
    if(is.null(links)){
      links <- data.frame(Source=character(), Target=character())
    }
    options <- net$options

    #network direction
    if(exists("showArrows",net$options)){
      directed <- net$show$Arrows
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

