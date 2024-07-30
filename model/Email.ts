export enum EmailStatus {
  UNPROCESSED = 'UNPROCESSED',
  PROCESSED = 'PROCESSED',
  SUMMARIZED = 'SUMMARIZED',
  ERROR = 'ERROR',
  SENT = 'SENT',
}

export interface Email {
  from: string;
  to: string;
  subject: string;
  body: string;
  date: Date;
  status: EmailStatus;
  summary: string;
  received_at: Date;
}
