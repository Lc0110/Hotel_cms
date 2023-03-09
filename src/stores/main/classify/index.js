import { defineStore } from "pinia";
import {
  fetchClassifyList,
  createClassify,
  deleteClassifyByid,
  editClassifyByid,
} from "@/service/main/classify";

const ClassifyStore = defineStore("classify", {
  state: () => ({
    classifyList: [],
    classifyTotalCount: 0,
  }),
  actions: {
    async getClassifyList(queryInfo) {
      const classifyList = await fetchClassifyList(queryInfo);
      this.classifyList = classifyList.data;
      this.classifyTotalCount = classifyList.count[0].count;
    },
    async createClassifyAction(data) {
      const createRes = await createClassify(data);
      console.log(createRes);
      this.getClassifyList({ size: 10, offset: 0 });
    },
    async deleteClassifyAction(id) {
      const delResult = await deleteClassifyByid(id);
      console.log(delResult);
      this.getClassifyList({ size: 10, offset: 0 });
    },
    async editClassifyAction(data) {
      const editResult = await editClassifyByid(data);
      console.log(editResult);
      this.getClassifyList({ size: 10, offset: 0 });
    },
  },
});

export default ClassifyStore;
