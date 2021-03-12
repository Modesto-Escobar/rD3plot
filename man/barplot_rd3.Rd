\name{barplot_rd3}
\alias{barplot_rd3}
\title{Networked barplot.}
\description{
\code{barplot_rd3} produces an interactive barplot of coincidences between events. 
}
\value{
Object of class \code{barplot_rd3}.
}

\usage{
barplot_rd3(events, links, name = NULL, select = NULL,
        source = NULL, target = NULL,
        label = NULL, text = NULL, color = NULL,
        incidences = NULL, coincidences = NULL,
        expected = NULL, confidence = NULL, level = .95, significance = NULL,
        sort = NULL, decreasing = FALSE,
        scalebar = FALSE, defaultColor = "#1f77b4", note = NULL, cex = 1,
        language = c("en","es","ca"), dir = NULL)
}
\arguments{
\item{events}{a data frame with at least two columns of event names (by default 1st column) and incidences (2nd column). Columns for each variable can be specified at name and incidences parameters.}
\item{links}{a data frame with at least three columns indicating source event, target event and number of coincidences (in that order). Columns assigned to each variable can be specified at source, target and concidences parameters.}
\item{name}{column name with event names in the events data frame.}
\item{source}{column name with source names in the links data frame.}
\item{target}{column name with target names in the links data frame.}
\item{select}{event name to start the visualization.}
\item{label}{column name with labels in the events data frame.}
\item{text}{column name with html text in the events data frame.}
\item{color}{column name with color variable in the events data frame.}
\item{coincidences}{column nane with coincidences in the links data frame.}
\item{incidences}{column name with incidences in the events data frame.}
\item{expected}{column name with expected coincidences in the links data frame.}
\item{confidence}{column name with confidence interval in the links data frame.}
\item{level}{confidence level}
\item{significance}{column name with significance in the links data frame.}
\item{sort}{column name in the events data frame to order the bars in the graph.}
\item{decreasing}{order the events in a decreasing order.}
\item{scalebar}{bars are represented filling all the screen height.}
\item{defaultColor}{a string giving a valid html color.}
\item{note}{the lower title of the graph.}
\item{cex}{a number giving the amount by which plotting text should be scaled relative to the default.}
\item{language}{a character string indicating the language of the graph (en=english (default); es=spanish; ca=catalan).}
\item{dir}{a character string representing the directory where the web files will be saved.}
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\examples{
data(finches)
data(galapagos)
barplot <- barplot_rd3(finches, galapagos, select="Certhidea olivacea",
            note="Data source: Sanderson (2000)")
\dontrun{
plot(barplot)
}
}
