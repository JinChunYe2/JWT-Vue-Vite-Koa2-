<template>
  <div id="login">
    <div class="login-wrapper">
      <div class="title-wrapper">
        <h1 class="title">登录</h1>
      </div>
      <div class="form-wrapper">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rulesAccount"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item class="btn-item">
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
          <!-- <el-form-item class="btn-item">
            <el-button type="primary" @click="verifyToken"
              >验证token有效性</el-button
            >
          </el-form-item> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入reactive（定义引用类型）
import { reactive } from "vue";
// 引入路由函数
import { useRouter } from "vue-router";
// 引入axios
import axios from "axios";
// element提示
import { open1, open4 } from "../../hooks/ElMessage.js";
// 引入login校验规则
import { rulesAccount } from "./config/login-config";

// 定义双向绑定参数
let formData = reactive({
  username: "",
  password: "",
});

// 注册路由
const router = useRouter();

// 登陆验证
const login = async () => {
  const { username, password } = formData;
  console.log(formData, "formData");

  // 向后台发送账号密码，获取返回信息
  const tokenResult = await axios.post("/api/token", {
    username,
    password,
  });

  // 如果返回错误码
  const CTXBODY = tokenResult.data;
  if (CTXBODY.code === 10001) {
    open4(CTXBODY.msg);
    return;
  }

  // 存储token
  localStorage.setItem("token", tokenResult.data.token);
  // 跳转页面
  router.push("/list");
  // 登陆成功提示
  open1(CTXBODY.msg);
};

// 检验token有效性
// const verifyToken = async () => {
//   const userToken = localStorage.getItem("token");
//   console.log(userToken);

//   const verifyTokenMsg = await axios.post("/api/token/verify", {
//     userToken,
//   });
//   if (verifyTokenMsg.data.code === 200) {
//     open1(verifyTokenMsg.data.msg);
//     return;
//   }
//   open4("token失效！");
// };
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/image/login/page_login_bg.jpg");
  .login-wrapper {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 20px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
    padding-right: 70px;
    .title-wrapper {
      width: 100%;

      .title {
        margin-left: 50px;
        margin-bottom: 20px;
      }
    }

    .form-wrapper {
      width: 100%;

      .btn-item::v-deep .el-form-item__content {
        margin-left: 50px !important;
        justify-content: center;
      }
    }
  }
}
</style>
