<script setup lang="ts">
import PokemonCard from '@/components/card/PokemonCard.vue'
import CardTable from '@/components/table/CardTable.vue'
import { usePokemonList } from '@/composables/usePokemonList'
import type { PokemonListItem } from '@/types/pokemon';
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{ pokemon: PokemonListItem[] }>()

const {
    list, total, loading, error,
    limit, currentPage, totalPages,
    fetchPage, nextPage, prevPage, goToPage, setPageSize
} = usePokemonList()

const search = ref('')

// campo de navegação direta (jump)
const pageInput = ref<number>(1)

onMounted(fetchPage)

const typeFilter = ref<'all' | string>('All')

const allTypes = computed(() => {
    const s = new Set<string>()
    for (const it of props.pokemon ?? []) (it.types ?? []).forEach(t => s.add(t.toLowerCase()))
    return ['all', ...Array.from(s).sort()]
})

</script>

<template>
    <div class="px-8">
        <div class="py-20 mx-auto h-full flex flex-col">
            <div class="text-center flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <h1 class="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
                        Explore the list<span class="text-blue-primary">.</span>
                    </h1>
                    <p class="text-lg font-medium sm:text-xl/8">
                        Busque por nome, tipo ou geração.
                    </p>
                </div>
            </div>
        </div>

        <!-- Controles de paginação -->
        <div class="flex flex-wrap items-center gap-3 mb-4">
            <input v-model="search" type="search" placeholder="Buscar por nome ou ID..."
                class="flex-1 rounded-3xl border border-zinc-200 px-4 py-2 text-sm text-zinc-500 placeholder-zinc-400" />
            <!-- <label class="text-sm">Page size:</label>
            <select class="border px-2 py-1 rounded" :value="limit"
                @change="setPageSize(Number(($event.target as HTMLSelectElement).value))">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
                <option :value="1300">1300</option>
            </select> -->

            <!-- <div class="ml-auto flex items-center gap-2">
                <button class="border px-3 py-1 rounded disabled:opacity-50" :disabled="loading || currentPage <= 1"
                    @click="prevPage">
                    Prev
                </button>

                <span class="text-sm">
                    Page {{ currentPage }} / {{ totalPages }}
                </span>

                <button class="border px-3 py-1 rounded disabled:opacity-50"
                    :disabled="loading || currentPage >= totalPages" @click="nextPage">
                    Next
                </button>
            </div> -->

            <!-- <div class="flex items-center gap-2">
                <label class="text-sm">Go to:</label>
                <input v-model.number="pageInput" type="number" min="1" :max="totalPages"
                    class="w-20 border px-2 py-1 rounded" />
                <button class="border px-3 py-1 rounded disabled:opacity-50" :disabled="loading || pageInput < 1"
                    @click="goToPage(pageInput)">
                    Go
                </button>
            </div> -->
            <select v-model="typeFilter"
                class="rounded-3xl border border-zinc-200 px-4 py-2 text-sm text-zinc-500 placeholder-zinc-400">
                <option v-for="t in allTypes" :key="t" :value="t">{{ t }}</option>
            </select>
        </div>

        <!-- Status -->
        <div class="mb-4 text-sm text-muted-foreground">
            <template v-if="total > 0">
                Showing
                <b>{{ (currentPage - 1) * limit + 1 }}</b> –
                <b>{{ Math.min(currentPage * limit, total) }}</b>
                of <b>{{ total }}</b>
            </template>
            <template v-else> No results yet. </template>
        </div>

        <!-- Lista -->
        <div class="flex flex-col gap-1 items-baseline pb-40">
            <CardTable :pokemon="list || []">
                <template #card="{ item }">
                    <PokemonCard :id="item.id" :name="item.name" :url="item.url" :sprite="item.sprite"
                        :types="item.types" />
                </template>
            </CardTable>

            <div v-if="loading" class="mt-4 text-sm">Loading…</div>
            <div v-if="error" class="mt-2 text-sm text-red-600">Failed to load.</div>
        </div>

    </div>
</template>
