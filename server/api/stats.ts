import {serverSupabaseClient} from "#supabase/server";
import type {
  EmailCountByDay,
  EmailCountBySender,
  EmailCountByStatus,
  EmailSenderDomain,
  RecentEmail
} from "~/model/Stats";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);
  const startDate: string = query.startDate as string;
  const endDate: string = query.endDate as string;

  const stats = {
    emailCountByStatus: [] as EmailCountByStatus[],
    emailCountBySender: [] as EmailCountBySender[],
    recentEmails: [] as RecentEmail[],
    emailCountByDay: [] as EmailCountByDay[],
    emailSenderDomains: [] as EmailSenderDomain[],
  }

  try {
    const [
      {data: emailCountByStatus},
      {data: emailCountBySender},
      {data: recentEmails},
      {data: emailCountByDay},
      {data: emailSenderDomains}
    ] = await Promise.all([
      client.from('email_count_by_status').select('*').lt('date', endDate).gt('date', startDate),
      client.from('email_count_by_sender').select('*').lt('date', endDate).gt('date', startDate)
      .order('count', {ascending: false})
      .limit(6),
      client.from('recent_emails').select('*').lt('date', endDate).gt('date', startDate),
      client.from('email_count_by_day').select('*').lt('email_date', endDate).gt('email_date', startDate),
      client.from('email_sender_domains').select('*').lt('date', endDate).gt('date', startDate)
    ]);

    stats.emailCountByStatus = emailCountByStatus as EmailCountByStatus[];

    stats.emailCountBySender = (emailCountBySender ?? []).map((item: any) => ({
      sender: item.from,
      count: parseInt(item.count),
    })) as EmailCountBySender[];

    stats.recentEmails = (recentEmails ?? []).map((item: any) => ({
      id: item.id,
      subject: item.subject ?? '',
      sender: item.from ?? '',
      to: item.to ?? '',
      date: item.date ?? '',
      summary: item.summary ?? '',
      status: item.status ?? '',
    })) as RecentEmail[];

    stats.emailCountByDay = (emailCountByDay ?? []).map((item: any) => ({
      emailDate: item.email_date,
      count: item.count,
    })) as EmailCountByDay[];

    stats.emailSenderDomains = emailSenderDomains as EmailSenderDomain[];
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }

  return stats;
});
