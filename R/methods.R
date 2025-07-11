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

print.treeGallery_rd3 <- function(x, ...){
  printTreeGallery(x)
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

printTreeGallery <- function(x){
  printMain(x)
  if(is.null(x$options$nodeNamesByType)){
    printTable(x$nodes,"Nodes")
    cat("\n")
  }else{
    for(t in names(x$options$nodeNamesByType)){
      cols <- x$options$nodeNamesByType[[t]]
      printTable(x$nodes[vapply(x$nodes$type,function(y){
        aux <- unlist(strsplit(y,"|",fixed=TRUE))
        if(length(aux)==1){
          return(aux==t)
        }else{
          return(t %in% aux)
        }
      },logical(1)),cols],t)
      cat("\n")
    }
  }
  if(!is.null(x$options$deepTree)){
    printTable(x$tree,"Tree")
  }else{
    printTable(links2table(x$tree),"Tree")
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
  plotObj(x, dir)
}

plot.barplot_rd3 <- function(x, dir = tempDir(), ...){
  plotObj(x, dir)
}

plot.timeline_rd3 <- function(x, dir = tempDir(), ...){
  plotObj(x, dir)
}

plot.gallery_rd3 <- function(x, dir = tempDir(), ...){
  plotObj(x, dir)
}

plot.pie_rd3 <- function(x, dir = tempDir(), ...){
  plotObj(x, dir)
}

plot.multi_rd3 <- function(x, dir = tempDir(), ...){
  if(length(x$options$mfrow)){
    polyGraph(x$graphs, x$options$mfrow, dir)
  }else{
    multiGraph(x$graphs, dir)
  }
  if(interactive()){
    browseURL(normalizePath(paste(dir, "index.html", sep = "/")))
  }else{
    message(paste0("The graph has been generated in the \"",normalizePath(dir),"\" path."))
  }
}

objCreate <- function(x,dir){
  if(inherits(x,"network_rd3")){
    netCreate(x,dir)
  }else if(inherits(x,"timeline_rd3")){
    timeCreate(x,dir)
  }else if(inherits(x,"barplot_rd3")){
    barCreate(x,dir)
  }else if(inherits(x,"gallery_rd3")){
    galleryCreate(x,dir)
  }else if(inherits(x,"pie_rd3")){
    pieCreate(x,dir)
  }else if(inherits(x,"evolMap")){
    if(system.file(package='evolMap')!=""){
      utils::getFromNamespace("map_html","evolMap")(x,dir)
    }else{
      stop("'evolMap' package not installed")
    }
  }
}

plotObj <- function(x,dir){
  objCreate(x,dir)
  if(interactive()){
    browseURL(normalizePath(paste(dir, "index.html", sep = "/")))
  }else{
    message(paste0("The graph has been generated in the \"",normalizePath(dir),"\" path."))
  }
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
