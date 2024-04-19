<template>
    <div class="chart-container">
    </div>
</template>

<script setup>
import * as d3 from "d3";
import json from '../data/grouped_memories_ls.json'
const data = ref(json);
// console.log(data.value)

//
onMounted(() => {
    setTimeout(() => {
        const chartContainer = document.querySelector('.chart-container');
        const svgWidth = chartContainer.clientWidth;
        const svgHeight = chartContainer.clientHeight;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        const svg = d3.select(".chart-container")
            .append("svg")
            .attr("width", svgWidth + margin.left + margin.right)
            .attr("height", svgHeight + margin.top + margin.bottom)
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
        // .style("transform", "translate(-50%, -50%)");


        svg.append("line")
            .attr("x1", svgWidth / 2)
            .attr("y1", 0)
            .attr("x2", svgWidth / 2)
            .attr("y2", svgHeight)
            .attr("stroke", "gray")
            .attr("stroke-width", 0.5)
            .attr("stroke-dasharray", "3");

        svg.append("line")
            .attr("x1", 0)
            .attr("y1", svgHeight / 2)
            .attr("x2", svgWidth)
            .attr("y2", svgHeight / 2)
            .attr("stroke", "gray")
            .attr("stroke-width", 0.5)
            .attr("stroke-dasharray", "3");

        const x = d3.scaleOrdinal()
            .domain(["Adolescence", "Young adulthood",
                "Middle adulthood", "Early school years", "Toddlerhood", "Preschool years"])
            .range(d3.range(0, svgWidth, svgWidth / 8));


        //.domain([0, d3.max(data, d => d.value)]
        const color = d3.scaleOrdinal()
            .domain(["Adolescence", "Young adulthood", "Middle adulthood", "Early school years", "Toddlerhood", "Preschool years", null])
            .range(["#fb6f92", "#bc4749", "#588157", "#3a5a40", "#3a5a40", "#344e41", "gray"]);


        const node = svg.append("g")
            .selectAll("circle")
            .data(data.value)
            .join("circle")
            .attr("r", 3)
            .attr("cx", svgWidth)
            .attr("cy", svgHeight / 2)
            .attr("fill", d => color(d.ls))
            .attr("stroke", "black")
            .attr("fill-opacity", 0.6)
            .attr("stroke-width", 1)
            .on("mouseover", function (d) {
                console.log(d.target.__data__)
                d3.select(this)
                    .attr("r", 15)
                    .attr("stroke-width", 1);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("r", 3)
                    .attr("stroke-width", 2);
            })
        // .call(d3.drag()
        //     .on("start", dragstarted)
        //     .on("drag", dragged)
        //     .on("end", dragended));

        let simulation = d3.forceSimulation()
            .alphaTarget(0.1) // stay hot
            .velocityDecay(0.6)
            .force("x", d3.forceX().strength(0.1).x(function (d) { return x(d.ls) / 1.3 }))
            .force("y", d3.forceY().strength(0.01).y(svgHeight / 2))
            .force("center", d3.forceCenter().x(svgWidth / 2).y(svgHeight / 2).strength(1)) // Attraction to the center of the svg area
            .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
            .force("collide", d3.forceCollide().strength(0.5).radius(15))// Force that avoids circle overlapping


        simulation.nodes(data.value)
            .on("tick", () => {
                node.attr("cx", d => d.x)
                    .attr("cy", d => d.y);
            });


        // function dragstarted(event, d) {
        //     if (!event.active) simulation.alphaTarget(.03).restart();
        //     d.fx = d.x;
        //     d.fy = d.y;
        // }
        // function dragged(event, d) {
        //     d.fx = event.x;
        //     d.fy = event.y;
        // }
        // function dragended(event, d) {
        //     if (!event.active) simulation.alphaTarget(.03);
        //     d.fx = null;
        //     d.fy = null;
        // }


    }, 500);

});



// onUnmounted(() => {
//     simulation.stop();

//     d3.selectAll("circle").remove();

//     simulation.value.nodes(data.value);
//     simulation.value.force("x", null);
//     simulation.value.force("y", null);
//     simulation.value.force("center", null);
//     simulation.value.force("charge", null);
//     simulation.value.force("collide", null);
// });

</script>

<style>
.chart-container {
    width: 100vw;
    height: 70vh;
    /* border-radius: 10px; */
    /* box-shadow: 0 0 5px rgb(91, 91, 91); */
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