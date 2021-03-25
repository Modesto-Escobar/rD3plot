\name{evolNetwork_rd3}
\alias{evolNetwork_rd3}
\title{Create evolving networks.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca. 
}
\value{
This function returns a \code{network_rd3} object.
}

\usage{
evolNetwork_rd3(..., frame = 0, speed = 50, dir = NULL)
}
\arguments{
\item{...}{\code{network_rd3} objects that will be integrated as temporal frames in the evolving network.}
\item{frame}{a frame ordinal position where the playback will start.}
\item{speed}{a percentage value for the playback speed of network frames.}
\item{dir}{a "character" string representing the directory where the graph will be saved.}
}
\description{
\code{evolNetwork_rd3} produce an evolving network.
}
\examples{
nets <- list()
N <- data.frame(name=paste0("node",1:2))
E <- data.frame(Source="node1",Target="node2")
nets[["net1"]] <- network_rd3(N, E, repulsion=98, label=FALSE)

for(i in 3:100){
  N <- rbind(N,data.frame(name=paste0("node",i)))
  E <- rbind(E,data.frame(Source=paste0("node",i-1),Target=paste0("node",i)))
  nets[[paste0("net",i-1)]] <- network_rd3(N, E, repulsion=100-i, label=FALSE)
}

nets$speed=100

net <- do.call(evolNetwork_rd3,nets)

\dontrun{
plot(net)
}
}
