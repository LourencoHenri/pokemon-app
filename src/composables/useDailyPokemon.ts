import { ref, computed, onBeforeUnmount } from "vue";
import pokeApi from "@/services/pokeApi";

type DailyPokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string | null;
  shinySprite: string;
  heightM: number;
  weightKg: number;
  abilities: string[];
  baseExp: number;
  stats: { name: string; base: number }[];
  flavor: string;
};

const MAX_ID_FALLBACK = 1010; // caso a contagem falhe (ajuste se quiser)

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
  return (h % max) + 1;
}

async function getMaxId(signal?: AbortSignal): Promise<number> {
  // consulta 1x por semana e guarda
  const k = "poke:maxCount";
  const raw = localStorage.getItem(k);
  if (raw) {
    try {
      const cached = JSON.parse(raw) as { count: number; at: number };
      const week = 1000 * 60 * 60 * 24 * 7;
      if (Date.now() - cached.at < week) return cached.count;
    } catch {}
  }
  try {
    const res = await pokeApi.get("/pokemon", { params: { limit: 0 }, signal });
    const count = Number(res.data?.count) || MAX_ID_FALLBACK;
    localStorage.setItem(k, JSON.stringify({ count, at: Date.now() }));
    return count;
  } catch {
    return MAX_ID_FALLBACK;
  }
}

export function useDailyPokemon() {
  const dayKey = localDateKey();
  const loading = ref(false);
  const error = ref<unknown>(null);
  const pokemon = ref<DailyPokemon | null>(null);
  const shiny = ref(false);

  const abort = new AbortController();
  onBeforeUnmount(() => abort.abort());

  async function load() {
    const cacheKey = `dailyPokemon:${dayKey}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        pokemon.value = JSON.parse(cached) as DailyPokemon;
        return;
      } catch {}
    }

    loading.value = true;
    error.value = null;
    try {
      const max = await getMaxId(abort.signal);
      const id = pickIdFromKey(dayKey, max);

      const [pRes, sRes] = await Promise.all([
        pokeApi.get(`/pokemon/${id}`, { signal: abort.signal }),
        pokeApi.get(`/pokemon-species/${id}`, { signal: abort.signal }),
      ]);

      const p = pRes.data;
      const s = sRes.data;

      const flavorRaw =
        s.flavor_text_entries.find((e: any) => e.language.name === "pt") ??
        s.flavor_text_entries.find((e: any) => e.language.name === "en");

      const flavor = (flavorRaw?.flavor_text ?? "")
        .replace(/\f/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const data: DailyPokemon = {
        id: p.id,
        name: p.name,
        types: p.types.map((t: any) => t.type.name),
        sprite:
          p.sprites?.other?.["official-artwork"]?.front_default ??
          p.sprites?.front_default ??
          null,
        shinySprite:
          p.sprites?.other?.["official-artwork"]?.front_shiny ??
          p.sprites?.front_shiny ??
          null,
        heightM: p.height / 10,
        weightKg: p.weight / 10,
        abilities: p.abilities.map((a: any) => a.ability.name),
        baseExp: p.base_experience,
        stats: p.stats.map((st: any) => ({
          name: st.stat.name,
          base: st.base_stat,
        })),
        flavor,
      };

      pokemon.value = data;
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (e) {
      if (!(e as any)?.message?.includes("canceled")) error.value = e;
    } finally {
      loading.value = false;
    }
  }

  const displayName = computed(() =>
    pokemon.value
      ? pokemon.value.name[0].toUpperCase() + pokemon.value.name.slice(1)
      : ""
  );

  return { dayKey, pokemon, loading, error, shiny, displayName, load };
}
