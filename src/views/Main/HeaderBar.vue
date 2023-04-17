<template>
    <el-header class="_header">
        <div class="logo-box">
            <img @click="handleHome" src="@/assets/cloudpan.png"/>
            <span class="handle-name">巨硬网盘</span>
        </div>
        <div class="operate-btn">
            <img src="@/assets/upload.png"/>
            <input type="file" class="upload" ref="upload" @change="fileChange"/>
        </div>
    </el-header>
</template>

<script>
import { staticUrl }from '../../const'
export default {
    data(){
        return{

        }
    },
    methods:{
        handleHome(){
            this.$bus.$emit('getlist')
        },
        fileChange(){
            this.$emit('uploadStart',this.$refs.upload.files)
        }
    }
}
</script>

<style lang="scss" scoped>
._header{
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 5px rgb(0 0 0/10%);
    background: #55b2e7; //#36b4e6    #55b2e7   #a2e7f3
    .logo-box{
        .handle-name{
            margin-left: 15px;
            font-size: 20px;
            font-weight: bold;
        }
        img{
            width: 60px;
            height: 60px;
        }
    }
    .operate-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        img{
            width: 40px;
            height: 40px;
        }
    }
    .upload{
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
    }
}
</style>>

