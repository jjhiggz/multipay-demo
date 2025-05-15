import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { orpcVueQuery } from '@/services/orpcClient'

export type Currency = {
  amountPrecision: number
  isoCode: string
  name: string
  canBuy: boolean
  canSell: boolean
  sameCurrencySupported: boolean
  marketOrderEnabled: boolean
}

export function useCurrencies() {
  const options = orpcVueQuery.currencies.queryOptions()
  const { data: currencies, isPending: isLoading, error } = useQuery(options)

  return {
    currencies,
    isLoading,
    error,
  }
}
