<script setup>
import timeline from './pages/timeline.vue';
import bubble from './pages/bubble.vue';
import ending from './pages/ending.vue';

</script>
<template>
  <div class="global-container">
    <NuxtPage />
  </div>
</template>

<style>
* {
  margin: 0px;
  padding: 0px;
}

body,
html {
  overflow: hidden;
}

.global-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
