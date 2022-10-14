\name{rd3_multigraph}
\alias{rd3_multigraph}
\title{Integrates interactive 'rD3plot' graphs.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca. 
}
\value{
This function returns a \code{multi_rd3} object.
}

\usage{
rd3_multigraph(..., mfrow = NULL, dir = NULL)
}
\arguments{
\item{...}{rD3plot graphs (network_rd3, barplot_rd3, timeplot_rd3) objects or string paths to html "directories".}
\item{mfrow}{a vector of the form 'c(nr, nc)'. Subsequent graphs will be drawn in an 'nr'-by-'nc' array on the device by rows.}
\item{dir}{a "character" string representing the directory where the graph will be saved.}
}
\description{
\code{rd3_multigraph} produce an interactive multi graph with the integration of 'rD3plot' graphs in the final result.
}
\examples{
data(miserables)
net <- network_rd3(miserables$nodes, miserables$links,
         size="degree", color="group", lwidth="value")

data(finches)
data(galapagos)
bar <- barplot_rd3(finches, galapagos, select="Certhidea olivacea")

data(sociologists)
time <- timeline_rd3(sociologists,"name","birth","death","birthcountry")

multi <- rd3_multigraph(network=net, barplot=bar, timeline=time)
\dontrun{
plot(multi)
}
}
