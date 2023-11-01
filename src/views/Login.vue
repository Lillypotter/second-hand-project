<template>
<div class="login-title" >校园交易平台</div>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >

    <el-form-item label="用户名" prop="user">
      <el-input v-model="ruleForm.user" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >

      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>


<script setup lang="ts">
import { reactive, ref,getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
//路由
const router = useRouter()
//this
const {appContext,proxy} = getCurrentInstance()
const global = appContext.config.globalProperties


const validateuser = (rule: any, value: any, callback: any) => {
  if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
}
const validateuser2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  }else {
        callback();
      }
}

const ruleForm = reactive({
  user: '',
  password: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  user: [{ validator: validateuser, trigger: 'blur' }],
  password: [{ validator: validateuser2, trigger: 'blur' }],
})

const  submitForm = () => {
  
      global.$api.userLogin({
        accountNumber:ruleForm.user,
        userPassword:ruleForm.password
      }).then((res)=>{
        console.log("res",res)
        if (res.status_code == 1) {
            console.log("登陆成功");
            
            window.localStorage.setItem("adminName", res.data.adminName);
            localStorage.setItem("isLogin",'True');
            //
            router.push("/show");
        }else{
            console.log("ElMessage")
            alert(res.msg)
        }
      }
      ).catch((err)=>{
        console.log(err);
      }
      )
      
      
   
}
const open1=()=>{
  console.log("123")
  ElMessage.error('Oops, this is a error message.')
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style lang="scss" scoped>
.demo-ruleForm{
    padding: 40px 60px;
    border: 3px solid $xtxColor;
}
.login-title {
        padding-bottom: 30px;
        text-align: center;
        font-weight: 600;
        font-size: 40px;
        color: $xtxColor;
     
    }
</style>