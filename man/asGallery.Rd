\name{asGallery}
\alias{asGallery}
\title{Images in a grid gallery.}
\description{
\code{asGallery} produces a gallery_rd3 object. 
}
\value{
Object of class \code{gallery_rd3}.
}

\usage{
asGallery(net)
}
\arguments{
  \item{net}{is a \code{network_rd3} object. See \code{\link{network_rd3}}}
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca. See \url{https://sociocav.usal.es/blog/modesto-escobar/}
}
\examples{
data(miserables)
net <- network_rd3(miserables$nodes, miserables$links,
  size="degree", color="group", lwidth="value")
gallery <- asGallery(net)
}
