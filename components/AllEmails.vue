<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type {RecentEmail} from "~/model/Stats";
import {onMounted} from "vue";

const props = defineProps<{ recentEmails: RecentEmail[] }>()
const emails = ref<RecentEmail[]>([])

onMounted(() => {
  emails.value = props.recentEmails
})
</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">
          Id
        </TableHead>
        <TableHead>Sender</TableHead>
        <TableHead>Email Alias</TableHead>
        <TableHead>Subject</TableHead>
        <TableHead>Summary</TableHead>
        <TableHead>Date</TableHead>
        <TableHead class="text-right">
          Status
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="email in emails" :key="email.id">
        <TableCell class="font-medium">
          {{ email.id }}
        </TableCell>
        <TableCell>{{ email.sender }}</TableCell>
        <TableCell>{{ email.to }}</TableCell>
        <TableCell>{{ email.subject }}</TableCell>
        <TableCell>{{ email.summary }}</TableCell>
        <TableCell>{{ email.date }}</TableCell>
        <TableCell class="text-right">
          {{ email.status }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
