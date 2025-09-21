// export type Pokemon = {
//   id: number;
//   name: string;
//   types: string[];
//   sprite: string | null;
//   shinySprite: string | null;
//   heightM: number;
//   weightKg: number;
//   abilities: string[];
//   baseExp: number;
//   stats: { name: StatName; base: number }[];
//   flavor: string;
// };

export type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export type PokemonStat = {
  name: StatName;
  base: number;
};

export type Pokemon = {
  id: number; //.id
  name: string; //.name
  types: string[]; //.types.map((t: any) => t.type.name) //
  sprite: string; //.?sprites?.other?.dream_world?.front_default ?? sprites?.other?.["official-artwork"]?.front_shiny ?? sprites?.front_default
  height: number;
  weight: number;
  stats: PokemonStat[]; //.stats.map((st: any) => ({ name: st.stat.name, base: st.base_stat }))
};
