\name{add_tutorial_rd3}
\alias{add_tutorial_rd3}
\title{Adds a tutorial for the gallery.}
\description{
\code{add_tutorial_rd3} adds a tutorial for a gallery. 
}
\value{
Object of class \code{gallery_rd3}.
}

\usage{
add_tutorial_rd3(x, image = NULL, description = NULL)
}
\arguments{
\item{x}{object of class \code{gallery_rd3}.}
\item{image}{character vector indicating the image path, header for the tutorial.}
\item{description}{a character string indicating a desription text to insert in the tutorial.}
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

gallery <- add_tutorial_rd3(gallery, 
  description="Here you can see different finches species in Galapagos islands.")

\dontrun{
plot(gallery)
}
}
