<template>
    <div class="pages">
        <h1>Timeline</h1>
        <UButton to="/" color="primary" variant="solid"> Home </UButton>
        <timelinePopulation /> 
    </div>
</template>

<script setup>

</script>

<style>
* {
    margin: 0;
    padding: 0;
    /* background-color: #000814; */

}

body,
html {
    overflow-y: hidden;
    overflow-x: scroll;
}


.pages {
    /* background-color: #000814; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:100vw;
    height: 100vh;
    /* overflow: hidden; */
    color: beige;
}
</style>