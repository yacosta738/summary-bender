import cron from 'node-cron'

export default defineNitroPlugin(() => {
  if (process.env.APP_ENV === 'build') {
    console.log('[server/plugins/scheduler.ts] Skipping scheduler, don\'t run in build context');
    return;
  }
  cron.schedule('*/20 * * * * *', async () => {
    console.log('🟢 Summarizing emails every 20 seconds')
    await $fetch('/api/summaryEmail')
  })
  cron.schedule('*/60 * * * * *', async () => {
    console.log('⚪ Sending emails every 60 seconds ')
    const status = await $fetch('/api/sendEmail')
    console.log('Email send status:', status)
  })
})
