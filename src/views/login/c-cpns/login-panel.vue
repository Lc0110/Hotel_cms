<template>
  <div class="login-panel">
    <!-- 顶部的标题 -->
    <h1 class="title">酒店后台管理系统</h1>

    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1.账号登录的Pane -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">管理员登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick"> 立即登录 </el-button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'

const activeName = ref('account')
const isRemPwd = ref(localStorage.getItem('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localStorage.setItem('isRemPwd', newValue)
})
const accountRef = ref()

function handleLoginBtnClick() {
  accountRef.value?.loginAction(isRemPwd.value)
}


</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
