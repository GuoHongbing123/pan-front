<template>
    <div>
        <div class="forget-box">
            <div class="title-name">修改密码</div>
            <el-form :rules="rules" ref="form" class="form-box" :model="form">
                 <el-form-item prop="password">
                    <el-input placeholder="请输入原密码" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input type="password" placeholder="请输入新密码" v-model="form.newPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="button-box" style="width:100%" type="primary" @click="onSubmit">重置密码</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { changePassword } from "../api/user"
export default {
    name:'password',
    data(){
        return{
            form:{
                newPassword:'',
                password:''
            },
            rules:{
                newPassword:[{
                    required:true,message:'请输入新密码',trigger:'blur'
                }],
                password:[{
                    required:true,message:'请输入旧密码',trigger:'blur'
                }]
            }
        }
    },
    methods:{
        onSubmit(){
           this.$refs.form.validate((valid)=>{
               if(valid){
                   changePassword(this.form).then(res=>{
                       if(res.code===0){
                           this.$message.success('修改成功')
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
.forget-box{
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
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
        // box-shadow: 0 0 25px #aaa;
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
</style>