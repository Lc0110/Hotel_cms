import { defineStore } from "pinia";
import {
  fetchRoomList,
  createRoom,
  deleteRoomByid,
  editRoomByid,
  changeRoomStatus,
} from "@/service/main/room";
import { fetchClassifyList } from "@/service/main/classify";
import { changeOrderStatus } from "@/service/main/order";
import useOrderStore from "@/stores/main/order";
import { ElMessage } from "element-plus";

const RoomStore = defineStore("room", {
  state: () => ({
    roomList: [],
    roomTotalCount: 0,
    classify: [],
  }),
  actions: {
    async getRoomList(queryInfo) {
      const roomList = await fetchRoomList(queryInfo);
      console.log(roomList);
      this.roomList = roomList.data;
      this.roomTotalCount = roomList.count[0].count;
    },
    async createRoomAction(data) {
      console.log(data);
      const createRes = await createRoom(data);
      console.log(createRes);
      if (createRes.code === -1001) {
        ElMessage({
          message: "请填写完整信息！",
          type: "error",
        });
      } else {
        ElMessage({
          message: "创建成功！",
          type: "success",
        });
      }
      this.getRoomList({ size: 10, offset: 0 });
    },
    async deleteRoomAction(id) {
      const delResult = await deleteRoomByid(id);
      console.log(delResult);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      this.getRoomList({ size: 10, offset: 0 });
    },
    async editRoomAction(data) {
      const editResult = await editRoomByid(data);
      console.log(editResult);
      if (editResult.code === -1001) {
        ElMessage({
          message: "请填写完整信息！",
          type: "error",
        });
      } else {
        ElMessage({
          message: "修改成功！",
          type: "success",
        });
      }
      this.getRoomList({ size: 10, offset: 0 });
    },
    async getClassify(isFirst) {
      const Result = await fetchClassifyList(isFirst);
      this.classify = Result.data;
      console.log(Result);
    },
    async changeOrderStatus(data) {
      const changeResult = await changeOrderStatus(data);
      console.log(changeResult);
      if (changeResult.message === "修改成功！") {
        ElMessage({
          message: "退房成功！",
          type: "success",
        });
        useOrderStore().getOrderList({ size: 10, offset: 0 });
      }
    },
    async changeStatus(data, ordData) {
      const changeResult = await changeRoomStatus(data);
      console.log(changeResult);
      if (changeResult.code === -1008) {
        ElMessage({
          message: "房间不存在！",
          type: "error",
        });
        useOrderStore().getOrderList({ size: 10, offset: 0 });
      } else {
        this.changeOrderStatus(ordData);
      }
    },
  },
});

export default RoomStore;
