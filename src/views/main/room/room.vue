<template>
    <div class="room">
        <room-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
        <room-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
        <room-modal ref="modalRef" />
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import RoomContent from './c-cpns/room-content.vue';
import RoomModal from './c-cpns/room-modal.vue';
import RoomSearch from './c-cpns/room-search.vue';

const contentRef = ref()
const modalRef = ref()
function handleQueryClick(room_id) {
    contentRef.value.fetchRoomListData(room_id.value)
}
function handleResetClick() {
    contentRef.value.fetchRoomListData();
}
function handleNewClick() {
    modalRef.value?.setModalVisible()
}
function handleEditClick(itemData) {
    modalRef.value?.setModalVisible(false, itemData)
}
</script>
  
<style lang="less" scoped>
.room {
    border-radius: 8px;
    overflow: hidden;
}
</style>