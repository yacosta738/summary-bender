<script setup lang="ts">
import {h, ref, type Ref} from 'vue'
import {FieldArray, useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {Cross1Icon} from '@radix-icons/vue'
import {cn} from '@/lib/utils'

import {Input} from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {Separator} from '@/components/ui/separator'
import {Textarea} from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Button} from '@/components/ui/button'
import {toast} from '@/components/ui/toast'
import type {User} from "@supabase/auth-js/src/lib/types";
import {ToastAction} from "radix-vue";
import ProfileAvatar from "~/components/dashboard/ProfileAvatar.vue";

const loading = ref(true)

const client = useSupabaseClient()
const user: Ref<User> = useSupabaseUser()

const {data} = await client
.from('profiles')
.select(`username, website, avatar_url`)
.eq('id', user.value.id)
.single()

const verifiedEmails = ref([user.value.email ?? 'me@summarybender.com'])
const avatar_path = ref(data?.avatar_url ?? user.value.user_metadata.avatar_url ?? 'https://www.amongusavatarcreator.com/assets/img/main/icon.png')

const profileFormSchema = toTypedSchema(z.object({
  avatar: z.string().optional(),
  username: z
  .string()
  .min(2, {
    message: 'Username must be at least 2 characters.',
  })
  .max(30, {
    message: 'Username must not be longer than 30 characters.',
  }),
  email: z
  .string({
    required_error: 'Please select an email to display.',
  })
  .email(),
  bio: z.string().max(160, {message: 'Bio must not be longer than 160 characters.'}).min(4, {message: 'Bio must be at least 2 characters.'}),
  urls: z
  .array(
    z.object({
      value: z.string().url({message: 'Please enter a valid URL.'}),
    }),
  )
  .optional(),
}))

loading.value = false

const {handleSubmit, resetForm} = useForm({
  validationSchema: profileFormSchema,
  initialValues: {
    avatar: avatar_path.value,
    username: data?.username ?? user.value.user_metadata.user_name,
    email: user.value.email,
    bio: 'I own a computer.',
    urls: data?.website ? [{value: data.website}] : [],
  },
})

async function updateProfile(values: {
  username: string;
  email: string;
  bio: string;
  avatar?: string | undefined;
  urls?: { value: string; }[] | undefined;
}) {
  loading.value = true
  const updates = {
    id: user.value.id,
    username: values.username,
    website: values.urls?.[0]?.value,
    avatar_url: values.avatar,
    updated_at: new Date(),
  }
  console.log('Updating profile with:', updates)
  const {error} = await client.from('profiles').upsert(updates, {
    returning: 'minimal', // Don't return the value after inserting
  })
  if (error) {
    console.error('Error updating profile:', error)
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
      variant: 'destructive',
      action: h(ToastAction, {
        altText: 'Try again',
      }, {
        default: () => 'Try again',
      }),
    });
  } else {
    toast({
      title: 'You submitted the following values:',
      description: h('pre', {class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4'}, h('code', {class: 'text-white'}, JSON.stringify(values, null, 2))),
    })
  }
  loading.value = false
}

const onSubmit = handleSubmit(async (values) => {
  values.avatar = avatar_path.value
  console.log('Submitting form with values:', values)
  await updateProfile(values);
})

</script>

<template>
  <div>
    <h3 class="text-lg font-medium">
      Profile
    </h3>
    <p class="text-sm text-muted-foreground">
      This is how others will see you on the site.
    </p>
  </div>
  <Separator/>
  <form class="space-y-8" @submit="onSubmit">
    <ProfileAvatar
      v-model:path="avatar_path"
      size="lg"
                   :alt="`Avatar for ${user.user_metadata.full_name}`"
                   updatable
                   @upload="onSubmit"
    />
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" :placeholder="user.user_metadata.user_name" v-bind="componentField"/>
        </FormControl>
        <FormDescription>
          This is your public display name. It can be your real name or a pseudonym. You can only
          change this once every 30 days.
        </FormDescription>
        <FormMessage/>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select an email"/>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="email in verifiedEmails" :key="email" :value="email">
                {{ email }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormDescription>
          You can manage verified email addresses in your email settings.
        </FormDescription>
        <FormMessage/>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="bio">
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea placeholder="Tell us a little bit about yourself" v-bind="componentField"/>
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations to link to them.
        </FormDescription>
        <FormMessage/>
      </FormItem>
    </FormField>

    <div>
      <FieldArray v-slot="{ fields, push, remove }" name="urls">
        <div v-for="(field, index) in fields" :key="`urls-${field.key}`">
          <FormField v-slot="{ componentField }" :name="`urls[${index}].value`">
            <FormItem>
              <FormLabel :class="cn(index !== 0 && 'sr-only')">
                URLs
              </FormLabel>
              <FormDescription :class="cn(index !== 0 && 'sr-only')">
                Add links to your website, blog, or social media profiles.
              </FormDescription>
              <div class="relative flex items-center">
                <FormControl>
                  <Input type="url" v-bind="componentField"/>
                </FormControl>
                <button
type="button" class="absolute py-2 pe-3 end-0 text-muted-foreground"
                        @click="remove(index)">
                  <Cross1Icon class="w-3"/>
                </button>
              </div>
              <FormMessage/>
            </FormItem>
          </FormField>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          class="text-xs w-20 mt-2"
          @click="push({ value: '' })"
        >
          Add URL
        </Button>
      </FieldArray>
    </div>

    <div class="flex gap-2 justify-start">
      <Button
type="submit"
              :value="loading ? 'Loading ...' : 'Update profile'"
              :disabled="loading">
        Update profile
      </Button>

      <Button
        type="button"
        variant="outline"
        @click="resetForm"
      >
        Reset form
      </Button>
    </div>
  </form>
</template>
