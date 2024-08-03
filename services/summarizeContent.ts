import { serverSupabaseClient } from '#supabase/server';
import type {EventHandlerRequest, H3Event} from "h3";
import { generateText } from 'ai';
import {EmailStatus} from "~/model/Email";
import {openai} from "@ai-sdk/openai";

// type EmailEntity = Tables<"emails">;

async function summary(emailBody: string): Promise<string> {
  // const model = mistral('mistral-large-latest');
  const prompt = `
  Summarize the following email in its predominant language. Ensure the summary is concise, with a maximum of 200 characters, and captures the most important ideas and key points of the email:

  Email:
  "${emailBody}"

  Summary:
  `;
  const {text} = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: prompt,
  });
  return text;
}

export const summarizeContent = async (event: H3Event<EventHandlerRequest>) => {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client
  .from('emails')
  .select('id,body')
  .eq('status', 'UNPROCESSED')
  .limit(100)
  .order('received_at', { ascending: false });

  if (error) {
    console.error('Error fetching emails:', error);
    return {status: 500, body: {message: 'Error fetching emails'}};
  }


  if (data) {
    for (const email of data) {
      const summaryText = await summary(email.body);
      // update the status (SUMMARIZED) and the summary
      const { error } = await client.from('emails')
      .update({
        summary: summaryText,
        status: EmailStatus.SUMMARIZED
      }).eq('id', email.id)

      if (error) {
        console.error('Error updating email status and summary:', error);
        return {status: 500, body: {message: 'Error updating email status and summary'}};
      }
    }
    return data;
  }
  return;
}
