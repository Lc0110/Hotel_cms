import { defineStore } from "pinia";
import {
  fetchAdvertList,
  createAdvert,
  deleteAdvertByid,
  editAdvertByid,
} from "@/service/main/advert";

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
      this.getAdvertList({ size: 10, offset: 0 });
    },
    async deleteAdvertAction(id) {
      const delResult = await deleteAdvertByid(id);
      console.log(delResult);
      this.getAdvertList({ size: 10, offset: 0 });
    },
    async editAdvertAction(data) {
      const editResult = await editAdvertByid(data);
      console.log(editResult);
      this.getAdvertList({ size: 10, offset: 0 });
    },
  },
});

export default AdvertStore;
