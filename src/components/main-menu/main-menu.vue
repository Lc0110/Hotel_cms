<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">酒店后台管理系统</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu default-active="1" :collapse="isFold" text-color="#b7bdc3" active-text-color="#fff"
        background-color="#001529">
        <!-- 遍历整个菜单 -->
        <template v-for="item in loginStore.userMenus" :key="item.usermenu_id">
          <el-menu-item :index="item.usermenu_id + ''" @click="handleItemClick(item)">
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]" />
            </el-icon>
            <template #title>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { useRouter } from 'vue-router'

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  },
})


// 1.获取动态的菜单
const loginStore = useLoginStore()
loginStore.getUserMenus()

// 2.监听item的点击
const router = useRouter()
function handleItemClick(item) {
  const url = item.url
  router.push(url)
}

</script>
<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;

  .el-menu-item {
    padding-left: 50px !important;
    background-color: #001529;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
