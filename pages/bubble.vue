<template>
      <div>
        <div class="filter_container">
            <UButton  class ="btn" to="/">Home</UButton>
            <UButton class ="btn" variant="ghost">LifeStage</UButton>
            <UButton class ="btn" variant="ghost">Concept</UButton>
            <UButton class ="btn" variant="ghost">Item</UButton>
            <UButton class ="btn" variant="ghost">Timeline</UButton>

        </div>
        <div class="canvas">
          <div id="app">
            <bubbleChart_whole />
            <!-- <timelinePopulation />     -->
            <!-- <timelineChart /> -->
          </div>
        </div>
      </div>
</template>

<script setup>


// const selectedChart = ref(null)
// import { ref } from 'vue'

// import data from '../data/memories.json'
// import json from '../data/grouped_memories_ls.json'
// import bubbleChart from '../components/bubbleChart.vue'
// import bubbleChartLs from '../components/bubbleChart_ls.vue'
// import bubbleChartConcept from '../components/bubbleChart_whole.vue'


const loadChart = (chartType) => {
    switch (chartType) {
        case 'LifeStage':
            selectedChart.value = 'bubbleChartLs'
            break
        case 'KeyItems':
            selectedChart.value = 'bubbleChartKeyItems'
            break
        case 'Concept':
            selectedChart.value = 'bubbleChartConcept'
            break
        default:
            selectedChart.value = 'bubbleChart'
    }
    console.log('Selected Chart:', selectedChart.value)
}



</script>

<style scoped>
.filter_container {
    background-color: #0a0908;
    display: flex;
    justify-content:left;
    align-items: center;
    flex-direction: row;
    margin-bottom: 0px;
    width: 100vw;
    height: 10vh;
}

.canvas {
    background-color: #0a0908;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 95vh;
    overflow: hidden;
    color: beige;
}


.btn {

    padding: 10px;
    /* margin: 20px; */
    margin-top: 10px;
    margin-left: 30px;

}
</style>