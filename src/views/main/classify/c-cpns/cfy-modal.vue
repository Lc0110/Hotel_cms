<template>
    <div class="modal">
        <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建分类' : '编辑分类'" width="30%" center>
            <div class="form">
                <el-form :model="formData" label-width="80px" size="large" :rules="rules" ref="ruleFormRef">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入分类名称" />
                    </el-form-item>
                    <el-form-item label="序号" prop="sort">
                        <el-input v-model="formData.sort" placeholder="请输入序号" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirmClick(ruleFormRef)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue'
import useClassifyStore from '@/stores/main/classify'

// 1.定义内部的属性
const dialogVisible = ref(false)
const ruleFormRef = ref()
const formData = reactive({
    name: '',
    sort: '',
    status: '',
})
const isNewRef = ref(true)
const editData = ref()

const classifyStore = useClassifyStore()

const rules = reactive({
    name: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    sort: [
        { required: true, message: '请输入序号', trigger: 'blur' },
    ],

})


// 2.定义设置dialogVisible方法
function setModalVisible(isNew = true, itemData) {
    dialogVisible.value = true
    isNewRef.value = isNew
    if (!isNew && itemData) {
        // 编辑数据
        for (const key in formData) {
            formData[key] = itemData[key]
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
async function handleConfirmClick(formEl) {
    await formEl.validate((valid, fields) => {
        if (valid) {
            dialogVisible.value = false
            if (!isNewRef.value && editData.value) {
                // 编辑用户的数据
                let data = {
                    cfy_id: editData.value.cfy_id,
                    ...formData
                }
                classifyStore.editClassifyAction(data)
            } else {
                // 创建新的用户
                console.log(formData);
                classifyStore.createClassifyAction(formData)
            }
        } else {
            console.log('error submit!', fields)
        }
    })
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
  