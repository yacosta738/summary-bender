<script setup lang="ts">
import Overview from '@/components/dashboard/Overview.vue'
import DateRangePicker from '@/components/dashboard/DateRangePicker.vue'
import RecentEmailSender from '@/components/dashboard/RecentEmailSender.vue'
import AllEmails from "@/components/dashboard/AllEmails.vue";

import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger,} from '@/components/ui/tabs'
import AppNavbar from "@/components/dashboard/AppNavbar.vue";
import type {
  EmailCountByDay,
  EmailCountBySender,
  EmailCountByStatus,
  EmailSenderDomain,
  RecentEmail
} from "~/model/Stats";
import {EmailStatus} from "~/model/Email";
import {useFiltersStore} from "~/store/dateRange";
import {storeToRefs} from "pinia";
import {toast} from "~/components/ui/toast";


const stats = reactive({
  emailCountByStatus: [] as EmailCountByStatus[],
  emailCountBySender: [] as EmailCountBySender[],
  recentEmails: [] as RecentEmail[],
  emailCountByDay: [] as EmailCountByDay[],
  emailSenderDomains: [] as EmailSenderDomain[],
});

const emailStatusCounts = computed(() => {
  const counts = {
    [EmailStatus.SENT]: 0,
    [EmailStatus.UNPROCESSED]: 0,
    [EmailStatus.PROCESSED]: 0,
    [EmailStatus.SUMMARIZED]: 0,
    [EmailStatus.ERROR]: 0,
  };

  stats.emailCountByStatus.forEach(item => {
    counts[item.status] = item.count;
  });

  return counts;
});
const totalEmails = computed(() => {
  return Object.values(emailStatusCounts.value).reduce((acc, count) => acc + count, 0);
});

const filtersStore = useFiltersStore()
const { filtersDateRange } = storeToRefs(filtersStore)

async function fetchStats() {
  const statsResponse = await $fetch(`/api/stats?startDate=${filtersDateRange.value.start}&endDate=${filtersDateRange.value.end}`);
  stats.emailCountByDay = statsResponse.emailCountByDay
  stats.emailCountBySender = statsResponse.emailCountBySender
  stats.emailCountByStatus = statsResponse.emailCountByStatus
  stats.emailSenderDomains = statsResponse.emailSenderDomains
  stats.recentEmails = statsResponse.recentEmails
}
const applyFilter = async () => {
  fetchStats().then(() => {
    toast({
      title: 'Filter Applied',
      description: 'Data has been updated based on the selected date range.',
    })
  }).catch((error) => {
    console.error("Error fetching stats", error)
    toast({
      title: 'Error fetching stats',
      description: 'An error occurred while fetching stats. Please try again later.'
    })
  })
}

onMounted(async () => {
  await fetchStats();
})

const percentage = (value: number, total: number) => {
  if (total === 0) {
    return 0;
  }
  return Math.round((value / total) * 100);
}

watch(filtersDateRange, (_) => {
  fetchStats()
})
</script>

<template>
  <div class="hidden flex-col md:flex">
    <AppNavbar/>
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">
          Dashboard
        </h2>
        <div class="flex items-center space-x-2">
          <DateRangePicker/>
          <Button @click="applyFilter">Apply Filter</Button>
        </div>
      </div>
      <Tabs default-value="overview" class="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="recent-emails">
            Recent Emails
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  UNPROCESSED
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">
                  {{ emailStatusCounts[EmailStatus.UNPROCESSED] }}
                </div>
                <p class="text-xs text-muted-foreground">
                  Unprocessed emails this month are {{ percentage(emailStatusCounts[EmailStatus.UNPROCESSED], totalEmails) }}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  SUMMARIZED
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">
                  {{ emailStatusCounts[EmailStatus.SUMMARIZED] }}
                </div>
                <p class="text-xs text-muted-foreground">
                  Summarized emails this month are {{ percentage(emailStatusCounts[EmailStatus.SUMMARIZED], totalEmails) }}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  PROCESSED
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"/>
                  <path d="M2 10h20"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">
                  {{ emailStatusCounts[EmailStatus.PROCESSED] }}
                </div>
                <p class="text-xs text-muted-foreground">
                  Emails processed this month are {{ percentage(emailStatusCounts[EmailStatus.PROCESSED], totalEmails) }}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                  SENT
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  class="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">
                  {{ emailStatusCounts[EmailStatus.SENT] }}
                </div>
                <p class="text-xs text-muted-foreground">
                  Emails sent this month are {{ percentage(emailStatusCounts[EmailStatus.SENT], totalEmails) }}%
                </p>
              </CardContent>
            </Card>
          </div>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent class="pl-2">
                <Overview :email-count-by-day="stats.emailCountByDay"/>
              </CardContent>
            </Card>
            <Card class="col-span-3">
              <CardHeader>
                <CardTitle>Recent Email Sender</CardTitle>
                <CardDescription>
                  Top 6 email senders this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentEmailSender :email-count-by-sender="stats.emailCountBySender" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="recent-emails" class="space-y-4">
          <AllEmails :recent-emails="stats.recentEmails"/>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
