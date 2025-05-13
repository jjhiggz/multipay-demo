<template>
  <img
    v-if="flagSrc"
    :src="flagSrc"
    :alt="currencyCode + ' flag'"
    class="bg-gray-100 border border-gray-200 rounded-sm w-5 h-5 object-cover"
  />
  <span v-else class="inline-block bg-gray-200 border border-gray-200 rounded-sm w-5 h-5"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CurrencyCode } from '../constants/from-api/currency.constants'

const props = defineProps<{ currencyCode: CurrencyCode }>()

// Map currency codes to flag image paths in assets/flags
const flagMap: Record<CurrencyCode, string> = {
  USD: new URL('../assets/flags/usd.png', import.meta.url).href,
  EUR: new URL('../assets/flags/eur.png', import.meta.url).href,
  GBP: new URL('../assets/flags/gbp.png', import.meta.url).href,
  JPY: new URL('../assets/flags/jpy.png', import.meta.url).href,
  AUD: new URL('../assets/flags/aud.png', import.meta.url).href,
  CAD: new URL('../assets/flags/cad.png', import.meta.url).href,
  CHF: new URL('../assets/flags/chf.png', import.meta.url).href,
  CNY: new URL('../assets/flags/cny.png', import.meta.url).href,
  SEK: new URL('../assets/flags/sek.png', import.meta.url).href,
  NZD: new URL('../assets/flags/nzd.png', import.meta.url).href,
  AED: new URL('../assets/flags/aed.png', import.meta.url).href,
  ARS: new URL('../assets/flags/ars.png', import.meta.url).href,
  BDT: new URL('../assets/flags/bdt.png', import.meta.url).href,
  BGN: new URL('../assets/flags/bgn.png', import.meta.url).href,
  BRL: new URL('../assets/flags/brl.png', import.meta.url).href,
  CLP: new URL('../assets/flags/clp.png', import.meta.url).href,
  COP: new URL('../assets/flags/cop.png', import.meta.url).href,
  CZK: new URL('../assets/flags/czk.png', import.meta.url).href,
  DKK: new URL('../assets/flags/dkk.png', import.meta.url).href,
  GEL: new URL('../assets/flags/gel.png', import.meta.url).href,
  HKD: new URL('../assets/flags/hkd.png', import.meta.url).href,
  HRK: new URL('../assets/flags/hrk.png', import.meta.url).href,
  HUF: new URL('../assets/flags/huf.png', import.meta.url).href,
  IDR: new URL('../assets/flags/idr.png', import.meta.url).href,
  INR: new URL('../assets/flags/inr.png', import.meta.url).href,
  JMD: new URL('../assets/flags/jmd.png', import.meta.url).href,
  KES: new URL('../assets/flags/kes.png', import.meta.url).href,
  KRW: new URL('../assets/flags/krw.png', import.meta.url).href,
  LKR: new URL('../assets/flags/lkr.png', import.meta.url).href,
  MAD: new URL('../assets/flags/mad.png', import.meta.url).href,
  MXN: new URL('../assets/flags/mxn.png', import.meta.url).href,
  MYR: new URL('../assets/flags/myr.png', import.meta.url).href,
  NGN: new URL('../assets/flags/ngn.png', import.meta.url).href,
  NOK: new URL('../assets/flags/nok.png', import.meta.url).href,
  NPR: new URL('../assets/flags/npr.png', import.meta.url).href,
  PEN: new URL('../assets/flags/pen.png', import.meta.url).href,
  PHP: new URL('../assets/flags/php.png', import.meta.url).href,
  PKR: new URL('../assets/flags/pkr.png', import.meta.url).href,
  PLN: new URL('../assets/flags/pln.png', import.meta.url).href,
  RON: new URL('../assets/flags/ron.png', import.meta.url).href,
  RUB: new URL('../assets/flags/rub.png', import.meta.url).href,
  SAR: new URL('../assets/flags/sar.png', import.meta.url).href,
  SGD: new URL('../assets/flags/sgd.png', import.meta.url).href,
  THB: new URL('../assets/flags/thb.png', import.meta.url).href,
  TRY: new URL('../assets/flags/try.png', import.meta.url).href,
  UAH: new URL('../assets/flags/uah.png', import.meta.url).href,
  VND: new URL('../assets/flags/vnd.png', import.meta.url).href,
  ZAR: new URL('../assets/flags/zar.png', import.meta.url).href,
}

// ...add more as needed, following the pattern

const flagSrc = computed(() => flagMap[props.currencyCode] || flagMap['USD'])
</script>
