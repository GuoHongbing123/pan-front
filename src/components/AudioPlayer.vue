<template>
  <el-dialog :title="title" :close-on-click-modal="false" @close="closeEvent" :visible.sync="dialogShow">
    <div><span>{{title}}</span></div>
    <div class="audio-warpper">
      <video :src="audioSrc" controls ></video>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AudioPlayer",
  data() {
    return {
      dialogShow: false,
      audioSrc: '',
      title: ''
    }
  },
  methods: {
    init(info) {
      this.audioSrc = info.audioSrc
      this.title = info.realName
    },
    closeEvent() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.audio-warpper{
  height: 500px;
}
</style>
