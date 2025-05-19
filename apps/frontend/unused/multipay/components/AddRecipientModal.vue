<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'
import DialogContent from '@/components/ui/dialog/DialogContent.vue'
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue'
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue'
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue'
import DialogFooter from '@/components/ui/dialog/DialogFooter.vue'
import Label from '@/components/ui/label/Label.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'

const props = defineProps<{
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (recipient: { recipient: any; reason: string; reference: string }) => void
  receivingCurrency: string
  recipients: any[]
  transferReasons: string[]
}>()

const selectedRecipientId = ref('')
const reason = ref(String(props.transferReasons[0] || ''))
const reference = ref('')

watch(
  () => props.open,
  (open) => {
    if (!open) {
      selectedRecipientId.value = ''
      reason.value = String(props.transferReasons[0] || '')
      reference.value = ''
    }
  },
)

const handleSubmit = () => {
  const selectedRecipient = props.recipients.find((r: any) => r.id === selectedRecipientId.value)
  if (!selectedRecipient) return
  props.onAdd({
    recipient: selectedRecipient,
    reason: String(reason.value),
    reference: reference.value,
  })
  // Reset form
  selectedRecipientId.value = ''
  reason.value = String(props.transferReasons[0] || '')
  reference.value = ''
  props.onOpenChange(false)
}
</script>

<template>
  <Dialog :open="open" @update:open="onOpenChange">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Recipient</DialogTitle>
        <DialogDescription>Add a new recipient to your money transfer.</DialogDescription>
      </DialogHeader>
      <div class="gap-4 grid py-4">
        <div class="gap-2 grid">
          <Label for="recipient">
            Recipient
            <span class="text-muted-foreground text-sm">({{ receivingCurrency }} recipients)</span>
          </Label>
          <Select v-model="selectedRecipientId">
            <SelectTrigger id="recipient">
              <SelectValue placeholder="Select recipient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="recipient in recipients" :key="recipient.id" :value="recipient.id">
                {{ recipient.name }} ({{ recipient.email }})
              </SelectItem>
            </SelectContent>
          </Select>
          <p class="text-muted-foreground text-xs">
            Only showing recipients who can receive {{ receivingCurrency }}
          </p>
        </div>
        <div class="gap-2 grid">
          <Label for="reason">Reason</Label>
          <Select v-model="reason">
            <SelectTrigger id="reason">
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="reason in transferReasons" :key="reason" :value="reason">
                {{ reason }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="gap-2 grid">
          <Label for="reference">Reference (Optional)</Label>
          <Input id="reference" v-model="reference" placeholder="Add a reference" />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="onOpenChange(false)"> Cancel </Button>
        <Button @click="handleSubmit" :disabled="!selectedRecipientId"> Add Recipient </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
