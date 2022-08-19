print.network_rd3 <- function(x, ...) {
  printNetwork(x)
}

print.barplot_rd3 <- function(x, ...) {
  printNetwork(x)
}

print.timeline_rd3 <- function(x, ...) {
  printTimeline(x)
}

print.gallery_rd3 <- function(x, ...) {
  printNetwork(x)
}

print.pie_rd3 <- function(x, ...) {
  aux <- x$data
  if(!is.null(x$labels)){
    names(aux) <- x$labels
  }
  print(aux)
}

print.multi_rd3 <- function(x, ...) {
  print(paste0("A collection of ",length(x$graphs)," graphs"))
}

printMain <- function(x){
  if(!is.null(x$options$main)){
    cat("Title:",x$options$main,"\n")
  }
}

printTable <- function(x, name){
  cat("\n",name,"(",nrow(x),"):\n",sep="")
  row.names(x)<-NULL
  print(as.data.frame(head(x)),row.names=F)
  if (nrow(x)>6) cat("...\n")
}

printNote <- function(x){
  if(!is.null(x$options$note)){
    cat(x$options$note)
    cat("\n")
  }
}

printNetwork <- function(x){
  printMain(x)
  printTable(x$nodes[,setdiff(names(x$nodes),c("hidden","chaine","fx","fy")),drop=FALSE],"Nodes")
  if(!is.null(x$links)){
    printTable(x$links[,setdiff(names(x$links),c("hidden","chaine"))],"Links")
  }
  cat("\n")
  printNote(x)
}

printTimeline <- function(x){
  printMain(x)
  printTable(x$periods,"Periods")
  if(!is.null(x$events)){
    printTable(x$events,"Events")
  }
  cat("\n")
  printNote(x)
}

plot.network_rd3 <- function(x, dir = tempDir(), ...){
  plotObj(x, dir, netCreate)
}

plot.barplot_rd3 <- function(x, dir = tempDir(), ...){
  plotObj(x, dir, barCreate)
}

plot.timeline_rd3 <- function(x, dir = tempDir(), ...){
  plotObj(x, dir, timeCreate)
}

plot.gallery_rd3 <- function(x, dir = tempDir(), ...){
  plotObj(x, dir, galleryCreate)
}

plot.pie_rd3 <- function(x, dir = tempDir(), ...){
  plotObj(x, dir, pieCreate)
}

plot.multi_rd3 <- function(x, dir = tempDir(), ...){
  if(length(x$options$parallel) && x$options$parallel){
    plotObj(x$graphs, dir, polyGraph)
  }else{
    plotObj(x$graphs, dir, multiGraph)
  }
}

plotObj <- function(x,dir,callback){
     callback(x,dir)
     browseURL(normalizePath(paste(dir, "index.html", sep = "/")))
}

shiny_rd3 <- function(x) UseMethod("shiny_rd3", x)

shiny_rd3.network_rd3 <- function(x){
    addIframe(x,netCreate)
}

shiny_rd3.barplot_rd3 <- function(x){
    addIframe(x,barCreate)
}

shiny_rd3.timeline_rd3 <- function(x){
    addIframe(x,timeCreate)
}

addIframe <- function(x,callback){
    directory <- "rD3plot_files"
    dir.create(directory, showWarnings = FALSE)
    time <- round(as.numeric(Sys.time()))
    callback(x,paste0(directory,"/",time))
    shiny::addResourcePath("rD3plot", directory)
    shiny::tags$iframe(src=paste0("/rD3plot/",time,"/index.html"), style="border:none; overflow:hidden; width:100%; height:100%; min-height:600px;")
}
