import { defineStore } from "pinia";
import {
  fetchAdminsList,
  createAdmins,
  deleteAdminsByid,
  editAdminsByid,
} from "@/service/main/admins";

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
      this.getAdminsList({ size: 10, offset: 0 });
    },
    async deleteAdminsAction(id) {
      const delResult = await deleteAdminsByid(id);
      console.log(delResult);
      this.getAdminsList({ size: 10, offset: 0 });
    },
    async editAdminsAction(data) {
      const editResult = await editAdminsByid(data);
      console.log(editResult);
      this.getAdminsList({ size: 10, offset: 0 });
    },
  },
});

export default AdminsStore;
