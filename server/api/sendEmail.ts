import {serverSupabaseClient} from '#supabase/server'
import {render} from '@vue-email/render';
import SummaryEmailTemplate from "~/components/SummaryEmailTemplate.vue";

const renderEmail = async (title: string, emails: string[]) => {
  return await render(SummaryEmailTemplate, {
    title,
    emails
  }, {
    pretty: true,
  });
}
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const {sendMail} = useNodeMailer()

  const {data, error} = await client
  .rpc('get_summarized_emails');

  if (error) {
    console.error("🔴 Error fetching emails:", error);
    return {status: 500, body: {message: 'Error fetching emails'}}
  } else {
    // group the data by user_email and send a summary email to each user with their emails summarized
    console.log("🟢 Processing the data")
    const emailsByUser = data.reduce((acc: any, email: any) => {
      if (!acc[email.user_email]) {
        acc[email.user_email] = [];
      }
      acc[email.user_email].push(email);
      return acc;
    }, {});
    for (const [email, emails] of Object.entries(emailsByUser)) {
      // Prepare the summaries to be passed to the renderEmail function
      const emailSummaries: string[] = emails.map((email: any) => email.summary);
      const emailSubject = 'Summary of your emails';

      // Use the renderEmail function to generate the email content
      const renderedEmailContent = await renderEmail(emailSubject, emailSummaries);
      // Prepare the email data
      const emailData = {
        from: email.to, // Replace with your actual sender email address
        to: email,
        subject: emailSubject,
        html: renderedEmailContent
      };

      // Send the email
      await sendMail(emailData);
      // Update the email status in the database
      const {error} =await client
      .from('emails')
      .update({status: 'SENT'})
      .in('id', emails.map((email: any) => email.id));

      if (error) {
        console.error('Error updating email status:', error);
        return {status: 500, body: {message: 'Error updating email status'}}
      }
    }
  }

  return {status: 200, body: {message: 'Email sent'}}
})
