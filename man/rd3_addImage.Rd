\name{rd3_addImage}
\alias{rd3_addImage}
\title{Adds an image to a 'rD3plot' object.}
\description{
\code{rd3_addImage} adds an image to a 'rD3plot' object.
}
\value{
A 'rD3plot' object.
}

\usage{
rd3_addImage(x, img)
}
\arguments{
\item{x}{A 'rD3plot' object.}
\item{img}{character vector indicating the image path.}
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\examples{
data(finches)
data(galapagos)
bar <- barplot_rd3(finches, galapagos, select="Certhidea olivacea")
img <- system.file("extdata", "p.Crassirostris.png",
        package="rD3plot")
bar <- rd3_addImage(bar,img)
multi <- rd3_multigraph(barplot=bar)
\dontrun{
rd3_multiPages(multi,"Graph image example",show=TRUE)
}
}
