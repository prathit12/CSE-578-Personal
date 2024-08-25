import { fetchData } from './api.js';
import { renderCandlestickChart } from './candlestick_chart.js';
import { renderAreaChart } from './area_chart.js';
import { renderScatterPlot } from './scatter_plot.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts or other functionalities here
    fetchData().then(data => {
        renderCandlestickChart(data);
        renderAreaChart(data);
        renderScatterPlot(data);
    });
});
