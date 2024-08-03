import EmailService from "~/services/email/emailService";
import {processEmail} from "~/services/email/processEmailService";

export default defineEventHandler(async (event) => {
  console.log('🔵 Subscribing to email service...')
  const emailService = new EmailService(processEmail, event);
  emailService.connect();
})
