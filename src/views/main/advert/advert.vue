<template>
    <div class="advert">
        <advert-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
        <advert-modal ref="modalRef" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import AdvertContent from './c-cpns/adv-content.vue';
import AdvertModal from './c-cpns/adv-modal.vue';

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
.advert {
    border-radius: 8px;
    overflow: hidden;
}
</style>