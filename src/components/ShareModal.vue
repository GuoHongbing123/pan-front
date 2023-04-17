<template>
  <el-dialog
  title="分享"
  :close-on-click-modal="false"
  :visible.sync="visible"
  >
  <el-form>
    <el-form-item label="是否私密分享:">
      <el-radio v-model="form.shareType" label="1">是</el-radio>
      <el-radio v-model="form.shareType" label="2">否</el-radio>
    </el-form-item>
  </el-form>
   <span slot="footer" class="dialog-footer">
    <el-button type="primary" v-if="copyText===''" @click="confirm">确 定</el-button>
    <el-button type="primary" v-clipboard="copyText" v-clipboard:success="onCopy">复制到粘贴板</el-button>
  </span> 
  </el-dialog>
</template>

<script>
import { createShare } from '../api/share'
import { staticUrl } from "../const/index";
export default {
    data(){
        return{
            visible:false,
            shareInfo:null,
            form:{
              shareType:'1',
              downloadLimit:0,
              expireType:'0',
            },
            copyText:''
        }
    },
    methods:{
        onCopy(){
          this.$message.success('复制成功')
        },
        init(info){
            this.shareInfo=info
        },
        confirm(){
          let data={
            ...this.form,
            fid:this.shareInfo.id,
            type:this.shareInfo.type
          }
          createShare(data).then(res=>{
            if(res.code===0){
              this.$message.success('分享成功')
              let data=res.data
              this.copyText=`${data.ownerName}向您分享了${data.realName},打开链接后可以进行保存和下载:${staticUrl}/#/s/${data.sharePath} 提取码:${data.code}`
            }else{
              this.$message.error(res.msg)
            }
          })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>