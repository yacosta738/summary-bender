import cron from 'node-cron'

export default defineNitroPlugin(() => {
  // cron.schedule('*/10 * * * * *', async () => {
  //   console.log('🔵 Syncing emails every 10 seconds')
  //   await $fetch('/api/syncEmails')
  // })
  cron.schedule('*/20 * * * * *', async () => {
    console.log('🟢 Summarizing emails every 20 seconds')
    await $fetch('/api/summaryEmail')
  })
  cron.schedule('*/60 * * * * *', async () => {
    console.log('⚪ Sending emails every 60 seconds ')
    const status =  await $fetch('/api/sendEmail')
    console.log('Email send status:', status)
  })
})
