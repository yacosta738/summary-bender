<script setup lang="ts">
import SidebarNav from '@/components/dashboard/SidebarNav.vue'
import { Separator } from '@/components/ui/separator'
import AppNavbar from "~/components/dashboard/AppNavbar.vue";
</script>

<template>
  <div class="space-y-6 p-10 pb-16 block">
    <AppNavbar />
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">
        Settings
      </h2>
      <p class="text-muted-foreground">
        Manage your account settings and set e-mail preferences.
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside class="-mx-4 lg:w-1/5">
        <SidebarNav />
      </aside>
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
