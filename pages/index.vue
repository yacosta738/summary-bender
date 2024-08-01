<script setup lang="ts">
import AppContainer from "~/components/dashboard/AppContainer.vue";
import AppHeader from "~/components/dashboard/AppHeader.vue";
import LandingPage from "~/components/landing/LandingPage.vue";

const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) {
    navigateTo('/dashboard')
  }
})
</script>

<template>
  <NuxtLayout>
    <AppContainer>
      <AppHeader/>
      <LandingPage />
    </AppContainer>
  </NuxtLayout>
</template>
