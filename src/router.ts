import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/pages/home/HomeView.vue";
import PokemonView from "@/pages/pokemon/PokemonView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/pokemon", component: PokemonView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
