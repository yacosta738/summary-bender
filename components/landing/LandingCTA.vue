<script setup lang="ts">
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {toast} from "~/components/ui/toast";
import {ref} from "vue";

const supabase = useSupabaseClient()
const email = ref('')
const isLoading = ref(false)
const signInWithOtp = async () => {
  await supabase.auth.signInWithOtp({
    email: email.value,
  })
  toast({
    title: 'Sign-in link sent',
    description: 'Check your email for the sign-in link.',
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
  <section class="w-full py-12 md:py-24 lg:py-32 bg-muted">
    <div class="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
      <div class="space-y-3">
        <h2 class="text-3xl font-bold tracking-tighter md:text-4xl/tight">Take Control of Your Inbox</h2>
        <p class="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Our email summarization tool helps you quickly identify the most important information, so you can focus
          on what matters most.
        </p>
      </div>
      <div class="mx-auto w-full max-w-sm space-y-2">
        <form class="flex gap-2" @submit="onSubmit">
          <Input
            id="email"
            v-model="email"
            class="max-w-lg flex-1"
            placeholder="Enter your email"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
          />
          <Button type="submit">Try It Now</Button>
        </form>
        <p class="text-xs text-muted-foreground">
          Sign up to start summarizing your emails.
          <NuxtLink to="/terms" class="underline underline-offset-2">
            Terms &amp; Conditions
          </NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
