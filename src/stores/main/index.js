import { defineStore } from "pinia";
import {
  createMember,
  deleteMemberByid,
  fetchMemberList,
} from "@/service/main";
import { ElMessage } from "element-plus";

const MainStore = defineStore("main", {
  // 如何制定state的类型
  state: () => ({
    userList: [],
    usersTotalCount: 0,
    advertList: [],
    advertTotalCount: 0,
  }),
  actions: {
    async getUserList(queryInfo) {
      const userList = await fetchMemberList(queryInfo);
      this.userList = userList.data;
      this.usersTotalCount = userList.count[0].count;
    },
    async deleteUserAction(id) {
      const delResult = await deleteMemberByid(id);
      console.log(delResult);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      this.getUserList({ nickname: "", size: 10, offset: 0 });
    },
    async createUserAction(data) {
      const createRes = await createMember(data);
      console.log(createRes);
      if (createRes.code === -1001) {
        ElMessage({
          message: "请填写完整信息！",
          type: "error",
        });
      } else if (createRes.code === -1006) {
        ElMessage({
          message: "该用户名已经存在！",
          type: "error",
        });
      } else {
        ElMessage({
          message: "创建成功！",
          type: "success",
        });
      }
      this.getUserList({ nickname: "", size: 10, offset: 0 });
    },
  },
});

export default MainStore;
