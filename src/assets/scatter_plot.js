import * as d3 from 'd3';

export function renderScatterPlot(data) {
    const svg = d3.select("#scatter-plot").append("svg")
                  .attr("width", 800)
                  .attr("height", 400);

    // Convert date strings to Date objects for correct scaling
    data.forEach(d => d.Date = new Date(d.Date));

    const x = d3.scaleTime().domain(d3.extent(data, d => d.Date)).range([0, 800]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.Volume)]).range([400, 0]);

    svg.append("g")
       .attr("transform", "translate(0,400)")
       .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")));

    svg.append("g").call(d3.axisLeft(y));

    svg.selectAll("circle")
       .data(data)
       .enter().append("circle")
       .attr("cx", d => x(d.Date))
       .attr("cy", d => y(d.Volume))
       .attr("r", 5)
       .attr("fill", "orange");
}