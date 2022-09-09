\name{network_rd3}
\alias{network_rd3}
\title{Interactive network.}
\description{
\code{network_rd3} produces a \code{network_rd3} object ready for its representation as an interactive network in a web browser. Its input has to be two data.frames: one of attributes of events or nodes, and the other of attributes of the edges or links. 
}
\value{
This function returns a \code{network_rd3} object.
If the 'dir' attribute is specified, the function creates a folder in the computer with an HTML document named index.html which contains the produced graph. This file can be directly opened with your browser and sent to a web server to work properly.
}

\usage{
network_rd3(nodes = NULL, links = NULL, tree = NULL,
        community = NULL, layout = NULL,
        name = NULL, label = NULL, group = NULL, groupText = FALSE,
        labelSize = NULL, size = NULL, color = NULL, shape = NULL,
        border = NULL, legend = NULL, sort = NULL, decreasing = FALSE,
        ntext = NULL, info = NULL, image = NULL, imageNames = NULL,
        nodeBipolar = FALSE, nodeFilter = NULL, degreeFilter = NULL,
        source = NULL, target = NULL,
        lwidth = NULL, lweight = NULL, lcolor = NULL, ltext = NULL,
        intensity = NULL, linkBipolar = FALSE, linkFilter = NULL,
        repulsion = 25, distance = 10, zoom = 1,
        fixed = showCoordinates, limits = NULL,
        main = NULL, note = NULL, showCoordinates = FALSE, showArrows = FALSE,
        showLegend = TRUE, frequencies = FALSE, showAxes = FALSE,
        axesLabels = NULL, scenarios = NULL, help = NULL, helpOn = FALSE,
        mode = c("network","heatmap"), roundedItems = FALSE, controls = 1:4,
        cex = 1, background = NULL, defaultColor = "#1f77b4",
        language = c("en","es","ca"), dir = NULL)
}
\arguments{
\item{nodes}{a data frame with at least one column of node names.}
\item{links}{a data frame with at least two columns with source and target node names.}
\item{tree}{a data frame with two columns: source and target, describing relationships between nodes. It indicates a hierarchy between nodes which can be dynamically explored.}
\item{name}{name of the column with names in the nodes data frame.}
\item{source}{name of the column with source names in the links data frame.}
\item{target}{name of the column with target names in the links data frame.}
\item{label}{name of the column with labels in the nodes data frame.}
\item{group}{name of the column with groups in the nodes data frame.}
\item{groupText}{show names of the groups.}
\item{community}{algorithm to make communities: edge_betweenness("ed"), fast_greedy("fa"), label_prop("la"), leiden_eigen("le"), louvain("lo"), optimal("op"), spinglass("sp"), walktrap("wa")}
\item{labelSize}{name of the column with label size in the nodes data frame.}
\item{size}{name of the column with size in the nodes data frame.}
\item{color}{name of the column with color variable in the nodes data frame.}
\item{shape}{name of the column with shape variable in the nodes data frame.}
\item{legend}{name of the column with the variable to represent as a legend in the nodes data frame.}
\item{ntext}{name of the column with html text in the nodes data frame.}
\item{info}{name of the column with information to display in a panel in the nodes data frame.}
\item{border}{name of the column with border width in the nodes data frame.}
\item{sort}{name of the column with node order in the nodes data frame (only for heatmap).}
\item{decreasing}{decreasing or increasing sort of the nodes (only for heatmap).}
\item{intensity}{name of the column with intensity variable in the links data frame (only for heatmap).}
\item{lwidth}{name of the column with width variable in the links data frame.}
\item{lweight}{name of the column with weight variable in the links data frame.}
\item{lcolor}{name of the column with color variable in the links data frame.}
\item{ltext}{name of the column with labels in the links data frame.}
\item{nodeFilter}{a character string with a condition for filtering nodes.}
\item{linkFilter}{a character string with a condition for filtering links.}
\item{degreeFilter}{numeric vector to filter the resulting network by degree. Input can be a number which specifies the minimum degree or two numbers which specify the lower and upper limits of the filter.}
\item{nodeBipolar}{a logical value that polarizes negative and positive node values in the graphical representation. Indicates whether the color key should be made symmetric about 0.}
\item{linkBipolar}{a logical value that polarizes negative and positive link values in the graphical representation. Indicates whether the color key should be made symmetric about 0.}
\item{defaultColor}{a character vector giving a valid html color for node representation.}
\item{repulsion}{a percentage for repulsion between nodes.}
\item{distance}{a percentage for distance of links.}
\item{zoom}{a number between 0.1 and 10 to start displaying zoom.}
\item{fixed}{prevent nodes from being dragged.}
\item{scenarios}{a note showing number of scenarios.}
\item{main}{upper title of the graph.}
\item{note}{lower title of the graph.}
\item{frequencies}{a logical value true if barplots representing node attributes frequencies will be added to the final graph.}
\item{help}{help text of the graph.}
\item{helpOn}{Should the help be shown at the beginning?}
\item{background}{background color or image path of the graph.}
\item{layout}{a matrix with two columns with x/y coordinates or an algorithm to calculate the static layout of the network: davidson.harel
drl("da"), circle("ci"), Force-Atlas-2("fo"), fruchterman.reingold("fr"), gem("ge"), grid("gr"), kamada.kawai("ka"), lgl("lg"), mds("md"), random("ra"), reingold.tilford("re"), star("sta"), sugiyama("sug")}
\item{limits}{vector indicating the layout limits, must be a numeric vector of length 4 on this order: x_min, y_min, x_max, y_max.}
\item{cex}{number indicating the amount by which plotting text should be scaled relative to the default.}
\item{roundedItems}{Display images with rounded borders.}
\item{controls}{a numeric vector indicating which controls will be shown. 1 = sidebar, 2 = selection buttons, 3 = export buttons, 4 = nodes table, 5 = links table. NULL hide all controls, negative values deny each control and 0 deny all.}
\item{mode}{a character vector indicating the graph mode allowed: network, heatmap or both (both by default).}
\item{showCoordinates}{a logical value true if the coordinates are to be shown in tables and axes. Default = FALSE.}
\item{showArrows}{a logical value true if the directional arrows are to be shown. Default = FALSE.}
\item{showLegend}{a logical value true if the legend is to be shown.}
\item{showAxes}{a logical value true if the axes are to be shown.}
\item{axesLabels}{a character vector giving the axes names.}
\item{language}{a character string indicating the language of the graph (en=english (default); es=spanish; ca=catalan).}
\item{image}{name of the column with the path to node image files in the nodes data frame.}
\item{imageNames}{name of the column with names for image files in the nodes data frame which will be shown in the legend.}
\item{dir}{a "character" string representing the directory where the resulting web files will be saved.}
}
\note{
nodes and links arguments can be substituted by a network_rd3 object to add or change options to it.
}
\author{
Modesto Escobar, Department of Sociology and Communication, University of Salamanca.
}
\examples{
data(miserables)
net <- network_rd3(miserables$nodes, miserables$links,
         size="degree", color="group", lwidth="value")
\dontrun{
plot(net)
}
}
