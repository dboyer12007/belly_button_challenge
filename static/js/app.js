// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
    .then((data) => {
      // Get the metadata field
      let metadata = data.metadata;

      // Filter the metadata for the object with the desired sample number
      let filter_result = metadata.filter(obj => obj.id == sample)[0];

      // Use d3 to select the panel with id of `#sample-metadata`
      let panel = d3.select("#sample-metadata");

      // Use `.html("")` to clear any existing metadata
      panel.html("");

      // Inside a loop, append new tags for each key-value in the filtered metadata
      Object.entries(filter_result).forEach(([key, value]) => {
        panel.append("p").text(`${key}: ${value}`);});}).catch((error) => console.error("Error loading metadata:", error));}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
let samples = data.samples

    // Filter the samples for the object with the desired sample number
let sampleData =samples.filter(obj => obj.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
let otu_ids = sampleData.otu_ids;
let otu_labels = sampleData.otu_labels;
let sample_values = sampleData.sample_values;

  
    // Build a Bubble Chart
let bubbleChartData = [{
x: otu_ids,
y: sample_values,
text: otu_labels,
mode: "markers",
marker: {
size: sample_values,
color: otu_ids, }
}];

let bubbleChartLayout = {
title: "OTU Sample Distribution",
xaxis: { title: "OTU ID" },
yaxis: { title: "Sample Values" },
showlegend: false,
height: 600,
width: 1000
};

    // Render the Bubble Chart
Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
let barChartData = [{
x: sample_values.slice(0, 10).reverse(),
y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
text: otu_labels.slice(0, 10).reverse(),
type: "bar",
orientation: "h"
}];

let barChartLayout = {
title: "Top 10 OTUs Found",
xaxis: { title: "Sample Values" },
yaxis: { title: "OTU IDs" }
    };

    // Render the Bar Chart
Plotly.newPlot("bar", barChartData, barChartLayout);});
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
let sampleNames = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
sampleNames.forEach((sample) => {
  selector
    .append("option")
    .text(sample)
    .property("value", sample);
});

    // Get the first sample from the list
const firstSample =  sampleNames[0];

    // Build charts and metadata panel with the first sample
buildMetadata(firstSample);
buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
buildMetadata(newSample);
buildCharts(newSample);
}

// Initialize the dashboard
init();
