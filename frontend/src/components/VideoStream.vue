<template>
  <div id="videoWrapper" class="d-flex justify-content-center align-items-center flex-fill"></div>
</template>
<script>
import JSMpeg from '@cycjimmy/jsmpeg-player';

export default {
  mounted() {
    new JSMpeg.VideoElement('#videoWrapper', `ws://${this.$hostname}:3202/`);
  }
};
</script>
<style>
#videoWrapper {
  position: initial;
}
#videoWrapper > canvas {
  position: initial;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 100%;
  height: auto;
  width: auto;
}
</style>
