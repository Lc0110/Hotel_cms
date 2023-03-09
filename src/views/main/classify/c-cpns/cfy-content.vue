<template>
    <div class="content">
        <div class="header">
            <h3 class="title">分类列表</h3>
            <el-button type="primary" @click="handleNewClassifyClick">新建分类</el-button>
        </div>
        <div class="table">
            <el-table :data="classifyList" border style="width: 100%">
                <el-table-column align="center" label="分类名称" prop="name" width="140px" />
                <el-table-column align="center" label="排序" prop="sort" width="140px" />
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
                            @click="handleDeleteBtnClick(scope.row.cfy_id)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="classifyTotalCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import useClassifyStore from '@/stores/main/classify'
import { formatUTC } from '@/utils/format';

const currentPage = ref(1)
const pageSize = ref(10)
// 1.发起action，请求usersList的数据
const classifyStore = useClassifyStore()
fetchClassifyListData()
const emit = defineEmits(['newClick', 'editClick'])
// 2.获取usersList数据,进行展示
const { classifyList, classifyTotalCount } = storeToRefs(classifyStore)

function handleCurrentChange() {
    fetchClassifyListData()
}
function handleSizeChange() {
    fetchClassifyListData()
}
function fetchClassifyListData() {
    const size = pageSize.value
    const offset = (currentPage.value - 1) * size
    const pageInfo = { size, offset }
    const queryInfo = { ...pageInfo }
    classifyStore.getClassifyList(queryInfo)
}

function handleDeleteBtnClick(id) {
    classifyStore.deleteClassifyAction({ id });
}
function handleEditBtnClick(itemData) {
    emit('editClick', itemData)
}
function handleNewClassifyClick() {
    emit('newClick')
}


defineExpose({ fetchClassifyListData })
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
  