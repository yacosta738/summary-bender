<script setup lang="ts">
import {Button, buttonVariants} from '@/components/ui/button'
import {cn} from "~/lib/utils";
import AppLogo from "~/components/AppLogo.vue";

const client = useSupabaseClient()
const user = useSupabaseUser()
const colorMode = useColorMode()

const menus = [
  { name: 'Dashboard', to: '/dashboard' },
  { name: 'Emails', to: '/dashboard/emails' },
  { name: 'Summaries', to: '/dashboard/summaries' },
]

const toggleDark = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
const logout = async () => {
  await client.auth.signOut()
  navigateTo('/')
}
</script>

<template>
  <div>
    <Title>Summary Bender</Title>
    <div class="flex items-center md:justify-between justify-center m-2">
      <div class="hidden md:flex gap-4 sm:gap-6 items-center justify-between">
        <AppLogo />
        <div v-for="menu in menus" :key="menu.to">
          <NuxtLink :to="menu.to" class="uppercase text-sm font-semibold tracking-wider">
            {{ menu.name }}
          </NuxtLink>
        </div>
      </div>
      <Sheet>
        <SheetTrigger>
          <Button variant="outline" size="icon" class="md:hidden">
            <Icon name="ic:outline-format-list-bulleted" color="black" class="h-8 w-8"/>
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent class="w-[200px]">
          <div v-for="menu in menus" :key="menu.to">
            <NuxtLink :to="menu.to" class="uppercase text-sm font-semibold tracking-wider">
              {{ menu.name }}
            </NuxtLink>
          </div>
        </SheetContent>
      </Sheet>
      <div class="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          @click="toggleDark"
        >
          <Icon v-if="colorMode.value === 'light'" name="ph:moon" color="black"
                class="mr-2 h-4 w-4"/>
          <Icon v-else name="ph:sun" color="black" class="mr-2 h-4 w-4"/>
        </Button>
        <a
          href="https://github.com/yacosta738/summary-bender"
          :class="cn(
        buttonVariants({ variant: 'ghost' }),
        'uppercase text-sm font-semibold tracking-wider',)"
          target="_blank"
        >
          <Icon name="ph:github-logo-thin" color="black" class="h-4 w-4"/>
        </a>
        <a
          href="/login"
          :class="cn(
        buttonVariants({ variant: 'ghost' }),
        'uppercase text-sm font-semibold tracking-wider',
      )"
        >
          Login
        </a>
        <Button
          v-if="user"
          class="u-text-white"
          variant="ghost"
          @click="logout"
        >
          Logout
        </Button>
      </div>
    </div>
  </div>
</template>
