<template>
  <el-dialog :title="title" :close-on-click-modal="false" @close="closeEvent" :visible.sync="dialogShow">
    <div><span>{{title}}</span></div>
    <div class="video-warpper">
      <video style="height: 100%; width: 100%" :src="videoSrc" controls ></video>
    </div>
  </el-dialog>

</template>

<script>
export default {
  name: "PlayerModal",
  data() {
    return {
      dialogShow: false,
      videoSrc: '',
      title: ''
    }
  },
  methods: {
    init(info) {
      this.videoSrc = info.videoSrc
      this.title = info.realName
    },
    closeEvent() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.video-warpper{
  height: 500px;
}
</style>
