<template>
    <div class="eva">
        <eva-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
        <Eva-content ref="contentRef" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import EvaSearch from './c-cpns/eva-search.vue'
import EvaContent from './c-cpns/eva-content.vue';

const contentRef = ref()
function handleQueryClick(content) {
    contentRef.value.fetchEvaListData(content.value)
}
function handleResetClick() {
    contentRef.value.fetchEvaListData();
}
</script>
  
<style lang="less" scoped>
.eva {
    border-radius: 8px;
    overflow: hidden;
}
</style>