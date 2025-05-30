<template>
  <div
    :class="[
      'inline-flex items-center justify-center rounded-full overflow-hidden',
      'w-6 h-6'
    ]"
  >
    <Icon
      :icon="`circle-flags:${countryCode}`"
      :width="23"
      :height="23"
      class="p-0.5"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import type { CurrencyCode } from '../constants/from-api/currency.constants'

const props = defineProps<{ currencyCode: CurrencyCode }>()

const countryCode = computed(() => {
  // Map currency codes to their corresponding country codes for circle-flags
  const currencyToCountryMap: Record<CurrencyCode, string> = {
    USD: 'us',
    EUR: 'eu',
    GBP: 'gb',
    JPY: 'jp',
    AUD: 'au',
    CAD: 'ca',
    CHF: 'ch',
    CNY: 'cn',
    SEK: 'se',
    NZD: 'nz',
    AED: 'ae',
    ARS: 'ar',
    BDT: 'bd',
    BGN: 'bg',
    BRL: 'br',
    CLP: 'cl',
    COP: 'co',
    CZK: 'cz',
    DKK: 'dk',
    GEL: 'ge',
    HKD: 'hk',
    HRK: 'hr',
    HUF: 'hu',
    IDR: 'id',
    INR: 'in',
    JMD: 'jm',
    KES: 'ke',
    KRW: 'kr',
    LKR: 'lk',
    MAD: 'ma',
    MXN: 'mx',
    MYR: 'my',
    NGN: 'ng',
    NOK: 'no',
    NPR: 'np',
    PEN: 'pe',
    PHP: 'ph',
    PKR: 'pk',
    PLN: 'pl',
    RON: 'ro',
    RUB: 'ru',
    SAR: 'sa',
    SGD: 'sg',
    THB: 'th',
    TRY: 'tr',
    UAH: 'ua',
    VND: 'vn',
    ZAR: 'za',
  }
  
  return currencyToCountryMap[props.currencyCode] || 'us'
})
</script>
