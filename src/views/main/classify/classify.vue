<template>
    <div class="classify">
        <Classify-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
        <Classify-modal ref="modalRef" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import ClassifyContent from './c-cpns/cfy-content.vue';
import ClassifyModal from './c-cpns/cfy-modal.vue';

const contentRef = ref()
const modalRef = ref()
function handleNewClick() {
    modalRef.value?.setModalVisible()
}
function handleEditClick(itemData) {
    modalRef.value?.setModalVisible(false, itemData)
}
</script>
  
<style lang="less" scoped>
.classify {
    border-radius: 8px;
    overflow: hidden;
}
</style>