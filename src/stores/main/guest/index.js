import { defineStore } from "pinia";
import {
  fetchGuestList,
  createGuest,
  deleteGuestByid,
  editGuestByid,
  searchGuest,
} from "@/service/main/guest";
import { fetchClassifyList } from "@/service/main/classify";

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
      this.getGuestList({ size: 10, offset: 0 });
    },
    async deleteGuestAction(id) {
      const delResult = await deleteGuestByid(id);
      console.log(delResult);
      this.getGuestList({ size: 10, offset: 0 });
    },
    async editGuestAction(data) {
      const editResult = await editGuestByid(data);
      console.log(editResult);
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
