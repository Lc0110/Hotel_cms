<template>
    <div class="content">
        <div class="header">
            <h3 class="title">管理员列表</h3>
            <el-button type="primary" @click="handleNewAdminsClick">新建管理员</el-button>
        </div>
        <div class="table">
            <el-table :data="adminsList" border style="width: 100%">
                <el-table-column align="center" label="用户名" prop="username" width="180px" />
                <el-table-column align="center" label="手机号码" prop="phonenumber" width="200px" />
                <el-table-column align="center" label="状态" prop="status" width="120px">
                    <!-- 作用域插槽 -->
                    <template #default="scope">
                        <el-button size="small" :type="scope.row.status ? 'primary' : 'danger'" plain>
                            {{ scope.row.status ? '启用' : '禁用' }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="创建时间" prop="createAt">
                    <template #default="scope">
                        {{ formatUTC(scope.row.createAt) }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作" width="200px">
                    <template #default="scope">
                        <el-button size="small" icon="Edit" type="primary" text @click="handleEditBtnClick(scope.row)">
                            编辑
                        </el-button>
                        <el-button size="small" icon="Delete" type="danger" text
                            @click="handleDeleteBtnClick(scope.row.adm_id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="adminsTotalCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import useAdminsStore from '@/stores/main/admins'
import { formatUTC } from '@/utils/format';

const currentPage = ref(1)
const pageSize = ref(10)
// 1.发起action，请求usersList的数据
const adminsStore = useAdminsStore()
fetchAdminsListData()
const emit = defineEmits(['newClick', 'editClick'])
// 2.获取usersList数据,进行展示
const { adminsList, adminsTotalCount } = storeToRefs(adminsStore)

function handleCurrentChange() {
    fetchAdminsListData()
}
function handleSizeChange() {
    fetchAdminsListData()
}
function fetchAdminsListData(username = "") {
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }
    const queryInfo = { username, ...pageInfo }
    adminsStore.getAdminsList(queryInfo)
}

function handleDeleteBtnClick(id) {
    adminsStore.deleteAdminsAction({ id });
}
function handleEditBtnClick(itemData) {
    emit('editClick', itemData)
}
function handleNewAdminsClick() {
    emit('newClick')
}


defineExpose({ fetchAdminsListData })
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
  