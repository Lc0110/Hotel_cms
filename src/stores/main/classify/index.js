import { defineStore } from "pinia";
import {
  fetchClassifyList,
  createClassify,
  deleteClassifyByid,
  editClassifyByid,
} from "@/service/main/classify";
import { ElMessage } from "element-plus";

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
      if (createRes.code === -1001) {
        ElMessage({
          message: "请填写完整信息！",
          type: "error",
        });
      } else if (createRes.code === -1009) {
        ElMessage({
          message: "排序已存在！",
          type: "error",
        });
      } else {
        ElMessage({
          message: "创建成功！",
          type: "success",
        });
      }
      this.getClassifyList({ size: 10, offset: 0 });
    },
    async deleteClassifyAction(id) {
      const delResult = await deleteClassifyByid(id);
      console.log(delResult);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      this.getClassifyList({ size: 10, offset: 0 });
    },
    async editClassifyAction(data) {
      const editResult = await editClassifyByid(data);
      console.log(editResult);
      if (!editResult) {
        ElMessage({
          message: "修改失败！",
          type: "error",
        });
      } else if (editResult.code === -1001) {
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
      this.getClassifyList({ size: 10, offset: 0 });
    },
  },
});

export default ClassifyStore;
