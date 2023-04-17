<template>
    <div class="login-main">
        <div class="login-box">
            <div class="cloudpan"><img src="../assets/cloudpan.png"></div>
            <div class="title-name">巨硬网盘</div>
            <el-form :rules="rules" ref="form" class="form-box" :model="form">
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="button-box" style="width:100%" type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
                <el-form-item>
                <div align="center" class="operate-box">
                    <router-link :to="{ path: '/forgetPwd'}">忘记密码?</router-link>
                    <router-link :to="{path: '/register'}">注册新账号</router-link>
                </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login } from "../api/user"
export default {
    name:'login',
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[{
                    required:true,message:'请输入用户名',trigger:'blur'
                }],
                password:[{
                    required:true,message:'请输入密码',trigger:'blur'
                }]
            }
        }
    },
    methods:{
        onSubmit(){
           this.$refs.form.validate((valid)=>{
               if(valid){
                   login(this.form).then(res=>{
                       if(res.code===0){
                           this.$message.success('登录成功')
                           localStorage.setItem('token',res.data.token)
                           this.$router.push('/')
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
    toPage(path){
        this.$router.push(path)
    }
}
</script>

<style lang="scss" scoped>
.login-main{
    .login-box{
    flex-direction: column;
    vertical-align:middle;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .cloudpan{
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 60px;
            height: 60px;
        }
    }
    .title-name{
        margin-bottom: 10px;
         font-size: 40px;   
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