\name{asGallery}
\alias{asGallery}
\title{Network to image gallery.}
\description{
\code{asGallery} transforms a network into an image gallery. 
}
\value{
Object of class \code{gallery_rd3}.
}

\usage{
asGallery(net)
}
\arguments{
  \item{net}{a \code{network_rd3} object. See \code{\link{network_rd3}}}
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\examples{
data(miserables)
net <- network_rd3(miserables$nodes, miserables$links,
  size="degree", color="group", lwidth="value")
gallery <- asGallery(net)
\dontrun{
plot(gallery)
}
}
