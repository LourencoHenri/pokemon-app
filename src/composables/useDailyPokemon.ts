import { ref, computed, onBeforeUnmount } from "vue";
import pokeApi from "@/services/pokeApi";
import type { Pokemon, PokemonGender } from "@/types/pokemon";

import { Mars, Venus, VenusAndMars } from "lucide-vue-next";

const MAX_ID_FALLBACK = 1100;

function localDateKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function pickIdFromKey(key: string, max: number) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 33 + key.charCodeAt(i)) >>> 0;
  return (h % max) + 1; // 1..max
}

async function getMaxSpeciesId(signal?: AbortSignal): Promise<number> {
  const k = "poke:maxSpeciesCount";
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(k);
    if (raw) {
      try {
        const cached = JSON.parse(raw) as { count: number; at: number };
        const week = 1000 * 60 * 60 * 24 * 7;
        if (Date.now() - cached.at < week) return cached.count;
      } catch {}
    }
  }
  try {
    // usa species para garantir IDs contínuos
    const res = await pokeApi.get("/pokemon-species", {
      params: { limit: 1 },
      signal,
    });
    const count = Number(res.data?.count) || MAX_ID_FALLBACK;
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "poke:maxSpeciesCount",
        JSON.stringify({ count, at: Date.now() })
      );
    }
    return count;
  } catch {
    return MAX_ID_FALLBACK;
  }
}

export function useDailyPokemon() {
  const dayKey = localDateKey();
  const loading = ref(false);
  const error = ref<unknown>(null);
  const dailyPokemon = ref<Pokemon | null>(null);
  const shiny = ref(false);

  const abort = new AbortController();
  onBeforeUnmount(() => abort.abort());

  async function load() {
    try {
      // const cacheKey = `dailyPokemon:${dayKey}`;

      // if (typeof window !== "undefined") {
      //   const cached = localStorage.getItem(cacheKey);
      //   if (cached) {
      //     dailyPokemon.value = JSON.parse(cached) as Pokemon;
      //     return;
      //   }
      // }

      loading.value = true;
      error.value = null;

      const max = await getMaxSpeciesId(abort.signal);
      const id = pickIdFromKey(dayKey, max);

      const [pRes, sRes] = await Promise.all([
        pokeApi.get(`/pokemon/${id}`, { signal: abort.signal }),
        pokeApi.get(`/pokemon-species/${id}`, { signal: abort.signal }),
      ]);

      // DATA

      const pokemon = pRes.data;
      const species = sRes.data;

      const flavorRaw =
        species.flavor_text_entries.find(
          (e: any) => e.language.name === "pt"
        ) ??
        species.flavor_text_entries.find((e: any) => e.language.name === "en");

      const flavor = (flavorRaw?.flavor_text ?? "")
        .replace(/\f/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const pokemonTypes = pokemon.types.map((t: any) => t.type.name);

      const pokemonSprite =
        pokemon.sprites?.other?.["official-artwork"]?.front_default ??
        pokemon.sprites?.other?.dream_world?.front_default ??
        pokemon.sprites?.front_default;

      const pokemonShinySprite =
        pokemon.sprites?.other?.["official-artwork"]?.front_shiny ??
        pokemon.sprites?.front_shiny ??
        null;

      const pokemonAbilities = pokemon.abilities
        .filter((pokemonAbility: any) => !pokemonAbility.is_hidden)
        .map((pokemonAbility: any) => ({
          name: pokemonAbility.ability.name,
          url: pokemonAbility.ability.url,
          isHidden: pokemonAbility.is_hidden,
        }));

      const pokemonCategory = species.genera.find(
        (item: any) => item.language.name === "en"
      ).genus;

      const getPokemonGender = (genderRate: number): PokemonGender => {
        if (genderRate === -1) {
          return { name: "genderless", icon: undefined };
        }

        if (genderRate === 0) {
          return { name: "male-only", icon: Mars };
        }

        if (genderRate === 8) {
          return { name: "female-only", icon: Venus };
        }

        return { name: "male-and-female", icon: VenusAndMars };
      };

      const pokemonGender = getPokemonGender(species.gender_rate);

      const data: Pokemon = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemonTypes,
        sprite: pokemonSprite,
        shinySprite: pokemonShinySprite,
        height: pokemon.height / 10,
        weight: pokemon.weight / 10,
        stats: pokemon.stats.map((stat: any) => ({
          name: stat.stat.name,
          base: stat.base_stat,
        })),
        abilities: pokemonAbilities,
        gender: pokemonGender,
        category: pokemonCategory,
        flavor,
      } as Pokemon & { shinySprite?: string | null; flavor?: string };

      dailyPokemon.value = data;
      // if (typeof window !== "undefined") {
      //   localStorage.setItem(cacheKey, JSON.stringify(data));
      // }
    } catch (e: any) {
      const isCanceled =
        e?.code === "ERR_CANCELED" ||
        e?.name === "CanceledError" ||
        e?.name === "AbortError";
      if (!isCanceled) error.value = e;
    } finally {
      loading.value = false;
    }
  }

  const displayName = computed(() =>
    dailyPokemon.value
      ? dailyPokemon.value.name[0].toUpperCase() +
        dailyPokemon.value.name.slice(1)
      : ""
  );

  const imageUrl = computed(() => {
    if (!dailyPokemon.value) return null;
    const anyP = dailyPokemon.value as any;
    if (shiny.value && anyP.shinySprite) return anyP.shinySprite as string;
    return dailyPokemon.value.sprite ?? null;
  });

  return {
    dayKey,
    pokemon: dailyPokemon,
    loading,
    error,
    shiny,
    displayName,
    imageUrl,
    load,
  };
}
