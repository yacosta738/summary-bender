<script setup lang="ts">
import TeamSwitcher from "~/components/TeamSwitcher.vue";
import Search from "~/components/Search.vue";
import MainNav from "~/components/MainNav.vue";
import UserNav from "~/components/UserNav.vue";
</script>

<template>
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <TeamSwitcher />
      <MainNav class="mx-6" />
      <div class="ml-auto flex items-center space-x-4">
        <Search />
        <UserNav />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
