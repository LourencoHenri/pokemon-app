<script setup lang="ts">
import logoPokemon from '@/assets/logoPokemon.svg'

import { onMounted } from 'vue'
import { useDailyPokemon } from '@/composables/useDailyPokemon'
import { ChevronRight, MoveRight, Mars, Venus, VenusAndMars } from 'lucide-vue-next';
import type { PokemonGender } from '@/types/pokemon';

const { dayKey, pokemon, loading, error, shiny, displayName, load } = useDailyPokemon()
onMounted(load)

const stats = [
    { label: 'HP', value: 207 },
    { label: 'ATK', value: 49 },
    { label: 'DEF', value: 40 },
    { label: 'SPA', value: 65 },
    { label: 'SPD', value: 52 },
    { label: 'SPE', value: 65 },
]

type StatName =
    | 'hp' | 'attack' | 'defense'
    | 'special-attack' | 'special-defense' | 'speed'

export type PokemonStat = { name: StatName; base: number }

const props = withDefaults(defineProps<{
    stats: PokemonStat[]
    max?: number
    showNumbers?: boolean,
    steps?: number //
}>(), { max: 255, showNumbers: true, steps: 15 })

const label: Record<StatName, string> = {
    hp: 'HP', attack: 'ATK', defense: 'DEF',
    'special-attack': 'SpA', 'special-defense': 'SpD', speed: 'SPE',
}

const barClass: Record<StatName, string> = {
    hp: 'bg-rose-500 dark:bg-rose-400',
    attack: 'bg-amber-500 dark:bg-amber-400',
    defense: 'bg-yellow-500 dark:bg-yellow-400',
    'special-attack': 'bg-sky-500 dark:bg-sky-400',
    'special-defense': 'bg-emerald-500 dark:bg-emerald-400',
    speed: 'bg-violet-500 dark:bg-violet-400',
}

function pct(v: number, max: number) {
    const p = Math.max(0, Math.min(1, v / max))
    return `${Math.max(0.06, p) * 100}%` // largura mínima p/ não sumir
}

type Stat = { label: string; value: number }

const filledSteps = (v: number) => {
    console.log(v)

    const clamped = Math.max(0, Math.min(v ?? 0, props.max))
    return Math.max(0, Math.min(props.steps, Math.round((clamped / props.max) * props.steps)))
}

