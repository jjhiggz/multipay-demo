<template>
  <div class="fullpage-bg">
    <div class="multi-pay-container">
      <header class="header">
        <h1>Send money to multiple recipients</h1>
        <div class="actions-row">
          <select>
            <option>Immediately</option>
          </select>
          <select>
            <option>US Dollar (USD)</option>
          </select>
          <select>
            <option>Recipient's currency (EUR)</option>
          </select>
        </div>
      </header>
      <section class="recipients-list">
        <div class="recipients-header">
          <span>Recipient</span>
          <span>Target currency</span>
          <span>Transfer amount</span>
          <span>Reason for transfer</span>
          <span>Reference</span>
        </div>
        <div class="recipient-row" v-for="recipient in recipients" :key="recipient.id">
          <div class="recipient-info">
            <span class="avatar">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="14" fill="#1976d2"/>
                <text x="50%" y="55%" text-anchor="middle" fill="#fff" font-size="14" font-family="Arial" dy=".3em">🇪🇺</text>
              </svg>
            </span>
            <div>
              <div class="name">{{ recipient.name }}</div>
              <div class="details">{{ recipient.country }} ••{{ recipient.last4 }}</div>
            </div>
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
        <button class="add-btn">+ Add more recipients</button>
      </section>
      <footer class="summary-footer">
        <span class="footer-info">Rate: 1 USD = 0.90807 EUR</span>
        <span class="footer-info">Fees: 25 USD</span>
        <span class="footer-info">Total cost: 9,187.42 USD</span>
        <button class="continue-btn">Continue to payment</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const recipients = [
  { id: 1, name: 'Johann Müller', country: 'Germany', last4: '4343', amount: 1800 },
  { id: 2, name: 'Luca Moretti', country: 'Germany', last4: '9521', amount: 1500 },
  { id: 3, name: 'Clara Müller', country: 'Germany', last4: '0716', amount: 2500 },
  { id: 4, name: 'Olivier Dupont', country: 'Germany', last4: '9521', amount: 1500 },
  { id: 5, name: 'Mila Petrov', country: 'Germany', last4: '9521', amount: 1500 },
]
</script>

<style scoped>
.fullpage-bg {
  min-height: 100vh;
  width: 100vw;
  background: #f4f6fa;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.multi-pay-container {
  width: 100%;
  max-width: 1100px;
  margin: 48px 0 32px 0;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 32px 40px;
  font-family: 'Inter', sans-serif;
}
.header h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: #222;
  letter-spacing: -1px;
}
.actions-row {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}
.actions-row select {
  background: #f7f7f7;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 1em;
  color: #222;
  font-weight: 500;
}
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
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e6f0fa;
  margin-right: 8px;
}
.name {
  font-weight: 600;
  color: #222;
}
.details {
  font-size: 0.97em;
  color: #666;
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
.amount-input[readonly] {
  background: #f7f7f7;
  color: #222;
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
.add-btn {
  margin: 18px 0 0 0;
  background: #eaf3ff;
  color: #1976d2;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #d2e6ff;
}
.summary-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  padding-top: 18px;
  border-top: 1px solid #e5e7eb;
  font-size: 1.1em;
  background: #fff;
}
.footer-info {
  color: #222;
  font-weight: 500;
}
.continue-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 32px;
  font-size: 1.1em;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}
.continue-btn:hover {
  background: #1256a3;
}
</style> 