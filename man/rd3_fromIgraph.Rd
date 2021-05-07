\name{rd3_fromIgraph}
\alias{rd3_fromIgraph}
\title{Produce interactive networks from 'igraph' objects.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\value{
This function returns a \code{network_rd3} object.
}
\usage{
rd3_fromIgraph(G, ...)
}
\arguments{
\item{G}{an igraph object.}
\item{...}{Any \link{network_rd3} argument.}
}
\description{
\code{rd3_fromIgraph} produce an interactive network from an 'igraph' object.
}
\examples{
g <- igraph::make_ring(10)
rd3_fromIgraph(g)
}
