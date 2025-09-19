<script setup lang="ts">
import { onMounted } from 'vue'
import { useDailyPokemon } from '@/composables/useDailyPokemon'

const { dayKey, pokemon, loading, error, shiny, displayName, load } = useDailyPokemon()
onMounted(load)

const typeColor: Record<string, string> = {
    normal: 'bg-stone-300 text-stone-900',
    fire: 'bg-orange-400 text-white',
    water: 'bg-blue-400 text-white',
    electric: 'bg-yellow-300 text-yellow-950',
    grass: 'bg-green-400 text-white',
    ice: 'bg-cyan-300 text-cyan-950',
    fighting: 'bg-red-700 text-white',
    poison: 'bg-fuchsia-500 text-white',
    ground: 'bg-amber-600 text-white',
    flying: 'bg-indigo-300 text-indigo-950',
    psychic: 'bg-pink-400 text-white',
    bug: 'bg-lime-400 text-lime-950',
    rock: 'bg-yellow-700 text-white',
    ghost: 'bg-violet-700 text-white',
    dragon: 'bg-indigo-700 text-white',
    dark: 'bg-zinc-800 text-zinc-50',
    steel: 'bg-gray-400 text-gray-900',
    fairy: 'bg-rose-300 text-rose-950',
}
</script>

<template>
    <section class="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900">
        <header class="flex items-center justify-between mb-4">
            <div>
                <h2 class="text-xl font-bold">Pokémon do dia</h2>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">Data: {{ dayKey }}</p>
            </div>
            <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" v-model="shiny" />
                Shiny
            </label>
        </header>

        <div v-if="loading">Carregando…</div>
        <div v-else-if="error" class="text-red-500">Erro ao carregar.</div>

        <div v-else-if="pokemon" class="grid md:grid-cols-2 gap-6">
            <!-- Arte -->
            <div class="flex items-center justify-center">
                <!-- <img :src="shiny ? pokemon.shinySprite : pokemon.sprite" :alt="pokemon.name"
                    class="w-64 h-64 object-contain drop-shadow" loading="eager" /> -->
            </div>

            <!-- Info -->
            <div class="space-y-3">
                <div class="flex items-center gap-3">
                    <span class="text-xs px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800">#{{ pokemon.id }}</span>
                    <h3 class="text-2xl font-semibold">{{ displayName }}</h3>
                </div>

                <div class="flex gap-2">
                    <span v-for="t in pokemon.types" :key="t" class="px-2 py-1 rounded text-xs font-medium"
                        :class="typeColor[t] ?? 'bg-zinc-300 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-50'">
                        {{ t }}
                    </span>
                </div>

                <p class="text-sm text-zinc-700 dark:text-zinc-300">{{ pokemon.flavor }}</p>

                <dl class="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <dt class="text-zinc-500">Altura</dt>
                        <dd>{{ pokemon.heightM }} m</dd>
                    </div>
                    <div>
                        <dt class="text-zinc-500">Peso</dt>
                        <dd>{{ pokemon.weightKg }} kg</dd>
                    </div>
                    <div>
                        <dt class="text-zinc-500">Habilidades</dt>
                        <dd>{{ pokemon.abilities.join(', ') }}</dd>
                    </div>
                    <div>
                        <dt class="text-zinc-500">Base EXP</dt>
                        <dd>{{ pokemon.baseExp }}</dd>
                    </div>
                </dl>

                <div>
                    <h4 class="text-sm font-semibold mb-1">Base stats</h4>
                    <div class="space-y-1">
                        <div v-for="s in pokemon.stats" :key="s.name" class="flex items-center gap-2">
                            <span class="w-16 text-xs uppercase text-zinc-500">{{ s.name }}</span>
                            <div class="h-2 flex-1 rounded bg-zinc-200 dark:bg-zinc-800">
                                <div class="h-2 rounded bg-zinc-900 dark:bg-zinc-100"
                                    :style="{ width: Math.min(s.base, 150) / 1.5 + '%' }"></div>
                            </div>
                            <span class="w-8 text-right text-xs">{{ s.base }}</span>
                        </div>
                    </div>
                </div>

                <div class="pt-2">
                    <RouterLink :to="`/pokemon/${pokemon.id}`"
                        class="underline text-blue-600 dark:text-blue-400 text-sm">
                        Ver ficha completa →
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>
