import type { FERecipient } from '../../domain/useRecipients'
/**
 * Represents a single recipient row/card in the multipay recipient list.
 * Each container tracks:
 * - index: unique identifier for the row/card
 * - values: current input values for recipient, amount, reason, and reference
 * - state: focus tracking for each field (whether it has been focused and unfocused)
 */

// RecipientFields is now internal to this file
export type RecipientFields = {
  recipient: FERecipient | null
  amount: number | null
  reason: string | null
  reference: string | null
}

export type MultiPayRecipientContainer = {
  index: number
  values: RecipientFields // Still uses the internal RecipientFields type
  state: {
    hasEnteredFocus: boolean
    hasLeftFocus: boolean
    byField: Record<
      keyof RecipientFields,
      {
        hasEnteredFocus: boolean
        hasLeftFocus: boolean
      }
    >
  }
}

export type MultipayRecipientValidations = {
  recipientErrors: string[]
  fieldErrors: Record<keyof RecipientFields, string[]>
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
