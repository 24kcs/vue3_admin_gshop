<template>
  <div class="login-container">
    <el-form ref="formRef" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">尚品汇后台管理</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="ele-UserFilled" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="ele-Lock" />
        </span>
        <el-input :key="passwordType" ref="passwordRef" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :name="passwordType === 'password' ? 'ele-Hide' : 'ele-View'" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;height: 40px;" @click.native.prevent="handleLogin">登 陆</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Login'
}
</script>

<script lang="ts" setup>
// 引入用户信息的仓库
import { useUserInfoStore } from '@/stores/userInfo'
// 引入的是表单组件标签el-form对象的类型
import type { FormInstance } from 'element-plus'
// 引入nextTick和ref和watch
import { nextTick, ref, watch } from 'vue'
// 引入获取路由对象和路由器对象的函数
import { useRoute, useRouter } from 'vue-router'
// 获取用户信息的仓库对象
const userInfoStore = useUserInfoStore()
// 获取路由对象
const route = useRoute()
// 获取路由器对象
const router = useRouter()
// 用来收集帐号和密码
const loginForm = ref({
  username: 'admin', // 默认的帐号
  password: '111111' // 默认的密码
})
// 加载效果的标识
const loading = ref(false)
// 密码或者是文本框的类型
const passwordType = ref('password')
// 重定向的地址
const redirect = ref('')
// 用来收集文本框的对象的
const passwordRef = ref<HTMLInputElement>()
// 收集form表单的对象
const formRef = ref<FormInstance>()
// 用来校验帐号的
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.length < 4) {
    callback(new Error('用户名长度不能小于4位'))
  } else {
    callback()
  }
}
// 用来校验密码的
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    callback()
  }
}
// 登录的校验规则
const loginRules = {
  // 用户名,必须的,
  username: [{ required: true, validator: validateUsername }],
  // 密码,必须的,失去焦点的时候开始校验
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}
// 监视路由信息对象
watch(
  route,
  () => {
    // 如果query参数存在,把当前的地址存储起来
    redirect.value = route.query && (route.query.redirect as string)
  },
  { immediate: true }
)

/* 
切换密码的显示/隐藏
*/
const showPwd = () => {
  // 如果此时是密码框,点一下,变成文本框,否则变成密码框
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    // 获取焦点
    passwordRef.value?.focus()
  })
}

// 点击按钮,实现登录
const handleLogin = async () => {
  // 调用表单的验证规则,所有的表单验证都通过了,就会继续向后执行
  await formRef.value?.validate()
  // 验证通过了,开启的加载标识
  loading.value = true
  // 取出帐号和密码
  const { username, password } = loginForm.value
  try {
    // 通过pinia调用登录的action,传入帐号和密码
    await userInfoStore.login(username, password)
    // 登录成功则跳转
    router.push({ path: redirect.value || '/' })
  } finally {
    // 关闭加载的效果
    loading.value = false
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  background-image: url(../../assets/bg.jpg);
  background-color: #2d3a4b;
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    .el-input__wrapper {
      width: 100%;
      background-color: transparent;
      box-shadow: none;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
