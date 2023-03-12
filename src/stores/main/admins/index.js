import { defineStore } from "pinia";
import {
  fetchAdminsList,
  createAdmins,
  deleteAdminsByid,
  editAdminsByid,
} from "@/service/main/admins";
import { ElMessage } from "element-plus";

const AdminsStore = defineStore("admins", {
  state: () => ({
    adminsList: [],
    adminsTotalCount: 0,
  }),
  actions: {
    async getAdminsList(queryInfo) {
      const adminsList = await fetchAdminsList(queryInfo);
      console.log(adminsList);
      this.adminsList = adminsList.data;
      this.adminsTotalCount = adminsList.count[0].count;
    },
    async createAdminsAction(data) {
      const createRes = await createAdmins(data);
      console.log(createRes);
      if (createRes.code === -1002) {
        ElMessage({
          message: "该用户名已存在！",
          type: "error",
        });
      } else if (createRes.code === -1001) {
        ElMessage({
          message: "请填写完整信息！",
          type: "error",
        });
      } else {
        ElMessage({
          message: "新建成功！",
          type: "success",
        });
      }
      this.getAdminsList({ size: 10, offset: 0 });
    },
    async deleteAdminsAction(id) {
      const delResult = await deleteAdminsByid(id);
      console.log(delResult);
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      this.getAdminsList({ size: 10, offset: 0 });
    },
    async editAdminsAction(data) {
      const editResult = await editAdminsByid(data);
      console.log(editResult);
      if (editResult.code === -1001) {
        ElMessage({
          message: "请填写完整信息！修改失败",
          type: "error",
        });
      } else {
        ElMessage({
          message: "修改成功！",
          type: "success",
        });
      }
      this.getAdminsList({ size: 10, offset: 0 });
    },
  },
});

export default AdminsStore;
