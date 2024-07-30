import {defineStore} from 'pinia'
import {type DateValue, getLocalTimeZone, today} from "@internationalized/date";
import type {DateRange} from "radix-vue";

export const useFiltersStore = defineStore('filterStore', () => {
  const localTimeZone = getLocalTimeZone()
  const todayDate = today(localTimeZone)
  const daysBefore = 300;
  const daysAfter = 65;
  const filtersDateRange = ref({
    start: todayDate.subtract({days: daysBefore}).toString(),
    end: todayDate.add({days: daysAfter}).toString(),
  })

  function updateValuesToFilterDateRange(newRange: DateRange) {
    filtersDateRange.value = {
      start: newRange?.start?.toString() || filtersDateRange.value.start,
      end: newRange?.end?.toString() || filtersDateRange.value.end,
    }
  }

  function updateStartDate(newStartDate: DateValue) {
    filtersDateRange.value.start = newStartDate?.toString()
  }

  return {updateValuesToFilterDateRange, updateStartDate, filtersDateRange}
})
