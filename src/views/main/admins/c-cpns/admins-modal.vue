<template>
    <div class="modal">
        <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建管理员' : '编辑管理员'" width="30%" center>
            <div class="form">
                <el-form :model="formData" label-width="80px" size="large">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="formData.username" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phonenumber">
                        <el-input v-model="formData.phonenumber" placeholder="请输入手机号码" />
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="formData.status" placeholder="请选择状态" style="width: 100%">
                            <template v-for="item in statusArr" :key="item.id">
                                <el-option :label="item.name" :value="item.id" />
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="isNewRef" label="密码" prop="password">
                        <el-input v-model="formData.password" placeholder="请输入密码" show-password />
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
import useAdminsStore from '@/stores/main/admins'

// 1.定义内部的属性
const dialogVisible = ref(false)
const formData = reactive({
    username: '',
    phonenumber: '',
    status: '',
    password: '',
})
const isNewRef = ref(true)
const editData = ref()
const statusArr = [
    { name: "启用", id: "1" },
    { name: "禁用", id: "0" }
]

const adminsStore = useAdminsStore()

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
                    formData[key] = "启用"
                } else {
                    formData[key] = "禁用"
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
            adm_id: editData.value.adm_id,
            ...formData
        }
        console.log(editData.value);
        adminsStore.editAdminsAction(data)
    } else {
        // 创建新的用户
        console.log(formData);
        adminsStore.createAdminsAction(formData)
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
  