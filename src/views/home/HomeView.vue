<script setup lang="ts">
import logoPokemon from '@/assets/logoPokemon.svg'

import { onMounted } from 'vue'
import { useDailyPokemon } from '@/composables/useDailyPokemon'

const { dayKey, pokemon, loading, error, shiny, displayName, load } = useDailyPokemon()
onMounted(load)

type StatName =
    | 'hp' | 'attack' | 'defense'
    | 'special-attack' | 'special-defense' | 'speed'

export type PokemonStat = { name: StatName; base: number }

const props = withDefaults(defineProps<{
    stats: PokemonStat[]
    max?: number        // máximo usado pra normalizar (PokeAPI ~255)
    showNumbers?: boolean
}>(), { max: 255, showNumbers: true })

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

</script>
<template>
    <!-- <div class="max-h-[1440px] h-dvh">
        <div class="text-center flex flex-1 flex-col items-center max-h-[1440px] h-dvh w-full justify-center">

            <img :src="logoPokemon || ''" class="h-40 px-4 lg:px-0 lg:h-68 w-full" />

        </div>

        
    </div> -->
    <div class="relative px-6 pt-14 lg:px-8 max-h-[1080px] h-dvh">
        <div aria-hidden="true"
            class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#fff352] to-[#ffe100] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75">
            </div>
        </div>
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 h-full justify-center align-center flex flex-col">

            <div class="text-center">
                <h1 class="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">Explore a
                    Pokédex.
                </h1>
                <p class="pt-6 text-lg font-medium text-pretty sm:text-xl/8">Busque por nome, tipo ou
                    geração e descubra fraquezas, evoluções e a arte oficial. {{ displayName }} te acompanha hoje.
                </p>
                <div class="pt-6 flex items-center justify-center gap-x-6">
                    <a href="#"
                        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log
                        in</a>
                    <a href="#" class="text-sm/6 font-semibold">Pokémon list <span aria-hidden="true">→</span></a>
                </div>
            </div>
        </div>
        <div aria-hidden="true"
            class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-60rem)]">
            <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#0004ff] to-[#ffe100] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75">
            </div>
        </div>
    </div>
    <section>
        <!-- <div class="">
            <h2 class="text-6xl font-bold">Pokémon do dia!</h2>
            <h3 class="text-xl font-semibold">Descubra quem te acompanha hoje!</h3>

            <div v-if="loading">Carregando…</div>
            <div v-else-if="error" class="text-red-500">Erro ao carregar.</div>

            <div v-else-if="pokemon" class="space-y-3">
                <img :src="shiny ? pokemon.shinySprite : pokemon.sprite" :alt="pokemon.name"
                    class="w-full h-160 object-contain" />
                <h3 class="text-2xl font-semibold">#{{ pokemon.id }} {{ displayName }}</h3>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ pokemon.flavor }}</p>

            </div>
        </div> -->
        <div
            class="relative isolate px-6 py-24 sm:py-32 lg:px-8 justify-center align-center flex flex-col text-center ">
            <div aria-hidden="true"
                class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl ">
                <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    class="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30">
                </div>
            </div>
            <div class="mx-auto max-w-4xl text-center ">
                <h2 class="text-base/7 font-semibold text-indigo-600">Pokémon do dia</h2>
                <p class="pt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                    {{ displayName }}, seu parceiro do dia</p>
            </div>
            <p class="mx-auto pt-4 text-center w-full text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                Descubra forças e fraquezas, evolução e a arte oficial.</p>

            <div class="flex justify-between items-center gap-10 pt-10">
                <div class="flex flex-1 bg-zinc-100 ring ring-zinc-100 p-4 max-w-1/4 rounded-lg flex-col gap-2">
                    <div class="flex justify-between flex-1">
                        <span class="text-sm text-zinc-600">Height</span>
                        <span class="text-sm">{{ pokemon?.height }} m</span>
                    </div>
                    <div class="flex justify-between flex-1">
                        <span class="text-sm text-zinc-600">Weight</span>
                        <span class="text-sm">{{ pokemon?.weight }} kg</span>
                    </div>
                    <div class="flex justify-between flex-1">
                        <span class="text-sm text-zinc-600">Category</span>
                        <span class="text-sm">Lizard</span>
                    </div>
                    <div class="flex justify-between flex-1">
                        <span class="text-sm text-zinc-600">Abilities</span>
                        <span class="text-sm">Blaze</span>
                    </div>


                </div>
                <div class="flex flex-1 flex-col items-center justify-center gap-4 ">
                    <img v-if="pokemon" :src="pokemon.sprite" :alt="pokemon.name"
                        class="h-auto w-full object-contain" />
                    <div class="flex flex-col">
                        <span class="text-3xl font-semibold ">
                            {{ displayName }}
                        </span>
                        <span class="text-zinc-600">
                            Nº{{ pokemon?.id }}
                        </span>
                    </div>
                </div>
                <div class="flex flex-1 bg-zinc-100 ring ring-zinc-100 p-4 max-w-1/4 rounded-lg">
                    <div class="space-y-2">
                        <div v-for="s in stats" :key="s.name" class="flex items-center gap-3">
                            <span class="w-12 shrink-0 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
                                {{ label[s.name] }}
                            </span>

                            <div class="relative h-2.5 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"
                                role="progressbar" :aria-valuenow="s.base" :aria-valuemin="0" :aria-valuemax="max">
                                <div class="h-full rounded-full transition-[width] duration-300 ease-out"
                                    :class="barClass[s.name]" :style="{ width: pct(s.base, max) }" />
                                <!-- brilho sutil -->
                                <div
                                    class="pointer-events-none absolute inset-0 rounded-full bg-white/20 mix-blend-overlay">
                                </div>
                            </div>

                            <span v-if="showNumbers"
                                class="w-10 text-right text-xs tabular-nums text-zinc-700 dark:text-zinc-300">
                                {{ s.base }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>