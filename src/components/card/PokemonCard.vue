<script setup lang="ts">
import { TYPE_BADGE, type PokemonListItem, type PokemonType } from '@/types/pokemon';
import { onMounted } from 'vue';


const pokemon = withDefaults(defineProps<PokemonListItem>(), {
    id: 0,
    name: "",
    url: "",
    sprite: "",
    types: () => [],
})

onMounted(() => {
    console.log("pokemon", pokemon)
})

</script>
<template>
    <div class="p-4 flex flex-col gap-2 rounded-lg bg-zinc-300/15">
        <p class="font-bold text-xl text-center capitalize">
            {{ name }}
        </p>

        <div class="flex flex-1">
            <img :src="sprite" :alt="name" class="h-40 w-40 object-contain"
                @error="($event.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`" />

        </div>

        <div class="max-w-2xl text-center">
            <p class="text-sm">
                IDº {{ String(pokemon.id).padStart(4, "0") }}</p>
        </div>

        <div class="flex flex-row gap-2 flex-1 align-center items-center flex-wrap justify-center">
            <p v-for="type in (pokemon.types || [])" :key="`${pokemon.id}-${type}`" :class="[
                'rounded-md px-2 sm:px-4 py-1 sm:py-2 text-sm font-medium shadow-xs capitalize',
                TYPE_BADGE[(type as PokemonType)] ?? 'bg-zinc-300/50 text-zinc-950'
            ]">
                {{ type }}
            </p>
        </div>
    </div>
</template>