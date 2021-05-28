timelineJSON <- function(time){
  json <- list(periods=time$periods)
  if(!is.null(time$events))
    json$events <- time$events
  json$options <- time$options
  return(toJSON(json))
}

timeCreate <- function(time, dir){
  language <- getLanguageScript(time)
  createHTML(dir, c("reset.css","styles.css"), c("d3.min.js","jspdf.min.js","functions.js",language,"colorScales.js","timeline.js"), timelineJSON(time))
}

timeline_rd3 <- function(periods, name = "name", start = "start", end = "end", group = NULL,
             text = NULL, main = NULL, note = NULL, info = NULL,
             events = NULL, eventNames = "name", eventPeriod = "period",
             eventTime = "date", eventColor = NULL, eventShape = NULL,
             cex = 1, language = c("en","es","ca"), dir = NULL){
  if(length(setdiff(c(name,start,end),names(periods))))
    stop("name, start and end: must be present in periods data frame as columns.")
  options <- list(name = name, start = start, end = end, cex = check_cex(cex))
  if (!is.null(group)) options[['group']] <- group
  if (!is.null(text)) options[['text']] <- text
  if (!is.null(main)) options[['main']] <- main
  if (!is.null(note)) options[['note']] <- note
  if (!is.null(info)) options[['info']] <- info
  options[["language"]] <- checkLanguage(language)

  if(inherits(periods[[start]],"POSIXct") && inherits(periods[[end]],"POSIXct")){
    options[["POSIXct"]] <- TRUE
  }
  periods[[start]] <- as.numeric(periods[[start]])
  periods[[end]] <- as.numeric(periods[[end]])

  time <- structure(list(periods=periods,options=options),class="timeline_rd3")
  if(!is.null(events)){
    events <- events[order(events[[eventTime]]),]
    time[['events']] <- events
    time[['options']][['eventNames']] <- eventNames
    time[['options']][['eventPeriod']] <- eventPeriod
    time[['options']][['eventTime']] <- eventTime
    if(!is.null(eventColor))
      time[['options']][['eventColor']] <- eventColor
    if(!is.null(eventShape))
      time[['options']][['eventShape']] <- eventShape
  }
  if (!is.null(dir)) timeCreate(time, dir)
  return(time)
}
