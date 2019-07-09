// Reference (https://plot.ly/javascript/custom-buttons/#update-button)

// Trace 1 for the Airbnb Data (Rating: 3.0)
var trace1 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  text: ['Count: N/A', 'Count: N/A', 'Count: N/A', 'Count: N/A', 'Count: N/A', 'Count: N/A', 'Count: N/A', 'Count: N/A', 'Count: N/A', 'Count: N/A'],
  name: "Airbnb 3.0 Stars",
  type: "bar",
  marker: {color: "#FFB745"},
  visible: false,
};

// Trace 2 for the TripAdvisor (Hotel) Data (Rating: 3.0)
var trace2 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [0, 31.60, 0, 23.77, 0, 149.93, 0, 0, 71.52, 0],
  text: ['Count: N/A', 'Count: 5', 'Count: N/A', 'Count: 31', 'Count: N/A', 'Count: 14', 'Count: N/A', 'Count: N/A', 'Count: 60', 'Count: N/A'],
  name: "Hotel 3.0 Stars",
  type: "bar",
  marker: {color: "#E7552C"},
  visible: false,
};

// Trace 3 for the Airbnb Data (Rating: 3.5)
var trace3 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [0, 0, 0, 0, 59.14, 0, 28.00, 0, 36.00, 0],
  text: ['Count: N/A', 'Count: N/A', 'Count: N/A', 'Count: N/A', 'Count: 7', 'Count: N/A', 'Count: 1', 'Count: N/A', 'Count: 1', 'Count: N/A'],
  name: "Airbnb 3.5 Stars",
  type: "bar",
  marker: {color: "#FFB745"},
  visible: false,
};

// Trace 4 for the TripAdvisor (Hotel) Data (Rating: 3.5)
var trace4 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [51.00, 50.48, 49.00, 29.54, 86.00, 162.40, 155.00, 54.90, 78.55, 73.93],
  text: ['Count: 1', 'Count: 64', 'Count: 1', 'Count: 134', 'Count: 1', 'Count: 55', 'Count: 2', 'Count: 30', 'Count: 110', 'Count: 42'],
  name: "Hotel 3.5 Stars",
  type: "bar",
  marker: {color: "#E7552C"},
  visible: false,
};

// Trace 5 for the Airbnb Data (Rating: 4.0)
var trace5 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [47.50, 45.00, 22.10, 13.44, 56.19, 72.80, 63.07, 31.50, 42.27, 0],
  text: ['Count: 2', 'Count: 11', 'Count: 20', 'Count: 9', 'Count: 36', 'Count: 20', 'Count: 15', 'Count: 2', 'Count: 30', 'Count: N/A'],
  name: "Airbnb 4.0 Stars",
  type: "bar",
  marker: {color: "#FFB745"},
  visible: false,
};

// Trace 6 for the TripAdvisor (Hotel) Data (Rating: 4.0)
var trace6 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [53.89, 51.61, 71.10, 37.96, 130.93, 177.39, 139.22, 63.38, 103.02, 98.97],
  text: ['Count: 137', 'Count: 135', 'Count: 80', 'Count: 135', 'Count: 135', 'Count: 154', 'Count: 176', 'Count: 159', 'Count: 122', 'Count: 249'],
  name: "Hotel 4.0 Stars",
  type: "bar",
  marker: {color: "#E7552C"},
  visible: false,
};

// Trace 7 for the Airbnb Data (Rating: 4.5)
var trace7 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [29.41, 61.81, 33.10, 20.23, 56.66, 91.68, 74.12, 34.27, 64.70, 121.04],
  text: ['Count: 97', 'Count: 129', 'Count: 133', 'Count: 164', 'Count: 167', 'Count: 141', 'Count: 162', 'Count: 135', 'Count: 169', 'Count: 54'],
  name: "Airbnb 4.5 Stars",
  type: "bar",
  marker: {color: "#FFB745"},
  visible: false,
};

// Trace 8 for the TripAdvisor (Hotel) Data (Rating: 4.5)
var trace8 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [76.57, 98.60, 84.38, 59.79, 182.07, 282.62, 182.19, 87.94, 171.32, 180.34],
  text: ['Count: 265', 'Count: 217', 'Count: 283', 'Count: 78', 'Count: 270', 'Count: 199', 'Count: 247', 'Count: 191', 'Count: 92', 'Count: 148'],
  name: "Hotel 4.5 Stars",
  type: "bar",
  marker: {color: "#E7552C"},
  visible: false,
};

// Trace 9 for the Airbnb Data (Rating: 5.0)
var trace9 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [38.46, 74.47, 48.08, 30.21, 53.16, 103.75, 85.23, 40.91, 70.01, 132.50],
  text: ['Count: 202', 'Count: 141', 'Count: 122', 'Count: 112', 'Count: 83', 'Count: 144', 'Count: 120', 'Count: 141', 'Count: 101', 'Count: 250'],
  name: "Airbnb 5.0 Stars",
  type: "bar",
  marker: {color: "#FFB745"},
};

// Trace 10 for the TripAdvisor (Hotel) Data (Rating: 5.0)
var trace10 = {
  x: ['Bangkok', 'Dubai', 'Istanbul', 'Kuala Lumpur', 'London', 'New York City', 'Paris', 'Seoul', 'Singapore', 'Tokyo'],
  y: [71.73, 331.77, 113.45, 51.21, 329.28, 349.77, 354.14, 60.20, 82.25, 161.09],
  text: ['Count: 45', 'Count: 26', 'Count: 83', 'Count: 14', 'Count: 47', 'Count: 13', 'Count: 29', 'Count: 54', 'Count: 4', 'Count: 11'],
  name: "Hotel 5.0 Stars",
  type: "bar",
  marker: {color: "#E7552C"},
};


// Combining traces
var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10];

// Add buttons
var updatemenus=[
  {
    active:4,
    buttons: [
      {
        args: [{'visible': [true, true, false, false, false, false, false, false, false, false]}],
        label: '3.0',
        method: 'update'
      },
      {
        args: [{'visible': [false, false, true, true, false, false, false, false, false, false]}],
        label: '3.5',
        method: 'update'
      },
      {
        args: [{'visible': [false, false, false, false, true, true, false, false, false, false]}],
        label: '4.0',
        method: 'update'
      },
      {
        args: [{'visible': [false, false, false, false, false, false, true, true, false, false]}],
        label: '4.5',
        method: 'update'
      },
      {
        args: [{'visible': [false, false, false, false, false, false, false, false, true, true]}],
        label: '5.0',
        method: 'update',
      },
    ],
    direction: 'left',
    pad: {'r': 50, 't': 0},
    showactive: true,
    type: 'buttons',
    x: 0.1,
    xanchor: 'left',
    y: 1.1,
    yanchor: 'top'
  }
]

// Add annotations
var annotations = [
  {
    text: 'Rating:',
    x: 0,
    y: 1.085,
    yref: 'paper',
    align: 'left',
    showarrow: false
  }
]

// Apply the group barmode to the layout
var layout = {
  title: "Airbnb vs Hotel",
  xaxis: {
    title: "City",
    titlefont: {
    size: 15,
    color: "rgb(107, 107, 107)"
  }},
  yaxis: {
    title: "Average prices (USD)",
    range: [0, 400],
    titlefont: {
      size: 15,
      color: "rgb(107, 107, 107)"
    }
  },
  //barmode: 'relative',
  updatemenus: updatemenus,
  annotations: annotations,
  barmode: "group"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);
