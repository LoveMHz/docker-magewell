<template>
  <div id="app" class="h-100 d-flex flex-column ">
    <Navbar />
    <VideoStream />
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import VideoStream from "./components/VideoStream.vue";
export default {
  name: "navbar",
  components: {
    Navbar,
    VideoStream
  }
};
</script>