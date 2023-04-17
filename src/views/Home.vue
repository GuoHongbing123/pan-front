<template>
  <div class="home">
    <div class="breadcrumb-box">
      <div class="breadcrumb-item" v-for="(item,index) in bread" :key="item.id">
        <i v-if="index!==0" class="el-icon-arrow-right"></i>
        <span @click="handleBread(item.id,index)" :class="{'clickable': index!==bread.length-1}">{{item.realName}}</span>
      </div>
    </div>
    <div class="list">
      <file 
        @renameSuccess="rename" 
        @click.native="clickHander(item)" 
        @move="handleMove"
        @share="handleShare" 
        draggable="true"
        @dragover.native="(e) => allowDrop(e, item)"
        @dragstart.native="(e) => dragStart(e,item)"
        @drop.native="(e) => drop(e,item)"
        :info="item" 
        v-for="item in list" 
        :key="item.id"></file>
    </div>
	  <div><el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="[this.imageUrl]" /></div>
    <video-player @close="videoPlayerShow = false" v-if="videoPlayerShow" ref="videoPlayerRef"></video-player>
    <audio-player @close="audioPlayerShow = false" v-if="audioPlayerShow" ref="audioPlayerRef"></audio-player>
    <select-folder @moveSuccess="selectShow=false" v-if="selectShow" ref="select"></select-folder>
    <share-modal ref="share" v-if="shareShow"></share-modal>
  </div>
</template>

<script>
import { getFileById,getLocation,moveFolder } from "../api/folder";
import { moveFile, getDownloadPath } from "../api/file";
import  File  from "../components/File.vue";
import VideoPlayer from "../components/VideoPlayer";
import AudioPlayer from "../components/AudioPlayer";
import SelectFolder from "../components/SelectFolder.vue";
import ShareModal from "../components/ShareModal.vue";
import fileType from "../const/fileType"
import { staticUrl } from "../const/index";
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'Home',
  data() {
    return{
      imageUrl:'',
      list:[],
      bread:[],
      currentFolderId:'',
      selectShow:false,
      shareShow:false,
      showViewer:false,
      videoPlayerShow: false,
      audioPlayerShow: false,
    }
  },
  components:{
    File,
    SelectFolder,
    ShareModal,
    VideoPlayer,
    AudioPlayer,
    ElImageViewer
  },
  watch:{
    $route(newVal){
      this.currentFolderId=newVal.query.id
      this.getFiles()
      this.setLocation()
    }
  },
  methods:{
    dragStart(e, item){
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('id', item.id)
      e.dataTransfer.setData('type', item.type)
    },
    drop(e,item){
      this.move({
        type:e.dataTransfer.getData('type'),
        id:e.dataTransfer.getData('id'),
        pid:item.id,
        folderId:item.id
      })
    },
    allowDrop(e, item){
      if(item.type === '2'){
        e.preventDefault()
      }
    },
    async move(data){
      let res=data.type === '2' ? await moveFolder(data) : await moveFile(data)
      if(res.code === 0){
        this.$message.success('移动成功')
        this.getFiles()
      }else{
        this.$message.error(res.msg);
      }
    },
    //video auvio 使用
    videoHandler(item) {
      this.getPath(item).then(data => {
        this.videoPlayerShow = true
        this.$nextTick(() => {
          this.$refs.videoPlayerRef.dialogShow = true
          this.$refs.videoPlayerRef.init({
            videoSrc: staticUrl + data,
            title: item.realName
          })
        })
      })
    },
    audioHandler(item) {
      this.getPath(item).then(data => {
        this.audioPlayerShow = true
        this.$nextTick(() => {
          this.$refs.audioPlayerRef.dialogShow = true
          this.$refs.audioPlayerRef.init({
            audioSrc: staticUrl + data,
            title: item.realName
          })
        })
      })
    },
    closeViewer() {
             this.showViewer = false
    },
    imageHandler(item){
      this.getPath(item).then(data =>{
        this.showViewer = true
        let list = `${staticUrl}${data}`
        this.imageUrl = list
                // if(res.code === 0){
                //     let type=fileType[this.info.suffix]
                //     if(type === 'image'){
                //         let data = `${staticUrl}/${res.data.dlLink}`
                //         this.url=data
                //         this.showViewer=true
                //     }
                // }
       })
    },
    getPath(item) {
      return new Promise((resolve, reject) => {
        getDownloadPath(item.id,item.type).then(res => {
          if (res.code === 0) {
            resolve(res.data.dlLink)
          } else {
            this.$message.error(res.msg)
            reject()
          }
        })
      })
    },

    handleMove(info){
      this.selectShow=true
      this.$nextTick(() => {
        this.$refs.select.dialogVisible = true
        this.$refs.select.init(info)
      })
    },
    handleShare(info){
      this.shareShow = true
      this.$nextTick(() => {
        this.$refs.share.visible=true
        this.$refs.share.init(info)
      })
    },
    handleBread(id,index){
      if(index!==this.bread.length-1){
        this.$router.push('/home?id='+id)
      }
    },
    setLocation(){
      if(this.currentFolderId){
        getLocation(this.currentFolderId).then(res=>{
          this.bread=res.data.reverse()
          this.bread[0].realName='首页'
      })
      }else{
        this.bread.splice(0,this.bread.length)
      }
      
    },
    rename(id,newName){
      let index=this.list.findIndex(item=>{
        return item.id == id
      })
      this.list[index].realName = newName
    },
    getFiles(){
      getFileById(this.currentFolderId).then((res)=>{
        this.list=[...res.data.folder,...res.data.file]
      })
    },
    clickHander(item){
      if (item.type === '1') {
        if (typeof((this[fileType[item.suffix] + 'Handler'])) === 'function') {
          this[fileType[item.suffix] + 'Handler'](item)

        } else if(['txt','word','excel','ppt'].includes(fileType[item.suffix])){
          this.checkOffice(item)
        } 
      }else {
        this.$router.push({path: '/home?id=' + item.id})
     }
    },
    checkOffice(item) {
      this.getPath(item).then(data => {
        let link = `${staticUrl}${data}`
        let officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src='+link
        window.open(officeUrl,"_blank")
      })
    }
  },
  mounted(){
    this.getFiles()
    if(this.$route.query.id){
      this.currentFolderId = this.$route.query.id
      this.setLocation()
    }
    this.$bus.$on('getlist',this.getFiles)
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb-box{
  display: flex;
}
.clickable{
  font-weight: bold;
  cursor: pointer;
}
.list{
  display: flex;
  flex-wrap:wrap;
}
</style>