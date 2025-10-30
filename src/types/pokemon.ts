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

export type PokemonAbility = {
  name: string;
  url: string;
  isHidden: boolean;
};

export type PokemonGender =
  | "male-only"
  | "female-only"
  | "male-and-female"
  | "genderless";

export type Pokemon = {
  id: number; //.id
  name: string; //.name
  sprite: string; //.?sprites?.other?.dream_world?.front_default ?? sprites?.other?.["official-artwork"]?.front_shiny ?? sprites?.front_default
  shinySprite: string;
  height: number;
  weight: number;

  types: string[]; //.types.map((t: any) => t.type.name) //
  stats: PokemonStat[]; //.stats.map((st: any) => ({ name: st.stat.name, base: st.base_stat }))
  abilities: PokemonAbility[]; //
  gender: PokemonGender; //
  category: string;
  flavor: string;
};
