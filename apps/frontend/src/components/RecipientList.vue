<template>
  <div>
    <div class="recipients-header">
      <span>Recipient</span>
      <span>Target currency</span>
      <span>Transfer amount</span>
      <span>Reason for transfer</span>
      <span>Reference</span>
    </div>
    <div class="recipient-row" v-for="(recipient, idx) in recipients" :key="recipient.id">
      <div class="recipient-info">
        <template v-if="editingRowIdx === idx">
          <select v-model="selectedRecipientIds[idx]" @change="onRecipientChange(idx)" @blur="editingRowIdx = null" autofocus>
            <option v-for="option in recipientOptions" :key="option.id" :value="option.id">
              {{ option.name }} ({{ option.country }} ••{{ option.last4 }})
            </option>
          </select>
        </template>
        <template v-else>
          <span class="recipient-clickable" @click="editingRowIdx = idx">
            {{ getRecipientDisplay(selectedRecipientIds[idx]) }}
          </span>
        </template>
      </div>
      <span class="currency">EUR</span>
      <input type="number" :value="recipient.amount" class="amount-input" readonly />
      <select class="reason-select">
        <option>Salary</option>
      </select>
      <input type="text" placeholder="Reference (optional)" class="reference-input" />
      <span class="reference-count">1 out of 2</span>
      <button class="delete-btn" title="Remove recipient">
        <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect width="20" height="20" rx="4" fill="#f3f3f3"/><path d="M7 7l6 6M13 7l-6 6" stroke="#888" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineProps<{
  recipients: Array<{ id: number, name: string, country: string, last4: string, amount: number }>,
  recipientOptions: Array<{ id: number, name: string, country: string, last4: string }>
}>()
const emit = defineEmits(['recipient-change'])

const props = defineProps()
const selectedRecipientIds = ref(props.recipients.map(r => r.id))
const editingRowIdx = ref<number|null>(null)

function getRecipientDisplay(id: number) {
  const found = props.recipientOptions.find(opt => opt.id === id)
  return found ? `${found.name} (${found.country} ••${found.last4})` : ''
}

function onRecipientChange(idx: number) {
  emit('recipient-change', { row: idx, newRecipientId: selectedRecipientIds.value[idx] })
  editingRowIdx.value = null
}
</script>

<style scoped>
.recipients-header, .recipient-row {
  display: grid;
  grid-template-columns: 2.5fr 1fr 1.5fr 2fr 2fr 1fr 0.5fr;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}
.recipients-header {
  font-weight: 600;
  color: #222;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}
.recipient-row {
  border-bottom: 1px solid #f3f3f3;
  background: #fff;
}
.recipient-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.recipient-clickable {
  cursor: pointer;
  color: #1976d2;
  font-weight: 600;
  border-radius: 5px;
  padding: 2px 6px;
  transition: background 0.15s;
}
.recipient-clickable:hover {
  background: #eaf3ff;
}
.currency {
  color: #222;
  font-weight: 500;
}
.amount-input, .reference-input {
  width: 90px;
  padding: 4px 8px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #f7f7f7;
  color: #222;
  font-size: 1em;
  font-weight: 500;
}
.reason-select {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #f7f7f7;
  color: #222;
  font-size: 1em;
  font-weight: 500;
}
.reference-count {
  color: #666;
  font-size: 0.97em;
}
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 