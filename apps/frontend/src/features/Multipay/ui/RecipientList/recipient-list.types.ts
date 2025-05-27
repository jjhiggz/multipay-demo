import type { FERecipient } from '../../domain/useRecipients'

export type MultiPayRecipientContainer = {
  index: number
  values: RecipientFields
  state: Record<
    keyof RecipientFields,
    {
      hasEnteredFocus: boolean
      hasLeftFocus: boolean
    }
  >
}

export type RecipientFields = {
  recipient: FERecipient | null
  amount: number | null
  reason: string | null
  reference: string | null
}

export type ValidatorFn<T> = (input: T) =>
  | {
      isValid: true
      reasons: null
    }
  | {
      isValid: false
      reason: string
    }
