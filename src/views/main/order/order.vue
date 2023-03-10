<template>
    <div class="order">
        <order-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
        <order-content ref="contentRef" @create-room-click="handleCreateRoom" @exit-room-click="handleExitRoom" />
        <order-modal ref="modalRef"></order-modal>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import OrderContent from './c-cpns/order-content.vue';
import OrderSearch from './c-cpns/order-search.vue';
import OrderModal from './c-cpns/order-modal.vue';

const contentRef = ref()
const modalRef = ref()
function handleQueryClick(content) {
    contentRef.value.fetchOrderListData(content.value)
}
function handleResetClick() {
    contentRef.value.fetchOrderListData();
}
function handleCreateRoom(itemData) {
    modalRef.value?.setModalVisible(true,itemData)
}
function handleExitRoom(itemData) {
    modalRef.value?.setModalVisible(false, itemData)
}
</script>
  
<style lang="less" scoped>
.order {
    border-radius: 8px;
    overflow: hidden;
}
</style>