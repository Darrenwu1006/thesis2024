<template>
    <div class="chart-container"></div>
</template>

<script setup>
import * as d3 from "d3";
import json_population from "../data/new_population_percent.json";

const data_p = json_population;
// console.log(data_p);

onMounted(() => {
    //draw stream graph in d3

    const chartContainer = document.querySelector('.chart-container');
    const width = chartContainer.clientWidth;
    const height = chartContainer.clientHeight;
    const margin = { top: 20, right: 0, bottom: 20, left: 0 };

    const svg = d3.select(".chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    const series = d3.stack()
        .keys(d3.union(data_p.map(d => d.race)))
        .value(([, D], key) => D.get(key).population)
        (d3.index(data_p, d => d.year, d => d.race));

    const x = d3.scaleUtc()
        .domain(d3.extent(data_p, d => d.year))
        .range([0, width]);
    const y = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
        .rangeRound([height, 0]);

    const color = d3.scaleOrdinal()
        .domain(series.map(d => d.key))
        .range(d3.schemeTableau10);

    const area = d3.area()
        .x(d => x(d.data[0]))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Population");
    svg.append("g")
        .attr("class", "area")
        .selectAll("path")
        .data(series)
        .join("path")
        .attr("fill", d => color(d.key))
        .attr("d", d => area(d));

    // y axis label
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Population");

    // x axis label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .append("text")
        .attr("fill", "white")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Year");

});



</script>

<style>
.chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100vw;
    height: 100vh;
    /* margin: auto; */
    /* overflow: hidden; */


}
</style>