</script>
<template>

    <div class="relative px-6 pt-14 lg:px-8 max-h-[1080px] h-dvh border-b border-zinc-900/10">

        <div class="mx-auto max-w-2xl h-full justify-center align-center flex flex-col">

            <div class="text-center flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <h1 class="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">Explore a Pokédex<span
                            class="text-blue-primary">.</span>
                    </h1>
                    <p class="text-lg font-medium sm:text-xl/8">Busque por nome, tipo ou geração e descubra
                        fraquezas, evoluções e a arte oficial.
                    </p>
                </div>
                <div class="flex items-center justify-center gap-x-6">
                    <a href="#"
                        class="rounded-md bg-yellow-primary px-3.5 py-2.5 text-sm font-semibold shadow-xs text-zinc-950">Log
                        in</a>
                    <a href="#" class="">
                        <div class="flex gap-2 flex-row justify-center items-center">
                            <span class="text-sm/6 font-semibold">
                                Pokémon list
                            </span>
                            <ChevronRight :size="16" />
                        </div>
                    </a>
                </div>
            </div>
        </div>

    </div>

    <section>

        <div class="px-4 py-40 lg:px-8 flex flex-col gap-16 items-center">

            <div class="max-w-2xl text-center gap-2 flex flex-col">
                <p class="text-[40px] font-semibold sm:text-6xl">
                    {{ displayName }}, seu parceiro do dia<span class="text-blue-primary">.</span></p>
                <p class="mx-auto  text-center w-full text-lg/8 font-medium text-pretty sm:text-xl/8">
                    Descubra forças e fraquezas, evolução e a arte oficial.</p>
            </div>

            <div class="flex flex-col gap-4 items-center">
                <div class="max-w-2xl text-center flex flex-col">
                    <p class="text-3xl font-semibold sm:text-6xl">
                        {{ displayName }}</p>
                    <p class="text-sm">
                        IDº{{ pokemon?.id }}</p>
                </div>

                <div class="grid sm:grid-cols-3 max-w-3xl md:max-w-5xl justify-between gap-4 md:gap-12 items-stretch">

                    <div class="flex flex-col flex-1 order-3 sm:order-1 justify-center py-4 gap-6">
                        <div class="flex flex-row gap-2 items-end">
                            <div v-for="(s, i) in stats" :key="i"
                                class="flex flex-1 flex-col justify-items-center gap-2 text-center">
                                <ul class="flex flex-1 flex-col-reverse gap-1">
                                    <li v-for="n in steps" :key="n" class="h-[5px] "
                                        :class="n <= filledSteps(s.value) ? 'bg-yellow-primary' : 'bg-yellow-primary/10'" />
                                </ul>
                                <div class="text-sm font-medium tracking-wide">
                                    {{ s.label }}
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-1 gap-8 items-center justify-center">
                            <div class="flex flex-col items-center justify-center gap-1">
                                <div class="p-2 bg-yellow-primary/10 rounded-full">
                                    <img v-if="pokemon" :src="pokemon.sprite" :alt="pokemon.name"
                                        class="h-24 w-24 object-contain" />
                                </div>
                                <div class="max-w-2xl text-center flex flex-col">
                                    <p class="font-semibold">
                                        {{ displayName }}</p>
                                    <p class="text-sm">
                                        IDº{{ pokemon?.id }}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center justify-center gap-1">
                                <div class="p-2 bg-yellow-primary/10 rounded-full">
                                    <img v-if="pokemon" :src="pokemon.sprite" :alt="pokemon.name"
                                        class="h-24 w-24 object-contain" />
                                </div>
                                <div class="max-w-2xl text-center flex flex-col">
                                    <p class="font-semibold">
                                        {{ displayName }}</p>
                                    <p class="text-sm">
                                        IDº{{ pokemon?.id }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-1 order-1 sm:order-2">
                        <img v-if="pokemon" :src="pokemon.sprite" :alt="pokemon.name"
                            class="h-auto w-full object-contain" />
                    </div>

                    <div class="flex flex-1 flex-col justify-between self-stretch gap-3 p-2 order-2 sm:order-3">
                        <div class="flex flex-col gap-3 items-baseline">
                            <span class="text-left">
                                {{ pokemon?.flavor }}
                            </span>

                            <div class="flex flex-col gap-1 items-baseline">
                                <span class="text-sm">Tipo</span>
                                <div class="flex flex-row gap-2 flex-1 align-center items-center flex-wrap">
                                    <a v-for="type in pokemon?.types" href="#"
                                        class="rounded-md bg-yellow-primary px-6 py-2 text-sm font-medium shadow-xs text-zinc-950 capitalize">{{
                                            type }}</a>
                                </div>

                            </div>

                            <div class="flex flex-col gap-1 items-baseline">
                                <span class="text-sm">Habilidades</span>
                                <div class="flex flex-row gap-2 flex-1 align-center items-center flex-wrap">
                                    <a v-for="ability in pokemon?.abilities" href="#"
                                        class="rounded-md bg-blue-primary px-6 py-2 text-sm font-medium shadow-xs text-zinc-50 capitalize">{{
                                            ability.name.replace("-", " ") }}</a>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3 px-2 py-4">

                            <div class="flex flex-1 flex-col gap-1 items-baseline">
                                <span class="text-sm">Altura</span>
                                <span class="font-medium">{{ pokemon?.height }} m</span>
                            </div>

                            <div class="flex flex-1 flex-col gap-1 items-baseline">
                                <span class="text-sm">Peso</span>
                                <span class="font-medium">{{ pokemon?.weight }} kg</span>
                            </div>

                            <div class="flex flex-1 flex-col gap-1 items-baseline">
                                <span class="text-sm">Categoria</span>
                                <span class="font-medium">{{ pokemon?.category.replace("Pokémon", "") }}</span>
                            </div>

                            <div class="flex flex-1 flex-col gap-1 items-baseline">
                                <span class="text-sm">Sexo</span>
                                <component v-if="pokemon?.gender.icon" :is="pokemon?.gender.icon" class="w-4 h-4" />
                                <span v-else>-</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>