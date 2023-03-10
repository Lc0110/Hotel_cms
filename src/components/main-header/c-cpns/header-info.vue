<template>
  <div class="header-info">
    <!-- 2.个人信息 -->
    <div class="info">
      <span class="welcome">欢迎来到酒店后台管理系统</span>
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30"
            src="https://img.ixintu.com/download/jpg/20201226/b78781e2b8765dcc5e8f1f6bdb4c62eb_512_512.jpg!con" />
          <span class="name">{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon>
                <CircleClose />
              </el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'


const router = useRouter()
const name = localStorage.getItem("token")

function handleExitClick() {
  localStorage.removeItem("token")
  router.push('/login')
}


</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {

  .welcome {
    font-size: 18px;
    margin-right: 20px;
    line-height: 30px;
  }

  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;



    .name {
      margin-left: 5px;
    }
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
