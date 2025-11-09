import { ref, onBeforeUnmount } from "vue";
import pokeApi from "@/services/pokeApi";
import type { PokemonItemResponse, PokemonListItem } from "@/types/pokemon";

async function getTypes(pokemon: PokemonListItem, signal?: AbortSignal) {
  try {
    const { data } = await pokeApi.get(`/pokemon/${pokemon.name}`, { signal });
    pokemon.types = (data?.types ?? []).map((types: any) => types.type.name);
  } catch (error) {
    pokemon.types = [];
    console.warn(`Error - Pokemon #${pokemon.id}`, error);
  }
}

export function usePokemonList() {
  const loading = ref(false);
  const error = ref<unknown>(null);
  const pokemonList = ref<PokemonListItem[] | null>(null);

  const limit = ref<number>(20);
  const offset = ref<number>(0);

  const abort = new AbortController();
  onBeforeUnmount(() => abort.abort());

  const cacheKey = `pokemon:list:${limit.value}:${offset.value}`;

  async function loadPokemon() {
    try {
      loading.value = true;
      error.value = null;

      if (typeof window !== "undefined") {
        const cachedList = localStorage.getItem(cacheKey);
        if (cachedList) {
          pokemonList.value = JSON.parse(cachedList) as PokemonListItem[];
        }
      }

      if (!pokemonList.value || !pokemonList.value.length) {
        const abort = new AbortController();
        onBeforeUnmount(() => abort.abort());

        const { data } = await pokeApi.get("/pokemon", {
          params: { limit: limit.value, offset: offset.value },
          signal: abort.signal,
        });

        const list: PokemonListItem[] = (data?.results ?? []).map(
          (pokemon: PokemonItemResponse) => {
            const { url, name } = pokemon;

            const id = Number(pokemon.url.split("/").filter(Boolean).pop());

            const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

            return {
              id,
              name: name,
              url: url,
              sprite: sprite,
              types: [],
            };
          }
        );

        pokemonList.value = list;
      }

      const abortTypes = new AbortController();
      onBeforeUnmount(() => abortTypes.abort());

      await Promise.all(
        (pokemonList.value ?? [])
          .filter((pokemon) => !pokemon.types || pokemon.types.length === 0)
          .map((pokemon) => getTypes(pokemon, abortTypes.signal))
      );

      localStorage.setItem(cacheKey, JSON.stringify(pokemonList.value));
    } catch (error: any) {
      const isCanceled =
        error?.code === "ERR_CANCELED" ||
        error?.name === "CanceledError" ||
        error?.name === "AbortError";
      if (!isCanceled) error.value = error;
    } finally {
      loading.value = false;
    }
  }

  return {
    loadPokemon,
    pokemonList,
  };
}
