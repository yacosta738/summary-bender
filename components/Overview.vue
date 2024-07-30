<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'
import { DateFormatter } from '@internationalized/date'
import { ref, watchEffect } from 'vue'
import type { EmailCountByDay } from "~/model/Stats";

const props = defineProps<{ emailCountByDay: EmailCountByDay[] }>()

const allData = ref<Record<string, any>[]>([])
const dateFormatter = new DateFormatter('en-US', { month: 'short' })

const getMonthName = (dateString: string) => {
  try {
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return dateFormatter.format(date)
    } else {
      console.error("Invalid date:", dateString)
      return ""
    }
  } catch (error) {
    console.error("Error formatting date:", error)
    return ""
  }
}

watchEffect(() => {

  const monthlyData = props.emailCountByDay.reduce((acc, { emailDate, count }) => {
    const monthName = getMonthName(emailDate)
    if (monthName) {
      if (!acc[monthName]) {
        acc[monthName] = { name: monthName, total: 0 }
      }
      acc[monthName].total += count
    }
    return acc
  }, {} as Record<string, { name: string, total: number }>)

  allData.value = Object.values(monthlyData)
})
</script>

<template>
  <BarChart :data="allData" :categories="['total']" :index="'name'" :rounded-corners="4" />
</template>
