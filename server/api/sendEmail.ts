import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const { sendMail } = useNodeMailer()
  if (!user) {
    return { status: 401, body: { message: 'Unauthorized' } }
  }
  const email = user.email
  return sendMail({ subject: 'Nuxt + nodemailer', text: 'Hello from nuxt-nodemailer!', to: email })
})
