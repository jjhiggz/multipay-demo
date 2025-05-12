<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      type="button"
      class="relative bg-white shadow-sm py-2 pr-10 pl-3 rounded-md focus:outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 ring-inset w-full text-gray-900 sm:text-sm text-left sm:leading-6 cursor-default"
    >
      <span class="block truncate">{{ formattedSelectedDate }}</span>
      <span class="right-0 absolute inset-y-0 flex items-center pr-2 pointer-events-none">
        <svg
          class="w-5 h-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V3.75A.75.75 0 0110 3zm-3.25 9.5a.75.75 0 010 1.5h6.5a.75.75 0 010-1.5h-6.5z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M5.22 14.28a.75.75 0 001.06 0l7.5-7.5a.75.75 0 10-1.06-1.06L6.28 13.22a.75.75 0 000 1.06z"
            clip-rule="evenodd"
            transform="rotate(45 10 10)"
          />
        </svg>
      </span>
    </button>

    <transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="z-10 absolute bg-white ring-opacity-5 shadow-lg mt-1 py-1 rounded-md focus:outline-none ring-1 ring-black w-full max-h-60 overflow-auto sm:text-sm text-base"
      >
        <!-- Calendar Header -->
        <div class="flex justify-between items-center px-4 py-2">
          <button
            @click="prevMonth"
            type="button"
            class="hover:bg-gray-100 p-1 rounded-full focus:outline-none"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div class="font-semibold text-sm">{{ monthYearLabel }}</div>
          <button
            @click="nextMonth"
            type="button"
            class="hover:bg-gray-100 p-1 rounded-full focus:outline-none"
          >
            <svg
              class="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
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
              @click="selectDate(day.date)"
              type="button"
              :class="[
                'w-full text-center rounded py-1',
                day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                isSameDay(day.date, modelValue) ? 'bg-indigo-600 text-white font-semibold' : '',
                !isSameDay(day.date, modelValue) && day.isToday
                  ? 'text-indigo-600 font-semibold'
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
import { ref, computed } from 'vue'
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

const props = defineProps<{ modelValue: Date | null }>()
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const currentDate = ref(props.modelValue || new Date()) // Start view from selected date or today

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// --- Computed Properties ---
const monthYearLabel = computed(() => format(currentDate.value, 'MMMM yyyy'))

const formattedSelectedDate = computed(() => {
  return props.modelValue ? format(props.modelValue, 'MMMM d, yyyy') : 'Select a date'
})

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
</script>
