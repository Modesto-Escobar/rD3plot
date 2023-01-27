\name{rd3_multiPages}
\alias{rd3_multiPages}
\title{Produces a gallery of 'rD3plot' graphs.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca. 
}
\value{
The function creates a folder in your computer with an HTML document named index.html which contains the graph. This file can be directly opened with your browser.
}

\usage{
rd3_multiPages(x, title = NULL, columns = NULL, imageSize = NULL,
  description = NULL, note = NULL,
  cex = 1, dir = tempDir(), show = FALSE)
}
\arguments{
\item{x}{is a \code{multi_rd3} object. See \code{\link{rd3_multigraph}}}
\item{title}{the text for a main title.}
\item{columns}{a numeric vector giving the number of columns to display items in gallery. Default = 3.}
\item{imageSize}{a numeric vector giving the size of images in gallery. Default = 75.}
\item{description}{a description text for the gallery.}
\item{note}{a footer text for the gallery.}
\item{cex}{number indicating the amount by which plotting text should be scaled relative to the default. Default = 1.}
\item{dir}{a "character" string representing the directory where the graph will be saved.}
\item{show}{a logical value true if the graph is to be shown. Default = FALSE.}
}
\description{
\code{rd3_multiPages} produces a gallery page to explore multiple 'rD3plot' graphs.
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
rd3_multiPages(multi,"Some graphs",show=TRUE)
}
}
