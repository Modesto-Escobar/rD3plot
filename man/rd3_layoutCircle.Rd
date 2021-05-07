\name{rd3_layoutCircle}
\alias{rd3_layoutCircle}
\title{Produce a circle layout of any number of nodes.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\value{
‘rd3_layoutCircle’ produces a circle layout of any number of nodes.
}

\usage{
rd3_layoutCircle(N,nodes=seq_len(nrow(N)),deg=0,name=NULL)
}
\arguments{
\item{N}{a data frame of nodes.}

\item{nodes}{a vector specifing the node names inclued in the layout calculation.}

\item{deg}{rotation degrees.}

\item{name}{column name with node names in the N data frame.}
}
\description{
\code{rd3_layoutCircle} produces a circle layout of any number of nodes.
}
\examples{
A <- data.frame(name=letters)
L <- rd3_layoutCircle(A,name="name")
net <- network_rd3(A,layout=L)
\dontrun{
plot(net)
}
}
