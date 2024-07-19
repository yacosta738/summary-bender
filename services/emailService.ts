import type {Box} from 'imap';
import type Imap from 'imap';
import type {Email} from "~/services/model/Email";
import CONFIGURATIONS from "~/constants";

type ImapCallback = (error: Error | null, box?: Box) => void;



export const readEmails = async (sinceDate: string): Promise<Email[]> => {
  return new Promise((resolve, reject) => {
    const imap: Imap = CONFIGURATIONS.IMAP_CONFIG

    const emails: Email[] = [];

    function openInbox(cb: ImapCallback): void {
      imap.openBox('INBOX', false, cb);
    }

    imap.once('ready', function() {
      openInbox(function(err, _) {
        if (err) return reject(err);
        imap.search(['UNSEEN', ['SINCE', sinceDate]], function(err, results) {
          if (err) return reject(err);
          if (!results || results.length === 0) {
            imap.end();
            return resolve(emails);
          }

          const f = imap.fetch(results, { bodies: '', struct: true });
          f.on('message', function(msg, seqno) {
            const email: Email = { seqno, body: '', attributes: null, date: null };

            msg.on('body', function(stream, _) {
              let body = '';
              stream.on('data', (chunk) => {
                body += chunk.toString('utf8');
              });
              stream.on('end', () => {
                email.body = body;
              });
            });

            msg.once('attributes', function(attrs) {
              email.attributes = attrs;
              email.date = attrs.date;  // Extraer la fecha del correo
            });

            msg.once('end', function() {
              emails.push(email);
            });
          });

          f.once('error', function(err) {
            reject(err);
          });

          f.once('end', function() {
            imap.addFlags(results, 'SEEN', (err) => {
              if (err) {
                return reject(err);
              }
              imap.end();
              resolve(emails);
            });
          });
        });
      });
    });


    imap.once('error', function (err: Error | null) {
      reject(err);
    });

    imap.once('end', function () {
      console.log('Connection ended');
    });

    imap.connect();
  });
};
