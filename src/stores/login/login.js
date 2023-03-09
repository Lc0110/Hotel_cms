import { defineStore } from "pinia";
import { accountLoginRequest } from "@/service/login/login";
import { getUserMenus } from "@/service/main";
import useGuestStore from "@/stores/main/guest";
import router from "@/router";

const useLoginStore = defineStore("login", {
  // 如何制定state的类型
  state: () => ({
    token: "",
    userMenus: [],
    permissions: [],
  }),
  actions: {
    async loginAccountAction(account) {
      const loginResult = await accountLoginRequest(account);
      this.token = loginResult.data.username;
      localStorage.setItem("token", this.token);
      router.push("/main");
    },
    async getUserMenus() {
      const userMenus = await getUserMenus();
      this.userMenus = userMenus.data;
    },
  },
});

export default useLoginStore;
