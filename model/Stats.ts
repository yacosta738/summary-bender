import type {EmailStatus} from "~/model/Email";

export interface EmailCountByStatus {
  date: string;
  status: EmailStatus;
  count: number;
}

export interface EmailCountBySender {
  date: string;
  sender: string;
  count: number;
}

export interface RecentEmail {
  id: string;
  subject: string;
  sender: string;
  to: string;
  date: string;
  summary: string;
  status: EmailStatus;
}

export interface EmailCountByDay {
  emailDate: string;
  count: number;
}

export interface EmailSenderDomain {
  date: string;
  domain: string;
  count: number;
}
