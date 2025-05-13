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
const flagMap: Record<string, string> = {
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
  // ...add more as needed, following the pattern
}

const flagSrc = computed(() => flagMap[props.currencyCode] || flagMap['USD'])
</script>
