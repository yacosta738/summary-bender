import { inject } from '@vercel/analytics';

export default defineNuxtPlugin(() => {
  console.log('[plugins/analitycs.client.ts] Injecting analytics');
  inject();
});
