<template>
  <b-container class="debug-overlay" v-show="enabled" fluid>
    <b-row>
      <b-col md="auto">
        <pre class="text-white">{{ av_info[0] }}</pre>
      </b-col>
      <b-col md="auto">
        <pre class="text-white">{{ av_info[1] }}</pre>
      </b-col>
    </b-row>
    </b-container>
</template>
<script>
export default {
  data: function () {
    return {
      enabled: false,
      av_info: ['', '']
    };
  },
  created: function () {
    this.$bus.$on('setDebugOverlayEnabled', this.setDebugOverlayEnabled);
    setInterval(function() {
      this.getData();
    }.bind(this), 500);
  },
  methods: {
    setDebugOverlayEnabled(enable) {
      this.enabled = enable;
    },
    async getData() {
      try {
        const response = await this.$http.get(`http://${this.$hostname}:3204/info`);

        // Attempt to split the data in to two columns
        if(response.data.indexOf("Input specific")) {
          const split_index1 = response.data.indexOf("Input specific");
          const split_index2 = response.data.indexOf("HDMI information frame -- SPD");
          this.av_info[0] = response.data.substring(0, split_index1 - 1);
          this.av_info[1] = response.data.substring(split_index1, split_index2);
        } else {
          this.av_info[0] = response.data;
          this.av_info[1] = response.data;
        }

        this.$forceUpdate();
      } catch (error) {
        // TODO:
      }
    },
  }
};
</script>
<style>
.debug-overlay {
  display: block;
  padding: 70px 20px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}
.debug-overlay pre {
  background-color: rgba(0, 0, 0, 0.9);
  text-shadow: 0.05em 0 black, 0 0.05em black, -0.05em 0 black, 0 -0.05em black, -0.05em -0.05em black, -0.05em 0.05em black, 0.05em -0.05em black, 0.05em 0.05em black;
  padding: 24px;
}
</style>
