<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Button from '@/components/ui/button/Button.vue'
import Switch from '@/components/ui/switch/Switch.vue'
import { Plus } from 'lucide-vue-next'
import TransferTable from './TransferTable.vue'
import AddRecipientModal from './AddRecipientModal.vue'
import TransferSummary from './TransferSummary.vue'
import { transferReasons } from '@/../../Money Transfer Table/data/transfer-reasons'
import { currencies } from '@/../../Money Transfer Table/data/currencies'
import { useRecipients } from '@/composables/useRecipients'
import { authClient } from '@/services/authClient'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'

const sendingCurrency = ref('USD')
const receivingCurrency = ref('EUR')
const isReceivingMode = ref(false)
const isAddModalOpen = ref(false)
const rows = ref<any[]>([])

const exchangeRate = 0.92

const activeOrg = authClient.useActiveOrganization()
const organizationId = computed(() => activeOrg.value?.data?.id ?? '')
const {
  recipients,
  isPending: isRecipientsLoading,
  error: recipientsError,
} = useRecipients(organizationId.value)

// Initialize rows when recipients load (first 5 as before)
watch(
  () => recipients.value,
  (newRecipients) => {
    if (rows.value.length === 0 && newRecipients.length > 0) {
      rows.value = newRecipients.slice(0, 5).map((recipient, index) => ({
        id: `row-${index}`,
        recipient,
        amount: 100 * (index + 1),
        currency: receivingCurrency.value,
        reason: 'Payment',
        reference: '',
      }))
    }
  },
  { immediate: true },
)

const addRecipient = (newRecipient: { recipient: any; reason: string; reference: string }) => {
  const newId = `row-${rows.value.length}`
  rows.value.push({
    id: newId,
    ...newRecipient,
    amount: 0,
    currency: isReceivingMode.value ? receivingCurrency.value : sendingCurrency.value,
  })
  isAddModalOpen.value = false
}

const deleteRow = (id: string) => {
  rows.value = rows.value.filter((row) => row.id !== id)
}

const updateRow = (id: string, field: string, value: any) => {
  rows.value = rows.value.map((row) => {
    if (row.id === id) {
      return { ...row, [field]: value }
    }
    return row
  })
}

const toggleCurrencyMode = (checked: boolean) => {
  isReceivingMode.value = checked
  rows.value = rows.value.map((row) => ({
    ...row,
    currency: checked ? receivingCurrency.value : sendingCurrency.value,
  }))
}

const totalSendingAmount = computed(() =>
  rows.value.reduce((sum, row) => {
    if (isReceivingMode.value) {
      return sum + row.amount / exchangeRate
    }
    return sum + row.amount
  }, 0),
)

const totalReceivingAmount = computed(() =>
  rows.value.reduce((sum, row) => {
    if (isReceivingMode.value) {
      return sum + row.amount
    }
    return sum + row.amount * exchangeRate
  }, 0),
)
</script>

<template>
  <div class="flex flex-col min-h-[calc(100vh-8rem)]">
    <Card class="flex-grow w-full">
      <CardHeader class="pb-3">
        <!-- Desktop view -->
        <div class="hidden md:flex justify-between items-center">
          <div class="flex md:flex-row flex-col md:items-end gap-6">
            <div class="space-y-2">
              <label for="sending-currency-desktop">Sending Currency</label>
              <Select v-model="sendingCurrency">
                <SelectTrigger id="sending-currency-desktop" class="w-[180px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="currency in currencies"
                    :key="currency.code"
                    :value="currency.code"
                  >
                    {{ currency.code }} - {{ currency.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <label for="receiving-currency-desktop">Receiving Currency</label>
              <Select v-model="receivingCurrency">
                <SelectTrigger id="receiving-currency-desktop" class="w-[180px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="currency in currencies"
                    :key="currency.code"
                    :value="currency.code"
                  >
                    {{ currency.code }} - {{ currency.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            @click="isAddModalOpen = true"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            <Plus class="mr-2 w-4 h-4" />
            Add Recipient
          </Button>
        </div>
        <!-- Mobile view - currencies in same row -->
        <div class="md:hidden">
          <div class="flex justify-between items-center mb-4">
            <div class="flex space-x-2">
              <div>
                <label for="sending-currency-mobile" class="block mb-1 text-xs">From</label>
                <Select v-model="sendingCurrency">
                  <SelectTrigger id="sending-currency-mobile" class="w-[90px]">
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="currency in currencies"
                      :key="currency.code"
                      :value="currency.code"
                    >
                      {{ currency.code }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label for="receiving-currency-mobile" class="block mb-1 text-xs">To</label>
                <Select v-model="receivingCurrency">
                  <SelectTrigger id="receiving-currency-mobile" class="w-[90px]">
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="currency in currencies"
                      :key="currency.code"
                      :value="currency.code"
                    >
                      {{ currency.code }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              @click="isAddModalOpen = true"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              <Plus class="mr-2 w-4 h-4" />
              Add
            </Button>
          </div>
        </div>
        <div class="flex items-center space-x-2 mt-4">
          <Switch
            :checked="isReceivingMode"
            @update:checked="toggleCurrencyMode"
            id="currency-mode"
          />
          <label for="currency-mode" class="text-sm">
            {{
              isReceivingMode
                ? 'Enter amounts in receiving currency'
                : 'Enter amounts in sending currency'
            }}
          </label>
        </div>
      </CardHeader>
      <CardContent>
        <template v-if="isRecipientsLoading">
          <div class="py-8 text-center">Loading recipients...</div>
        </template>
        <template v-else-if="recipientsError">
          <div class="py-8 text-red-500 text-center">Error loading recipients</div>
        </template>
        <template v-else>
          <TransferTable
            :rows="rows"
            :updateRow="updateRow"
            :deleteRow="deleteRow"
            :isReceivingMode="isReceivingMode"
            :sendingCurrency="sendingCurrency"
            :receivingCurrency="receivingCurrency"
            :recipients="recipients"
            :transferReasons="transferReasons"
          />
        </template>
      </CardContent>
    </Card>
    <TransferSummary
      :totalSendingAmount="totalSendingAmount"
      :totalReceivingAmount="totalReceivingAmount"
      :sendingCurrency="sendingCurrency"
      :receivingCurrency="receivingCurrency"
      :exchangeRate="exchangeRate"
    />
    <AddRecipientModal
      :open="isAddModalOpen"
      :onOpenChange="(val) => (isAddModalOpen = val)"
      :onAdd="addRecipient"
      :receivingCurrency="receivingCurrency"
      :recipients="recipients"
      :transferReasons="transferReasons"
    />
  </div>
</template>
