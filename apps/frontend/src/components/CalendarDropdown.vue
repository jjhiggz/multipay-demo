<template>
  <div class="relative" :class="rootClass" ref="rootRef">
    <button
      @click="toggleDropdown"
      type="button"
      class="relative bg-white shadow-sm py-2 pr-10 pl-3 rounded-md focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-300 ring-inset w-full text-gray-900 sm:text-sm text-left sm:leading-6 cursor-default"
    >
      <span class="block truncate">{{ formattedSelectedDate }}</span>
      <span class="right-0 absolute inset-y-0 flex items-center pr-2 pointer-events-none">
        <Icon icon="mdi:calendar" class="w-5 h-5 text-gray-400" />
      </span>
    </button>

    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="z-10 absolute bg-white ring-opacity-5 shadow-lg mt-1 py-1 rounded-md focus:outline-none ring-1 ring-black w-full min-w-60 max-h-60 overflow-auto sm:text-sm text-base"
      >
        <!-- Calendar Header -->
        <div class="flex justify-between items-center px-4 py-2">
          <button
            @click="prevMonth"
            type="button"
            class="hover:bg-gray-100 p-1 rounded-full focus:outline-none"
          >
            <Icon icon="mdi:chevron-left" class="w-5 h-5 text-gray-500" />
          </button>
          <div class="font-semibold text-sm">{{ monthYearLabel }}</div>
          <button
            @click="nextMonth"
            type="button"
            class="hover:bg-gray-100 p-1 rounded-full focus:outline-none"
          >
            <Icon icon="mdi:chevron-right" class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <!-- Days of Week -->
        <div class="gap-1 grid grid-cols-7 px-4 py-1 text-gray-500 text-xs text-center">
          <div v-for="day in weekDays" :key="day">{{ day }}</div>
        </div>

        <!-- Calendar Grid -->
        <div class="gap-1 grid grid-cols-7 px-4 py-1">
          <div v-for="day in daysInMonth" :key="day.date.toISOString()">
            <button
              v-if="modelValue"
              @click="selectDate(day.date)"
              type="button"
              :class="[
                'w-full text-center rounded py-1',
                day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                isSameDay(day.date, modelValue) ? 'bg-blue-500 text-white font-semibold' : '',
                !isSameDay(day.date, modelValue) && day.isToday
                  ? 'text-blue-600 font-semibold'
                  : '',
                !isSameDay(day.date, modelValue) && day.isCurrentMonth ? 'hover:bg-gray-100' : '',
                !day.isCurrentMonth ? 'cursor-not-allowed opacity-50' : '',
              ]"
              :disabled="!day.isCurrentMonth"
            >
              {{ day.date.getDate() }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
  isSameDay,
} from 'date-fns'

const props = defineProps<{ modelValue: Date | null; rootClass?: string }>()
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const currentDate = ref(props.modelValue || new Date()) // Start view from selected date or today
const rootRef = ref<HTMLElement | null>(null)
const rootWidth = ref(0)

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// --- Responsive Date Format ---
const dateFormat = computed(() => {
  // You can adjust the threshold as needed (e.g., 160px)
  return rootWidth.value < 160 ? 'MMM d' : 'MMMM d, yyyy'
})

const formattedSelectedDate = computed(() => {
  return props.modelValue ? format(props.modelValue, dateFormat.value) : 'Select a date'
})

const monthYearLabel = computed(() => format(currentDate.value, 'MMMM yyyy'))

const daysInMonth = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value))
  const end = endOfWeek(endOfMonth(currentDate.value))
  return eachDayOfInterval({ start, end }).map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, currentDate.value),
    isToday: isToday(date),
  }))
})

// --- Methods ---
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const prevMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1)
}

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1)
}

const selectDate = (date: Date) => {
  if (!isSameMonth(date, currentDate.value)) return // Only allow selecting dates in the current month view
  emit('update:modelValue', date)
  isOpen.value = false // Close dropdown after selection
}

// --- Watch root width for responsive formatting ---
let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  if (rootRef.value) {
    rootWidth.value = rootRef.value.offsetWidth
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        rootWidth.value = entry.contentRect.width
      }
    })
    resizeObserver.observe(rootRef.value)
  }
})
onBeforeUnmount(() => {
  if (resizeObserver && rootRef.value) {
    resizeObserver.unobserve(rootRef.value)
  }
})
</script>
