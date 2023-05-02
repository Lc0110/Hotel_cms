<template>
    <div class="content">
        <div class="header">
            <h3 class="title">评价列表</h3>
        </div>
        <div class="table">
            <el-table :data="evaList" border style="width: 100%">
                <el-table-column align="center" label="用户" prop="nickname" width="140px" />
                <el-table-column align="center" label="评价内容" prop="content" width="140px" />
                <el-table-column align="center" label="评价时间" prop="createAt">
                    <template #default="scope">
                        {{ formatUTC(scope.row.createAt) }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作" width="200px">
                    <template #default="scope">
                        <el-button size="small" icon="Delete" type="danger" text
                            @click="handleDeleteBtnClick(scope.row.eva_id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="evaTotalCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import useEvaStore from '@/stores/main/eva'
import { formatUTC } from '@/utils/format';

const currentPage = ref(1)
const pageSize = ref(10)
const evaStore = useEvaStore()
fetchEvaListData()


const { evaList, evaTotalCount } = storeToRefs(evaStore)

function handleCurrentChange() {
    fetchEvaListData()
}
function handleSizeChange() {
    fetchEvaListData()
}
function fetchEvaListData(content = "") {
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }
    const queryInfo = { content, ...pageInfo }
    evaStore.getEvaList(queryInfo)
}

function handleDeleteBtnClick(id) {
    evaStore.deleteEvaAction({ id });
}

defineExpose({ fetchEvaListData })
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
  