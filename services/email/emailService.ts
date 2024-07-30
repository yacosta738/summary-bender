// emailService.ts
import Imap from 'imap';
import type Connection from 'imap';
import {createImapConnection} from './imapConfig';
import {inspect} from 'util';
import {type Email, EmailStatus} from "~/model/Email";
import type {EventHandlerRequest, H3Event} from "h3";

type ProcessEmailCallback = (email: Email, event: H3Event<EventHandlerRequest>) => Promise<void>;

class EmailService {
  private imap: Imap;
  private readonly processEmailCallback: ProcessEmailCallback;
  private readonly event: H3Event<EventHandlerRequest>;

  constructor(processEmailCallback: ProcessEmailCallback, event: H3Event<EventHandlerRequest>) {
    this.imap = createImapConnection();
    this.processEmailCallback = processEmailCallback;
    this.event = event;

    this.imap.once('ready', this.openInbox.bind(this));
    this.imap.once('error', this.onError.bind(this));
    this.imap.once('end', this.onEnd.bind(this));
  }

  private openInbox() {
    this.imap.openBox('INBOX', false, (err, _) => {
      if (err) throw err;
      console.log('Inbox opened');
      this.listenForNewEmails();
    });
  }

  private listenForNewEmails() {
    this.imap.on('mail', (numNewMsgs) => {
      console.log(`${numNewMsgs} new messages`);
      this.imap.search(['UNSEEN'], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
          const f = this.imap.fetch(results, {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
            markSeen: true
          });

          f.on('message', (msg, seqno) => {
            let headerBuffer = '';
            let textBuffer = '';
            let emailDate: Date | undefined;
            let emailTo: string | undefined;
            let emailFrom: string | undefined;
            let emailSubject: string | undefined;

            msg.on('body', (stream, info) => {
              if (info.which === 'TEXT') {
                stream.on('data', (chunk) => {
                  textBuffer += chunk.toString('utf8');
                });
              } else {
                stream.on('data', (chunk) => {
                  headerBuffer += chunk.toString('utf8');
                });
              }

              stream.once('end', () => {
                if (info.which !== 'TEXT') {
                  const header = Imap.parseHeader(headerBuffer);
                  emailTo = header.to ? header.to[0] : undefined;
                  emailFrom = header.from ? header.from[0] : undefined;
                  emailSubject = header.subject ? header.subject[0] : undefined;
                  emailDate = new Date(header.date[0]);
                }
              });
            });

            msg.on('attributes', (attrs: Connection.ImapMessageAttributes) => {
              if (!emailDate) {
                emailDate = attrs.date;
              }
            });

            msg.once('end', async () => {
              if (emailDate && emailTo && emailFrom && emailSubject) {
                await this.processEmailCallback({
                  body: textBuffer,
                  date: emailDate,
                  to: emailTo,
                  from: emailFrom,
                  subject: emailSubject,
                  summary: '',
                  status: EmailStatus.UNPROCESSED,
                  received_at: new Date()
                }, this.event);
              } else {
                console.error(`Incomplete email data: ${inspect({
                  emailDate,
                  emailTo,
                  emailFrom,
                  emailSubject
                })}`);
              }
              console.log(`🔵 Finished processing message #${seqno}`);
            });
          });

          f.once('error', (err) => {
            console.log('❌ Fetch error: ' + err);
          });

          f.once('end', () => {
            console.log('✅ Done fetching all messages!');
          });
        }
      });
    });
  }

  private onError(err: Error) {
    console.error(err);
  }

  private onEnd() {
    console.log('🔴 Connection ended');
  }

  public connect() {
    this.imap.connect();
  }
}

export default EmailService;
