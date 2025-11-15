import pokeApi from "@/services/pokeApi";

export async function getPokemon(id: number, signal?: AbortSignal) {
  const { data } = await pokeApi.get(`/pokemon/${id}`, { signal });
  return data;
}

export async function getSpecies(id: number, signal?: AbortSignal) {
  const { data } = await pokeApi.get(`/pokemon-species/${id}`, { signal });
  return data;
}

export async function getEvolutionChainById(id: number, signal?: AbortSignal) {
  const { data } = await pokeApi.get(`/evolution-chain/${id}`, {
    signal,
  });
  return data;
}

export function extractIdFromUrl(url: string): number {
  return Number(url.match(/\/(\d+)\/?$/)?.[1] ?? 0);
}
