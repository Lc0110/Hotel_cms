import { defineStore } from "pinia";
import {
  createMember,
  deleteMemberByid,
  fetchMemberList,
} from "@/service/main";

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
      this.getUserList({ nickname: "", size: 10, offset: 0 });
    },
    async createUserAction(data) {
      const createRes = await createMember(data);
      console.log(createRes);
      this.getUserList({ nickname: "", size: 10, offset: 0 });
    },
  },
});

export default MainStore;
