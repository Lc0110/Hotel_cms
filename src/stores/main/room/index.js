import { defineStore } from "pinia";
import {
  fetchRoomList,
  createRoom,
  deleteRoomByid,
  editRoomByid,
} from "@/service/main/room";
import { fetchClassifyList } from "@/service/main/classify";

const RoomStore = defineStore("room", {
  state: () => ({
    roomList: [],
    roomTotalCount: 0,
    classify: [],
  }),
  actions: {
    async getRoomList(queryInfo) {
      const roomList = await fetchRoomList(queryInfo);
      this.roomList = roomList.data;
      this.roomTotalCount = roomList.count[0].count;
    },
    async createRoomAction(data) {
      console.log(data);
      const createRes = await createRoom(data);
      console.log(createRes);
      this.getRoomList({ size: 10, offset: 0 });
    },
    async deleteRoomAction(id) {
      const delResult = await deleteRoomByid(id);
      console.log(delResult);
      this.getRoomList({ size: 10, offset: 0 });
    },
    async editRoomAction(data) {
      const editResult = await editRoomByid(data);
      console.log(editResult);
      this.getRoomList({ size: 10, offset: 0 });
    },
    async getClassify(isFirst) {
      const Result = await fetchClassifyList(isFirst);
      this.classify = Result.data;
      console.log(Result);
    },
  },
});

export default RoomStore;
