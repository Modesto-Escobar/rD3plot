\name{multigraphCreate}
\alias{multigraphCreate}
\title{Integrates interactive rD3plot graphs.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca. 
}
\value{
The function creates a folder in your computer with an HTML document named index.html which contains the graph. This file can be directly opened with your browser.
}

\usage{
multigraphCreate(..., mode = c("default","parallel","frame"),
                 frame = 0, speed = 50, dir = "MultiGraph", show = TRUE)
}
\arguments{
\item{...}{rD3plot graphs (network_rd3, barplot_rd3, timeplot_rd3) objects or string paths to html "directories".}
\item{mode}{a string specifying the displaying mode:
 \describe{
    \item{default}{
      Graphs are shown one by one by selectingThe proposal category, which describes what sort of
      object will be viewed (a label from \code{A} to \code{G}).
    }
    \item{parallel}{
      Shows two graphs at once by splitting the layout into two parts.
    }
    \item{frame}{
      Integrates dynamic networks as an interactive evolving network.).
    }
  }
}
\item{frame}{number of frame to start a dynamic network.}
\item{speed}{a percentage for frame speed in dynamic networks.}
\item{dir}{a "character" string representing the directory where the graph will be saved.}
\item{show}{a logical value true if the graph is to be shown. Default = TRUE.}
}
\description{
\code{multigraphCreate} produce an interactive multi graph.
}
\examples{
\dontrun{
nets <- list()
N <- data.frame(name=paste0("node",1:2))
E <- data.frame(Source="node1",Target="node2")
nets[["net1"]] <- network_rd3(N, E, repulsion=98, label=FALSE)

for(i in 3:100){
  N <- rbind(N,data.frame(name=paste0("node",i)))
  E <- rbind(E,data.frame(Source=paste0("node",i-1),Target=paste0("node",i)))
  nets[[paste0("net",i-1)]] <- network_rd3(N, E, repulsion=100-i, label=FALSE)
}

nets$mode="frame"
nets$dir="incremental"
nets$speed=100

do.call(multigraphCreate,nets)
}
}
