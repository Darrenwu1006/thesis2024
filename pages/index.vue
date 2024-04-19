<script setup>
import videoSource from '../data/video/pl1.mov';

// import * as p5 from 'p5';
// onMounted(() => {
//   new p5(sketch, p5Container.value);
// });

// const sketch = (p) => {
  
//   p.setup = () => {

//   };
// };


</script>

<template>
  <div class="pages">
    <div class="background-container">
      <div class="video-container">
        <video autoplay muted loop>
          <source :src="videoSource" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>

      
      
      <h1 class="title">MOM! Can I Not Bring the Lunch Box to School?</h1>
        <UButton to="/timeline"  class="content" color ="gray" variant="ghost" size = "lg"> Timeline </UButton>
          <!-- <UButton to="/lifestage"  class="content" color ="gray" variant="ghost" size = "lg"> Lifestage </UButton> -->
          <UButton to="/bubble" class="content" color ="gray" variant="ghost" size = "lg"> Bubble </UButton>
          <UButton to="/ending"  class="content" color ="gray" variant="ghost" size = "lg"> Ending</UButton>
    </div>
  </div>
</template>

<style>
.pages {
  background-color: #000814;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: beige;
  z-index: 1;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.video-container video {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
}

.title {
  position: relative;
  z-index: 1;
  padding: 10px;
  margin: 10px;
  font-size: 36px;
  color: whitesmoke;

}
.content {
  position: relative;
  z-index: 1;
  padding: 10px;
  margin: 10px;
}
.u-button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 12px;
  transition-duration: 0.4s;
  cursor: pointer;
}

</style>
