<template>
    <div class="content">
        <div class="header">
            <h3 class="title">轮播图列表</h3>
            <el-button type="primary" @click="handleNewAdvertClick">新建</el-button>
        </div>
        <div class="table">
            <el-table :data="advertList" border style="width: 100%">
                <el-table-column label="图片" width="180">
                    <template #default="scope">
                        <div style="display: flex; justify-self: center;align-items: center;width: 100px;height: 60px;">
                            <el-image :src="scope.row.imgurl" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="排序" prop="sort" width="140px" />
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
                            @click="handleDeleteBtnClick(scope.row.adv_id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="advertTotalCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import useAdvertStore from '@/stores/main/advert'
import { formatUTC } from '@/utils/format';

const currentPage = ref(1)
const pageSize = ref(10)
// 1.发起action，请求usersList的数据
const advertStore = useAdvertStore()
fetchAdvertListData()
const emit = defineEmits(['newClick', 'editClick'])
// 2.获取usersList数据,进行展示
const { advertList, advertTotalCount } = storeToRefs(advertStore)

function handleCurrentChange() {
    fetchAdvertListData()
}
function handleSizeChange() {
    fetchAdvertListData()
}
function fetchAdvertListData() {
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }
    const queryInfo = { ...pageInfo }
    advertStore.getAdvertList(queryInfo)
}

function handleDeleteBtnClick(id) {
    advertStore.deleteAdvertAction({ id });
}
function handleEditBtnClick(itemData) {
    emit('editClick', itemData)
}
function handleNewAdvertClick() {
    emit('newClick')
}


defineExpose({ fetchAdvertListData })
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
  