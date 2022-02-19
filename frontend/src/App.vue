<template>
  <div id="app" class="h-100 d-flex flex-column ">
    <Navbar style="z-index:2000"/>
    <DebugOverlay/>
    <VideoStream />
  </div>
</template>
<script>
import Navbar from "./components/Navbar.vue";
import DebugOverlay from "./components/DebugOverlay.vue";
import VideoStream from "./components/VideoStream.vue";

export default {
  name: "magewell-viewer",
  data: function() {
    return {
      globalSettings: {
        showDebugOverlay: false
      }
    };
  },
  components: {
    Navbar,
    DebugOverlay,
    VideoStream
  },
  methods: {
    updateGlobalSettings: function(settings) {
      this.globalSettings = { ...settings };
      this.$bus.$emit('setDebugOverlayEnabled', this.globalSettings.showDebugOverlay);
    }
  }
};
</script>
