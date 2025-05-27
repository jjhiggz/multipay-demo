import type { FERecipient } from '../../domain/useRecipients'
import type { RecipientFields, ValidatorFn } from './recipient-list.types'

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
    return {
      isValid: true,
      reasons: null,
    }
  },
  reason: (input: string | null) => {
    if (typeof input !== 'string' || input.length === 0) {
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
    if (typeof input !== 'string') {
      return {
        isValid: false,
        reason: 'Please enter a valid reference',
      }
    }
    return {
      isValid: true,
      reasons: null,
    }
  },
}
