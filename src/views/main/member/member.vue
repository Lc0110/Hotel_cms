<template>
    <div class="member">
        <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
        <user-content ref="contentRef" @new-click="handleNewClick" />
        <user-modal ref="modalRef" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue';

const contentRef = ref()
const modalRef = ref()
function handleQueryClick(nickname) {
    contentRef.value.fetchUserListData(nickname.value)
}
function handleResetClick() {
    contentRef.value.fetchUserListData();
}
function handleNewClick() {
    modalRef.value?.setModalVisible()
}
</script>
  
<style lang="less" scoped>
.member {
    border-radius: 8px;
    overflow: hidden;
}
</style>