<template>
    <div class="chart-container"></div>
    <div class="slideover-container" id="slideover">
        <div class="slideover-content">
            <div class="content"></div>
            <div class="contributor"></div>
            <div class="source"></div>
            <div class="concept"></div>
        </div>
    </div>
</template>

<script setup>
import * as d3 from "d3";
import json from '../data/grouped_memories_ls.json';
const data = ref(json);
// const content = ref('');

onMounted(() => {
    const chartContainer = document.querySelector('.chart-container');
    const svgWidth = chartContainer.clientWidth;
    const svgHeight = chartContainer.clientHeight;
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    // const content = ref('');


    const svg = d3.select(".chart-container")
        .append("svg")
        .attr("width", svgWidth + margin.left + margin.right)
        .attr("height", svgHeight + margin.top + margin.bottom)


    svg.append("line")
        .attr("x1", svgWidth / 2)
        .attr("y1", 0)
        .attr("x2", svgWidth / 2)
        .attr("y2", svgHeight)
        .attr("stroke", "#f2f4f3")
        .attr("stroke-width", 0.1)
        .attr("stroke-dasharray", "3");

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", svgHeight / 2)
        .attr("x2", svgWidth)
        .attr("y2", svgHeight / 2)
        .attr("stroke", "#f2f4f3")
        .attr("stroke-width", 0.1)
        .attr("stroke-dasharray", "3");

    const x = d3.scaleOrdinal()
        .domain(["Adolescence", "Young adulthood",
            "Middle adulthood", "Early school years", "Toddlerhood", "Preschool years"])
        .range(d3.range(0, svgWidth, svgWidth / 8));


    //.domain([0, d3.max(data, d => d.value)]
    const color = d3.scaleOrdinal()
        .domain(["Pensiveness", "Sadness", "Grief", "Nostalgic",
            "Distraction", "Amazement", "Surprise",
            "Apprehension", "Terror", "Fear",
            "Acceptance", "Trust", "Admiration",
            "Serenity", "Joy", "Ecstasy",
            "Interest", "Anticipation", "Vigilance",
            "Annoyance", "Anger", "Rage",
            "Boredom", "Disgust", "Loathing",
            "Embarrassment", null])
        .range(["#b6ad90", "#a68a64", "#936639", "#582f0e",
            "#9d4edd", "#7b2cbf", "#3c096c",
            "#fb6f92", "#bc4749", "#588157",
            "#02c39a", "#00a896", "#05668d",
            "#aacc00", "#55a630", "#2b9348",
            "#d4d700", "#dddf00", "#ffff3f",
            "#a4133c", "#800f2f", "#590d22",
            "#e9ecef", "#dee2e6", "#dee2e6",
            "#ced4da", "#212529"]);

    data.value.sort((a, b) => {
        return color(a.Emotions).localeCompare(color(b.Emotions));
    });

    let isSlideoverVisible = false;
    const node = svg.append("g")
        .selectAll("circle")
        .data(data.value)
        .join("circle")
        .attr("r", 5)
        .attr("cx", svgWidth)
        .attr("cy", svgHeight / 2)
        .attr("fill", d => color(d.Emotions))
        .attr("stroke", "#0a0908")
        .attr("fill-opacity", 0.5)
        .attr("stroke-width", 3)
        .on("mouseover", function (event, d) {

            const sameEmotionsNodes = svg.selectAll("circle")
                .filter(node => node.Emotions === d.Emotions);
            const totalNodes = data.value.length;
            const specificEmotionsNodes = sameEmotionsNodes.size();
            const percentage = (specificEmotionsNodes / totalNodes) * 100;


            sameEmotionsNodes
                .attr("r", 15)
                .attr("stroke-width", 1)
                .attr("fill-opacity", 0.8)
                .style("transition", "r 0.5s ease, stroke-width 0.5s ease, fill-opacity 0.5s ease");

            d3.select(this)
                .transition()
                .duration(300)
                .attr("r", 15)
                .attr("stroke-width", 1)
                .attr("fill-opacity", 0.8);

            // Select the element with class "content" and append the content value
            d3.select(".content")
                .html(d.content);

            d3.select(".contributor")
                .html(d.Contributor);
            // .html(content.source);

            d3.select(".source")
                .html(d.title);

            // d3.select(".concept")
            //     .html(d.concept);


            // <br>Percentage: ${percentage.toFixed(2)}%<br>Total nodes: ${totalNodes}<br>Specific emotions nodes: ${specificEmotionsNodes}
        })
        .on("mouseout", function (event, d) {
            const sameEmotionsNodes = svg.selectAll("circle")
                .filter(node => node.Emotions === d.Emotions);

            sameEmotionsNodes
                .attr("r", 5)
                .attr("stroke-width", 3)
                .attr("fill-opacity", 0.6)
                .style("transition", "r 0.5s ease, stroke-width 0.5s ease, fill-opacity 0.5s ease");

            d3.select(this)
                .transition()
                .duration(300)
                .attr("r", 5)
                .attr("stroke-width", 3)
                .attr("fill-opacity", 0.6);

            // let slideover = document.getElementById("slideover");
            // slideover.style.right = "-400px"
        })
        .on("click", function (event, d) {

            toggleSlideover();

            const sameEmotionsNodes = svg.selectAll("circle")
                .filter(node => node.Emotions === d.Emotions);

        })
    // .call(d3.drag()
    //     .on("start", dragstarted)
    //     .on("drag", dragged)
    //     .on("end", dragended));

    function toggleSlideover() {
        let slideover = document.getElementById("slideover");
        if (slideover.style.right === "0px") {
            slideover.style.right = "-400px"; // Slide out
        } else {
            slideover.style.right = "0px"; // Slide in
        }
    }
    // document.addEventListener("click", function (event) {
    //     let slideover = document.getElementById("slideover");
    //     if (event.target !== slideover && slideover.style.right === "0px") {
    //         slideover.style.right = "-400px"; // Slide out if clicked outside slideover
    //     }
    // });



    let simulation = d3.forceSimulation()
        .alphaTarget(0.06) // stay hot
        .velocityDecay(0.9)
        .force("x", d3.forceX().strength(.01).x(svgWidth / 2))
        .force("y", d3.forceY().strength(.05).y(svgHeight / 2))
        // .force("x", d3.forceX().strength(0.03).x(function (d) { return x(d.ls) / 1.3 }))
        // .force("y", d3.forceY().strength(0.03).y(svgHeight / 2))
        .force("center", d3.forceCenter().x(svgWidth / 2).y(svgHeight / 2).strength(1)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.5).radius(15)) // Force that avoids circle overlapping


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
    height: 100vh;
    margin: auto;
    overflow: hidden;


}

.link {
    fill: none;
    stroke: #ccc;
    stroke-width: 1.5px;
}

.slideover-container {
    position: fixed;
    top: 20px;
    right: -400px;
    /* Initially hidden */
    width: 400px;
    background-color: #495057;
    box-shadow: 0px 0px 0px #fffcf2;
    transition: right 0.3s ease;
    opacity: 70%;
    /* Smooth transition */
    z-index: 1000;
}

.slideover-content {
    padding: 20px;
    
}

.content {
    font-size: 16px;
    font-family:Verdana, Geneva, Tahoma, sans-serif
}

.contributor {
    font-size: 16px;
    font-family:Verdana, Geneva, Tahoma, sans-serif
}

.source {
    font-size: 12px;
    font-family:Verdana, Geneva, Tahoma, sans-serif
}
</style>