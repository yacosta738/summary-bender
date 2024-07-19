import cron from 'node-cron'

export default defineNitroPlugin(() => {
  cron.schedule('*/10 * * * * *', async () => {
    console.log('Running a task every 10 seconds')
    await $fetch('/api/syncEmails')
  })
})
