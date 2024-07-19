import type {Email} from "~/services/model/Email";
import { serverSupabaseClient } from '#supabase/server';
import type {EventHandlerRequest, H3Event} from "h3";

export const saveEmailsToSupabase = async (event: H3Event<EventHandlerRequest>, emails: Email[]) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
  .from('emails')
  .insert(emails.map(email => ({
    seqno: email.seqno,
    body: email.body,
    attributes: email.attributes,
    received_at: new Date()
  })));

  if (error) {
    throw error;
  }

  return data;
};
