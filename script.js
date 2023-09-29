let data = {
  expenses: {
      "movie": getRandomValue().toFixed(2),
      "food": getRandomValue().toFixed(2),
      "rent": getRandomValue().toFixed(2),
      "dog": getRandomValue().toFixed(2),
      "wife": getRandomValue().toFixed(2)
  }
};

// Extract the category names and amounts
let categories = Object.keys(data.expenses);

console.log(categories)

let amounts = categories.map(category => data.expenses[category]);

// Define colors for the bars
const colors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261","#e76f51" ];

// Create an SVG container for the chart
const svgWidth = 600;
const svgHeight = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

const svg = d3.select("#chart-container")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create scales
const xScale = d3.scaleBand()
  .domain(categories)
  .range([margin.left, width + margin.left])
  .padding(0.1);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(amounts)])
  .nice()
  .range([height, margin.top]);

// Create and style the bars
svg.selectAll("rect")
  .data(categories)
  .enter().append("rect")
  .attr("x", d => xScale(d))
  .attr("y", d => yScale(data.expenses[d]))
  .attr("width", xScale.bandwidth())
  .attr("height", d => height - yScale(data.expenses[d]))
  .attr("fill", (d, i) => colors[i]);

// Add labels
svg.selectAll("text")
  .data(categories)
  .enter().append("text")
  .attr("x", d => xScale(d) + xScale.bandwidth() / 2)
  .attr("y", d => yScale(data.expenses[d]) + 20 + (height - yScale(data.expenses[d])))
  .attr("text-anchor", "middle")
  .text(d => `${d}: ${data.expenses[d]}`);

// Function to generate random values
function getRandomValue() {
  return Math.random() * 100 + 1;
}

// Function to update data and the chart
function updateData() {
  data = {
      expenses: {
          "movie": getRandomValue(),
          "food": getRandomValue(),
          "rent": getRandomValue(),
          "dog": getRandomValue(),
          "wife": getRandomValue()
      }
  };

  // Extract the category names and amounts
  categories = Object.keys(data.expenses);
  amounts = categories.map(category => data.expenses[category]);

  // Update the bars
  svg.selectAll("rect")
      .data(categories)
      .transition()
      .duration(1000)
      .attr("y", d => yScale(data.expenses[d]))
      .attr("height", d => height - yScale(data.expenses[d]));

  // Update the labels
  svg.selectAll("text")
      .data(categories)
      .text(d => `${d}: ${data.expenses[d].toFixed(2)}`);
}