import { defineStore } from "pinia";
import {
  fetchGuestList,
  createGuest,
  deleteGuestByid,
  editGuestByid,
  searchGuest,
} from "@/service/main/guest";
import { fetchClassifyList } from "@/service/main/classify";
import { ElMessage } from "element-plus";

const GuestStore = defineStore("guest", {
  state: () => ({
    guestList: [],
    guestTotalCount: 0,
    classify: [],
  }),
  actions: {
    async getGuestList(queryInfo) {
      const guestList = await fetchGuestList(queryInfo);
      this.guestList = guestList.data;
      this.guestTotalCount = guestList.count[0].count;
    },
    async createGuestAction(data) {
      console.log(data);
      const createRes = await createGuest(data);
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
      this.getGuestList({ size: 10, offset: 0 });
    },
    async deleteGuestAction(id) {
      const delResult = await deleteGuestByid(id);
      console.log(delResult);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      this.getGuestList({ size: 10, offset: 0 });
    },
    async editGuestAction(data) {
      console.log(data);
      const editResult = await editGuestByid(data);
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
      this.getGuestList({ size: 10, offset: 0 });
    },
    async getClassify(isFirst) {
      const Result = await fetchClassifyList(isFirst);
      this.classify = Result.data;
      console.log(Result);
    },
  },
});

export default GuestStore;
