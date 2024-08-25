import * as d3 from 'd3';
import { processData } from './data_processing.js';

export function renderCandlestickChart(data) {
    const svg = d3.select("#candlestick-chart").append("svg")
                  .attr("width", 800)
                  .attr("height", 400);

    const x = d3.scaleBand().domain(data.map(d => d.Date)).range([0, 800]).padding(0.2);
    const y = d3.scaleLinear().domain([d3.min(data, d => d.Low), d3.max(data, d => d.High)]).range([400, 0]);

    svg.append("g")
       .attr("transform", "translate(0,400)")
       .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")));

    svg.append("g").call(d3.axisLeft(y));

    svg.selectAll("line.stem")
       .data(data)
       .enter().append("line")
       .attr("class", "stem")
       .attr("x1", d => x(d.Date) + x.bandwidth() / 2)
       .attr("x2", d => x(d.Date) + x.bandwidth() / 2)
       .attr("y1", d => y(d.High))
       .attr("y2", d => y(d.Low))
       .attr("stroke", "black");

    svg.selectAll("rect")
       .data(data)
       .enter().append("rect")
       .attr("x", d => x(d.Date))
       .attr("y", d => y(Math.max(d.Open, d.Close)))
       .attr("width", x.bandwidth())
       .attr("height", d => Math.abs(y(d.Open) - y(d.Close)))
       .attr("fill", d => d.Open > d.Close ? "red" : "green");
}
