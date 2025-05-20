import { orpcVueQuery } from '@/services/orpcClient'
import { useMappedQuery } from '@/shared/lib/map-query'
import { computed } from 'vue'

export type FECurrency = {
  amountPrecision: number
  isoCode: string
  name: string
  canBuy: boolean
  canSell: boolean
  sameCurrencySupported: boolean
  marketOrderEnabled: boolean
}

export function useCurrencies() {
  const options = computed(() => orpcVueQuery.getCurrencies.queryOptions())
  return useMappedQuery(options, {
    mapData: (input): FECurrency[] => input,
  })
}
