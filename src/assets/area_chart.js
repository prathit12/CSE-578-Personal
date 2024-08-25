import * as d3 from 'd3';

export function renderAreaChart(data) {
    const svg = d3.select("#area-chart").append("svg")
                  .attr("width", 800)
                  .attr("height", 400);

    const x = d3.scaleTime().domain(d3.extent(data, d => d.Date)).range([0, 800]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.Close)]).range([400, 0]);

    const area = d3.area()
        .x(d => x(d.Date))
        .y0(400)
        .y1(d => y(d.Close));

    svg.append("g")
       .attr("transform", "translate(0,400)")
       .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")));

    svg.append("g").call(d3.axisLeft(y));

    svg.append("path")
       .datum(data)
       .attr("fill", "steelblue")
       .attr("d", area);
}
