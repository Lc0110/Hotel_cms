<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large" :rules="rules" ref="ruleFormRef">
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="formData.nickname" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="formData.phonenumber" placeholder="请输入手机号码" />
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
import useMainStore from '@/stores/main/index'

// 1.定义内部的属性
const dialogVisible = ref(false)
const formData = reactive({
  avatarUrl: "",
  nickname: '',
  password: '',
  realname: '',
  phonenumber: '',
})
const ruleFormRef = ref()
const isNewRef = ref(true)
const editData = ref()
const rules = reactive({
  nickname: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  realname: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  phonenumber: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
})

// 2.获取roles/departments数据
const mainStore = useMainStore()

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
        // mainStore.editUserDataAction(editData.value.id, formData)
      } else {
        // 创建新的用户
        mainStore.createUserAction(formData)
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
</style>
