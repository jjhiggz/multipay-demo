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
          <h1 class="font-semibold text-2xl">Multiple Recipients</h1>
          <button class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="gap-4 grid grid-cols-1 md:grid-cols-4 mb-8">
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Send on</label>
            <CalendarDropdown v-model="sendDate" class="w-28 sm:w-full" />
          </div>
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Sending currency</label>
            <CurrencyDropdown
              :selected="sendingCurrency"
              @selected="onSendingCurrencySelected"
              class="w-28 sm:w-full"
            />
          </div>
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Recieving currency</label>
            <CurrencyDropdown
              :selected="recievingCurrency"
              @selected="onRecievingCurrencySelected"
              class="w-28 sm:w-full"
            />
          </div>
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Recipient</label>
            <RecipientDropdown />
          </div>
          <div class="flex items-center gap-2">
            <ToggleButton
              :model-value="mode === 'send-currency'"
              @update:model-value="toggleSendCurrency"
            />
            <p>{{ toggleMessage }}</p>
          </div>
        </div>
        <!-- Recipients Table Placeholder -->
        <div class="mt-8">
          <!-- Table will go here -->
          <DropdownMenuDemo />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import logoUrl from '../assets/logo.svg'
import CalendarDropdown from '../components/CalendarDropdown.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import CurrencyDropdown, { type CurrencyDropdownOption } from '../components/CurrencyDropdown.vue'
import RecipientDropdown from '../components/RecipientDropdown.vue'
import ToggleButton from '@/components/ToggleButton.vue'

const mode = ref<'send-currency' | 'recieving-currency'>('send-currency')
const toggleSendCurrency = () => {
  mode.value = mode.value === 'send-currency' ? 'recieving-currency' : 'send-currency'
}
const toggleMessage = computed(() =>
  mode.value === 'send-currency'
    ? 'Distribute via send currency'
    : 'Distribute via recieve currency',
)

const sendDate = ref<Date | null>(new Date())
const sendingCurrency = ref<CurrencyDropdownOption | null>(null)
const recievingCurrency = ref<CurrencyDropdownOption | null>(null)
const onSendingCurrencySelected = (val: CurrencyDropdownOption | null) =>
  (sendingCurrency.value = val)
const onRecievingCurrencySelected = (val: CurrencyDropdownOption | null) =>
  (recievingCurrency.value = val)
</script>
