<template>
  <b-navbar toggleable="lg" type="dark" variant="success">
    <b-navbar-brand href="#">Magewell Viewer</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="screenshot">Capture</b-nav-item>
        <b-nav-item href="#">Record</b-nav-item>

        <b-nav-item-dropdown text="Scale" right>
          <b-dropdown-item @click="setVideoScale('no-scale')">No Scale</b-dropdown-item>
          <b-dropdown-item @click="setVideoScale('stretch')">Stretch</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Source" right>
          <b-dropdown-item @click="setVideoSource('analog')">Analog</b-dropdown-item>
          <b-dropdown-item @click="setVideoSource('hdmi')">HDMI</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Settings" right>
          <b-dropdown-form>
            <b-form-checkbox class="text-nowrap" v-model="showDebugOverlay" value="true">Show Debug</b-form-checkbox>
          </b-dropdown-form>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
// Downloads file without opening a new tab
function downloadFile(downloadUrl) {
  const downloadFrame = document.createElement("iframe");
  downloadFrame.setAttribute("src", downloadUrl);
  downloadFrame.setAttribute("class", "d-none");
  document.body.appendChild(downloadFrame);

  setTimeout(() => document.body.removeChild(downloadFrame), 3000);
}

export default {
  data: function() {
    return {
      showDebugOverlay: true
    };
  },
  methods: {
    screenshot() {
      downloadFile(`http://${this.$hostname}:3204/screenshot`);
    },
    setVideoScale(mode) {
      (mode);
    },
    setVideoSource(source) {
      (source);
    }
  },
  watch: {
    '$data': {
      handler: function() {
        this.$parent.updateGlobalSettings(this.$data);
      },
      deep: true
    }
  }
};
</script>
