<script setup lang="ts">
import MainNav from "~/components/MainNav.vue";
import UserNav from "~/components/UserNav.vue";
</script>

<template>
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <MainNav class="mx-6" />
      <div class="ml-auto flex items-center space-x-4">
        <UserNav />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
