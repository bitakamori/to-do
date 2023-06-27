// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "form",
        name: "Form",
        component: () => import("@/views/Form.vue"),
      },
      {
        path: "cadastro",
        name: "Cadastro",
        component: () => import("@/views/Cadastro.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/new-list",
    name: "CreateList",
    component: () => import("@/views/CreateList.vue"),
  },
  {
    path: "/list-detail/:id",
    name: "ListDetail",
    component: () => import("@/views/DetailList.vue"),
  },
  {
    path: "/edit-list/:id",
    name: "EditList",
    component: () => import("@/views/EditList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
