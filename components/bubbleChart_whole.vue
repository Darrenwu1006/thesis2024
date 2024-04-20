<template>
    <div class="chart-container"></div>
</template>

<script setup>
import * as d3 from 'd3';
import * as d3h from 'd3-hierarchy';
import data from '../data/grouped_memories_ls.json';
import data1 from '../data/flare-2.json'
// console.log(data)

const result = d3.rollup(
    data,
    (v) => d3.mean(v, (d) => d['value']),
    (d) => d.concept,
    (d) => d.key_term,

    (d) => d.Emotions,
    (d) => d.content,
    (d) => d.id,

);

console.log(result);

const color = d3
    .scaleOrdinal()
    .domain([
        'Pensiveness',
        'Sadness',
        'Grief',
        'Nostalgic',
        'Distraction',
        'Amazement',
        'Surprise',
        'Apprehension',
        'Terror',
        'Fear',
        'Acceptance',
        'Trust',
        'Admiration',
        'Serenity',
        'Joy',
        'Ecstasy',
        'Interest',
        'Anticipation',
        'Vigilance',
        'Annoyance',
        'Anger',
        'Rage',
        'Boredom',
        'Disgust',
        'Loathing',
        'Embarrassment',
        null,
    ])
    .range([
        '#b6ad90',
        '#a68a64',
        '#936639',
        '#bc4749',
        '#9d4edd',
        '#7b2cbf',
        '#3c096c',
        '#fb6f92',
        '#bc4749',
        '#588157',
        '#02c39a',
        '#00a896',
        '#05668d',
        '#aacc00',
        '#55a630',
        '#2b9348',
        '#d4d700',
        '#dddf00',
        '#ffff3f',
        '#a4133c',
        '#800f2f',
        '#590d22',
        '#e9ecef',
        '#dee2e6',
        '#dee2e6',
        '#ced4da',
        '#ffecd1',
    ]);

onMounted(() => {
    const chartContainer = document.querySelector('.chart-container');
    const width = chartContainer.clientWidth;
    const height = chartContainer.clientHeight;

    const svg = d3
        .select('.chart-container')
        .append('svg')
        .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
        .attr('width', width)
        .attr('height', height)

    const pack = d3.pack().size([width, height]).padding(3);
    console.log(pack.size);

    const root = pack(
        d3
            .hierarchy(result)
            .sum(([, value]) => value)
            .sort((a, b) => b.value - a.value)
    );



    const node = svg
        .append('g')
        .selectAll('circle')
        .data(root.descendants().slice(1))
        .join('circle')
        .attr('fill', (d) => (d.children ? '#bfc0c020' : color(d.data[0])))
        .attr('opacity', 1)
        // .attr("opacity", d => d.children ? 0.2 : 0.8)
        .attr('stroke', (d) => (d.children ? '#ffffff' : null))
        .attr('stroke-width', 0)
        .attr('r', (d) => d.r)
        .attr('pointer-events', (d) => (!d.children ? 'none' : null))
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .on('mouseover', function () {
            d3.select(this).attr('stroke-width', 5);
            // .attr("fill",)
            // .attr("opacity", 1);
        })
        .on('mouseout', function () {
            d3.select(this).attr('stroke-width', 0);
            // .attr("opacity", 0.2);
        })
        .on("click", (event, d) => {
            focus !== d && (zoom(event, d), event.stopPropagation())

        });

    node.append('title').text(
        (n) =>
            `${n.depth
                ? `${n
                    .ancestors()
                    .reverse()
                    .slice(1)
                    .map(({ data: [key] }) => key)
                    .join('\n')}\n`
                : ''
            }${n.value.toLocaleString('en')}`
    );

    const label = svg
        .append('g')
        .style('font', '10px sans-serif')
        .attr('text-anchor', 'middle')
        .selectAll('text')
        .data(root.descendants())
        .join('text')
        .attr("transform", d => `translate(-${d.x} -${d.y} )`)
        .attr('fill', 'white')
        .style('fill-opacity', (d) => (d.parent === root ? 1 : 0))
        .style('display', (d) => (d.parent === root ? 'inline' : 'none'))
        // .text((d) => d.data[0])
        .text(
            (n) =>
                `${n.depth
                    ? `${n
                        .ancestors()
                        .reverse()
                        .slice(1)
                        .map(({ data: [key] }) => key)
                        // .text(d => d.data[0])
                        .join('\n')}\n`
                    : ''
                }${n.value.toLocaleString('en')}`
        );


    console.log(label);
    console.log(root.descendants());
    // Create the zoom behavior and zoom immediately in to the initial focus node.
    svg.on("click", (event) => zoom(event, root));
    let focus = root;
    let view;
    zoomTo([focus.x, focus.y, focus.r * 3]);

    function zoomTo(v) {
        const k = width / v[2];

        view = v;

        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
    }

    function zoom(event, d) {
        const focus0 = focus;

        focus = d;

        const transition = svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
                const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 3]);
                return t => zoomTo(i(t));
            });

        label
            .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
            .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    return svg.node();
});
</script>

<style scoped>
.chart-container {
    width: 90vw;
    height: 100vh;
    stroke-width: 10px;
    overflow: hidden;
    /* background-color: #fff; */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin: auto;
    overflow: hidden;
}
</style>
