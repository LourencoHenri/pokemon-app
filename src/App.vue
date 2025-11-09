<script setup lang="ts">

import { Moon, Sun, Menu, X } from 'lucide-vue-next';

import logoPokemon from '@/assets/logoPokemon.svg';


import { useTheme } from '@/composables/useTheme';
const { isDark, toggle } = useTheme()

import { ref } from 'vue';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Pokémon of the day', href: '/pokemon' },
  { name: 'Pokémon', href: '/pokemon' },
  { name: 'Favorites', href: '/favorites' },
]

const mobileMenuOpen = ref(false)

</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-zinc-50/75 dark:bg-zinc-800/75">
    <nav class="flex items-center justify-between px-4 md:px-8 py-4">

      <div class="flex flex-1">
        <a href="#">
          <img :src="logoPokemon || ''" class="h-10" />
        </a>
      </div>

      <div class="flex md:hidden">
        <button type="button" class="rounded-md" @click="mobileMenuOpen = true">
          <Menu class="size-6" aria-hidden="true" />
        </button>
      </div>

      <div class="hidden md:flex md:gap-x-12 md:justify-center">
        <RouterLink v-for="item in navigation" :key="item.name" :to="item.href"
          class="text-sm/6 font-medium hover:text-zinc-500 dark:hover:text-zinc-300">{{ item.name
          }}</RouterLink>
      </div>

      <div class="hidden md:flex flex-1 justify-end items-center lg:gap-2">
        <button type="button" @click="toggle()"
          class="flex items-center justify-center group p-2 rounded-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 ease-in-out">

          <Sun v-if="isDark" key="sun" :size="16"
            class="text-zinc-950 dark:text-zinc-50 transition-colors duration-300 ease-in-out" />

          <Moon v-else key="moon" :size="16"
            class="w-4 text-zinc-950 dark:text-zinc-50 transition-colors duration-300 ease-in-out" />
        </button>

        <RouterLink to="/login" class="text-sm/6 font-semibold">Log in</RouterLink>
      </div>
    </nav>

    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full bg-zinc-50 dark:bg-zinc-800 sm:max-w-sm sm:ring-1 sm:ring-zinc-500/10">

        <div class="flex items-center justify-between px-4 md:px-8 py-4">

          <div class="flex flex-1">
            <a href="#">
              <img :src="logoPokemon || ''" class="h-10" />
            </a>
          </div>

          <button type="button" class="rounded-md" @click="mobileMenuOpen = false">
            <X class="size-6 text-zinc-950 dark:text-zinc-50" />
          </button>
        </div>

        <div class="px-2">

          <div class="flex flex-col gap-2">

            <div class="py-2 border-b border-zinc-900/10">
              <RouterLink v-for="item in navigation" :key="item.name" :to="item.href"
                class="block px-4 py-2 text-base/7 font-semibold text-zinc-950 dark:text-zinc-50">{{
                  item.name }}</RouterLink>
            </div>

            <div class="py-2 border-b border-zinc-900/10">
              <a href="#" class="block px-4 py-2 text-base/7 font-semibold text-zinc-950 dark:text-zinc-50">Log
                in</a>
            </div>

            <button type="button" @click="toggle()"
              class="flex items-center justify-center group p-2 rounded-full cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 ease-in-out px-4">

              <Sun v-if="isDark" key="sun" :size="16"
                class="text-zinc-950 dark:text-zinc-50 transition-colors duration-300 ease-in-out" />

              <Moon v-else key="moon" :size="16"
                class="w-4 text-zinc-950 dark:text-zinc-50 transition-colors duration-300 ease-in-out" />
            </button>

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
