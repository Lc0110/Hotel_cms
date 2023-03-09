<template>
    <div class="admins">
        <admins-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
        <Admins-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
        <Admins-modal ref="modalRef" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import AdminsSearch from './c-cpns/admins-search.vue'
import AdminsContent from './c-cpns/admins-content.vue';
import AdminsModal from './c-cpns/admins-modal.vue';

const contentRef = ref()
const modalRef = ref()
function handleQueryClick(username) {
    contentRef.value.fetchAdminsListData(username.value)
}
function handleResetClick() {
    contentRef.value.fetchAdminsListData();
}
function handleNewClick() {
    modalRef.value?.setModalVisible()
}
function handleEditClick(itemData) {
    modalRef.value?.setModalVisible(false, itemData)
}
</script>
  
<style lang="less" scoped>
.admins {
    border-radius: 8px;
    overflow: hidden;
}
</style>