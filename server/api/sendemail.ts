import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  console.log('user', user)
  const { sendMail } = useNodeMailer()
  if (!user) {
    return { status: 401, body: { message: 'Unauthorized' } }
  }
  const email = user.email
  console.log('Sending email to', email)
  return sendMail({ subject: 'Nuxt + nodemailer', text: 'Hello from nuxt-nodemailer!', to: email })
})
