<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column label="头像" width="180">
          <template #default="scope">
            <div style="display: flex; justify-self: center;align-items: center;width: 100px;height: 60px;">
              <el-image :src="scope.row.avatarurl" />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" type="index" label="序号" width="100px" />
        <el-table-column align="center" label="用户昵称" prop="nickname" width="150px" />
        <el-table-column align="center" label="真实姓名" prop="realname" width="150px" />
        <el-table-column align="center" label="手机号码" prop="phonenumber" width="150px" />
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button size="small" icon="Delete" type="danger" text @click="handleDeleteBtnClick(scope.row.mem_id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="usersTotalCount" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import useMainStore from '@/stores/main/index'
import { formatUTC } from '@/utils/format';

const currentPage = ref(1)
const pageSize = ref(10)
// 1.发起action，请求usersList的数据
const mainStore = useMainStore()
fetchUserListData()
const emit = defineEmits(['newClick', 'editClick'])
// 2.获取usersList数据,进行展示
const { userList, usersTotalCount } = storeToRefs(mainStore)

function handleCurrentChange() {
  fetchUserListData()
}
function handleSizeChange() {
  fetchUserListData()
}
function fetchUserListData(nickname = "") {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { nickname, ...pageInfo }
  mainStore.getUserList(queryInfo)
}

function handleDeleteBtnClick(id) {
  mainStore.deleteUserAction({ id });
}
function handleNewUserClick() {
  emit('newClick')
}

defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 26px;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
