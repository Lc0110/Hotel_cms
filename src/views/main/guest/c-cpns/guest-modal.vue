<template>
    <div class="modal">
        <el-dialog v-model="dialogVisible" :title="isNewRef ? '新建客房' : '编辑客房'" width="30%" center>
            <div class="form">
                <el-form :model="formData" label-width="80px" size="large" :rules="rules" ref="ruleFormRef">
                    <el-form-item label="上传图片" prop="imgUrl">
                        <el-upload class="avatar-uploader" :action="url" :show-file-list="false" :on-success="handleSuccess"
                            :on-error="handleError">
                            <img v-if="formData.imgurl" :src="formData.imgurl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="客房名称" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入客房名称" />
                    </el-form-item>
                    <el-form-item label="分类名称" prop="c_name">
                        <el-select v-model="formData.c_id" placeholder="请选择分类" style="width: 100%">
                            <template v-for="item in classify" :key="item.cfy_id">
                                <el-option :label="item.name" :value="item.cfy_id" />
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input v-model="formData.price" placeholder="请输入价格" />
                    </el-form-item>
                    <el-form-item label="面积" prop="area">
                        <el-input v-model="formData.area" placeholder="请输入面积" />
                    </el-form-item>
                    <el-form-item label="可住人数" prop="live">
                        <el-input v-model="formData.live" placeholder="请输入可住人数" />
                    </el-form-item>
                    <el-form-item label="数量" prop="num">
                        <el-input v-model="formData.num" placeholder="请输入数量" />
                    </el-form-item>
                    <el-form-item label="客房描述" prop="description">
                        <el-input v-model="formData.description" placeholder="请输入描述" />
                    </el-form-item>
                    <el-form-item label="有无空调" prop="is_kt">
                        <el-select v-model="formData.is_kt" placeholder="请选择是否有空调" style="width: 100%">
                            <template v-for="item in arr" :key="item.id">
                                <el-option :label="item.name" :value="item.id" />
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否推荐" prop="is_tj">
                        <el-select v-model="formData.is_tj" placeholder="请选择是否推荐" style="width: 100%">
                            <template v-for="item in arr" :key="item.id">
                                <el-option :label="item.name" :value="item.id" />
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="有无wifi" prop="is_wifi">
                        <el-select v-model="formData.is_wifi" placeholder="请选择是否有wifi" style="width: 100%">
                            <template v-for="item in arr" :key="item.id">
                                <el-option :label="item.name" :value="item.id" />
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="有无窗户" prop="is_window">
                        <el-select v-model="formData.is_window" placeholder="请选择是否有窗户" style="width: 100%">
                            <template v-for="item in arr" :key="item.id">
                                <el-option :label="item.name" :value="item.id" />
                            </template>
                        </el-select>
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
import useGuestStore from '@/stores/main/guest'
import { storeToRefs } from 'pinia';

// 1.定义内部的属性
const dialogVisible = ref(false)
// const url = 'http://193.32.150.29:8000/advert/upload'
const url = 'http://localhost:8000/advert/upload'
const formData = reactive({
    imgurl: '',
    name: '',
    c_id: '',
    price: '',
    area: '',
    live: '',
    description: '',
    is_wifi: '',
    is_tj: '',
    is_kt: '',
    is_window: '',
    num: ''
})
const ruleFormRef = ref()
const arr = [
    { name: "是", id: "1" },
    { name: "否", id: "0" }
]
const isNewRef = ref(true)
const editData = ref()
const guestStore = useGuestStore()
const { classify } = storeToRefs(guestStore)

const handleSuccess = (response) => {
    formData.imgurl = response.url;
}
const handleError = (err, uploadFile) => {
    console.log(err, uploadFile);
}

const rules = reactive({
    name: [
        { required: true, message: '请输入客房名称', trigger: 'blur' },
    ],
    price: [
        { required: true, message: '请输入价格', trigger: 'blur' },
    ],
    area: [
        { required: true, message: '请输入面积', trigger: 'blur' },
    ],
    live: [
        { required: true, message: '请输入可住人数', trigger: 'blur' },
    ],
    num: [
        { required: true, message: '请输入数量', trigger: 'blur' },
    ],
    description: [
        { required: true, message: '请输入描述', trigger: 'blur' },
    ]
})

// 2.定义设置dialogVisible方法
function setModalVisible(isNew = true, itemData) {
    dialogVisible.value = true
    isNewRef.value = isNew
    if (!isNew && itemData) {
        // 编辑数据
        for (const key in formData) {
            formData[key] = itemData[key]
            if (key === "is_wifi" || key === "is_kt" || key === "is_window" || key === "is_tj") {
                if (itemData[key] === 1) {
                    formData[key] = "是"
                } else {
                    formData[key] = "否"
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
async function handleConfirmClick(formEl) {
    await formEl.validate((valid, fields) => {
        if (valid) {
            dialogVisible.value = false
            if (!isNewRef.value && editData.value) {
                // 编辑用户的数据
                let data = {
                    gst_id: editData.value.gst_id,
                    ...formData
                }
                guestStore.editGuestAction(data)
            } else {
                // 创建新的用户
                console.log(formData);
                guestStore.createGuestAction(formData)
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
  