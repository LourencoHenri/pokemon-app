import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "@/views/home/HomeView.vue";
import PokemonView from "@/views/pokemon/PokemonView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/pokemon", component: PokemonView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
