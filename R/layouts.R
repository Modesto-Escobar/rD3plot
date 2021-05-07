coords<-list(
  da=function(...)igraph::layout.davidson.harel(...),
  dr=function(...)igraph::layout.drl(...),
  ci=function(...)igraph::layout.circle(...),
  fo=function(...)layout.force.atlas.2(...),
  fr=function(...)igraph::layout.fruchterman.reingold(...),
  ge=function(...)igraph::layout.gem(...),
  gr=function(...)igraph::layout.grid(...),
  ka=function(...)igraph::layout.kamada.kawai(...),
  lg=function(...)igraph::layout.lgl(...),
  md=function(...)igraph::layout.mds(...),
  ra=function(...)igraph::layout.random(...),
  re=function(...)igraph::layout.reingold.tilford(...),
  st=function(...)igraph::layout.star(...),
  su=function(...)igraph::layout.sugiyama(...)
)

conglos<-list(
  ed=function(...)igraph::cluster_edge_betweenness(...),
  fa=function(...)igraph::cluster_fast_greedy(...),
  la=function(...)igraph::cluster_label_prop(...),
  le=function(...)igraph::cluster_leading_eigen(...),
  lo=function(...)igraph::cluster_louvain(...),
  op=function(...)igraph::cluster_optimal(...),
  sp=function(...)igraph::cluster_spinglass(...),
  wa=function(...)igraph::cluster_walktrap(...)
)

layoutControl<-function(layout){
  if (!is.null(layout)){
    layouts<-c("da","dr","ci","fo","fr","ge","gr","ka","lg","md","ra","re","st","su")
    layout<-gsub("layout.","",layout)
    layout<-(tolower(substr(layout,1,2)))
    if (layout %in% layouts) return (layout)
    else {
      text<-paste(layout, "is not a valid layout")
      warning(text)
      return(NULL)
    }
  }
}

congloControl<-function(conglo){
  if (!is.null(conglo)){
    conglos<-c("ed","fa","la","le","lo","op","sp","wa")
    conglo<-gsub("cluster_","",conglo)
    conglo<-(tolower(substr(conglo,1,2)))
    if (!(conglo %in% conglos)){
      warning(paste(conglo, "is not a valid layout"))
      conglo <- NULL
    }
  }
  return(conglo)
}

rd3_layoutCircle <- function(N,nodes=seq_len(nrow(N)),deg=0,name=NULL){
  N[,"x"] <- NA
  N[,"y"] <- NA

  if(!is.null(name)) rownames(N) <- N[[name]]
  if(is.numeric(nodes)||is.character(nodes)){
    if(is.numeric(nodes)) nodes <- intersect(nodes,seq_len(nrow(N)))
    if(is.character(nodes)) nodes <- intersect(nodes,rownames(N))
    if(length(nodes)<1){
      warning("nodes: length of items present in 'N' must be greater than zero")
    }else if(length(nodes)==1){
      N[nodes,"x"] <- 0
      N[nodes,"y"] <- 0
    }else{
      angle <- (seq_along(nodes) / (length(nodes)/2)) * pi
      angle <- angle - angle[1] + (deg * pi / 180)
      N[nodes,"x"] <- round(cos(angle),3)
      N[nodes,"y"] <- round(sin(angle),3)
    }
  }else
    warning("nodes: must be numeric or character")

  return(as.matrix(N[,c("x","y")]))
}

rd3_layoutGrid <- function(N,string,name=NULL,byrow=FALSE){
  N[,"x"] <- NA
  N[,"y"] <- NA

  if(!is.null(name)) rownames(N) <- N[[name]]
  if(is.character(string)){
    Levels <- as.list(unlist(strsplit(string,"\\.")))
    xlen <- length(Levels)
    ylen <- 0
    for(i in seq_len(xlen)){
      a <- gsub("\\*","",Levels[[i]])
      a <- gsub(";",",,",a)
      addToEnd <- substr(a,nchar(a),nchar(a))==","
      a <- as.list(unlist(strsplit(a,"\\,")))
      if(addToEnd) a[[length(a)+1]] <- ""
      len <- length(a)
      if(len>ylen)
        ylen <- len
      for(j in seq_len(len)){
        index <- a[[j]]
        if(index!=""){
          N[index,"x"] <- i - 1
          N[index,"y"] <- j - 1
        }
      }
      Levels[[i]] <- a
    }
    for(i in seq_len(xlen)){
      len <- length(Levels[[i]])
      indices <- unlist(Levels[[i]])
      indices <- indices[indices!=""]
      if(len!=ylen){
        N[indices,"y"] <- N[indices,"y"] + ((ylen - len)/2)
      }
    }
    x <- N[,"x"]/(xlen-1)
    y <- 1 - (N[,"y"]/(ylen-1))
    if(byrow){
      aux <- 1-x
      x <- 1-y
      y <- aux
    }
    N[,"x"] <- x
    N[,"y"] <- y
  }else
    warning("string: must be character")

  mat <- as.matrix(N[,c("x","y")])
  mat[is.nan(mat)] <- 0
  return(mat)
}

