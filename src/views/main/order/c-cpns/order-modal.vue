<template>
    <div class="modal">
        <el-dialog v-model="dialogVisible" :title="isCreateRef ? '开房' : '退房'" width="30%" center>
            <div class="form">
                <el-form :model="formData" label-width="80px" size="large">
                    <el-form-item label="房间编号" prop="room_id">
                        <el-input v-model="formData.room_id" placeholder="请输入房间编号" />
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
import useOrderStore from '@/stores/main/order'
import { searchGuest } from '@/service/main/guest';
import { searchRoom } from '@/service/main/room';

// 1.定义内部的属性
const dialogVisible = ref(false)
const formData = reactive({
    room_id: '',
})
const isCreateRef = ref(true)
const createData = ref()
const orderId = ref()

const roomStore = useRoomStore()
const orderStore = useOrderStore()

// 2.定义设置dialogVisible方法
function setModalVisible(isCreate = true, itemData) {
    dialogVisible.value = true
    isCreateRef.value = isCreate
    for (const key in formData) {
        formData[key] = ''
    }
    if (isCreate) {
        createData.value = itemData
    } else {
        orderId.value = itemData
    }

}

// 3.点击了确定的逻辑
function handleConfirmClick() {
    dialogVisible.value = false
    if (!isCreateRef.value) {
        // 退房
        let roomData = {
            status: 0,
            ...formData
        }
        let orderData = {
            ord_id: orderId.value,
            status: 4
        }
        roomStore.changeStatus(roomData, orderData)
    } else {
        // 开房
        let data = {
            gst_id: createData.value.g_id,
        }
        searchGuest(data).then(res => {
            const c_id = res.data[0].c_id
            let creData = {
                o_id: createData.value.ord_id,
                c_id: c_id,
                status: 1,
                ...formData
            }
            searchRoom(formData).then(res => {
                if (res.data.length !== 0) {
                    roomStore.editRoomAction(creData)
                } else {
                    roomStore.createRoomAction(creData)
                }
            })

        })
        orderStore.getOrderList({ size: 10, offset: 0 });
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
  