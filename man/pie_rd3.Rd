\name{pie_rd3}
\alias{pie_rd3}
\title{Networked barplot.}
\description{
\code{pie_rd3} produces an interactive barplot of coincidences between events. 
}
\value{
Object of class \code{pie_rd3}.
}

\usage{
pie_rd3(x, labels = NULL, colors = NULL,
  main = NULL, note = NULL, showLegend = TRUE,
  help = NULL, helpOn = FALSE, cex = 1,
  language = c("en", "es", "ca"), dir = NULL)
}
\arguments{
\item{x}{a vector of non-negative numerical quantities. The values in 'x' are displayed as the areas of pie slices.}
\item{labels}{character strings giving names for the slices.}
\item{colors}{a vector of colors to be used in filling the slices.}
\item{main}{upper title of the graph.}
\item{note}{lower title of the graph.}
\item{showLegend}{a logical value true if the legend is to be shown.}
\item{help}{a character string indicating a help text of the graph.}
\item{helpOn}{Should the help be shown at the beginning?}
\item{cex}{number indicating the amount by which plotting text should be scaled relative to the default.}
\item{language}{a character vector (es=spanish; en=english; ca=catalan).}
\item{dir}{a character string representing the directory where the web files will be saved.}
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\examples{
pie <- pie_rd3(1:4,c("XY","X","","Y"),
  c("black","cadetblue2", "white","cadetblue3"))
\dontrun{
plot(pie)
}
}
