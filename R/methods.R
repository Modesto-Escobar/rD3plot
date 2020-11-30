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
    netCreate(x,"www")
    insertIncludeFile("www")
}

shiny_rd3.barplot_rd3 <- function(x){
    barCreate(x,"www")
    insertIncludeFile("www")
}

shiny_rd3.timeline_rd3 <- function(x){
    timeCreate(x,"www")
    insertIncludeFile("www")
}

insertIncludeFile <- function(dir){
    www <- wwwDirectory()
    file.copy(paste0(www,"/include.html"),dir)
    shiny::includeHTML(paste0(dir,"/include.html"))
}
