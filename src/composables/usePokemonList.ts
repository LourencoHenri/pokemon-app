// src/composables/usePokemonList.ts
import { ref, computed, onBeforeUnmount } from "vue";
import pokeApi from "@/services/pokeApi";
import type { PokemonItemResponse, PokemonListItem } from "@/types/pokemon";

async function getTypes(pokemon: PokemonListItem, signal?: AbortSignal) {
  try {
    const { data } = await pokeApi.get(`/pokemon/${pokemon.name}`, { signal });
    pokemon.types = (data?.types ?? []).map((t: any) => t.type.name);
  } catch {
    pokemon.types = [];
  }
}

export function usePokemonList() {
  const loading   = ref(false);
  const error     = ref<unknown>(null);
  const list      = ref<PokemonListItem[]>([]);
  const total     = ref<number>(0);

  const limit     = ref<number>(20);
  const offset    = ref<number>(0);

  // página atual/total
  const currentPage = computed(() => Math.floor(offset.value / limit.value) + 1);
  const totalPages  = computed(() =>
    Math.max(1, Math.ceil(total.value / Math.max(1, limit.value)))
  );

  // cache key dinâmica por página/tamanho
  const cacheKey = () => `pokemon:list:${limit.value}:${offset.value}`;

  // controle de abort da requisição atual (evita race condition)
  let inflight: AbortController | null = null;
  onBeforeUnmount(() => inflight?.abort());

  async function fetchPage() {
    try {
      loading.value = true;
      error.value = null;

      // tenta cache
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(cacheKey());
        if (raw) {
          const cached = JSON.parse(raw) as { list: PokemonListItem[]; total: number; at: number };
          list.value = cached.list || [];
          total.value = cached.total || 0;
        }
      }

      // aborta requisição anterior (se houver)
      inflight?.abort();
      inflight = new AbortController();
      const signal = inflight.signal;

      // busca página
      const { data } = await pokeApi.get("/pokemon", {
        params: { limit: limit.value, offset: offset.value },
        signal,
      });

      total.value = Number(data?.count ?? 0);

      const mapped: PokemonListItem[] = (data?.results ?? []).map(
        (p: PokemonItemResponse) => {
          const id = Number(p.url.split("/").filter(Boolean).pop());
          const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
          return { id, name: p.name, url: p.url, sprite, types: [] };
        }
      );

      list.value = mapped;

      // carrega types (paraleliza)
      const typesAbort = new AbortController();
      onBeforeUnmount(() => typesAbort.abort());

      await Promise.all(
        list.value
          .filter((p) => !p.types?.length)
          .map((p) => getTypes(p, typesAbort.signal))
      );

      // salva cache da página
      if (typeof window !== "undefined") {
        localStorage.setItem(
          cacheKey(),
          JSON.stringify({ list: list.value, total: total.value, at: Date.now() })
        );
      }
    } catch (e: any) {
      const canceled =
        e?.code === "ERR_CANCELED" || e?.name === "CanceledError" || e?.name === "AbortError";
      if (!canceled) error.value = e;
    } finally {
      loading.value = false;
    }
  }

  // ações de paginação
  async function goToPage(page: number) {
    const p = Math.min(Math.max(1, Math.trunc(page || 1)), totalPages.value);
    offset.value = (p - 1) * limit.value;
    await fetchPage();
  }

  async function nextPage() {
    if (currentPage.value < totalPages.value) {
      offset.value += limit.value;
      await fetchPage();
    }
  }

  async function prevPage() {
    if (currentPage.value > 1) {
      offset.value = Math.max(0, offset.value - limit.value);
      await fetchPage();
    }
  }

  async function setPageSize(size: number) {
    const s = [10, 20, 50, 100].includes(size) ? size : 20;
    limit.value = s;
    offset.value = 0; // volta para a primeira página
    await fetchPage();
  }

  return {
    // dados
    list,
    total,
    loading,
    error,

    // paginação
    limit,
    offset,
    currentPage,
    totalPages,
    fetchPage,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
  };
}
