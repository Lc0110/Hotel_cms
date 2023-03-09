import { defineStore } from "pinia";
import {
  fetchEvaList,
  createEva,
  deleteEvaByid,
  editEvaByid,
} from "@/service/main/eva";

const EvaStore = defineStore("eva", {
  state: () => ({
    evaList: [],
    evaTotalCount: 0,
  }),
  actions: {
    async getEvaList(queryInfo) {
      const evaList = await fetchEvaList(queryInfo);
      this.evaList = evaList.data;
      this.evaTotalCount = evaList.count[0].count;
    },
    async createEvaAction(data) {
      const createRes = await createEva(data);
      console.log(createRes);
      this.getEvaList({ size: 10, offset: 0 });
    },
    async deleteEvaAction(id) {
      const delResult = await deleteEvaByid(id);
      console.log(delResult);
      this.getEvaList({ size: 10, offset: 0 });
    },
    async editEvaAction(data) {
      const editResult = await editEvaByid(data);
      console.log(editResult);
      this.getEvaList({ size: 10, offset: 0 });
    },
  },
});

export default EvaStore;
