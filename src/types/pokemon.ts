import type { Component } from "vue";

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

export type GenderName =
  | "male-only"
  | "female-only"
  | "male-and-female"
  | "genderless";

export type PokemonGender = {
  name: GenderName;
  icon?: Component;
};

export type Pokemon = {
  id: number;
  name: string;
  sprite: string;
  shinySprite: string;
  height: number;
  weight: number;

  types: string[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  gender: PokemonGender;
  category: string;
  flavor: string;
  evolutions?: any;
};

export type PokemonListItem = {
  id: number | null;
  name: string;
  url: string;
  sprite: string;
  types: string[];
};

export type PokemonItemResponse = {
  name: string;
  url: string;
};

export type PokemonType =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "unknown"
  | "shadow";

export const TYPE_BADGE = {
  normal: "bg-stone-300/50 text-zinc-950",
  fighting: "bg-red-300/50 text-zinc-950",
  flying: "bg-sky-300/50 text-zinc-950",
  poison: "bg-purple-300/50 text-zinc-950",
  ground: "bg-amber-300/50 text-zinc-950",
  rock: "bg-stone-300/50 text-zinc-950",
  bug: "bg-lime-300/50 text-zinc-950",
  ghost: "bg-indigo-300/50 text-white",
  steel: "bg-slate-300/50 text-zinc-950",
  fire: "bg-orange-300/50 text-zinc-950",
  water: "bg-blue-300/50 text-zinc-950",
  grass: "bg-emerald-300/50 text-zinc-950",
  electric: "bg-yellow-300/50 text-zinc-950",
  psychic: "bg-fuchsia-300/50 text-zinc-950",
  ice: "bg-cyan-300/50 text-zinc-950",
  dragon: "bg-violet-300/50 text-zinc-950",
  dark: "bg-neutral-300/50 text-zinc-950",
  fairy: "bg-rose-300/50 text-zinc-950",
  unknown: "bg-zinc-300/50 text-zinc-950",
  shadow: "bg-violet-300/50 text-zinc-950",
} as const satisfies Record<PokemonType, string>;
