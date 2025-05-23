import { orpcVueQuery } from '@/services/orpcClient'
import { useMutation } from '@tanstack/vue-query'
import { computed, ref, watch, type ComputedRef } from 'vue'

export type UseCreateQuoteInput = {
  userCountry: string
  countryTo: string
  amount: number | null
  amountTo: number | null
  sellCcy: string
  buyCcy: string
  fixedCcy: string
  screen: string
  platformType: string
  shouldCalcAmountFrom: boolean
  promotionCodes: unknown[]
  deliveryMethod: string
}

const isQuoteInputValid = (input: UseCreateQuoteInput): [boolean, string[]] => {
  const reasons: string[] = []

  if (!(input.amount !== null && input.amount > 0)) {
    reasons.push('Amount must be greater than 0')
  }

  if (!(input.sellCcy && input.buyCcy)) {
    reasons.push('Both currencies must be selected')
  }

  if (!(input.userCountry && input.countryTo)) {
    reasons.push('Both countries must be selected')
  }

  if (!input.deliveryMethod) {
    reasons.push('Delivery method must be selected')
  }

  return [reasons.length === 0, reasons]
}

export const useCreateQuoteOnInputChange = (
  input: ComputedRef<UseCreateQuoteInput>,
) => {
  const options = computed(() => orpcVueQuery.postQuote.mutationOptions())
  const inputVal = computed(() => input.value)
  const createQuote = useMutation(options)

  const quoteId = ref<string | null>(null)

  watch(inputVal, () => {
    const result = isQuoteInputValid(inputVal.value)
    if (result[0]) {
      createQuote
        .mutateAsync({
          ...input.value,
          platflormType: 'Cheese',
        })
        .then((response) => {
          quoteId.value = response.quote.quoteId
        })
    } else {
      console.log('Quote input invalid:', result[1])
    }
  })

  return {
    quoteId,
    isLoading: createQuote.isPending,
  }
}
