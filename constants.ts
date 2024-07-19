import Imap from "imap";

const CONFIGURATIONS = {
  IMAP_CONFIG: new Imap({
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASS || '',
    host: process.env.IMAP_PASS ||'imap.gmail.com',
    port: +(process.env.IMAP_PORT || 993),
    authTimeout: 10000,
    tls: true,
    tlsOptions: {
      servername: 'imap.gmail.com',
    },
  })
}

export default CONFIGURATIONS;
