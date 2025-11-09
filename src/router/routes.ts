import type { RouteRecordRaw } from "vue-router";
// import AppLayout from '@/layouts/AppLayout.vue'

export enum RouteNames {
  HOME = "home",
  LOGIN = "login",
  POKEMON = "pokemon",
  FAVORITES = "favorites",
  NOT_FOUND = "not-found",
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    // component: AppLayout,            // Header/Footer aqui
    children: [
      {
        path: "",
        name: RouteNames.HOME,
        component: () => import("@/pages/home/HomeView.vue"),
      },
      {
        path: "pokemon",
        name: RouteNames.POKEMON,
        component: () => import("@/pages/pokemon/PokemonView.vue"),
      },
      //   {
      //     path: "favorites",
      //     name: RouteNames.FAVORITES,
      //     meta: { requiresAuth: true },
      //     component: () => import("@/pages/Favorites.vue"),
      //   },
      {
        path: "login",
        name: RouteNames.LOGIN,
        component: () => import("@/pages/login/LoginView.vue"),
      },
      //   {
      //     path: "/:pathMatch(.*)*",
      //     name: RouteNames.NOT_FOUND,
      //     component: () => import("@/pages/NotFound.vue"),
      //   },
    ],
  },
];
