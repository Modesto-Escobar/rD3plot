\name{layoutGrid}
\alias{layoutGrid}
\title{Produce a grid layout of any number of nodes.}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\value{
‘layoutGrid’ produces a grid layout of any number of nodes.
}

\usage{
layoutGrid(N,string,name=NULL,byrow=FALSE)
}
\arguments{
\item{N}{a data frame of nodes.}

\item{string}{a character vector specifing grouped nodes.}

\item{name}{column name with node names in the N data frame.}
\item{byrow}{order nodes by row (default) or by columns (FALSE)}
}
\description{
\code{layoutGrid} produces a grid layout of any number of nodes.
}
\examples{
A <- data.frame(name=letters)
L <- layoutGrid(A,"a,b,c,d,e.f,g,h,i,j.k,l,m,n,o,p.q,r,s,t,u.v,w,x,y,z","name")
net <- network_rd3(A,layout=L)
\dontrun{
plot(net)
}
}
