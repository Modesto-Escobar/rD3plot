\name{miserables}
\alias{miserables}
\docType{data}
\title{
Coappearance network of characters in Les Miserables (undirected)
}
\description{
A list of two datasets, vertices and edges, containing data on characters and their coapperance in chapters in Victor Hugo's Les Miserables.
}
\usage{data("miserables")}
\format{A list of two data frames:
\itemize{
\item the links data set consists of three variables of length 254:
\itemize{
  \item Source: Character 1
  \item Target: Character 2
  \item value: number of times they appear together in a chapter of Les Miserables
}
\item the nodes data set consists of two variables with information on 77 characters:
\itemize{
  \item name: Character name
  \item group: Character group
}
}}
\references{
D. E. Knuth, The Stanford GraphBase: A Platform for Combinatorial Computing, Addison-Wesley, Reading, MA (1993).
}
\examples{
data(miserables)
head(miserables,10)
}
\keyword{datasets}
