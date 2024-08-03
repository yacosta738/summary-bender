import {summarizeContent} from "~/services/summarizeContent";

export default defineLazyEventHandler(async () => {
  return defineEventHandler(async (event: any) => {
    console.log('🟡 Summarizing content...')
    return await summarizeContent(event)
  });
});
