<template>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
          <span style="font-size:16px">上传文件</span>
          <el-button @click="close" style="float:right; padding: 3px 0" type="text">关闭</el-button>
      </div>
      <div class="file-list">
        <div class="file-item" v-for="(item,index) in list" :key="index">
            <div class="name">{{item.name}}</div>
            <el-progress style="width:400px;height:35px;margin:0 20px" :text-inside="true" :stroke-width="26" :percentage="item.process"></el-progress>
            <div class="status">{{['等待中','检验md5Key','上传中','上传成功','秒传成功','已取消','已存在'][item.status]}}</div>
        </div>
      </div>
  </el-card>
</template>

<script>
import { hex_md5 } from "../utils/md5";
import Tool from '../utils/tool';
import { checkFileKey }from "../api/upload";
import { shardUpload } from "../api/upload";
export default {
    data(){
        return{
            list:[]
        }
    },
    methods:{
        close() {
            this.$emit('close')
        },
        handleUpload(files){
            for(let i=0;i<files.length;i++){
                this.list.push({
                    name:files[i].name,
                    process:0,
                    status:0,  //0 准备中 1 检验MD5Key 2 上传中 3 已上传 4 秒传成功 5 已取消 6 已存在
                    file:files[i]
                })
                this.startUpload(this.list.length - 1)
            }
        },
        startUpload(index){
            /*md5->后端 判断这个文件是否存在 key
            存在的话 秒传
            不存在的话 分片上传-> 将文件转化成base64 切割逐个调接口上传
            如果上传途中中断  那么再次上传该文件 断点续传
            */
            let file=this.list[index]
            file.status=1
            let key=this.genKey(file)
            let shardSize=0.5*1024*1024 //以0.5M 为一个分片
            let size=file.file.size
            let shardIndex=1
            let shardTotal=Math.ceil(size/shardSize)
            let suffix=file.name.substring(file.name.lastIndexOf(".")+1,file.name.length).toLowerCase()
            let param={
                shardIndex,
                shardSize,
                shardTotal,
                'name':file.name,
                suffix,
                key,
                index,
                size,
                folderId:this.$route.query.id || 0
            }
            this.check(param)
        },
        genKey(file){
            let key=hex_md5(file.name+file.size+file.type)
            let key10=parseInt(key,16)
            return Tool._10to62(key10)
        },
        check(param){
            checkFileKey({
                name:param.name,
                folderId:param.folderId,
                key:param.key
            }).then(res=>{
                let cunrenFile=this.list[param.index]
                // 0 秒传成功（存在该文件）202 之前未上传完整 需要断点续传  404 未存在该文件
                switch(res.code){
                    case 0:
                        cunrenFile.status=4
                        cunrenFile.process=100
                        this.$bus.$emit('getlist')
                        break;
                    case 202:
                        cunrenFile.status=2
                        param.shardIndex=res.data.shardIndex
                        this.shardUpload(param)
                        break;
                    case 404:
                        cunrenFile.status=2
                        this.shardUpload(param)
                        break;
                    default:
                        cunrenFile.status=5
                        this.$message.error(res.msg)
                }
            })
        },
        shardUpload(param){
            let shardIndex=param.shardIndex
            let shardTotal=param.shardTotal
            let shardSize=param.shardSize
            let fileShard=this.getFileShard(shardIndex,shardSize,param.index)
            let fileReader= new FileReader()
            fileReader.onload=(e)=>{
                param.shard=e.target.result
                shardUpload(param).then(res=>{
                    if(res.code===0){
                        if(shardIndex<shardTotal){
                            param.shardIndex+=1
                            this.shardUpload(param)
                            this.list[param.index].process=parseInt(((shardIndex-1)/shardTotal*100).toFixed(2))
                        }else{
                            this.list[param.index].status=3
                            this.list[param.index].process=100
                            this.$bus.$emit('getlist')
                        }
                    }
                })
            }
           fileReader.readAsDataURL(fileShard)
        },
        getFileShard(shardIndex,shardSize,index){
            let file=this.list[index].file
            let start=(shardIndex-1)*shardSize
            let end=Math.min(file.size,start+shardSize)
            return file.slice(start,end)
        }
    }
}
</script>

<style lang="scss" scoped>
.box-card{
    width: 600px;
    height: 400px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    .file-list{
        .file-item{
            display: flex;
            align-items: center;
            .name{
                font-size:16px;
                flex: 1;
                overflow: hidden;
                text-overflow:ellipsis ;
                white-space: nowrap;
            }
            .status{
                margin-left: auto;
            }
        }
    }
}
</style>