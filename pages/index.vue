<script setup lang="ts">
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) {
    alert(user.value)
    navigateTo('/dashboard')
  }
})
</script>

<template>
  <AppContainer>
    <AppHeader />
    <PageContainer>
      <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <h2 class="my-6 text-center text-3xl font-extrabold u-text-white">
          Landing page
        </h2>
        All the components here for the landing page
      </div>
    </PageContainer>
  </AppContainer>
</template>
