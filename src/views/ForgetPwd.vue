<template>
    <div class="forgetPwd-main">
        <div class="forgetPwd-box">
            <div class="cloudpan"><img src="../assets/cloudpan.png"></div>
            <div class="title-name">重置密码</div>
            <el-form :rules="rules" ref="form" class="form-box" :model="form">
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="mail">
                    <el-input placeholder="请输入邮箱" v-model="form.mail"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input type="password" placeholder="请输入新密码" v-model="form.newPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="button-box" style="width:100%" type="primary" @click="onSubmit">重置密码</el-button>
                </el-form-item>
                <el-form-item>
                    <div align="right">
                        <router-link :to="{path: '/login'}">
                            <a href="userlogin.vue" target="_blank">去登陆</a>
                        </router-link>
                   </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { forgetPassword } from "../api/user"
export default {
    name:'forgetPassword',
    data(){
        return{
            form:{
                username:'',
                newPassword:'',
                mail:''
            },
            rules:{
                username:[{
                    required:true,message:'请输入用户名',trigger:'blur'
                }],
                newPassword:[{
                    required:true,message:'请输入密码',trigger:'blur'
                }],
                mail:[{
                    required:true,message:'请输入邮箱',trigger:'blur'
                }],
            }
        }
    },
    methods:{
        onSubmit(){
           this.$refs.form.validate((valid)=>{
               if(valid){
                   forgetPassword(this.form).then(res=>{
                       if(res.code===0){
                           this.$message.success('密码重置成功')
                           this.$router.push('/login')
                       }else{
                           this.$message.error(res.msg);
                       }
                   })
               }else{
                   return fales;
               }
           })
        }
    },
}
</script>

<style lang="scss" scoped>
.forgetPwd-main{
    .forgetPwd-box{
    flex-direction: column;
    vertical-align:middle;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .title-name{
        margin-bottom: 10px;
        font-size: 40px;   
    }
    .cloudpan{
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 60px;
            height: 60px;
        }
    }
    .form-box{
        width: 350px;
        border: 1px solid #f6f6f6;
        box-shadow: 0 0 25px #aaa;
        padding: 35px 35px 15px;
        border-radius:10px;
        .button-box{
            background: #565e5d;
            border-color: #565e5d;
            color: #fff;
        }
    }
    .operate-box{
        margin-top:10px;
        display: flex;
        justify-content: space-between;
    }
}
}

</style>