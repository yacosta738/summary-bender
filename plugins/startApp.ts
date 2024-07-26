export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', async () => {
    await $fetch('/api/subscribeEmail')
  })
})
