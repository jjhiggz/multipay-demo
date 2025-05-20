import { orpcVueQuery } from '@/services/orpcClient'
import { useMappedQuery } from '@/shared/lib/map-query'
import { useQuery } from '@tanstack/vue-query'

import { watch } from 'vue'
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
  const options = orpcVueQuery.getCurrencies.queryOptions()
  const { data: currencies, isPending: isLoading, error } = useQuery(options)
  // useMappedQuery(options, {
  //   mapData: (input) => input,
  // })

  watch(currencies, (newCurrencies) => {
    console.log('Currencies updated:', newCurrencies)
  })

  return {
    currencies,
    isLoading,
    error,
  }
}
