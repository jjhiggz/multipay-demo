import type { FERecipient } from '../../domain/useRecipients'
import type {
  ValidatorFn,
  MultiPayRecipientContainer,
  MultipayRecipientValidations,
  RecipientFields,
} from './recipient-list.types'

export const getMultipayRecipientValidations = (
  recipientContainer: MultiPayRecipientContainer,
  hasFormBeenSubmitted: boolean,
): MultipayRecipientValidations => {
  const { state, values } = recipientContainer

  const finalFieldErrors: MultipayRecipientValidations['fieldErrors'] = {
    recipient: [],
    amount: [],
    reason: [],
    reference: [],
  }
  const recipientErrors: string[] = []

  // Step 1: Get raw validation results for all fields
  // It's important that multipayRecipientValidators defines validators for all keys in RecipientFields
  // or this will need to handle missing validators more gracefully.
  const rawFieldValidationResults: Partial<
    Record<keyof RecipientFields, { isValid: boolean; reason: string | null }>
  > = {}
  const fieldKeys = Object.keys(values) as Array<keyof RecipientFields>

  fieldKeys.forEach((key) => {
    const validator = (
      multipayRecipientValidators as Record<
        keyof RecipientFields,
        ValidatorFn<any> | undefined
      >
    )[key]

    if (typeof validator === 'function') {
      const validationResult = validator(values[key])
      rawFieldValidationResults[key] = {
        isValid: validationResult.isValid,
        reason:
          !validationResult.isValid && 'reason' in validationResult
            ? (validationResult as { isValid: false; reason: string }).reason
            : null,
      }
    } else {
      // If a field in RecipientFields doesn't have a corresponding validator, assume it's valid.
      rawFieldValidationResults[key] = { isValid: true, reason: null }
    }
  })

  const containerOverallInteracted = state.hasEnteredFocus && state.hasLeftFocus

  // Step 2: Populate finalFieldErrors based on interaction rules and raw results
  fieldKeys.forEach((key) => {
    const rawResult = rawFieldValidationResults[key]
    if (rawResult && !rawResult.isValid && rawResult.reason) {
      const fieldSpecificState = state.byField[key]
      const showErrorForThisField =
        hasFormBeenSubmitted ||
        containerOverallInteracted ||
        (fieldSpecificState.hasEnteredFocus && fieldSpecificState.hasLeftFocus)

      if (showErrorForThisField) {
        finalFieldErrors[key].push(rawResult.reason)
      }
    }
  })

  // Step 3: Populate recipientErrors
  const anyRawFieldIsInvalid = fieldKeys.some((key) => {
    const rawResult = rawFieldValidationResults[key]
    return rawResult && !rawResult.isValid
  })

  if (anyRawFieldIsInvalid) {
    const anyFinalFieldErrorIsVisible = fieldKeys.some(
      (key) => finalFieldErrors[key].length > 0,
    )

    // Show recipient-level error if:
    // 1. Form submitted, OR
    // 2. Container overall was interacted with, OR
    // 3. Any individual field error is currently visible
    if (
      hasFormBeenSubmitted ||
      containerOverallInteracted ||
      anyFinalFieldErrorIsVisible
    ) {
      recipientErrors.push('This recipient has one or more validation errors.')
    }
  }

  return {
    recipientErrors,
    fieldErrors: finalFieldErrors,
  }
}

export const multipayRecipientValidators: {
  recipient: ValidatorFn<FERecipient | null>
  amount: ValidatorFn<number | null>
  reason: ValidatorFn<string | null>
  reference: ValidatorFn<string | null>
} = {
  recipient: (input: FERecipient | null) => {
    if (input === null) {
      return {
        isValid: false,
        reason: 'Please select recipient',
      }
    }
    return {
      isValid: true,
      reasons: null,
    }
  },
  amount: (input: number | null) => {
    if (
      input !== null &&
      (typeof input !== 'number' || isNaN(input) || input <= 0)
    ) {
      return { isValid: false, reason: 'Valid Number' }
    }
    return { isValid: true, reasons: null }
  },
  reason: (input: string | null) => {
    if (input === null || input.trim() === '') {
      return { isValid: false, reason: 'Reason is required.' }
    }
    return { isValid: true, reasons: null }
  },
  reference: (input: string | null) => {
    return { isValid: true, reasons: null }
  },
}
