<script setup lang="ts">
import {Button, buttonVariants} from '@/components/ui/button'
import {cn} from "~/lib/utils";
const client = useSupabaseClient()
const user = useSupabaseUser()
const colorMode = useColorMode()

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
    <div class="flex items-center md:justify-between justify-center">
      <div class="hidden md:block">
        <Button
          label="Source"
          variant="ghost"
          target="_blank"
          to="https://github.com/yacosta738/summary-bender"
          icon="i-heroicons-outline-external-link"
        />
      </div>
      <div class="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          @click="toggleDark"
        >
          <Icon name="ph:moon" color="black" v-if="colorMode.value === 'light'"  class="mr-2 h-4 w-4" />
          <Icon name="ph:sun" color="black" v-else  class="mr-2 h-4 w-4" />
        </Button>
        <a
          href="/examples/authentication"
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
