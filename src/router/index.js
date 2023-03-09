import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/login",
      component: () => import("../views/login/Login.vue"),
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main/main.vue"),
      children: [
        {
          path: "/main/analysis",
          component: () => import("../views/main/analysis/analysis.vue"),
        },
        {
          path: "/main/member",
          component: () => import("../views/main/member/member.vue"),
        },
        {
          path: "/main/advert",
          component: () => import("../views/main/advert/advert.vue"),
        },
        {
          path: "/main/classify",
          component: () => import("../views/main/classify/classify.vue"),
        },
        {
          path: "/main/guest",
          component: () => import("../views/main/guest/guest.vue"),
        },
        {
          path: "/main/room",
          component: () => import("../views/main/room/room.vue"),
        },
        {
          path: "/main/order",
          component: () => import("../views/main/order/order.vue"),
        },
        {
          path: "/main/eva",
          component: () => import("../views/main/eva/eva.vue"),
        },
        {
          path: "/main/admins",
          component: () => import("../views/main/admins/admins.vue"),
        },
      ],
    },
  ],
});

// // 1.获取所有的路由
// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('../views/main/system/user/user.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('../views/main/system/role/role.vue')
//   }
// ]

// // 2.动态的添加路由
// router.addRoute('main', localRoutes[0])
// router.addRoute('main', localRoutes[1])

// 导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 举个栗子: / => /main
// to: /main from: / 返回值: /abc
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localStorage.getItem("token");
  if (to.path.startsWith("/main") && !token) {
    return "/login";
  }

  // 如果是进入到main
  // if (to.path === "/main") {
  //   return firstMenu?.url;
  // }
});

export default router;
