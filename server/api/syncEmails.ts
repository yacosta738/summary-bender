import {getLastSyncedDate, updateSyncState} from "~/services/syncService";
import {readEmails} from "~/services/emailService";
import {saveEmailsToSupabase} from "~/services/databaseService";
import {EventHandlerRequest, H3Event} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  try {
    console.log('Syncing emails...');
    const lastSyncedDate = await getLastSyncedDate(event);
    console.log('Last synced date:', lastSyncedDate);
    const emails = await readEmails(lastSyncedDate);
    if (emails.length > 0) {
      await saveEmailsToSupabase(event, emails);
      await updateSyncState(event,new Date());
    } else console.log('No new emails to sync.');
    return { success: true, message: 'Emails synced successfully.' };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'Error syncing emails.', error };
  }
});
