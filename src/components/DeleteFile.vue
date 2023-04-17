<template>
  <div class="recycle-box">
       <div class="operate-box">
           <el-dropdown @command="handleCommand">
               <div class="operate-btn">
                    <i class="el-icon-more"></i>
               </div>
               <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in dropdownList" :key="item.command" :command="item.command">{{item.title}}</el-dropdown-item>
                </el-dropdown-menu>
           </el-dropdown>
       </div>
       <img :src="require(`@/assets/img/${iconType}-icon.svg`)" class="icon"/>
        <p class="name">{{info.realName}}</p>
  </div>
</template>

<script>
import { restoreFile,deleteFile } from '../api/recycle';
import fileType from "../const/fileType";
export default {
    data(){
        return{
             dropdownList:[
                {
                    title:'恢复',
                    command:'restore'
                },
                {
                    title:'永久删除',
                    command:'destroy'
                },
             ]
        }
    },
    props:{
        info:{
            type:Object,
            required:true
        }
    },
    methods:{
        handleCommand(command){
            this[command]()
        },
        restore(){
            let data={
                fid:this.info.fid,
                id:this.info.id,
                type:this.info.type
            }
            restoreFile(data).then(res =>{
                if(res.code===0){
                    this.$message.success('恢复成功')
                    this.$bus.$emit('getrecyclelist')
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        destroy(){
            let data={
                fid:this.info.fid,
                id:this.info.id,
                type:this.info.type
            }
            deleteFile(data).then(res =>{
                if(res.code === 0){
                    this.$message.success('彻底删除')
                    this.$bus.$emit('getrecyclelist')
                }else{
                    this.$message.error(res.msg)
                }
            })
        }
    },
    mounted(){
        
    },
    computed:{
        iconType(){
            if(this.info.remark !== ''){
                let type=fileType[this.info.remark]
                return type ? type:'unknown'
            }else{
                return 'folder'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.recycle-box{
    position: relative;
    cursor: pointer;
    margin: 0 20px;
    margin-bottom:10px ;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 15px;
    .icon{
        width: 85px;
        height: 85px;
    }
    .name{
        text-align: center;
        font-size: 14px;
        line-height: 1.5;
        max-width: 90px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
        margin-bottom: 2px;
        margin-top: 8px;

    }
    &:hover{
        background-color: #f5f5f5;
        .operate-box{
            opacity: 1;
        }
    }
    .operate-box{
        opacity: 0;
        position: absolute;
        right: 0;
        top:0;
        .operate-btn{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 36px;
            height :36px;
            border-radius: 12px;
            background-color: #fff;
            i{
                font-size: 20px;
            }
        }
    }
}
</style>