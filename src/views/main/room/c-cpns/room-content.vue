<template>
    <div class="content">
        <div class="header">
            <h3 class="title">房间列表</h3>
            <el-button type="primary" @click="handleNewRoomClick">新建房间</el-button>
        </div>
        <div class="table">
            <el-table :data="roomList" border style="width: 100%">
                <el-table-column align="center" label="房间编号" prop="room_id" width="140px" />
                <el-table-column align="center" label="状态" prop="status" width="120px">
                    <!-- 作用域插槽 -->
                    <template #default="scope">
                        <el-button size="small" :type=comType(scope.row.status) plain>
                            {{ comText(scope.row.status) }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="分类" prop="c_name" width="140px" />
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
                            @click="handleDeleteBtnClick(scope.row.gst_id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="roomTotalCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue';
import useRoomStore from '@/stores/main/room'
import { formatUTC } from '@/utils/format';

const comType = computed(() => {
    return function (status) {
        if (status === 0) {
            return "danger"
        } else {
            return "primary"
        }
    }
})
const comText = computed(() => {
    return function (status) {
        if (status === 0) {
            return "闲置"
        } else {
            return "已入住"
        }
    }
})


const currentPage = ref(1)
const pageSize = ref(10)
// 1.发起action，请求usersList的数据
const roomStore = useRoomStore()
fetchRoomListData()
roomStore.getClassify({ Isfirst: "" });
const emit = defineEmits(['newClick', 'editClick'])
// 2.获取usersList数据,进行展示
const { roomList, roomTotalCount } = storeToRefs(roomStore)

function handleCurrentChange() {
    fetchRoomListData()
}
function handleSizeChange() {
    fetchRoomListData()
}
function fetchRoomListData(room_id = "") {
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }
    const queryInfo = { room_id, ...pageInfo }
    roomStore.getRoomList(queryInfo)
}

function handleDeleteBtnClick(id) {
    roomStore.deleteRoomAction({ id });
}
function handleEditBtnClick(itemData) {
    emit('editClick', itemData)
}
function handleNewRoomClick() {
    emit('newClick')
}


defineExpose({ fetchRoomListData })
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
  