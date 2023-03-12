import { defineStore } from "pinia";
import {
  fetchAdvertList,
  createAdvert,
  deleteAdvertByid,
  editAdvertByid,
} from "@/service/main/advert";
import { ElMessage } from "element-plus";

const AdvertStore = defineStore("advert", {
  state: () => ({
    advertList: [],
    advertTotalCount: 0,
  }),
  actions: {
    async getAdvertList(queryInfo) {
      const advertList = await fetchAdvertList(queryInfo);
      console.log(advertList);
      this.advertList = advertList.data;
      this.advertTotalCount = advertList.count[0].count;
    },
    async createAdvertAction(data) {
      const createRes = await createAdvert(data);
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
      this.getAdvertList({ size: 10, offset: 0 });
    },
    async deleteAdvertAction(id) {
      const delResult = await deleteAdvertByid(id);
      console.log(delResult);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      this.getAdvertList({ size: 10, offset: 0 });
    },
    async editAdvertAction(data) {
      const editResult = await editAdvertByid(data);
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
      this.getAdvertList({ size: 10, offset: 0 });
    },
  },
});

export default AdvertStore;
