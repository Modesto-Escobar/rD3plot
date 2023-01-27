\name{rd3_addDescription}
\alias{rd3_addDescription}
\title{Adds a description to a 'rD3plot' object.}
\description{
\code{rd3_addDescription} adds a description to a 'rD3plot' object.
}
\value{
A 'rD3plot' object.
}

\usage{
rd3_addDescription(x, description)
}
\arguments{
\item{x}{A 'rD3plot' object.}
\item{description}{the description text.}
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
bar <- rd3_addDescription(bar,"Species coincidences in Galapagos Islands")
multi <- rd3_multigraph(barplot=bar)
\dontrun{
rd3_multiPages(multi,"Graph image example",show=TRUE)
}
}
