import { defineStore } from "pinia";
import { accountLoginRequest } from "@/service/login/login";
import { getUserMenus } from "@/service/main";
import router from "@/router";
import { ElMessage } from "element-plus";

const useLoginStore = defineStore("login", {
  // 如何制定state的类型
  state: () => ({
    token: "",
    userMenus: [],
    permissions: [],
  }),
  actions: {
    async loginAccountAction(account) {
      accountLoginRequest(account).then((res) => {
        console.log(res);
        if (res.code === -1005) {
          ElMessage({
            message: "该管理员被禁用.",
            type: "error",
          });
        } else if (res.code === -1003) {
          ElMessage({
            message: "该管理员不存在.",
            type: "error",
          });
        } else if (res.code === -1004) {
          ElMessage({
            message: "密码错误.",
            type: "error",
          });
        } else {
          ElMessage({
            message: "登陆成功.",
            type: "success",
          });
          this.token = res.data.username;
          localStorage.setItem("token", this.token);
          router.push("/main");
        }
      });
    },
    async getUserMenus() {
      const userMenus = await getUserMenus();
      this.userMenus = userMenus.data;
    },
  },
});

export default useLoginStore;
