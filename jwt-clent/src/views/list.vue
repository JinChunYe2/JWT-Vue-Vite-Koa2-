<template>
  <div id="list">
    <el-button type="primary" @click="getContent">获取文章内容</el-button>
    <el-button type="primary" @click="addContent">新增文章内容</el-button>

    <h1>{{ resultDate }}</h1>
  </div>
</template>

<script setup>
import axios from "axios";
import { Base64 } from "js-base64";
import { ref } from "vue";

// 初始化响应值
let resultDate = ref();

// 普通请求，不携带token
const getContent = async () => {
  const result = await axios.get("/api/content");
  resultDate.value = result.data;
  console.log(resultDate.value);
};

// 需鉴权请求，携带token
const addContent = async () => {
  const result = await axios({
    url: "/api/content",
    method: "post",
    headers: { Authorization: _encode() },
  });
  resultDate.value = result.data;
};

// 生成加密token
const _encode = () => {
  const token = localStorage.getItem("token");
  // encode传2个参数，account：password
  // token:
  const encoded = Base64.encode(token + ":");
  return `Basic ${encoded}`;
};
</script>

<style lang="scss" scoped>
#list {
  margin-top: 12%;
}
</style>
