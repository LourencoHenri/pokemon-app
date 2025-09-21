<script setup lang="ts">
import logoPokemon from '@/assets/logoPokemon.svg'

import { onMounted } from 'vue'
import { useDailyPokemon } from '@/composables/useDailyPokemon'

const { dayKey, pokemon, loading, error, shiny, displayName, load } = useDailyPokemon()
onMounted(load)

</script>
<template>

    <div class="py-80">
        <h2 class="text-6xl font-bold">POKEMON</h2>
        <h3 class="text-xl font-semibold">Descubra quem te acompanha hoje!</h3>

        <div v-if="loading">Carregando…</div>
        <div v-else-if="error" class="text-red-500">Erro ao carregar.</div>

    </div>

</template>