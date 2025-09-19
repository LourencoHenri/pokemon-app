<script setup lang="ts">
import logoPokemon from '@/assets/logoPokemon.svg'

import { onMounted } from 'vue'
import { useDailyPokemon } from '@/composables/useDailyPokemon'

const { dayKey, pokemon, loading, error, shiny, displayName, load } = useDailyPokemon()
onMounted(load)

</script>
<template>
    <div
        class="text-center flex flex-col items-center h-dvh w-full justify-center ring ring-zinc-200 dark:ring-zinc-700">

        <img :src="logoPokemon || ''" class="h-40 px-4 lg:px-0 lg:h-68 w-full" />

    </div>

    <div class="py-80">
        <h2 class="text-6xl font-bold">Pokémon do dia!</h2>
        <h3 class="text-xl font-semibold">Descubra quem te acompanha hoje!</h3>

        <div v-if="loading">Carregando…</div>
        <div v-else-if="error" class="text-red-500">Erro ao carregar.</div>

        <div v-else-if="pokemon" class="space-y-3">
            <!-- <img :src="shiny ? pokemon.shinySprite : pokemon.sprite" :alt="pokemon.name"
                class="w-full h-160 object-contain" /> -->
            <h3 class="text-2xl font-semibold">#{{ pokemon.id }} {{ displayName }}</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ pokemon.flavor }}</p>
            <!-- … demais campos (types, stats etc.) … -->
        </div>
    </div>

</template>