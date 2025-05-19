<script setup lang="ts">
import { ref, computed } from 'vue'
import Table from '@/components/ui/table/Table.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Card from '@/components/ui/card/Card.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import CurrencyInput from './CurrencyInput.vue'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-vue-next'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import Label from '@/components/ui/label/Label.vue'
import Collapsible from '@/components/ui/collapsible/Collapsible.vue'
import { CollapsibleContent } from '@/components/ui/collapsible'
import CollapsibleTrigger from '@/components/ui/collapsible/CollapsibleTrigger.vue'

const props = defineProps<{
  rows: any[]
  updateRow: (id: string, field: string, value: any) => void
  deleteRow: (id: string) => void
  isReceivingMode: boolean
  sendingCurrency: string
  receivingCurrency: string
  recipients: any[]
  transferReasons: string[]
}>()

const currency = computed(() =>
  props.isReceivingMode ? props.receivingCurrency : props.sendingCurrency,
)
const openItems = ref<Record<string, boolean>>({})
const toggleItem = (id: string) => {
  openItems.value[id] = !openItems.value[id]
}

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
  <!-- Desktop view -->
  <div class="hidden md:block border rounded-md">
    <Table class="[&_td]:py-1 [&_tr]:h-10">
      <TableHeader class="[&_tr]:h-9">
        <TableRow>
          <TableHead>Recipient</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead class="w-[80px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="rows.length === 0">
          <TableCell :colspan="5" class="h-24 text-center"> No recipients added. </TableCell>
        </TableRow>
        <TableRow v-for="row in rows" :key="row.id" class="h-10">
          <TableCell>
            <Select
              :value="row.recipient.id"
              @update:value="
                (value) => {
                  const selectedRecipient = recipients.find((r) => r.id === value)
                  if (selectedRecipient) {
                    updateRow(row.id, 'recipient', selectedRecipient)
                  }
                }
              "
            >
              <SelectTrigger class="w-full h-8">
                <SelectValue>{{ row.recipient.name }}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="recipient in recipients"
                  :key="recipient.id"
                  :value="recipient.id"
                >
                  {{ recipient.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>
            <CurrencyInput
              :value="row.amount"
              @update:value="(value) => updateRow(row.id, 'amount', value)"
              :currency="currency"
              class="h-8"
            />
          </TableCell>
          <TableCell>
            <Select
              :value="row.reason"
              @update:value="(value) => updateRow(row.id, 'reason', value)"
            >
              <SelectTrigger class="w-full h-8">
                <SelectValue>{{ row.reason }}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="reason in transferReasons" :key="reason" :value="reason">
                  {{ reason }}
                </SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>
            <Input
              :value="row.reference || ''"
              @update:value="(value) => updateRow(row.id, 'reference', value)"
              class="w-full h-8"
              placeholder="Optional reference"
            />
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="icon" @click="deleteRow(row.id)">
              <Trash2 class="w-4 h-4 text-destructive" />
              <span class="sr-only">Delete</span>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>

  <!-- Mobile view with collapsible rows -->
  <div class="md:hidden space-y-2">
    <div v-if="rows.length === 0" class="py-8 border rounded-md text-center">
      No recipients added.
    </div>
    <Card v-for="row in rows" :key="row.id" class="overflow-hidden">
      <Collapsible :open="openItems[row.id]" @update:open="() => toggleItem(row.id)">
        <div
          class="flex justify-between items-center p-4 cursor-pointer"
          @click="toggleItem(row.id)"
        >
          <div class="font-medium">{{ row.recipient.name }}</div>
          <div class="flex items-center">
            <div class="mr-2 font-medium">
              {{ getCurrencySymbol(currency) }}{{ formatAmountWithoutSymbol(row.amount) }}
              {{ currency }}
            </div>
            <CollapsibleTrigger as-child>
              <Button variant="ghost" size="sm" class="p-0 w-8 h-8">
                <ChevronUp v-if="openItems[row.id]" class="w-4 h-4" />
                <ChevronDown v-else class="w-4 h-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent>
          <CardContent class="space-y-3 px-4 pt-0 pb-4">
            <div class="space-y-1">
              <Label :for="`recipient-${row.id}`" class="text-muted-foreground text-xs">
                Recipient
              </Label>
              <Select
                :value="row.recipient.id"
                @update:value="
                  (value) => {
                    const selectedRecipient = recipients.find((r) => r.id === value)
                    if (selectedRecipient) {
                      updateRow(row.id, 'recipient', selectedRecipient)
                    }
                  }
                "
              >
                <SelectTrigger :id="`recipient-${row.id}`" class="w-full">
                  <SelectValue>{{ row.recipient.name }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="recipient in recipients"
                    :key="recipient.id"
                    :value="recipient.id"
                  >
                    {{ recipient.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-1">
              <Label :for="`amount-${row.id}`" class="text-muted-foreground text-xs">
                Amount
              </Label>
              <CurrencyInput
                :value="row.amount"
                @update:value="(value) => updateRow(row.id, 'amount', value)"
                :currency="currency"
              />
            </div>

            <div class="space-y-1">
              <Label :for="`reason-${row.id}`" class="text-muted-foreground text-xs">
                Reason
              </Label>
              <Select
                :value="row.reason"
                @update:value="(value) => updateRow(row.id, 'reason', value)"
              >
                <SelectTrigger :id="`reason-${row.id}`" class="w-full">
                  <SelectValue>{{ row.reason }}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="reason in transferReasons" :key="reason" :value="reason">
                    {{ reason }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-1">
              <Label :for="`reference-${row.id}`" class="text-muted-foreground text-xs">
                Reference (Optional)
              </Label>
              <Input
                :id="`reference-${row.id}`"
                :value="row.reference || ''"
                @update:value="(value) => updateRow(row.id, 'reference', value)"
                placeholder="Add a reference"
              />
            </div>

            <div class="pt-2">
              <Button variant="destructive" size="sm" class="w-full" @click="deleteRow(row.id)">
                <Trash2 class="mr-2 w-4 h-4" />
                Remove Recipient
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  </div>
</template>
