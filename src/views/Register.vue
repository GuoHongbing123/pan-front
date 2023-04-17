<template>
  <div class="register-main">
    <div class="register-box">
      <div class="cloudpan"><img src="../assets/cloudpan.png" /></div>
      <div class="title-name">巨硬网盘</div>
      <el-form :rules="rules" ref="form" class="form-box" :model="form">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="cpassword">
          <el-input
            type="password"
            placeholder="请重复输入密码"
            v-model="form.cpassword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input placeholder="请输入昵称" v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="mail">
          <el-input placeholder="请输入邮箱" v-model="form.mail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button-box"
            style="width: 100%"
            type="primary"
            @click="onSubmit"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <div align="right">
            <router-link :to="{ path: '/login' }">
              <a href="userlogin.vue" target="_blank">去登陆</a>
            </router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from "../api/user"
export default {
    name:'register',
    data(){
        var validatePass=(rule,value,callback)=>{
            if(value==''){
                callback(new Error('请再次输入密码'));
            }else if(value!==this.form.password){
                callback(new Error('两次输入密码不一致！'));
            }else{
                callback();
            }
        }
                    var validateMail=(rule,value,callback)=>{
            if(value==''){
                callback(new Error('请输入邮箱'));
            }else if(!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value)){
                callback(new Error('请输入正确格式的邮箱！'));
            }else{
                callback();
            }
        }
            var validateMobile=(rule,value,callback)=>{
            if(value==''){
                callback(new Error('请输入手机号!'));
            }else if(!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value)){
                callback(new Error('请输入正确格式的手机号！'));
            }else{
                callback();
            }
        }
        
        
        return{
            form:{
                username:'',
                password:'',
                cpassword:'',
                nickname:'',
                mobile:'',
                mail:''
            },
            rules:{
                username:[{
                    required:true,message:'请输入用户名',trigger:'blur'
                }],
                password:[{
                    required:true,message:'请输入密码',trigger:'blur'
                }],
                cpassword:[{
                    validator:validatePass,trigger:'blur'
                }],
                nickname:[{
                    required:true,message:'请输入昵称',trigger:'blur'
                }],
                mail:[{
                    // required:true,message:'请输入邮箱',
                    validator:validateMail,trigger:'blur'
                }],
                mobile:[{
                    validator:validateMobile,trigger:'blur'
                }]
            }
        }
    },
    methods:{
        onSubmit(){
           this.$refs.form.validate((valid)=>{
               if(valid){
                   register(this.form).then(res=>{
                       if(res.code===0){
                           this.$message.success('注册成功')
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
    toPage(path){
        this.$router.push(path)
    }
}
</script>

<style lang="scss" scoped>
.register-main {
  .register-box {
    flex-direction: column;
    vertical-align: middle;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .title-name {
      margin-bottom: 10px;
      font-size: 40px;
    }
    .cloudpan {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .form-box {
      width: 350px;
      border: 1px solid #f6f6f6;
      box-shadow: 0 0 25px #aaa;
      padding: 35px 35px 15px;
      border-radius: 10px;
      .button-box {
        background: #565e5d;
        border-color: #565e5d;
        color: #fff;
      }
    }
    .operate-box {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>