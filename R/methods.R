print.network_rd3 <- function(x, ...) {
  printNet(x)
}

print.barplot_rd3 <- function(x, ...) {
  printNet(x)
}

print.timeline_rd3 <- function(x, ...) {
  printNet(x)
}

print.gallery_rd3 <- function(x, ...) {
  printNet(x)
}

printNet <- function(x){
  if(!is.null(x$options$main))
    cat("Title:",x$options$main,"\n")
    cat("\nNodes(",nrow(x$nodes),"):\n",sep="")
  row.names(x$nodes)<-NULL
  print(as.data.frame(head(x$nodes[,setdiff(names(x$nodes),c("hidden","chaine","fx","fy")),drop=FALSE])),row.names=F)
  if (nrow(x$nodes)>6) cat("...\n")
  if(!is.null(x$links)){
    cat("\nLinks(",nrow(x$links),"):\n",sep="")
    row.names(x$links)<-NULL
    print(as.data.frame(head(x$links[,setdiff(names(x$links),c("hidden","chaine"))])),row.names=F)
    if (nrow(x$links)>6) cat("...\n")
  }
  cat("\n")
  if(!is.null(x$options$note)){
    cat(x$options$note)
    cat("\n")
  }
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
