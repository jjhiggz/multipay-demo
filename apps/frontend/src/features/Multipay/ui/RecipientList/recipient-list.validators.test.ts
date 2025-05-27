import { describe, it, expect } from 'vitest'
import { getMultipayRecipientValidations } from './recipient-list.validators'
import type {
  MultiPayRecipientContainer,
  RecipientFields,
} from './recipient-list.types'
import type { FERecipient } from '../../domain/useRecipients'

// Mock FERecipient for testing
const mockValidRecipient: FERecipient = {
  recipientId: 1,
  recipientDisplayName: 'John Doe',
  currencyCode: 'USD',
  bankCountryCode: 'US',
  bankName: 'Test Bank',
  accountNumber: '12345',
}

const createMockRecipientContainer = (
  values: Partial<RecipientFields>,
  stateInteractions: Partial<
    Record<
      keyof RecipientFields,
      { hasEnteredFocus: boolean; hasLeftFocus: boolean }
    >
  > = {},
  hasOverallInteraction = false,
): MultiPayRecipientContainer => {
  const defaultState = {
    hasEnteredFocus: false,
    hasLeftFocus: false,
    byField: {
      recipient: { hasEnteredFocus: false, hasLeftFocus: false },
      amount: { hasEnteredFocus: false, hasLeftFocus: false },
      reason: { hasEnteredFocus: false, hasLeftFocus: false },
      reference: { hasEnteredFocus: false, hasLeftFocus: false },
    },
  }

  // Apply specific field interactions
  for (const key in stateInteractions) {
    const fieldKey = key as keyof RecipientFields
    if (defaultState.byField[fieldKey] && stateInteractions[fieldKey]) {
      defaultState.byField[fieldKey] = stateInteractions[fieldKey]!
    }
  }

  // Determine overall interaction based on byField states
  const anyFieldInteracted = Object.values(defaultState.byField).some(
    (s) => s.hasEnteredFocus && s.hasLeftFocus,
  )

  return {
    index: 1,
    values: {
      recipient: null,
      amount: null,
      reason: null,
      reference: null,
      ...values,
    },
    state: {
      ...defaultState,
      hasEnteredFocus: anyFieldInteracted || hasOverallInteraction,
      hasLeftFocus: anyFieldInteracted || hasOverallInteraction,
    },
  }
}

describe('getMultipayRecipieentValidations', () => {
  it('should return no errors for a valid recipient when form not submitted and no interaction', () => {
    const recipient = createMockRecipientContainer({
      recipient: mockValidRecipient,
    })
    const validations = getMultipayRecipientValidations(recipient, false)
    expect(validations.recipientErrors).toEqual([])
    expect(validations.fieldErrors.recipient).toEqual([])
    expect(validations.fieldErrors.amount).toEqual([])
  })

  it('should return recipient error if recipient is null and form submitted', () => {
    const recipient = createMockRecipientContainer({ recipient: null })
    const validations = getMultipayRecipientValidations(recipient, true)
    expect(validations.fieldErrors.recipient).toEqual([
      'Please select recipient',
    ])
  })

  it('should return recipient error if recipient is null and recipient field was touched', () => {
    const recipient = createMockRecipientContainer(
      { recipient: null },
      { recipient: { hasEnteredFocus: true, hasLeftFocus: true } },
    )
    const validations = getMultipayRecipientValidations(recipient, false)
    expect(validations.fieldErrors.recipient).toEqual([
      'Please select recipient',
    ])
  })

  it('should return no errors if recipient is valid and recipient field was touched', () => {
    const recipient = createMockRecipientContainer(
      { recipient: mockValidRecipient },
      { recipient: { hasEnteredFocus: true, hasLeftFocus: true } },
    )
    const validations = getMultipayRecipientValidations(recipient, false)
    expect(validations.fieldErrors.recipient).toEqual([])
  })

  it('should return no errors if recipient is valid and form submitted', () => {
    const recipient = createMockRecipientContainer({
      recipient: mockValidRecipient,
    })
    const validations = getMultipayRecipientValidations(recipient, true)
    expect(validations.fieldErrors.recipient).toEqual([])
  })

  it('should return no errors if recipient is null, form not submitted, and no field touched', () => {
    const recipient = createMockRecipientContainer({ recipient: null })
    const validations = getMultipayRecipientValidations(recipient, false)
    expect(validations.fieldErrors.recipient).toEqual([])
  })

  it('should return recipient error if recipient is null, another field was touched, but form not submitted', () => {
    const recipient = createMockRecipientContainer(
      { recipient: null },
      { amount: { hasEnteredFocus: true, hasLeftFocus: true } },
    )
    const validations = getMultipayRecipientValidations(recipient, false)
    expect(validations.fieldErrors.recipient).toEqual([
      'Please select recipient',
    ])
  })

  it('should return errors for relevant fields if they are invalid and have been interacted with, even if form not submitted', () => {
    const recipient = createMockRecipientContainer(
      { recipient: null, amount: 0 },
      {
        recipient: { hasEnteredFocus: true, hasLeftFocus: true },
        amount: { hasEnteredFocus: true, hasLeftFocus: true },
      },
    )
    const validations = getMultipayRecipientValidations(recipient, false)
    expect(validations.fieldErrors.recipient).toEqual([
      'Please select recipient',
    ])
  })

  it('should return all field errors if form has been submitted, regardless of interaction state', () => {
    const recipient = createMockRecipientContainer(
      { recipient: null, amount: null },
      {},
    )
    const validations = getMultipayRecipientValidations(recipient, true)
    expect(validations.fieldErrors.recipient).toEqual([
      'Please select recipient',
    ])
  })
})
