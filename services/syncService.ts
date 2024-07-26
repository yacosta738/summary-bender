import {serverSupabaseClient} from '#supabase/server';
import type {EventHandlerRequest, H3Event} from "h3";
import {format} from 'date-fns';

const formatStr = "yyyy-MM-dd'T'HH:mm:ss";
const defaultDate = format(new Date(), formatStr);
export const getLastSyncedDate = async (event: H3Event<EventHandlerRequest>): Promise<string> => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client
  .from('syncstate')
  .select('last_synced')
  .order('last_synced', { ascending: false })
  .limit(1)
  .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data.last_synced;
  } else {
    return defaultDate;
  }
};

export const updateSyncState = async (event: H3Event<EventHandlerRequest>,lastSynced: Date) => {
  const client = await serverSupabaseClient(event);
  const lastSyncedDate = format(lastSynced, formatStr) ?? defaultDate;
  const { data, error } = await client
  .from('syncstate')
  .upsert([{ id: 1, last_synced: lastSyncedDate }], { onConflict: 'id' });

  if (error) {
    throw error;
  }

  return data;
};
