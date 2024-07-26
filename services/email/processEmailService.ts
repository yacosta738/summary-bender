// processEmailService.ts
import {type Email, EmailStatus} from "~/services/model/Email";
import type {EventHandlerRequest, H3Event} from "h3";
import {storeEmail} from "~/services/email/storeEmailService";
import { convert } from "html-to-text";

function cleanEmailBody(emailBody: string): string {
  return convert(emailBody);
}

export async function processEmail(rawEmail: Email, event: H3Event<EventHandlerRequest>): Promise<void> {
  const cleanedBody = cleanEmailBody(rawEmail.body);
  const email: Email ={
    ...rawEmail,
    body: cleanedBody,
    status: EmailStatus.UNPROCESSED
  }
  console.log('✨ Email:', email);
  await storeEmail(event, [email]);
}
