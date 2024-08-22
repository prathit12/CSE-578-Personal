const d3 = require('d3');

const data = [10, 20, 30, 40, 55, 65, 70];
const height = 300;
const width = 500;
const margin = { top: 20, right: 30, bottom: 40, left: 40 }; 


const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width+margin.left+margin.right)
    .attr('height', height+margin.top+margin.bottom)
    .append('g')
    .attr('transform', 'translate(${margin.left}+${margin.top})');

const x =  d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, width])
    .padding(0.1);

    const y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .nice()
    .range([height, 0]);

svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d))
    .attr("fill", "steelblue");

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(i => i + 1));

svg.append("g")
    .call(d3.axisLeft(y));