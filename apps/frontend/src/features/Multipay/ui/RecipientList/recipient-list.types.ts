import type { FERecipient } from '../../domain/useRecipients'

export type MultipayRecipientValues = {
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
