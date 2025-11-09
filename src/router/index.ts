import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/pages/home/HomeView.vue";

import LoginView from "@/pages/login/LoginView.vue";
import PokemonView from "@/pages/pokemon/PokemonView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/pokemon", component: PokemonView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
