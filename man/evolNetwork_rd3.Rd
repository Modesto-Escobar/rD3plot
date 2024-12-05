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
evolNetwork_rd3(..., timelinks = NULL, timenodes = NULL,
    timestart = NULL, timeend = NULL,
    frame = 0, speed = 50, loop = FALSE, lineplots = NULL, dir = NULL)
}
\arguments{
\item{...}{\code{network_rd3} objects (or a list of \code{network_rd3} objects) that will be integrated as temporal frames in the evolving network. If \code{timestart} is provided, any \code{network_rd3} argument.}
\item{timelinks}{a data frame with at least three columns with source, target and timestart to especify evolutive relations. Only used if \code{timestart} is provided.}
\item{timenodes}{a data frame with at least two columns with node names and timestart to especify evolutive values in nodes. Only used if \code{timestart} is provided.}
\item{timestart}{name of the column with the start time of a link in the timelinks data frame.}
\item{timeend}{name of the column with the end time of a link in the timelinks data frame.}
\item{frame}{a frame ordinal position where the playback will start.}
\item{speed}{a percentage value for the playback speed of network frames.}
\item{loop}{allowing continuous repetition.}
\item{lineplots}{a character vector giving the node attributes to show as lineplots.}
\item{dir}{a "character" string representing the directory where the graph will be saved.}
}
\description{
\code{evolNetwork_rd3} produce an evolving network.
}
\examples{
nets <- list()
N <- data.frame(name="node1")
E <- data.frame()

for(i in 2:100){
  N <- rbind(N,data.frame(name=paste0("node",i)))
  E <- rbind(E,data.frame(Source=paste0("node",i-1),Target=paste0("node",i)))
  nets[[paste0("net",i-1)]] <- network_rd3(N, E, repulsion=100-i, label=FALSE)
}

net <- evolNetwork_rd3(nets, speed=100)

\dontrun{
plot(net)
}

links <- data.frame()
repulsion <- numeric()
for(i in 2:100){
  links <- rbind(links, data.frame(Source=paste0("node",i-1),
      Target=paste0("node",i), time=paste0("stage_",i-1)))
  repulsion <- c(repulsion, 100-i)
}

net2 <- evolNetwork_rd3(timelinks=links, timestart="time",
  speed=100, repulsion=repulsion, label=FALSE)

\dontrun{
plot(net2)
}
}
