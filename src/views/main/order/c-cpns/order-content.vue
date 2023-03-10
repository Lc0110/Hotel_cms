<template>
    <div class="content">
        <div class="header">
            <h3 class="title">订单列表</h3>
        </div>
        <div class="table">
            <el-table :data="orderList" border style="width: 100%">
                <el-table-column align="center" label="订单编号" prop="ord_id" width="180px" />
                <el-table-column align="center" label="姓名" prop="realname" width="140px" />
                <el-table-column align="center" label="价格" prop="price" width="140px" />
                <el-table-column align="center" label="入住日期" prop="in_time" width="160px">
                    <template #default="scope">
                        {{ formatUTC(scope.row.in_time, "YYYY/MM/DD") }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="退房日期" prop="out_time" width="160px">
                    <template #default="scope">
                        {{ formatUTC(scope.row.out_time, "YYYY/MM/DD") }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态" prop="status" width="120px">
                    <!-- 作用域插槽 -->
                    <template #default="scope">
                        <el-button size="small" :type=comType(scope.row.status) plain>
                            {{ comText(scope.row.status) }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="创建时间" prop="createAt" width="160px">
                    <template #default="scope">
                        {{ formatUTC(scope.row.createAt) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="备注" prop="note"></el-table-column>
                <el-table-column align="center" label="操作" width="200px">
                    <template #default="scope">
                        <el-button size="small" icon="Edit" type="primary" text @click="handleCreateBtnClick(scope.row)"
                            v-if="scope.row.status !== 2 && scope.row.status !== 4">
                            开房
                        </el-button>
                        <el-button size="small" icon="Delete" type="danger" text
                            @click="handleExitBtnClick(scope.row.ord_id)" v-if="scope.row.status !== 4">
                            退房
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="orderTotalCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue';
import useOrderStore from '@/stores/main/order'
import { formatUTC } from '@/utils/format';

const currentPage = ref(1)
const pageSize = ref(10)
const orderStore = useOrderStore()
fetchOrderListData()
const emit = defineEmits(['createRoomClick', 'exitRoomClick'])

const comType = computed(() => {
    return function (status) {
        if (status === 0) {
            return "primary"
        } else if (status === 1) {
            return "danger"
        } else if (status === 2) {
            return "success"
        } else {
            return "info"
        }
    }
})
const comText = computed(() => {
    return function (status) {
        if (status === 0) {
            return "待付款"
        } else if (status === 1) {
            return "待入住"
        } else if (status === 2) {
            return "已入住"
        } else {
            return "已完成"
        }
    }
})

const { orderList, orderTotalCount } = storeToRefs(orderStore)

function handleCurrentChange() {
    fetchOrderListData()
}
function handleSizeChange() {
    fetchOrderListData()
}
function fetchOrderListData(ord_id = "") {
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }
    const queryInfo = { ord_id, ...pageInfo }
    orderStore.getOrderList(queryInfo)
}

function handleExitBtnClick(itemData) {
    emit('exitRoomClick', itemData)
}
function handleCreateBtnClick(id) {
    emit('createRoomClick', id)
}

defineExpose({ fetchOrderListData })
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
  