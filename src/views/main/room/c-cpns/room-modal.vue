<template>
    <div class="modal">
        <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建房间' : '编辑房间'" width="30%" center>
            <div class="form">
                <el-form :model="formData" label-width="80px" size="large">
                    <el-form-item label="房间编号" prop="room_id" v-if="isNewRef">
                        <el-input v-model="formData.room_id" placeholder="请输入房间编号" />
                    </el-form-item>
                    <el-form-item label="订单编号" prop="o_id" v-if="isNewRef">
                        <el-input v-model="formData.o_id" placeholder="请输入订单编号" />
                    </el-form-item>
                    <el-form-item label="房间分类" prop="c_name">
                        <el-select v-model="formData.c_id" placeholder="请选择分类" style="width: 100%">
                            <template v-for="item in classify" :key="item.cfy_id">
                                <el-option :label="item.name" :value="item.cfy_id" />
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="formData.status" placeholder="请选择状态" style="width: 100%">
                            <template v-for="item in statusArr" :key="item.id">
                                <el-option :label="item.name" :value="item.id" />
                            </template>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirmClick">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue'
import useRoomStore from '@/stores/main/room'
import { storeToRefs } from 'pinia';

// 1.定义内部的属性
const dialogVisible = ref(false)
const url = 'http://localhost:8000/advert/upload'
const formData = reactive({
    room_id: '',
    o_id: '',
    c_id: '',
    status: '',
})

const statusArr = [
    { name: "已入住", id: "1" },
    { name: "闲置", id: "0" }
]

const isNewRef = ref(true)
const editData = ref()
const roomStore = useRoomStore()
const { classify } = storeToRefs(roomStore)

// 2.定义设置dialogVisible方法
function setModalVisible(isNew = true, itemData) {
    dialogVisible.value = true
    isNewRef.value = isNew
    if (!isNew && itemData) {
        // 编辑数据
        for (const key in formData) {
            formData[key] = itemData[key]
            if (key === "status") {
                if (itemData[key] === 1) {
                    formData[key] = "已入住"
                } else {
                    formData[key] = "闲置"
                }
            }
        }
        editData.value = itemData
    } else {
        // 新建数据
        for (const key in formData) {
            formData[key] = ''
        }
        editData.value = null
    }
}

// 3.点击了确定的逻辑
function handleConfirmClick() {
    dialogVisible.value = false
    if (!isNewRef.value && editData.value) {
        // 编辑用户的数据
        let data = {
            room_id: editData.value.room_id,
            ...formData
        }
        roomStore.editRoomAction(data)
    } else {
        // 创建新的用户
        console.log(formData);
        roomStore.createRoomAction(formData)
    }
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>
  
<style lang="less" scoped>
.form {
    padding: 0 20px;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
  