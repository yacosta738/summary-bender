import {summarizeContent} from "~/services/summarizeContent";

export default defineEventHandler(async (event) => {
  console.log('🟡 Summarizing content...')
  await summarizeContent(event)
})
