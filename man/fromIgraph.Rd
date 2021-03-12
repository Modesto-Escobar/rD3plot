\name{fromIgraph}
\alias{fromIgraph}
\title{Produce interactive networks from igraph objects.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\value{
This function returns a \code{network_rd3} object.
}
\usage{
fromIgraph(G, ...)
}
\arguments{
\item{G}{an igraph object.}
\item{...}{Any \link{network_rd3} argument.}
}
\description{
\code{fromIgraph} produce an interactive network from an igraph object.
}
\examples{
g <- igraph::make_ring(10)
fromIgraph(g)
}
