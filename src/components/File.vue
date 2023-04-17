<template>
   <div class="file-box">
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
    <div>
	  <el-image-viewer 
               v-if="showViewer" 
               :on-close="closeViewer" 
               :url-list="[this.url]" />
	</div>
  </div>
</template>

<script>

import fileType from "../const/fileType";
import { renameFolder, removeFolder } from "../api/folder";
import { renameFile, getDownloadPath} from "../api/file";
import { changePassword } from '../api/user';
import { staticUrl }  from '../const/index'
export default {
    data(){
        return{
            url:'',
            showViewer:false,
            videoUrl:'',
            dropdownList:[
                {
                    title:'下载',
                    command:'download'
                },
                {
                    title:'分享',
                    command:'share'
                },
                {
                    title:'重命名',
                    command:'rename'
                },
                {
                    title:'移动',
                    command:'move'
                },
                {
                    title:'移到回收站',
                    command:'delete'
                }
            ]
        }
    },
    components:{
       
    },
    props:{
        info:{
            type:Object,
            required:true
        }
    },
    
    methods:{
        closeViewer() {
             this.showViewer = false
        },
        handleCommand(command){
            this[command]()
        },
        // look(){
        //     getDownloadPath(this.info.id,this.info.type).then(res =>{
        //         if(res.code === 0){
        //             let type=fileType[this.info.suffix]
        //             if(type === 'image'){
        //                 let data = `${this.$staticUrl}/${res.data.dlLink}`
        //                 this.url=data
        //                 this.showViewer=true
        //             }else{
        //                 let officeType=['word','txt','ppt','excle']
        //                 if(officeType.includes(type)){
        //                     let data = `${this.$staticUrl}/${res.data.dlLink}`
        //                     let officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src='+data
        //                     window.open(officeUrl,"_blank")
        //                 }else{
        //                     // document.getElementById('_video').src = `http://101.34.26.36:8080/${res.data.dlLink}`
        //                     // this.$refs.vedio.src = `http://101.34.26.36:8080/${res.data.dlLink}`
        //                     // console.log(this.vedioPlay.src)
                            
        //                 }
        //             }
        //         }
        //     })
        // },
        download(){
            getDownloadPath(this.info.id,this.info.type).then(res=>{
                if(res.code===0){
                    window.open(`http://127.0.0.1:8080/`+res.data.dlLink)
                }
            })
        },
        share(){
            this.$emit('share',this.info)
        },
        move(){
            this.$emit('move',{
                id:this.info.id,
                isFolder:this.info.type==='2'
            })
        },
        rename(){
            this.$prompt('请输入新名称', '重命名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^((?![\\/:*?？^`~&<>|'%]).){1,20}$/,
          inputErrorMessage: '20个字符以内，不能包含特殊字符',
          inputValue:this.info.realName
        }).then(async ({ value }) => {
          let folderId=this.$route.query.id
          let data={
              pid:folderId ? folderId : 0,
              realName:value,
              id:this.info.id
          }
          let res =this.info.type==='2' ? await renameFolder(data) : await renameFile(data)
          if(res.code===0){
              this.$message.success('修改成功')
              this.$bus.$emit('getlist')
          }else{
              this.$message.error(res.msg)
          }
        }).catch(() => {

        });
        },
        delete(){
            let data={
                fid:this.info.id,
                type:this.info.type
            }
            removeFolder(data).then(res =>{
                    if(res.code === 0){
                        this.$message.success('成功移动到回收站')
                        this.$bus.$emit('getlist')
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            // if(type === '2'){
                
            // }else{
            //     removeFile(data).then(res =>{
            //         if(res.code === 0){
            //             this.$message.success('成功移动到回收站')
            //             this.$bus.$emit('getlist')
            //         }else{
            //             this.$message.error(res.msg)
            //         }
            //     })
            // }
            
        }
    },
    computed:{
        iconType(){
            if(this.info.hasOwnProperty('suffix')){
                let type=fileType[this.info.suffix]
                return type? type:'unknown'
            }else{
                return 'folder'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.file-box{
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