layout.force.atlas.2 <- function(graph, criteria = NULL, directed = TRUE, iterations = 100, linlog = FALSE, pos = NULL, nohubs = FALSE,
                                 k = 400, gravity=1, ks=0.1, ksmax=10, delta = 1, center=NULL,
                                 tolerance = 0.1, dim = 2, plotstep=0, plotlabels=TRUE){
  
  coincidences <- igraph::get.adjacency(graph, type="both", sparse=FALSE, attr=criteria)
  #### Binary will be a matrix of simple incidence (0-not connected, 1-connected)
  if(is.null(center)) center <- rep(0,dim)
  nnodes <- nrow(coincidences)
  Binary <- coincidences
  Binary[Binary!=0] <- 1
  #### Deg will be a vector of the degrees of vertices
  Deg <- rowSums(Binary)
  #### Forces1 will be a table containing all the sums of forces acting on points at a step
  Forces1 <- matrix(0, nrow = dim, ncol = nnodes)
  
  #### If there are no initial coordinates of points,
  #### they are chosen at random from 1000^dim square
  if (is.null(pos))  {
    difference <- 2000/(nnodes*dim)
    position <- matrix(sample(seq(-1000,1000,difference),nnodes*dim),nnodes,dim)
  }  else  {
    position <- pos
  }
  
  #### None of the nodes should be exactly at the center of gravity###
  temp <- which(position[,1] == center[1])
  for( index in 2:ncol(position)){
    temp <- intersect(temp,which(position[,index] == center[index]))
  }
  position[temp,] <- center + 0.01
  rm(index,temp)
  
  #### displacement will be a matrix of points' movement at the current iteration
  displacement <- matrix(rep(0,dim*nnodes),dim,nnodes)
  
  m <- nrow(position)
  
  for (iteration in 1:iterations)
  {
    displacement <- displacement * 0
    #### Forces2 is the table of the forces from previous step
    #### Forces1 is the table of the forces from current step
    Forces2 <- Forces1
    Forces1 <- matrix(nrow = dim, ncol = 0)
    
    #### Calculate the Forces for each node
    ### Distance matrix between all nodes
    distances <- as.matrix(dist(position))
    distances[which(distances < 0.01)] <- 0.01 #We impose a minimum distance
    ### Each element of the list contains a matrix with the j = 1,2,..., dim dimension of the unitary vector 1
    mylist <- vector("list",dim)
    for (j in 1:dim){
      mylist[[j]] <- (tcrossprod(position[,j],rep(1,m))-tcrossprod(rep(1,m),position[,j]))/distances
    }
    ### Calculate the repulsion Force
    Fr <- k*((tcrossprod(rep(1,m),Deg)+1)*(tcrossprod(Deg,rep(1,m))+1))/distances
    
    #The classical attraction force is just based on distance
    Fa <- distances
    #The linlog mode calculates the attraction force as log(1+d(n1,n2))
    if(linlog){
      Fa <- log(1+Fa)
    }
    #Edge weights. The edges are weighted based on parameter delta. delta=0 implies no weight
    Fa <- (coincidences^delta)*Fa
    
    #Dissuade Hubs. This mode is meant to grant authorities (nodes with high indegree)
    #a more central position than hubs (nodes with high outdegree)
    if(nohubs){
      Fa <- Fa/(tcrossprod(Deg,rep(1,m))+1)
    }
    
    ### Function to calculate the Attraction and Repulsion forces
    Farfunction <- function(x) rowSums(x*(Fr-Fa),na.rm=T)
    ### And we aggregate it over all dimensions
    Far <- do.call(rbind,lapply(mylist,Farfunction))
    ### Unitary Vector 2, the directions between each point and the center
    uv2 <- apply(matrix(rep(center,m),nrow=m,byrow=T)-position,1,function(x) x/sqrt(sum(x^2)))
    ### The gravity force
    #Fg <- uv2*matrix(rep(gravity*(rowSums(A)+1),dim),nrow=dim,byrow=T)
    Fg <- uv2*matrix(rep(gravity*(Deg+1),dim),nrow=dim,byrow=T)
    ### Forces 1 is the sum between all forces: Far (Fa + Fr) and Fg
    Forces1 <- Far+Fg
    Forces1 <- round(Forces1,2) #Use the first two decimals for the Forces.
    
    #### Swing is the vector of the swingings of all points
    swing <- abs(colSums((Forces1-Forces2)^2)^(1/2))
    Global_swing <- sum((Deg + 1)*swing)
    
    #If the swing of all nodes is zero, then convergence is reached and we break.
    if(all(swing==0)){
      if(!plotstep==0&dim==2){
        plot(position, main=paste0("iteration: ",iteration), xlab="", ylab="")
        if(plotlabels) text(position, labels=igraph::V(graph)$name, cex= 0.7, pos=3)
      }
      break
    }
    
    #### tra is the vector of the traction of all points
    tra <- abs(colSums((Forces1+Forces2)^2)^(1/2))/2
    Global_tra <- sum((Deg+1)*tra)
    
    #### Global speed calculation
    Global_speed <- tolerance * Global_tra/Global_swing
    #### speed is the vector of individual speeds of points
    speed <- ks * Global_speed /  (1 + Global_speed * (swing)^(1/2))
    
    #### Imposing constrains on speed
    speed_constrain <- ksmax/abs(colSums((Forces1^2))^(1/2))
    speed <- ifelse(speed>=speed_constrain,speed_constrain,speed)
    
    #### calculating displacement and final position of points after iteration
    displacement <- Forces1 * t(matrix(rep(speed,dim),nnodes,dim))
    position <- position + t(displacement)
    
    #### Iteration plot. This is simply to see the evolution of the positions over iterations
    #### Is much faster to visualize directly using R base plots instead of igraph plots
    
    if(!plotstep==0&dim==2){
      if(iteration%%plotstep==0)  {
        plot(position, main=paste0("iteration: ",iteration), xlab="", ylab="")
        if(plotlabels) text(position, labels=row.names(coincidences), cex= 0.7, pos=3)
      }
    }
  }
  return(position)
}
