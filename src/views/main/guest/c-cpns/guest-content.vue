<template>
    <div class="content">
        <div class="header">
            <h3 class="title">客房列表</h3>
            <el-button type="primary" @click="handleNewGuestClick">新建客房</el-button>
        </div>
        <div class="table">
            <el-table :data="guestList" border style="width: 100%">
                <el-table-column label="图片" width="140">
                    <template #default="scope">
                        <div style="display: flex; justify-self: center;align-items: center;width: 100px;height: 60px;">
                            <el-image :src="scope.row.imgurl" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="客房名称" prop="name" width="140px" />、
                <el-table-column align="center" label="分类" prop="c_name" width="140px" />
                <el-table-column align="center" label="价格" prop="price" width="120px" />
                <el-table-column align="center" label="面积" prop="area" width="120px" />
                <el-table-column align="center" label="可住人数" prop="live" width="120px" />
                <el-table-column align="center" label="是否有wifi" prop="is_wifi" width="120px">
                    <template #default="scope">
                        {{ formatIs(scope.row.is_wifi) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否推荐" prop="is_tj" width="120px">
                    <template #default="scope">
                        {{ formatIs(scope.row.is_tj, true) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否有窗户" prop="is_window" width="120px">
                    <template #default="scope">
                        {{ formatIs(scope.row.is_window) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否有空调" prop="is_kt" width="120px">
                    <template #default="scope">
                        {{ formatIs(scope.row.is_kt) }}
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
                            @click="handleDeleteBtnClick(scope.row.gst_id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="guestTotalCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import useGuestStore from '@/stores/main/guest'
import { formatUTC } from '@/utils/format';

function formatIs(is, type = false) {
    if (is === 1) {
        if (type) {
            return "是"
        }
        return "有"
    } else {
        if (type) {
            return "否"
        }
        return "无"
    }
}

const currentPage = ref(1)
const pageSize = ref(10)
// 1.发起action，请求usersList的数据
const guestStore = useGuestStore()
fetchGuestListData()
guestStore.getClassify({ Isfirst: "" });
const emit = defineEmits(['newClick', 'editClick'])
// 2.获取usersList数据,进行展示
const { guestList, guestTotalCount } = storeToRefs(guestStore)

function handleCurrentChange() {
    fetchGuestListData()
}
function handleSizeChange() {
    fetchGuestListData()
}
function fetchGuestListData(name = "") {
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }
    const queryInfo = { name, ...pageInfo }
    guestStore.getGuestList(queryInfo)
}

function handleDeleteBtnClick(id) {
    guestStore.deleteGuestAction({ id });
}
function handleEditBtnClick(itemData) {
    emit('editClick', itemData)
}
function handleNewGuestClick() {
    emit('newClick')
}


defineExpose({ fetchGuestListData })
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
  