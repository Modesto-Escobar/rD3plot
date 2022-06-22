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
pie_rd3(v, w = NULL, labels = NULL, colors = NULL, nodes = NULL, links = NULL,
  name = NULL, source = NULL, target = NULL, lcolor = NULL,
  ablineX = NULL, ablineY = NULL, hideUpper = FALSE, main = NULL, note = NULL,
  showLegend = TRUE, help = NULL, helpOn = FALSE,
  cex = 1, language = c("en", "es", "ca"), dir = NULL)
}
\arguments{
\item{v}{a vector or array of non-negative numerical quantities. The values are displayed as the areas of pie slices.}
\item{w}{an array of non-negative numerical quantities. The first value is displayed as a pie slice bordered red.}
\item{labels}{character strings giving names for the slices.}
\item{colors}{a vector of colors to be used in filling the slices.}
\item{nodes}{a data frame with information for rows and columns.}
\item{links}{a data frame with information for each pie.}
\item{name}{name of the column with rownames and colnames in the nodes data frame.}
\item{source}{name of the column with rownames in the links data frame.}
\item{target}{name of the column with colnames in the links data frame.}
\item{lcolor}{name of the column with color variable in the links data frame.}
\item{ablineX}{adds one or more straight vertical lines between pies.}
\item{ablineY}{adds one or more straight horizontal lines between pies.}
\item{hideUpper}{should hide the upper triangle?}
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
pie <- pie_rd3(1:4, labels = c("XY","X","","Y"),
  colors = c("black","cadetblue2", "white","cadetblue3"))
\dontrun{
plot(pie)
}
}
