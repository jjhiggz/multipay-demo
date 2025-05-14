<template>
  <div>
    <!-- Show when no recipients -->
    <div v-if="recipients.length === 0" class="flex flex-col justify-center items-center py-8">
      <div class="mb-4 text-gray-500">No recipients</div>
      <button
        @click="addRecipient"
        class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
      >
        Add Recipient
      </button>
    </div>

    <!-- Desktop Table Layout -->
    <div v-if="recipients.length > 0" class="hidden md:block">
      <table class="bg-white border border-gray-200 rounded-lg min-w-full">
        <thead>
          <tr>
            <th class="px-4 py-2 text-left">Recipient</th>
            <th class="px-4 py-2 text-left">Amount</th>
            <th class="px-4 py-2 text-left">Reason</th>
            <th class="px-4 py-2 text-left">Reference</th>
            <th class="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipient in recipients" :key="recipient.id" class="border-t">
            <td class="px-4 py-2">
              <div class="flex items-center">
                <span>{{ recipient.name }}</span>
              </div>
            </td>
            <td class="px-4 py-2">{{ recipient.amount }} USD</td>
            <td class="px-4 py-2">{{ recipient.reason }}</td>
            <td class="px-4 py-2 text-gray-400">Optional reference</td>
            <td class="px-4 py-2">
              <button
                class="text-red-500 hover:text-red-700"
                @click="removeRecipient(recipient.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center mt-4">
        <button
          @click="addRecipient"
          class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
        >
          Add Recipient
        </button>
      </div>
    </div>

    <!-- Mobile Collapsible Card Layout -->
    <div v-if="recipients.length > 0" class="md:hidden flex flex-col gap-4">
      <div
        v-for="recipient in recipients"
        :key="recipient.id"
        class="bg-white shadow-sm border border-gray-200 rounded-lg"
      >
        <button
          class="flex justify-between items-center px-4 py-3 focus:outline-none w-full"
          @click="toggleOpen(recipient.id)"
        >
          <span class="font-semibold">{{ recipient.name }}</span>
          <div class="flex">
            <span class="font-semibold">{{ recipient.amount }} USD</span>
            <Icon
              :icon="'carbon:chevron-down'"
              :class="{ 'transform rotate-180': openIds.includes(recipient.id) }"
              class="ml-2 w-5 h-5 transition-transform"
            />
          </div>
        </button>
        <div v-if="openIds.includes(recipient.id)" class="px-4 pb-4">
          <div class="mb-2">
            <label class="block font-medium text-gray-700 text-sm">Reason</label>
            <div class="mt-1">{{ recipient.reason }}</div>
          </div>
          <div class="mb-2">
            <label class="block font-medium text-gray-700 text-sm">Reference (Optional)</label>
            <div class="mt-1 text-gray-400">Optional reference</div>
          </div>
          <button
            class="flex justify-center items-center gap-2 bg-red-500 mt-2 py-2 rounded w-full text-white"
            @click="removeRecipient(recipient.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Remove Recipient
          </button>
        </div>
      </div>
      <div class="flex justify-center mt-4">
        <button
          @click="addRecipient"
          class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
        >
          Add Recipient
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

type Recipient = {
  id: number
  name: string
  amount: number
  reason: string
}

const recipients = ref<Recipient[]>([
  { id: 1, name: 'John Doe', amount: 100, reason: 'Payment' },
  { id: 2, name: 'Jane Smith', amount: 200, reason: 'Payment' },
  { id: 3, name: 'Robert Johnson', amount: 300, reason: 'Payment' },
])

const openIds = ref<number[]>([])

const toggleOpen = (id: number) =>
  (openIds.value = openIds.value.includes(id)
    ? openIds.value.filter((openId) => openId !== id)
    : [...openIds.value, id])

const addRecipient = () => {
  const nextId =
    recipients.value.length > 0 ? Math.max(...recipients.value.map((r) => r.id)) + 1 : 1
  recipients.value = [
    ...recipients.value,
    { id: nextId, name: `Recipient ${nextId}`, amount: 0, reason: '' },
  ]
}

const removeRecipient = (id: number) => {
  recipients.value = recipients.value.filter((r) => r.id !== id)
  openIds.value = openIds.value.filter((openId) => openId !== id)
}
</script>
