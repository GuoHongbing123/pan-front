<template>
    <div class='layout'>
        <header-bar @uploadStart="uploadStart"></header-bar>
        <el-container>
            <nav-bar></nav-bar>
            <el-main class="main-warrper">
                <router-view></router-view>
            </el-main>
        </el-container>
        <upload @close="closeUpload" v-show="uploadShow" ref="upload" ></upload>
    </div>
</template>

<script>
import Upload from '../../components/Upload.vue'
import HeaderBar from './HeaderBar.vue'
import NavBar from './NavBar.vue'

export default {
    data(){
        return{
            uploadShow:false
        }
    },
    components:{
        HeaderBar,NavBar,
        Upload
    },
    methods:{
        closeUpload(){
            this.uploadShow = false
            this.$bus.$emit('getlist')
        },
        uploadStart(files){
            this.uploadShow=true
            this.$refs.upload.handleUpload(files)
        }
    }
    
}
</script>

