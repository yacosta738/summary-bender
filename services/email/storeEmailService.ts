import {serverSupabaseClient} from "#supabase/server";
import type {Email} from "~/services/model/Email";
import type {EventHandlerRequest, H3Event} from "h3";

export async function storeEmail(event: H3Event<EventHandlerRequest>, emails: Email[]) {
  console.log('🟢💾 Storing emails...');
  const client = await serverSupabaseClient(event);

  const { error } = await client
  .from('emails')
  .insert(emails);
  if (error) {
    console.error('Error storing emails:', error);
    return error;
  }
}
