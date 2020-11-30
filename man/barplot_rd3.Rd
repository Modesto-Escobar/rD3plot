\name{barplot_rd3}
\alias{barplot_rd3}
\title{Networked barplot.}
\description{
\code{barplot_rd3} produces a \code{barplot_rd3} object. 
}
\value{
Object of class \code{barplot_rd3}.
}

\usage{
barplot_rd3(nodes, links, name = NULL, select = NULL,
        source = NULL, target = NULL,
        label = NULL, text = NULL, color = NULL,
        incidences = "frequency", coincidences = "coincidences",
        expected = NULL, confidence = NULL, level = .95, significance = NULL,
        sort = NULL, decreasing = TRUE,
        scalebar = FALSE, defaultColor = "#1f77b4", note = NULL, cex = 1,
        language = c("en","es","ca"), dir = NULL)
}
\arguments{
\item{nodes}{a data frame with at least two vectors of names and incidences.}
\item{links}{a data frame with at least three vectors with source and target, including names of nodes and a vector of coincidences.}
\item{name}{name of the vector with names in the nodes data frame.}
\item{source}{name of the vector with source names in the links data frame.}
\item{target}{name of the vector with target names in the links data frame.}
\item{select}{Name of the event (in nodes name column) to start the visualization.}
\item{label}{name of the vector with labels in the nodes data frame.}
\item{text}{name of the vector with html text in the nodes data frame.}
\item{color}{name of the vector with color variable in the nodes data frame.}
\item{coincidences}{name of the vector with coincidences in the links data frame.}
\item{incidences}{name of the vector with incidences in the nodes data frame.}
\item{expected}{name of the vector with expected coincidences in the links data frame.}
\item{confidence}{name of the vector with confidence interval in the links data frame.}
\item{level}{confidence level}
\item{significance}{name of the vector with significance in the links data frame.}
\item{sort}{name of the vector in the nodes data frame to order the graph.}
\item{decreasing}{decreasing or increasing sort of the graph order.}
\item{scalebar}{Should the bars fill the screen height? Default = FALSE.}
\item{defaultColor}{a character vector giving a valid html color.}
\item{note}{lower title of the graph.}
\item{cex}{number indicating the amount by which plotting text should be scaled relative to the default. Default = 1.}
\item{language}{a character vector (es=spanish; en=english; ca=catalan).}
\item{dir}{a "character" string representing the directory where the web files will be saved.}
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca. See \url{https://sociocav.usal.es/blog/modesto-escobar/}
}
\examples{
data(finches)
data(galapagos)
barplot_rd3(finches, galapagos, select="Certhidea olivacea",
            note="Data source: Sanderson (2000)")
}
