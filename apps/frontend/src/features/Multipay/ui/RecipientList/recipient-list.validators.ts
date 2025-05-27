import type { FERecipient } from '../../domain/useRecipients'
import type {
  ValidatorFn,
  MultiPayRecipientContainer,
} from './recipient-list.types'

// Define RecipientFields locally for the structure of multipayRecipientValidators
// This must match the structure of MultiPayRecipientContainer['values']
type RecipientFields = MultiPayRecipientContainer['values']

export const multipayRecipientValidators: {
  [K in keyof RecipientFields]: ValidatorFn<RecipientFields[K]>
} = {
  recipient: (input: FERecipient | null) => {
    if (input === null) {
      return {
        isValid: false,
        reason: 'Please select recipient',
      }
    }
    return {
      isValid: !!input,
      reasons: null,
    }
  },
  amount: (input: number | null) => {
    if (typeof input !== 'number' || isNaN(input)) {
      return {
        isValid: false,
        reason: 'Please enter a valid amount',
      }
    }
    if (input <= 0) {
      return {
        isValid: false,
        reason: 'Amount must be greater than zero',
      }
    }
    return {
      isValid: true,
      reasons: null,
    }
  },
  reason: (input: string | null) => {
    if (typeof input !== 'string' || input.trim().length === 0) {
      return {
        isValid: false,
        reason: 'Please enter a reason',
      }
    }
    return {
      isValid: true,
      reasons: null,
    }
  },
  reference: (input: string | null) => {
    if (input !== null && typeof input !== 'string') {
      return {
        isValid: false,
        reason: 'Invalid reference format',
      }
    }
    return {
      isValid: true,
      reasons: null,
    }
  },
}
