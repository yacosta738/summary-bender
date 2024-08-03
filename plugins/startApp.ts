export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', async () => {
    console.log('🟢 App mounted! 🚀')
    await $fetch('/api/subscribeEmail')
  })
})
