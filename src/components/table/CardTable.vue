<script setup lang="ts">
import type { PokemonListItem } from '@/types/pokemon'
import { computed, ref, watch } from 'vue'

import { ChevronRight, ChevronLeft } from 'lucide-vue-next';

const props = defineProps<{ pokemon: PokemonListItem[] }>()

// Controles
const search = ref('')
const typeFilter = ref<'all' | string>('all')
const sortBy = ref<'id' | 'name'>('id')
const sortOrder = ref<'asc' | 'desc'>('asc')
const page = ref(1)
const pageSize = ref(20)

// Lista dinâmica de tipos
const allTypes = computed(() => {
    const s = new Set<string>()
    for (const it of props.pokemon ?? []) (it.types ?? []).forEach(t => s.add(t.toLowerCase()))
    return ['all', ...Array.from(s).sort()]
})

// Filtro + busca + ordenação
const filtered = computed(() => {
    const query = search.value.trim().toLowerCase()
    let list = props.pokemon ?? []

    if (typeFilter.value !== 'all')
        list = list.filter(pokemon => (pokemon.types ?? []).some(t => t.toLowerCase() === typeFilter.value))
    if (query)
        list = list.filter(pokemon => pokemon.name.toLowerCase().includes(query) || String(pokemon.id).includes(query))

    list = [...list].sort((a, b) => {
        const dir = sortOrder.value === 'asc' ? 1 : -1
        return sortBy.value === 'name'
            ? a.name.localeCompare(b.name) * dir
            : (a.id - b.id) * dir
    })

    return list
})

// Paginação
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)))
const paged = computed(() => {
    const start = (page.value - 1) * pageSize.value
    return filtered.value.slice(start, start + pageSize.value)
})

// resetar página
watch([search, sortBy, sortOrder, typeFilter, pageSize], () => { page.value = 1 })
</script>

<template>
    <!-- Controles -->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 w-full pb-2">
        <input v-model="search" type="search" placeholder="Buscar por nome ou ID..."
            class="flex-1 rounded-3xl border border-zinc-200 px-4 py-2 text-sm text-zinc-500 placeholder-zinc-400" />

        <div class="flex gap-2">
            <select v-model="typeFilter"
                class="rounded-3xl border border-zinc-200 px-4 py-2 text-sm text-zinc-500 placeholder-zinc-400">
                <option v-for="t in allTypes" :key="t" :value="t">{{ t }}</option>
            </select>

            <select v-model="sortBy"
                class="rounded-3xl border border-zinc-200 px-4 py-2 text-sm text-zinc-500 placeholder-zinc-400">
                <option value="id">ID</option>
                <option value="name">Nome</option>
            </select>

            <button @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
                class="rounded-3xl border border-zinc-200 px-4 py-2 text-sm text-zinc-500 placeholder-zinc-400">
                {{ sortOrder === 'asc' ? 'Asc' : 'Desc' }}
            </button>

            <select v-model.number="pageSize"
                class="rounded-3xl border border-zinc-200 px-4 py-2 text-sm text-zinc-500 placeholder-zinc-400">
                <option :value="12">12/página</option>
                <option :value="16">16/página</option>
                <option :value="20">20/página</option>
            </select>
        </div>
    </div>

    <div class="grid gap-2 sm:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <slot name="card" v-for="item in paged" :key="item.id" :item="item" />
    </div>

    <div class="flex justify-between items-center gap-8 pt-2 w-full">
        <button @click="page--" :disabled="page === 1" class="p-2 rounded-full cursor-pointer">
            <ChevronLeft :size="32" />
        </button>

        <div class="flex gap-8">
            <span class="p-2 rounded-full text-sm text-zinc-500 cursor-pointer">{{ page }}</span>

            <span class="p-2 rounded-full text-sm text-zinc-500 cursor-pointer">{{ page + 1 }}</span>

            <span class="p-2 rounded-full text-sm text-zinc-500 cursor-pointer">{{ page + 2 }}</span>
        </div>

        <button @click="page++" :disabled="page === totalPages" class="p-2 rounded-full cursor-pointer">
            <ChevronRight :size="32" />
        </button>
    </div>
</template>
