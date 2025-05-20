import { computed } from 'vue'
import { orpcVueQuery } from '@/services/orpcClient'
import { useMappedQuery } from '@/shared/lib/map-query'

type RawSystemFieldsReturn = {
  action: string
  actionValue: string
  configSettings: {
    logDisable: boolean
    logMinimumLevel: string
  }
  documents: {
    complaintsCharter: string
    complianceGuarantee: string
    consumerProtection: string
    cookieNoticeVersionAvailable: string
    documentLinks: {
      CC_XEMT_US: string
      CG_XEMT_US: string
      CN_XEMT: string
      CP_XEMT_US: string
      ERC_XEMT_US: string
      II_XEMT_US: string
      PAD_XEMT_US_PERSONAL: string
      PRIV_POLICY_XEMT_US: string
      XEMT_US_CONSUMER: string
    }
    errResolutionCancellationDisc: string
    importantInformation: string
    preAuthDebit: string
    privacyPolicyVersionAvailable: string
    termsAndConditionsVersionAvailable: string
  }
  featureToggle: {
    enableInterac: string
    enablePromotions: string
    enableXeSim: string
    inAppReviewsEnabled: string
    serviceMessaging: Array<{
      phoneCountry: string
      replyTo: string
    }>
  }
  formData: {
    additionalForm: {
      formFields: Array<{
        disabled: boolean
        id: string
        options: Array<{
          allowFreeText: boolean
          text: string
          value: string
          jsonContent?: string
        }>
        validators: unknown[]
      }>
      subtitles: unknown[]
    }
    customerProfileForm: {
      formFields: Array<{
        disabled: boolean
        id: string
        options: Array<{
          allowFreeText: boolean
          text: string
          value: string
          jsonContent?: string
        }>
        validators: unknown[]
      }>
      subtitles: unknown[]
    }
    moneyTransferCalculatorForm: {
      formFields: Array<{
        disabled: boolean
        id: string
        options: Array<{
          allowFreeText: boolean
          text: string
          value: string
          jsonContent?: string
        }>
        validators: unknown[]
        fallBack?: boolean
      }>
      subtitles: unknown[]
    }
    purposeOfPaymentForm: {
      formFields: Array<{
        disabled: boolean
        id: string
        options: Array<{
          allowFreeText: boolean
          text: string
          value: string
          jsonContent?: string
        }>
        validators: unknown[]
      }>
      subtitles: unknown[]
    }
    sourceOfFundsForm: {
      formFields: Array<{
        disabled: boolean
        id: string
        options: Array<{
          allowFreeText: boolean
          text: string
          value: string
          jsonContent?: string
        }>
        validators: unknown[]
      }>
      subtitles: unknown[]
    }
  }
  geoLocation: {
    countryCode: string
  }
}

export type FEReasonForTransfer = {
  text: string
  value: string
  allowFreeText: boolean
}

export type SystemFieldsReturn = {}

export function _mapRawSystemFieldsToReasons(
  input: RawSystemFieldsReturn,
): FEReasonForTransfer[] {
  return input.formData.purposeOfPaymentForm.formFields.flatMap((formField) =>
    formField.options.map((option) => ({
      text: option.text,
      value: option.value,
      allowFreeText: option.allowFreeText,
    })),
  )
}

export function useReasonsForTransfer() {
  const options = computed(() =>
    orpcVueQuery.getSystemFieldsRoute.queryOptions(),
  )

  return useMappedQuery(options, {
    mapData: _mapRawSystemFieldsToReasons,
  })
}
