import EmailService from "~/services/email/emailService";
import {processEmail} from "~/services/email/processEmailService";

export default defineEventHandler(async (event) => {
  const emailService = new EmailService(processEmail, event);
  emailService.connect();
})
