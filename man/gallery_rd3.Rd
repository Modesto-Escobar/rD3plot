\name{gallery_rd3}
\alias{gallery_rd3}
\title{Images in a grid gallery.}
\description{
\code{gallery_rd3} produces an interactive image gallery. 
}
\value{
Object of class \code{gallery_rd3}.
}

\usage{
gallery_rd3(nodes, name = NULL, label = NULL, color = NULL,
    ntext = NULL, info = NULL, image = NULL,
    zoom = 1, main = NULL, note = NULL, showLegend = TRUE,
    help = NULL, helpOn = FALSE, roundedItems = FALSE,
    language = c("en", "es", "ca"), dir = NULL)
}
\arguments{
\item{nodes}{a data frame with at least three columns of names, start and end.}
\item{name}{column name with image names in the nodes data frame.}
\item{label}{column name with image labels in the nodes data frame.}
\item{color}{column name with image background color variable in the nodes data frame.}
\item{zoom}{a number between 0.1 and 10 as initial displaying zoom.}
\item{main}{upper title of the graph.}
\item{note}{lower title of the graph.}
\item{ntext}{column name with html text in the nodes data frame.}
\item{info}{column name with information to display in a panel in the nodes data frame.}
\item{roundedItems}{Display items with rounded borders.}
\item{showLegend}{a logical value true if the legend is to be shown.}
\item{language}{a character string indicating the language of the graph (en=english (default); es=spanish; ca=catalan).}
\item{help}{a character string indicating a help text of the graph.}
\item{helpOn}{Should the help be shown at the beginning?}
\item{image}{column name which indicates the image paths in the nodes data frame.}
\item{dir}{a character string representing the directory where the web files will be saved.}
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\examples{
data("finches")
finches$species <- system.file("extdata", finches$species,
        package="rD3plot") # copy path to the species field
gallery <- gallery_rd3(finches, image="species", main="Species in Galapagos Islands",
        note="Data source: Sanderson (2000)")
\dontrun{
plot(gallery)
}
}
