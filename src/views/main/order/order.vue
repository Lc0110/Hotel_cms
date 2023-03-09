<template>
    <div class="order">
        <order-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
        <Order-content ref="contentRef" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import OrderContent from './c-cpns/order-content.vue';
import OrderSearch from './c-cpns/order-search.vue';

const contentRef = ref()
function handleQueryClick(content) {
    contentRef.value.fetchOrderListData(content.value)
}
function handleResetClick() {
    contentRef.value.fetchOrderListData();
}
</script>
  
<style lang="less" scoped>
.order {
    border-radius: 8px;
    overflow: hidden;
}
</style>