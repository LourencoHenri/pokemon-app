<script setup lang="ts">
import logoPokemon from '@/assets/logoPokemon.svg'

import { onMounted } from 'vue'
import { useDailyPokemon } from '@/composables/useDailyPokemon'
import { ChevronRight, MoveRight, Mars, Venus, VenusAndMars } from 'lucide-vue-next';
import type { PokemonGender } from '@/types/pokemon';

const { dayKey, pokemon, loading, error, shiny, displayName, load } = useDailyPokemon()
onMounted(load)

onMounted(() => {
    console.log('abilities:', pokemon.value?.abilities);
})

const stats = [
    { label: 'HP', value: 207 },
    { label: 'ATA', value: 49 },
    { label: 'DEF', value: 40 },
    { label: 'ATE', value: 65 },
    { label: 'DEE', value: 52 },
    { label: 'VEL', value: 65 },
]

type StatName =
    | 'hp' | 'attack' | 'defense'
    | 'special-attack' | 'special-defense' | 'speed'

export type PokemonStat = { name: StatName; base: number }

const props = withDefaults(defineProps<{
    stats: PokemonStat[]
    max?: number        // máximo usado pra normalizar (PokeAPI ~255)
    showNumbers?: boolean,
    steps?: number // quantas “linhas”
}>(), { max: 255, showNumbers: true, steps: 20 })

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

const getPokemonGenderIcon = (gender: PokemonGender) => {
    
}

const pokemonGender = (gender: PokemonGender) => {
    if (gender === "female-only") {

    }

    return 
}

</script>
<template>
    <!-- <div class="max-h-[1440px] h-dvh">
        <div class="text-center flex flex-1 flex-col items-center max-h-[1440px] h-dvh w-full justify-center">

            <img :src="logoPokemon || ''" class="h-40 px-4 lg:px-0 lg:h-68 w-full" />

        </div>

        
    </div> -->
    <div class="relative px-6 pt-14 lg:px-8 max-h-[1080px] h-dvh">
        <!-- <div aria-hidden="true"
            class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#fff352] to-[#ffe100] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75">
            </div>
        </div> -->
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 h-full justify-center align-center flex flex-col">

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
        <!-- <div aria-hidden="true"
            class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-60rem)]">
            <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#0004ff] to-[#ffe100] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75">
            </div>
        </div> -->
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
            class="relative isolate px-6 py-24 sm:py-32 lg:px-8 justify-center align-center flex flex-col text-center gap-16 items-stretch">
            <!-- <div aria-hidden="true"
                class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl ">
                <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    class="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30">
                </div>
            </div> -->
            <div class="mx-auto max-w-4xl text-center gap-2 flex flex-col">
                <p class="pt-2 text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
                    {{ displayName }}, seu parceiro do dia<span class="text-blue-primary">.</span></p>
                <p class="mx-auto  text-center w-full text-lg font-medium text-pretty sm:text-xl/8">
                    Descubra forças e fraquezas, evolução e a arte oficial. {{ pokemon?.gender }}</p>
            </div>

            <div class="flex justify-between gap-12">
                <div class="flex flex-1 self-stretch">
                    <!-- 1 -->

                    <div class="flex flex-1 flex-row gap-2 items-end">
                        <div v-for="(s, i) in stats" :key="i" class="flex flex-1 flex-col justify-items-center gap-2">
                            <!-- barra -->
                            <ul class="flex flex-1 flex-col-reverse gap-1">
                                <li v-for="n in steps" :key="n" class="h-1 "
                                    :class="n <= filledSteps(s.value) ? 'bg-yellow-primary' : 'bg-yellow-primary/25'" />
                            </ul>
                            <!-- rótulo -->
                            <div class="text-xs font-medium tracking-wide">
                                {{ s.label }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-1 flex-col items-center justify-center gap-4 ">
                    <img v-if="pokemon" :src="pokemon.sprite" :alt="pokemon.name"
                        class="h-auto w-full object-contain" />
                </div>

                <div class="flex flex-1 flex-col justify-between self-stretch">
                    <div class="flex flex-col gap-3 items-baseline">
                        <span class="text-left">
                            {{ pokemon?.flavor }}
                        </span>

                        <div class="flex flex-col gap-1 items-baseline">
                            <span class="text-xs">Tipo</span>
                            <div class="flex flex-row gap-2 flex-1 align-center items-center flex-wrap">
                                <a v-for="type in pokemon?.types" href="#"
                                    class="rounded-md bg-yellow-primary px-6 py-2 text-sm font-medium shadow-xs text-zinc-950 capitalize">{{
                                        type }}</a>
                            </div>

                        </div>

                        <div class="flex flex-col gap-1 items-baseline">
                            <span class="text-xs">Tipo</span>
                            <div class="flex flex-row gap-2 flex-1 align-center items-center flex-wrap">
                                <a v-for="ability in pokemon?.abilities" href="#"
                                    class="rounded-md bg-blue-primary px-6 py-2 text-sm font-medium shadow-xs text-zinc-50 capitalize">{{
                                        ability.name.replace("-", " ") }}</a>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3 px-2 py-4">

                        <div class="flex flex-1 flex-col gap-1 items-baseline">
                            <span class="text-xs">Altura</span>
                            <span class="font-medium">{{ pokemon?.height }} m</span>
                        </div>

                        <div class="flex flex-1 flex-col gap-1 items-baseline">
                            <span class="text-xs">Peso</span>
                            <span class="font-medium">{{ pokemon?.weight }} kg</span>
                        </div>

                        <div class="flex flex-1 flex-col gap-1 items-baseline">
                            <span class="text-xs">Categoria</span>
                            <span class="font-medium">{{ pokemon?.category.replace("Pokémon", "") }}</span>
                        </div>

                        <div class="flex flex-1 flex-col gap-1 items-baseline">
                            <span class="text-xs">Sexo</span>
                            <span class="font-medium">{{ pokemon?.gender }}</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
</template>