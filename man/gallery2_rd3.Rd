\name{gallery2_rd3}
\alias{gallery2_rd3}
\title{Images in a grid gallery.}
\description{
\code{gallery2_rd3} produces an interactive image gallery (alternative display).
}
\value{
Object of class \code{gallery_rd3}.
}

\usage{
gallery2_rd3(nodes, name = NULL, label = NULL, order = NULL, decreasing = FALSE,
  ntext = NULL, image = NULL, main = NULL, note = NULL,
  colorScheme = 0, language = c("en", "es", "ca"), dir = NULL)
}
\arguments{
\item{nodes}{a data frame with at least one column with the names of the gallery's elements.}
\item{name}{name of the vector with names in the nodes data frame.}
\item{label}{column name with image labels in the nodes data frame.}
\item{order}{name of the column with node order in the nodes data frame.}
\item{decreasing}{decreasing or increasing sort of the nodes.}
\item{ntext}{column name with html text in the nodes data frame.}
\item{image}{column name which indicates the image paths in the nodes data frame.}
\item{main}{upper title of the graph.}
\item{note}{lower title of the graph.}
\item{colorScheme}{Select a color theme for display (0-11).}
\item{language}{a character string indicating the language of the graph (en=english (default); es=spanish; ca=catalan).}
\item{dir}{a character string representing the directory where the web files will be saved.}
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\examples{
data("finches")
finches$species <- system.file("extdata", finches$species,
        package="rD3plot") # copy path to the species field
gallery <- gallery2_rd3(finches, image="species")
\dontrun{
plot(gallery)
}
}
