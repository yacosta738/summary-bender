<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p class="text-xs text-muted-foreground">&copy; {{ year }} Email Summarizer. All rights reserved.</p>
    <nav class="sm:ml-auto flex gap-4 sm:gap-6">
      <NuxtLink to="/terms" class="text-xs hover:underline underline-offset-4">
        Terms of Service
      </NuxtLink>
      <NuxtLink to="/privacy" class="text-xs hover:underline underline-offset-4">
        Privacy
      </NuxtLink>
    </nav>
  </footer>
</template>

<style scoped>

</style>
