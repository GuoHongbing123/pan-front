<template>
    <div class="changeInfo-box" v-if="!changing">
        <div class="title-name">修改信息</div>
        <el-form  ref="form" class="form-box" :model="form">
            <el-form-item prop="nickname" label="昵称">
                <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="手机号">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="mail" label="邮箱">
                <el-input v-model="form.mail"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button-box" style="width:100%" type="primary" @click="onSubmit">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="detail-box" v-else>
            <div class="title-name">个人信息</div>
            <el-form ref="form" class="form-box" :model="form">
                <el-form-item label="用户名:"><p style="text-align:center"><span>{{form.username}}</span></p></el-form-item>
                <el-form-item label="昵  称:"><p style="text-align:center"><span>{{form.nickname}}</span></p></el-form-item>
                <el-form-item label="手  机:"><p style="text-align:center"><span>{{form.mobile}}</span></p></el-form-item>
                <el-form-item label="邮  箱:"><p style="text-align:center"><span>{{form.mail}}</span></p></el-form-item>
                <el-form-item>
                    <el-button class="button-box" style="width:100%" type="primary" @click="handleChange">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
</template>


<script>
import { getInfoDetail } from "../api/user";
export default {
    data(){
        return{
            form:{
                username:'',
                nickname:'',
                mobile:'',
                mail:''
            },
            changing:true
        }
    },
    methods:{
        handleChange(){
            this.changing = false
        },
        onSubmit(){
            this.$refs.form.validate((valid)=>{
               if(valid){
                   getInfoDetail(this.form).then(res=>{
                       if(res.code===0){
                           this.$message.success('修改成功')
                           this.changing = true
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
    mounted(){
        getInfoDetail().then(res => {
            if(res.code === 0){
                this.form=res.data
            }else{
                this.$message.error(res.msg)
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.detail-box{
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
}
.changeInfo-box{
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
}
</style>