\name{timeline_rd3}
\alias{timeline_rd3}
\title{Interactive time-bar plot.}
\description{
\code{timeline_rd3} produces a \code{timeline_rd3} object ready for its representation as an interactive time line in a web browser. 
}
\value{
Object of class \code{timeline_rd3}.
}

\usage{
timeline_rd3(nodes, name = "name", start = "start", end = "end", group = NULL,
         text = NULL, main = NULL, note = NULL, info = NULL, events = NULL,
         eventChild = "eventChild", eventParent = "eventParent", eventTime = "Time",
         eventColor = NULL, eventShape = NULL,
         cex = 1, language = c("en","es","ca"), dir = NULL)
}
\arguments{
\item{nodes}{a data frame with at least three columns describing period names, start and end.}
\item{name}{name of the column with names in the nodes data frame.}
\item{start}{name of the column with starts in the nodes data frame.}
\item{end}{name of the column with ends in the nodes data frame.}
\item{group}{name of the column with a grouping criteria in the nodes data frame.}
\item{text}{name of the column with a descriptive text of nodes (html format) in the nodes data frame.}
\item{main}{upper title of the graph.}
\item{note}{lower title of the graph.}
\item{info}{name of the column in the nodes data frame with information to display on the information panel.}
\item{events}{a data frame of events related to nodes (shown as dots) with three columns: interval name, event name and event date}
\item{eventChild}{name of the column with event identifiers in the events data frame.}
\item{eventParent}{name of the column with interval identifiers in the events data frame.}
\item{eventTime}{name of the column with time points in the events data frame.}
\item{eventColor}{name of the column with the color criteria in the events data frame.}
\item{eventShape}{name of the column with the shape criteria in the events data frame.}
\item{cex}{number indicating the amount by which plotting text should be scaled relative to the default.}
\item{language}{a character string indicating the language of the graph (en=english (default); es=spanish; ca=catalan).}
\item{dir}{a "character" string representing the directory where the web files will be saved.}
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\examples{
# Database of 19th century sociologists
data(sociologists)
timeline_rd3(sociologists,"name","birth","death","birthcountry")
}
