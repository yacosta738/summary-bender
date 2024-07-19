<script setup lang="ts">
import { ref } from 'vue'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const { auth } = useSupabaseClient()
const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo('/dashboard')
  }
})

const isLoading = ref(false)
const email = ref('')
const signInWithOtp = async () => {
  await supabase.auth.signInWithOtp({
    email: email.value,
  })
}
async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true
  await signInWithOtp()
  isLoading.value = false
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">
            Email
          </Label>
          <Input
            id="email"
            v-model="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
        </div>
        <Button :disabled="isLoading" type="submit">
          <Icon v-if="isLoading" name="tabler:loader-2" color="black" class="mr-2 h-4 w-4 animate-spin" />
          Sign In with Email
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <Button variant="outline" type="button" :disabled="isLoading" @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })">
      <Icon v-if="isLoading" name="mdi:loading" color="black" class="mr-2 h-4 w-4 animate-spin" />
      <Icon v-else name="hugeicons:github" color="black" class="mr-2 h-4 w-4" />
      GitHub
    </Button>
  </div>
</template>
