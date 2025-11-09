<script setup lang="ts">
import logoPokemon from '@/assets/logoPokemon.svg'
import PokemonCard from '@/components/card/PokemonCard.vue'
import CardTable from '@/components/table/CardTable.vue'
import { usePokemonList } from '@/composables/usePokemonList'

import { onMounted } from 'vue'

const { loadPokemon, pokemonList } = usePokemonList()
onMounted(loadPokemon)

</script>
<template>
    <div class="px-8">

        <div class="py-20 mx-auto h-full flex flex-col">

            <div class="text-center flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <h1 class="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">Explore the list<span
                            class="text-blue-primary">.</span>
                    </h1>
                    <p class="text-lg font-medium sm:text-xl/8">Busque por nome, tipo ou geração.
                    </p>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-1 items-baseline pb-40">
            <CardTable :pokemon="pokemonList || []">
                <template #card="{ item }">
                    <PokemonCard :id="item.id" :name="item.name" :url="item.url" :sprite="item.sprite"
                        :types="item.types" />
                </template>
            </CardTable>
        </div>


    </div>
</template>