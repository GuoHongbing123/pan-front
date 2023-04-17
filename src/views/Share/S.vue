<template>
  <div class="s-container">
      <div class="check-container" v-show="!hasCheck">
          <el-form :model="form" class="check-box" ref="form" :rules="rules">
              <el-form-item>
                  <p style="font-size:20px; font-weigth:blod">{{`${shareInfo.ownerName}`}}向您分享了文件</p>
              </el-form-item>
              <el-form-item>
                  <el-input placeholder="请输入提取码" maxlength="4" v-model="form.code"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="info" @click="checkCode" style="width: 100%">提取文件</el-button>
              </el-form-item>
          </el-form>
      </div>
      <el-main class="main-box">
          <div class="title">
              {{title}}
          </div>
          <div class="share-time">
              <i class="el-icon-time"></i>
              <span>{{shareTime}}</span>
          </div>
          <div class="breadcrumb-box">
              <div class="breadcrumb-item" v-for="(item, index) in breadcrumb" :key="item.id">
                  <div class="item-box" @click="handleBreadcrumb(item, index)">
                      <i class="el-icon-s-home" style="font-size: 20px" v-if="index === 0"></i>
                      <span style="font-size: 16px" v-else>{{item.realName}}</span>
                  </div>
                  <i class="el-icon-arrow-right" style="font-size: 18px" v-if="index !==breadcrumb.length-1"></i>
              </div>
          </div>
          <div class="file-list">
              <el-table :data="list">
                  <el-table-column label="名称"  min-width="300">
                      <template slot-scope="scope">
                          <div class="name" @click="checkChildren(scope.row)">
                            <img class="icon" :src="require(`@/assets/img/${scope.row.iconType}-icon.svg`)"/>
                            <span :style="{cursor:scope.row.type === '2' ? 'pointer' : 'auto'}" style="font-size: 16px">{{scope.row.realName}}</span>
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column label="大小" prop="size">
                  </el-table-column>
                  <el-table-column label="操作">
                      <template slot-scope="scope">
                          <el-button @click="save(scope.row)" type="text">保存</el-button>
                          <el-button @click="download(scope.row)" type="text">下载</el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
      </el-main>
      <select-folder v-if="selectShow" @saveConfirm="handleSave" :isMove="false" ref="select"></select-folder>
  </div>
</template>

<script>
import { checkShare,authShare,Tsave,getChildren } from "../../api/share";
import fileType from "../../const/fileType"
import Tool from "../../utils/tool"
import { getDownloadPath } from "../../api/file";
import SelectFolder from "../../components/SelectFolder.vue";
import { staticUrl } from "../../const/index";
export default {
  components: { SelectFolder },
    data(){
        return {
            breadcrumb:[],
            link:'',
            hasCheck:false,
            needAuth:true,
            title:'',
            shareTime:'',
            shareInfo:{
                ownerName: ''
            },
            form:{
                code:''
            },
            list:[],
            rules:{
                code:[{
                    required:true,message:'请输入提取码',trigger:'blur'
                }],
            },
            selectShow:false,
            saveInfo:null,
        }
    },
    components:{
        SelectFolder
    },
    methods:{
        handleBreadcrumb(item,index){
            if(this.breadcrumb.length>1){
                if(index === 0){
                    this.checkCode()
                }else{
                    this.checkChildren(item, true)
                }
                this.breadcrumb.splice(index + 1, this.breadcrumb.length)
            }
        },
        checkChildren(item, noPush){
            if(item.type==='2'){
                getChildren(this.link,this.form.code,item.id).then(res=>{
                    if(res.code===0){
                        this.dealFile(res.data.folder,res.data.file)
                        if(!noPush){
                            this.breadcrumb.push(item)
                        }
                    }
                })
            }
        },
        initCheck(){
            checkShare(this.link).then(res=>{
                if(res.code===0){
                    this.needAuth=res.data.shareType==='1'
                    this.shareInfo=res.data
                    if(this.needAuth){
                        let code = localStorage.getItem(`#${this.link}`)
                        if(code){
                            this.form.code = code
                            this.checkCode()
                        }
                    }else{
                        this.hasCheck=true
                    }
                }
            })
        },
        saveLink(){
            localStorage.setItem(`#${this.link}`,this.form.code)
        },
        checkCode(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    authShare(this.link,this.form.code).then(res=>{
                        if(res.code===0){
                            this.hasCheck=true
                            if(this.needAuth){
                                this.saveLink()
                                this.dealFile(res.data.folder,res.data.file)
                                this.title=this.list[0].realName
                                this.shareTime=this.list[0].updateTime
                                if(this.list[0].type === '2' && this.breadcrumb.length === 0){
                                    this.breadcrumb.push({})
                                }
                            }
                        }
                    })
                }
            })
        },
        dealFile(folder_, file_){
            let folder=folder_ || []
            let file=file_ || []
            folder.forEach(element=>{
                element.iconType= 'folder'
            });
            file.forEach(element=>{
                let type = fileType[element.suffix]
                element.iconType= type ? type : 'unknown'
                element.size= Tool.formatSize(Number(element.size))
            })
            this.list=folder.concat(file)
        },
        download(item){
            getDownloadPath(item.id, item.type).then(res=>{
                if(res.code===0){
                    window.open(staticUrl + res.data.dlLink)
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        save(item){
            this.selectShow=true
            this.saveInfo=item
            this.$nextTick(()=>{
                this.$refs.select.dialogVisible=true
                this.$refs.select.init(item)
            })
        },
        handleSave(folderId){
            let data={
                targetFolderId:folderId
            }
            data[this.saveInfo.type==='2' ? 'folderId' : 'fileId'] = this.saveInfo.id
            Tsave(data).then(res=>{
                if(res.code===0){
                    this.selectShow=false
                    this.$message.success('保存成功')
                    this.saveInfo=null
                }else{
                    this.$message.error(res.msg)
                }
            })
        }
    },
    mounted(){
        this.link=this.$route.params.id
        this.initCheck()
    }
}
</script>

<style lang="scss" scoped>
.s-container{
    .check-container{
        display: flex;
        align-items: center;
        height: 100vh;
        justify-content: center;
        .check-box{
            width: 350px;
            border-radius: 16px;
            border: 1px solid #f6f6f6;
            padding: 35px 35px 15px;
            box-shadow: 0 0 25px #aaa;
        }
    }
    .main-box{
        padding-top: 40px;
        .title{
            font-size: 20px;
            font-weight: bold;
        }
        .share-time{
            margin: 20px 0;
            span{
                font-size: 14px;
            }
            i{
                margin-right: 10px;
                font-size: 14px;
            }
        }
        .breadcrumb-box{
            display: flex;
            .breadcrumb-item{
                display: flex;
                align-items: center;
                .item-box{
                    cursor: pointer;
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    &:hover{
                        background-color: #f5f5ff;
                    }
                }
            }
        }
        .file-list{
            .name{
                display: flex;
                align-items: center;
                .icon{
                    width: 24px;
                    height: 24px;
                    margin-right: 10px;
                }
            }
        }
    }
}

</style>