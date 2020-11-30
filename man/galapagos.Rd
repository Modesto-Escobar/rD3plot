\name{galapagos}
\alias{galapagos}
\docType{data}
\title{
Data: Finches' presence in Galapagos Islands.
}
\description{
Data frame containing data of finches coapperance in the Galagos Islands.
}
\usage{data("galapagos")}
\format{
  This links data set consists of three variables of length 60:
  \describe{
    \item{\code{Source}}{: Finche 1}
    \item{\code{Target}}{: Finche 2}
    \item{\code{coincidences}}{: number of islands they share}
  }
}
\references{
Sanderson, James (2000). Testing Ecological Patterns: A Well-known Algorithm from Computer Science Aids the Evaluation of Species Distributions. American Scientist, 88, pp. 332-339.
}
\examples{
data(galapagos)
head(galapagos,10)
}
\keyword{datasets}
