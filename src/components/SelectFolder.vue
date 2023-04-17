<template>
  <el-dialog
  :title="isMove ? '移动' :'保存'"
  :visible.sync="dialogVisible"
  width="20%">
  <div class="folder-list">
      <div class="folder-item" :class="{'selected': item.id===selectFolderId}" @click="select(item)" @dblclick="checkChild(item)" v-for="item in list" :key="item.id">
          <img src="@/assets/img/folder-icon.svg"/>
          <div class="folder-name">{{item.realName}}</div>
      </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import { moveFolder, getFolder } from "../api/folder";
import { moveFile } from "../api/file";
export default {
    data(){
        return{
            dialogVisible:false,
            list:[],
            moveInfo:null,
            currentFolderId:null,
            selectFolderId:null,
            folderIdList:[]
        }
    },
    props:{
        isMove:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        confirm(){
            // if(!this.selectFolderId){
            //     this.$message.error(`请选择想要${this.move ? '移动' : '保存'}至的目录`)
            //     return
            // }
            this.move(this.selectFolderId)
        },
        async move(folderId){
            if(this.isMove){
                let data={
                id:this.moveInfo.id,
                pid : folderId || 0,
                folderId : folderId || 0
                }
                let res=this.moveInfo.isFolder ? await moveFolder(data) : await moveFile(data)
                if(res.code===0){
                    this.$message.success('移动成功')
                    this.$bus.$emit('getlist')
                    this.dialogVisible=false
                    this.$emit('moveSuccess')
                }else{
                    this.$message.error(res.msg)
                }
            }else{
                this.$emit('saveConfirm', folderId || 0)
            }
            
        },
        init(info){
            this.moveInfo=info
            this.getFolderFun(null)
        },
        getFolderFun(id){
            getFolder(id).then(res=>{
                if(res.code===0){
                    this.list=res.data
                   this.folderIdList.length!==0 && this.list.unshift({
                        realName:'..'
                    })
                }
            })
        },
        checkChild(item){
            if(this.realName==='..'){
                this.folderIdList.pop()
                this.getFolderFun(this.folderIdList[this.folderIdList.length-1])
            }else{
                this.folderIdList.push(item.id)
                this.getFolderFun(item.id)
            }
        },
        select(item){
            this.selectFolderId=this.selectFolderId===item.id ? null : item.id
        },
    },
}
</script>

<style lang="scss" scoped>
.folder-list{
    .folder-item{
        display: flex;
        align-items: center;
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 4px;
        img{
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }
        &:hover{
            background-color: #e9eaed;
        }
    }
    .selected{
        background-color: #2296f3;
        color: #fff;
        &:hover{
            background-color:#2296f3 ;
            color: #fff;
        }
    }
}
</style>