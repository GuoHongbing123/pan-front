<template>
    <div class="aside-main">
        <el-aside class="aside" width="250px">
            <div class="nav-warrper">
                <div class="nav-item" :class="{'is-active': `/${item.clickHandler}` === $route.path}" @command="handleCommand" @click="handleNav(item)" v-for="item in navList" :key="item.title">
                    <div class="icon-main"><img :src="require(`../../assets/icon/${item.iconLoge}.png`)" class="icon-item"/></div>
                    <span style="margin-left:20px">{{item.title}}</span>
                </div>
            </div>
        </el-aside>
        <div class="total-main">
            <el-form>
            <el-form-item class="percentage">
                <el-progress :percentage="parseFloat(totalPercentage)" :color="totalPercentage > 90 ? '#df3309' : '#2795d4'" type="dashboard"></el-progress>
            </el-form-item>
            <el-form class="userTotal" :model="form">
                <el-form-item style="margin-left:20px" label="网盘容量:">{{form.userTotal}} / 5G</el-form-item>
            </el-form>
        </el-form>
        </div>
        
        
  </div>
</template>

<script>
import { logout, getInfoDetail } from "../../api/user";
import { createFolder } from "../../api/folder";
import { totalCount } from "../../const/total"
export default {
 data(){
     return{
         totalPercentage:20,
         form:{
            userTotal:'',
         },
         navList:[
             {
                 title:'我的文件',
                 clickHandler:'home',
                 iconLoge:'myfolder'
             },
             {
                 title:'新建文件夹',
                 clickHandler:'newFolder',
                 iconLoge:'createfolder'
             },
             {
                 title: '我的分享',
                 clickHandler: 'share',
                iconLoge:'share'
             },
            {
                 title:'回收站',
                 clickHandler:'recycle',
                 iconLoge:'recyclebin'
             },
            {
                title:'个人信息',
                clickHandler:'detail',
                iconLoge:'userinfo'
            },
            {
                title:'修改密码',
                clickHandler:'password',
                iconLoge:'changepwd'
            },
            {
                 title:'登出',
                 clickHandler:'loginout',
                 iconLoge:'logout'
             },
         ]
     }
 },
 watch: {
     $route() {
         console.log(this.$route)
     }
 },
 methods:{
    //  customColorMethod(totalPercentage){
    //     if (parseFloat(totalPercentage) < 90.0) {
    //       return '#909399';
    //     } else {
    //       return '#df3309';
    //     }
    //  },
     handleCommand(clickHandler){
         this[clickHandler]()
     },
     home(){
         this.$bus.$emit('getlist')
     },
     handleNav(item) {
         let routes =['home','recycle']
         if (routes.includes(item.clickHandler)){
             this.$router.push(item.clickHandler)
         }else{
             this[item.clickHandler]()
         }
     },
     newFolder(){
         this.$prompt('请输入新建文件夹名称', '新建', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^((?![\\/:*?？^`~&<>|'%]).){1,20}$/,
          inputErrorMessage: '20个字符以内，不能包含特殊字符'
        }).then(({ value }) => {
          let folderId=this.$route.query.id
          createFolder({
              pid:folderId?folderId:0,
              realName:value
          }).then(res=>{
              if(res.code===0){
                  this.$message.success('新建成功')
                  this.$bus.$emit('getlist')
              }else{
                  this.$message.error(res.msg)
              }
          })
        }).catch(() => {
                
        });
     },
     loginout(){
         logout().then(res=>{
             if(res.code===0){
                 this.$message.success('登出成功')
                 this.$router.push('/login')
             }else{
                 this.$message.error(res.msg)
             }
         })
     },
     share() {
         this.$router.push('/share')
     },
    password(){
        this.$router.push('../changepwd')
    },
    detail(){
        this.$router.push('../detail')
    },
    recycle(){
        
    }
 },
 mounted(){
     getInfoDetail().then(res =>{
         if(res.code === 0){
             this.form.userTotal=totalCount(res.data.totalSize)
             let total = res.data.totalSize/5368709120*100
             this.totalPercentage = (total).toFixed(1)
         }
     })
 }
}
</script>

<style lang="scss" scoped>
.aside-main{
    position: relative;
    background-color: #a2e7f3;//侧边栏（下）颜色
    height: calc(180vh - 60px); // TODO 需要做个自适应高度
    .aside{
    background-color: #fff;  //主页面背景颜色
    margin-bottom:10px;
    box-shadow:inset 5px 5px 5px rgb(0 0 0/10%);
    .nav-warrper{
        .nav-item{
            .icon-main{
                margin-left: 30px;
                img{
                    width: 30px;
                    height: 30px;
                }
            }
            height: 60px;
            cursor: pointer;
            display: flex;
            align-items: center;
            // justify-content: center;
            font-size: 14px;
            background:#d8f2f3;  //侧边栏（上）颜色#8ba5da
            &:hover{
                background-color: #a2e7f3; //鼠标悬停颜色#4bdfcb
            }
        }
        .is-active{
            background-color: #a2e7f3;  //鼠标选中颜色
        }
    }
  }
  .total-main{
      margin-top:20px;
    //   position: absolute;
    text-align: center;
      bottom:0;
      left: 15px;
    padding: 20px 2px 15px;
    .userTotal{
        width: 200px;
    }
  }
}

</style>