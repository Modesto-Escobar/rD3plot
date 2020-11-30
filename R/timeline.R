timelineJSON <- function(time){
  json <- list(nodes=time$nodes)
  if(!is.null(time$events))
    json$events <- time$events
  json$options <- time$options
  return(toJSON(json))
}

timeCreate <- function(time, dir){
  language <- getLanguageScript(time)
  createHTML(dir, c("reset.css","styles.css"), c("d3.min.js","jspdf.min.js","functions.js",language,"colorScales.js","timeline.js"), timelineJSON(time))
}

timeline_rd3 <- function(nodes, name = "name", start = "start", end = "end", group = NULL,
                     text = NULL, main = NULL, note = NULL, info = NULL, events = NULL,
                     eventChild = "eventChild", eventParent = "eventParent", eventTime = "Time",
                     eventColor = NULL, eventShape = NULL,
                     cex = 1, language = c("en","es","ca"), dir = NULL){
  if(length(setdiff(c(name,start,end),names(nodes))))
    stop("name, start and end: must be present in nodes data frame as columns.")
  options <- list(name = name, start = start, end = end, cex = as.numeric(cex))
  if (!is.null(group)) options[['group']] <- group
  if (!is.null(text)) options[['text']] <- text
  if (!is.null(main)) options[['main']] <- main
  if (!is.null(note)) options[['note']] <- note
  if (!is.null(info)) options[['info']] <- info
  options[["language"]] <- checkLanguage(language)
  time <- structure(list(nodes=nodes,options=options),class="timeline_rd3")
  if(!is.null(events)){
    events <- events[order(events[[eventTime]]),]
    time[['events']] <- events
    time[['options']][['eventChild']] <- eventChild
    time[['options']][['eventParent']] <- eventParent
    time[['options']][['eventTime']] <- eventTime
    if(!is.null(eventColor))
      time[['options']][['eventColor']] <- eventColor
    if(!is.null(eventShape))
      time[['options']][['eventShape']] <- eventShape
  }
  if (!is.null(dir)) timeCreate(time, dir)
  return(time)
}
