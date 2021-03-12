barplotJSON <- function(bar){
  return(toJSON(list(nodes=bar$nodes,links=bar$links,options=bar$options)))
}

barCreate <- function(bar, dir){
  language <- getLanguageScript(bar)
  createHTML(dir, c("reset.css","styles.css"), c("d3.min.js","jspdf.min.js","functions.js",language,"colorScales.js","barplot.js"), barplotJSON(bar))
}

barplot_rd3 <- function(events, links, name = NULL, select = NULL,
        source = NULL, target = NULL,
        label = NULL, text = NULL, color = NULL,
        incidences = NULL, coincidences = NULL,
        expected = NULL, confidence = NULL, level = .95, significance = NULL,
        sort = NULL, decreasing = FALSE,
        scalebar = FALSE, defaultColor = "#1f77b4", note = NULL, cex = 1,
        language = c("en","es","ca"), dir = NULL){

  if(is.null(name)){
    name <- colnames(events)[1]
  }
  events[[name]] <- as.character(events[[name]])
  if(is.null(incidences)){
    incidences <- colnames(events)[2]
  }
  if(is.null(source)){
    source <- colnames(links)[1]
  }
  if(is.null(target)){
    target <- colnames(links)[2]
  }
  if(is.null(coincidences)){
    coincidences <- colnames(links)[3]
  }
  notListed <- length(setdiff(union(links[[source]],links[[target]]),events[[name]]))
  if(notListed!=0){
    stop(paste(notListed," node link(s) not defined in '",name,"' column from events data frame."))
  }
  links <- cbind(Source=as.character(links[,source]), Target=as.character(links[,target]), links[,setdiff(colnames(links),c(source,target)), drop=FALSE])

  options <- list(name = name, incidences = incidences, coincidences = coincidences, defaultColor = defaultColor, cex = as.numeric(cex), language = checkLanguage(language))

  if(!is.null(note)){
      options[["note"]] <- note
  }
  if(!is.null(label)){
      options[["label"]] <- label
  }
  if(!is.null(text)){
      options[["text"]] <- text
  }
  if(!is.null(color)){
      options[["color"]] <- color
  }
  if(!is.null(select)){
      options[["select"]] <- select
  }
  options[["rev"]] <- as.integer(!decreasing)
  if(!is.null(sort)){
      if(sort %in% colnames(events)){
        options[["order"]] <- sort
        options[["rev"]] <- bitwXor(as.integer(is.numeric(events[,sort])),as.integer(decreasing))
      }else{
        warning("sort: must be a 'events' column")
      }
  }
  if(scalebar){
    options[["scalebar"]] <- TRUE
  }
  if(!is.null(expected)){
    options[["expected"]] <- expected
    if(!is.null(confidence)){
      options[["level"]] <- level
      options[["confidence"]] <- confidence
    }
  }
  if(!is.null(significance)){
    options[["significance"]] <- significance
  }

  bar <- structure(list(nodes=events, links=links, options=options), class="barplot_rd3")
  if (!is.null(dir)) barCreate(bar, dir)
  return(bar)
}

