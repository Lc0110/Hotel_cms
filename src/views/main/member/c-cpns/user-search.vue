<template>
  <div class="search">
    <!-- 1.输入搜索关键字的表单 -->
    <span>用户昵称 ：</span>
    <el-input v-model="nickname" placeholder="请输入查询的用户昵称" />

    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nickname = ref("")
const emit = defineEmits(['queryClick', 'resetClick'])
// 重置操作
function handleResetClick() {
  nickname.value = ""
  emit('resetClick');
}

function handleQueryClick() {
  emit('queryClick', nickname)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }

  .el-input {
    width: 350px;
  }
}
</style>
