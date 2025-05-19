<script setup lang="ts">
import { computed } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import Button from '@/components/ui/button/Button.vue'
import { ArrowRight } from 'lucide-vue-next'

const props = defineProps<{
  totalSendingAmount: number
  totalReceivingAmount: number
  sendingCurrency: string
  receivingCurrency: string
  exchangeRate: number
}>()

const fee = computed(() => props.totalSendingAmount * 0.01)
const totalToPay = computed(() => props.totalSendingAmount + fee.value)

const formatAmountWithoutSymbol = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

const getCurrencySymbol = (currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  })
    .format(0)
    .replace(/[0-9.,]/g, '')
    .trim()
}
</script>

<template>
  <Card class="bottom-0 z-10 sticky shadow-lg mt-4 border-t w-full">
    <CardContent class="p-4">
      <!-- Desktop view - 5 columns -->
      <div class="hidden md:gap-4 md:grid md:grid-cols-5">
        <!-- Column 1: Total to send -->
        <div>
          <div class="font-medium text-muted-foreground text-sm">Total to send</div>
          <div class="font-bold text-xl">
            {{ getCurrencySymbol(props.sendingCurrency) }}
            {{ formatAmountWithoutSymbol(props.totalSendingAmount) }} {{ props.sendingCurrency }}
          </div>
        </div>

        <!-- Column 2: Exchange rate -->
        <div>
          <div class="font-medium text-muted-foreground text-sm">Exchange rate</div>
          <div class="font-medium text-lg">
            1 {{ props.sendingCurrency }} = {{ props.exchangeRate }} {{ props.receivingCurrency }}
          </div>
        </div>

        <!-- Column 3: Recipients will receive -->
        <div>
          <div class="font-medium text-muted-foreground text-sm">Recipients will receive</div>
          <div class="font-bold text-xl">
            {{ getCurrencySymbol(props.receivingCurrency) }}
            {{ formatAmountWithoutSymbol(props.totalReceivingAmount) }}
            {{ props.receivingCurrency }}
          </div>
        </div>

        <!-- Column 4: Total to pay with fee -->
        <div>
          <div class="font-medium text-muted-foreground text-sm">Total to pay</div>
          <div class="font-bold text-xl">
            {{ getCurrencySymbol(props.sendingCurrency) }}
            {{ formatAmountWithoutSymbol(totalToPay) }} {{ props.sendingCurrency }}
          </div>
          <div class="mt-1 text-muted-foreground text-sm">
            Includes fee: {{ getCurrencySymbol(props.sendingCurrency) }}
            {{ formatAmountWithoutSymbol(fee) }} {{ props.sendingCurrency }}
          </div>
        </div>

        <!-- Column 5: Continue button -->
        <div class="flex justify-center items-center">
          <Button class="w-full" size="lg">
            Continue
            <ArrowRight class="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

      <!-- Mobile view - stacked with label and value on same row -->
      <div class="md:hidden flex flex-col space-y-3">
        <!-- Total to send -->
        <div>
          <div class="flex justify-between items-center">
            <div class="text-muted-foreground text-sm">Total to send</div>
            <div class="font-medium text-sm">
              {{ getCurrencySymbol(props.sendingCurrency) }}
              {{ formatAmountWithoutSymbol(props.totalSendingAmount) }} {{ props.sendingCurrency }}
            </div>
          </div>
        </div>

        <!-- Exchange rate -->
        <div>
          <div class="flex justify-between items-center">
            <div class="text-muted-foreground text-sm">Exchange rate</div>
            <div class="font-medium text-sm">
              1 {{ props.sendingCurrency }} = {{ props.exchangeRate }} {{ props.receivingCurrency }}
            </div>
          </div>
        </div>

        <!-- Recipients will receive -->
        <div>
          <div class="flex justify-between items-center">
            <div class="text-muted-foreground text-sm">Recipients will receive</div>
            <div class="font-medium text-sm">
              {{ getCurrencySymbol(props.receivingCurrency) }}
              {{ formatAmountWithoutSymbol(props.totalReceivingAmount) }}
              {{ props.receivingCurrency }}
            </div>
          </div>
        </div>

        <!-- Total to pay -->
        <div>
          <div class="flex justify-between items-center">
            <div class="text-muted-foreground text-sm">Total to pay</div>
            <div class="font-medium text-sm">
              {{ getCurrencySymbol(props.sendingCurrency) }}
              {{ formatAmountWithoutSymbol(totalToPay) }} {{ props.sendingCurrency }}
            </div>
          </div>
          <div class="flex justify-between items-center mt-1">
            <div class="text-muted-foreground text-xs">Includes fee:</div>
            <div class="text-muted-foreground text-xs">
              {{ getCurrencySymbol(props.sendingCurrency) }}
              {{ formatAmountWithoutSymbol(fee) }} {{ props.sendingCurrency }}
            </div>
          </div>
        </div>

        <!-- Continue button -->
        <Button class="mt-2 w-full" size="lg">
          Continue
          <ArrowRight class="ml-2 w-4 h-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
