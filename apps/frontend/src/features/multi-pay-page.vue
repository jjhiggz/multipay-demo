<template>
  <div class="flex flex-col bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="flex justify-between items-center bg-white px-8 py-4 border-gray-200 border-b">
      <div class="flex items-center gap-4">
        <!-- Logo using imported SVG -->
        <img :src="logoUrl" alt="Logo" class="w-10 h-10" />
      </div>
      <ProfileDropdown />
    </header>

    <!-- Main Content -->
    <main class="flex flex-col flex-1 items-center px-4 py-8">
      <div class="bg-white shadow p-8 rounded-lg w-full max-w-5xl">
        <div class="flex justify-between items-center mb-8">
          <h1 class="font-semibold text-2xl">Send money to multiple recipients</h1>
          <button class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="gap-4 grid grid-cols-1 md:grid-cols-4 mb-8">
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Send on</label>
            <CalendarDropdown v-model="sendDate" />
          </div>
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Sending currency</label>
            <Dropdown
              v-model="sendingCurrency"
              :options="currencyOptions"
              variant="outline"
              class="w-96"
              menuClass="max-h-60 overflow-y-auto"
            />
          </div>
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Transfer amount currency</label>
            <select class="px-3 py-2 border rounded w-full">
              <option>Recipient's currency (USD)</option>
            </select>
          </div>
        </div>
        <!-- Recipients Table Placeholder -->
        <div class="mt-8">
          <!-- Table will go here -->
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import logoUrl from '../assets/logo.svg'
import CalendarDropdown from '../components/CalendarDropdown.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import Dropdown from '../components/Dropdown.vue'
import { VALID_CURRENCY_CODES } from '../constants/from-api/currency.constants'

const sendDate = ref<Date | null>(new Date())
const sendingCurrency = ref('USD')

const currencyOptions = computed(() =>
  VALID_CURRENCY_CODES.map((c) => ({ label: `${c.name} (${c.code})`, value: c.code })),
)
</script>
