import {
  countryCodes,
  type CountryCode,
} from '@/constants/from-api/country.constants'
import { orpcVueQuery } from '@/services/orpcClient'
import { useMappedQuery } from '@/shared/lib/map-query'
import { computed, type ComputedRef, type Ref } from 'vue'
import z from 'zod'

export type RawQuoteResponse = {
  quote: {
    buyCcy: string
    sellCcy: string
    fixedCcy: string
    baseCcy: string
    quoteId: string
    // TODO: Maybe we should look at this and refine this in the future
    quoteStatus: string
    deliveryMethod: string
    // float
    fixedAmountInUsd: number
    countryTo: CountryCode
    individualQuotes: Array<{
      settlementMethod: string
      deliveryMethod: string
      commissionProvider: string
      isDefault: boolean
      isEnabled: boolean
      nonFixedAmount: string
      fixedAmount: string
      sellAmount: string
      buyAmount: string
      rate: number
      inverseRate: number
      totalCostAmount: string
      liquidityManager: string
      valueDate: string
      balanceDate: string
      transferFee: string
      paymentMethodFee: string
      paymentMethodMarginFee: string
      paymentMethodMarginAdjustment: number
      leadTime: string
      paymentAmountRounded: boolean
    }>
    offeredDeliveryMethods: Array<{
      method: string
      isEnabled: boolean
      cashOpenPaymentAvailable: boolean
    }>
    infoMessages: unknown
    warnMessages: unknown
    errorMessages: unknown
    expiryTimeMillis: number
    availableSettlementProxies: Array<unknown>
    provideRecipientLater: boolean
  }
  warning: string
}

export const feQuoteSchema = z.object({
  buyCcy: z.string(),
  sellCcy: z.string(),
  fixedCcy: z.string(),
  baseCcy: z.string(),
  quoteId: z.string(),
  // TODO: Maybe we should look at this and refine this in the future
  quoteStatus: z.string(),
  deliveryMethod: z.string(),
  // float
  fixedAmountInUsd: z.number(),
  countryTo: z.enum(countryCodes as [CountryCode]),
  individualQuotes: z.array(
    z.object({
      settlementMethod: z.string(),
      deliveryMethod: z.string(),
      commissionProvider: z.string(),
      isDefault: z.boolean(),
      isEnabled: z.boolean(),
      nonFixedAmount: z.string(),
      fixedAmount: z.string(),
      sellAmount: z.string(),
      buyAmount: z.string(),
      rate: z.number(),
      inverseRate: z.number(),
      totalCostAmount: z.string(),
      liquidityManager: z.string(),
      valueDate: z.string(),
      balanceDate: z.string(),
      transferFee: z.string(),
      paymentMethodFee: z.string(),
      paymentMethodMarginFee: z.string(),
      paymentMethodMarginAdjustment: z.number(),
      leadTime: z.string(),
      paymentAmountRounded: z.boolean(),
    }),
  ),
  offeredDeliveryMethods: z.array(
    z.object({
      method: z.string(),
      isEnabled: z.boolean(),
      cashOpenPaymentAvailable: z.boolean(),
    }),
  ),
  infoMessages: z.unknown(),
  warnMessages: z.unknown(),
  errorMessages: z.unknown(),
  expiryTimeMillis: z.number(),
  availableSettlementProxies: z.array(z.unknown()),
  provideRecipientLater: z.boolean(),
})

export type FrontendQuote = z.infer<typeof feQuoteSchema>

export type FEQuote = z.infer<typeof feQuoteSchema>

export type RawQuote = {}

export const rawQuoteToFEQuote = (cheese: Ref<FEQuote>): FEQuote => {
  return cheese.value
}

export const useGetQuote = (quoteId: Ref<string | null>) => {
  const options = computed(() =>
    orpcVueQuery.getQuote.queryOptions({
      input: {
        quoteId: quoteId.value ?? '',
        refreshPaymentMethods: true,
      },
      enabled: !!quoteId.value,
    }),
  )

  const query = useMappedQuery(options, {
    mapData: (input): FEQuote => feQuoteSchema.parse(input.quote),
  })

  return {
    ...query,
    data: query.data as ComputedRef<FEQuote | undefined>,
    isLoading: query.isLoading as Ref<boolean>,
  }
}
