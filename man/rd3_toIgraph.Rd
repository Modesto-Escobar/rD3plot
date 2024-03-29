\name{rd3_toIgraph}
\alias{rd3_toIgraph}
\title{'igraph' object.}
\description{creates an \code{igraph} object from a \code{network_rd3} object.}
\usage{
rd3_toIgraph(net)
}
\arguments{
  \item{net}{is a \code{network_rd3} object. See \code{\link{network_rd3}}}
}
\value{An \code{igraph} object.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\examples{
# A character column (with separator)
data(miserables)
net <- network_rd3(miserables$nodes, miserables$links,
  size="degree", color="group", lwidth="value")
rd3_toIgraph(net) # conversion into a igraph object
}
