\name{rd3_multigraph}
\alias{rd3_multigraph}
\title{Integrates interactive 'rD3plot' graphs.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca. 
}
\value{
The function creates a folder in your computer with an HTML document named index.html which contains the graph. This file can be directly opened with your browser.
}

\usage{
rd3_multigraph(..., mode = c("default","parallel","frame"),
  frame = 0, speed = 50, loop = FALSE, lineplots = NULL,
  dir = "MultiGraph", show = TRUE)
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
\item{loop}{allowing continuous repetition.}
\item{lineplots}{a character vector giving the node attributes to show as lineplots.}
\item{dir}{a "character" string representing the directory where the graph will be saved.}
\item{show}{a logical value true if the graph is to be shown. Default = TRUE.}
}
\description{
\code{rd3_multigraph} produce an interactive multi graph with the integration of 'rD3plot' graphs in the final result.
}
\examples{
\dontrun{
data(miserables)
net <- network_rd3(miserables$nodes, miserables$links,
         size="degree", color="group", lwidth="value")

data(finches)
data(galapagos)
bar <- barplot_rd3(finches, galapagos, select="Certhidea olivacea")

data(sociologists)
time <- timeline_rd3(sociologists,"name","birth","death","birthcountry")

rd3_multigraph(network=net, barplot=bar, timeline=time)
}
}
