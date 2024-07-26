// imapConfig.ts
import type Imap from 'imap';
import CONFIGURATIONS from "~/constants";

export function createImapConnection(): Imap {
  return CONFIGURATIONS.IMAP_CONFIG;
}
