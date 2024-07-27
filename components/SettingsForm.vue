<script setup lang="ts">
import {h, type Ref} from 'vue'
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'

import {FormControl, FormDescription, FormField, FormItem, FormLabel} from '@/components/ui/form'
import {Separator} from '@/components/ui/separator'
import {Switch} from '@/components/ui/switch'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {toast} from '@/components/ui/toast'
import type {User} from "@supabase/auth-js/src/lib/types";

const client = useSupabaseClient()
const user: Ref<User> = useSupabaseUser()

const {data} = await client
.from('settings')
.select(`notifications_enabled, email_alias_identifier, language`)
.eq('id', user.value.id)
.single()

const emailAliasIdentifier = ref(data?.email_alias_identifier ?? '')
const notificationsEnabled = ref(data?.notifications_enabled ?? false)
const language = ref(data?.language ?? 'en')

const notificationsFormSchema = toTypedSchema(z.object({
  summary_emails: z.boolean().default(true).optional(),
}))

const {handleSubmit} = useForm({
  validationSchema: notificationsFormSchema,
  initialValues: {
    summary_emails: notificationsEnabled.value,
  },
})

const config = useRuntimeConfig()
const emailAlias = computed(() => {
  const generalEmail: string = config.public.generalEmail ?? ''
  const [username, domain] = generalEmail.split('@')
  return `${username}+${emailAliasIdentifier.value}@${domain}`
})

const onSubmit = handleSubmit((values) => {
  client
    .from('settings')
    .update({
      notifications_enabled: values.summary_emails,
    }).eq('id', user.value.id)
    .then(() => {
      toast({
        title: 'Notifications updated',
        description: 'Your email preferences have been updated.',
      })
    })
})

const copyAlias = async () => {
  await navigator.clipboard.writeText(emailAlias.value)
  toast({
    title: 'Copied to clipboard',
    description: 'Your email alias has been copied to your clipboard.',
  })
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Settings
    </h3>
    <p class="text-sm text-muted-foreground">
      Manage your notifications and email preferences.
    </p>
  </div>
  <Separator/>
  <form class="space-y-8" @submit="onSubmit">
    <div>
      <h3 class="mb-1 text-lg font-medium">
        Your Email Alias
      </h3>
      <div class="flex items-center space-x-4">
        <Badge variant="secondary">
          {{ emailAlias }}
        </Badge>
        <Button variant="ghost" size="xs" @click="copyAlias" type="button">
          Copy alias
        </Button>
      </div>
    </div>

    <div>
      <h3 class="mb-4 text-lg font-medium">
        Email Notifications
      </h3>
      <div class="space-y-4">
        <FormField v-slot="{ handleChange, value }" type="checkbox" name="summary_emails">
          <FormItem class="flex flex-row items-center justify-between rounded-lg border p-4">
            <div class="space-y-0.5">
              <FormLabel class="text-base">
                Summary emails
              </FormLabel>
              <FormDescription>
                Receive daily summary emails with your latest news.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :checked="value"
                @update:checked="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
    </div>

    <div class="flex justify-start">
      <Button type="submit">
        Update settings
      </Button>
    </div>
  </form>
</template>
