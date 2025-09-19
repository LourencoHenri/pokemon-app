<script setup lang="ts">

import { Moon, Sun, CircleUser, UserRoundCog, Menu, X } from 'lucide-vue-next';

import logoPokemon from '@/assets/logoPokemon.svg'

import pokeball from '@/assets/pokeball.png'

import { useTheme } from '@/composables/useTheme';
const { isDark, toggle } = useTheme()

import { ref } from 'vue'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Pokémon', href: '/pokemon' },
  { name: 'Favorites', href: '/favorites' },
]

const mobileMenuOpen = ref(false)

</script>

<template class="max-w-12">
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between px-6 py-2">

      <div class="flex lg:flex-1">
        <a href="#">
          <img :src="pokeball || ''" class="h-10 w-auto rounded-2xl justify-center" />
        </a>
      </div>

      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          @click="mobileMenuOpen = true">
          <Menu class="size-6" aria-hidden="true" />
        </button>
      </div>

      <div class="hidden lg:flex lg:gap-x-12 lg:flex-1 lg:justify-center">

        <RouterLink v-for="item in navigation" :key="item.name" :to="item.href"
          class="text-sm/6 font-medium hover:text-zinc-500 dark:hover:text-zinc-300">{{ item.name
          }}</RouterLink>
      </div>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
        <button type="button" @click="toggle()"
          class="flex items-center justify-center group p-2 rounded-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 ease-in-out">

          <Sun v-if="isDark" key="sun" :size="16"
            class="text-zinc-950 dark:text-zinc-50 transition-colors duration-300 ease-in-out" />

          <Moon v-else key="moon" :size="16"
            class="w-4 text-zinc-950 dark:text-zinc-50 transition-colors duration-300 ease-in-out" />
        </button>

        <a href="#" class="text-sm/6 font-semibold">Log in</a>
      </div>
    </nav>

    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-zinc-50 px-6 py-2 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">

        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <img :src="pokeball || ''" class="h-10 w-auto rounded-2xl justify-center" />
          </a>

          <button type="button" class="-m-2.5 rounded-md p-2.5 " @click="mobileMenuOpen = false">
            <X class="size-6" />
          </button>
        </div>

        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50">{{
                  item.name }}</a>
            </div>
            <div class="py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold hover:bg-gray-50">Log
                in</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>

  </header>

  <main class="min-h-full place-items-center">
    <RouterView />
  </main>
</template>

<style scoped></style>
