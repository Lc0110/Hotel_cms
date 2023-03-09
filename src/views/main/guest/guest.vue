<template>
    <div class="guest">
        <guest-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
        <guest-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
        <guest-modal ref="modalRef" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import GuestContent from './c-cpns/guest-content.vue';
import GuestModal from './c-cpns/guest-modal.vue';
import GuestSearch from './c-cpns/guest-search.vue';

const contentRef = ref()
const modalRef = ref()
function handleQueryClick(name) {
    contentRef.value.fetchGuestListData(name.value)
}
function handleResetClick() {
    contentRef.value.fetchGuestListData();
}
function handleNewClick() {
    modalRef.value?.setModalVisible()
}
function handleEditClick(itemData) {
    modalRef.value?.setModalVisible(false, itemData)
}
</script>
  
<style lang="less" scoped>
.guest {
    border-radius: 8px;
    overflow: hidden;
}
</style>