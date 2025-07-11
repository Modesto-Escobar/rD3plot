\name{crannetworkdata}
\alias{crannetworkdata}
\docType{data}
\title{
Dependency network of packages in CRAN
}
\description{
A list of two datasets, vertices and edges, containing data on packages and their dependencies in CRAN.
}
\usage{data("crannetworkdata")}
\format{A list of two data frames:
\itemize{
\item the links data set consists of 4 variables of length 2882:
\itemize{
  \item Source: Package 1
  \item Target: Package 2
  \item Type: type of dependency (Depends or Imports)
  \item Year: year of onset of the dependency
}
\item the nodes data set consists of 7 variables with information on 1098 packages:
\itemize{
  \item Package: Package name
  \item downloads: Package downloads
  \item Title: Package totle
  \item Description: Package description
  \item Year: Package year
  \item downloadsyear: Package downloads per year
  \item info: Package info in html format
}
}}
\references{
\url{https://github.com/BioinfoUSAL/VisualAnalyticsWorkshop/blob/main/DataGenerationScripts/CRANNetworkDataGeneration.R}
}
\examples{
data(crannetworkdata)
head(crannetworkdata,10)
}
\keyword{datasets}
