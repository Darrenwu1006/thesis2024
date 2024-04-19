<template>
    <div class="chart-container">
    </div>
</template>

<script setup>
import * as d3 from "d3";
// import * as d3h from "d3-hierarchy";
import json from '../data/grouped_memories_ls.json'
const data = ref(json);
console.log(data.value)

//
onMounted(() => {
    setTimeout(() => {
        const svgWidth = innerWidth * 0.9;
        const svgHeight = innerHeight * 0.9;

        const svg = d3.select(".chart-container")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        const x = d3.scaleOrdinal()
            .domain(["Adolescence", "Young adulthood",
                "Middle adulthood", "Early school years", "Toddlerhood", "Preschool years"])
            .range([0, 50,100]);

        const y = d3.scaleLinear()
        //.domain([0, d3.max(data, d => d.value)]

        const color = d3.scaleOrdinal()
            .domain(["Nostalgic", "Pensiveness",
                "Middle adulthood", "Early school years", "Toddlerhood", "Preschool years"])
            .range(["#fb6f92", "#bc4749", "#588157", "#3a5a40", "#3a5a40", "#344e41",]);

        const node = svg.append("g")
            .selectAll("circle")
            .data(data.value)
            .join("circle")
            .attr("r",5)
            .attr("cx", svgWidth / 2)
            .attr("cy", svgHeight / 2)
            .attr("fill", d => color(d.ls))
            .attr("stroke", "black")
            .attr("fill-opacity", 0.5)
            .attr("stroke-width", 2)
            .on("mouseover", function (d) {
                console.log(d.target.__data__)
                d3.select(this)
                    .attr("r", 15)
                    .attr("stroke-width", 5);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("r", 5)
                    .attr("stroke-width", 2);
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        var simulation = d3.forceSimulation()
            .force("x", d3.forceX().strength(2).x(d => x(d.ls)))
            .force("y", d3.forceY().strength(0.1).y(svgHeight / 2))
            .force("center", d3.forceCenter().x(svgWidth / 2).y(svgHeight / 2).strength(0.1)) // Attraction to the center of the svg area
            .force("charge", d3.forceManyBody().strength(10)) // Nodes are attracted one each other of value is > 0
            .force("collide", d3.forceCollide().strength(.1).radius(32).iterations(0.1)) // Force that avoids circle overlapping

        simulation.nodes(data.value)
            .on("tick", () => {
                node.attr("cx", d => d.x)
                    .attr("cy", d => d.y);
            });


        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(.03).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(.03);
            d.fx = null;
            d.fy = null;
        }


    }, 1000);

});

onUnmounted(() => {
    simulation.stop();

    d3.selectAll("circle").remove();

    simulation.value.nodes(data.value);
    simulation.value.force("x", null);
    simulation.value.force("y", null);
    simulation.value.force("center", null);
    simulation.value.force("charge", null);
    simulation.value.force("collide", null);
});


</script>

<style scoped>
.chart-container {
    width: 90vw;
    height: 80vh;
    stroke-width: 10px;
    overflow: hidden;
    /* background-color: #fff; */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: auto;
    overflow: hidden;

}

/* svg {
    width: 100%;
    height: 100%;
    overflow: hidden;
} */

.link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
}

.node {
    fill: steelblue;
    stroke: #fff;
    stroke-width: 1.5px;
}
</style>