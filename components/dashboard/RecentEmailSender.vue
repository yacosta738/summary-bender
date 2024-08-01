<script setup lang="ts">
import type {EmailCountBySender} from "~/model/Stats";
import { defineProps, ref, watchEffect } from 'vue';
import gravatarUrl from 'gravatar-url';

const props = defineProps<{ emailCountBySender: EmailCountBySender[] }>()

const { $getInitials } = useNuxtApp()
const nameInitials = (name: string): string => $getInitials(name);
interface ExtractedData {
  name: string;
  email: string;
}

const extractNameAndEmail = (input: string): ExtractedData | null => {
  const regex = /^(.*?)\s*<(.+?)>$/;
  const match = input.match(regex);
  if (match) {
    return {
      name: match[1].trim(),
      email: match[2].trim()
    };
  }
  return null;
};
const avatarUrl = (email:string): string => gravatarUrl(email, { size: 64 });
const senders = ref<{
  name: string;
  email: string;
  count: number;
  avatarUrl: string;
}[]>([]);

watchEffect(() => {
 senders.value =  props.emailCountBySender.map(item => {
    const extractedData = extractNameAndEmail(item.sender);
    return {
      name: extractedData?.name ?? item.sender,
      email: extractedData?.email ?? item.sender,
      count: item.count,
      avatarUrl: avatarUrl(extractedData?.email ?? item.sender)
    };
  })
})

</script>

<template>
  <div class="space-y-8">
    <div v-for="item in senders" :key="item.email" class="flex items-center">
      <Avatar class="h-9 w-9">
        <AvatarImage :src="item.avatarUrl" alt="Avatar" />
        <AvatarFallback>{{ nameInitials(item.name) }}</AvatarFallback>
      </Avatar>
      <div class="ml-4 space-y-1">
        <p class="text-sm font-medium leading-none">
          {{ item.name }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ item.email }}
        </p>
      </div>
      <div class="ml-auto font-medium">
        {{ item.count }}
      </div>
    </div>
  </div>
</template>
