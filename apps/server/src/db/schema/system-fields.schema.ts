import { z } from "zod";

export const systemFieldsOutputSchema = z.object({
  action: z.string(),
  actionValue: z.string(),
  configSettings: z.object({
    logDisable: z.boolean(),
    logMinimumLevel: z.string(),
  }),
  documents: z.object({
    complaintsCharter: z.string(),
    complianceGuarantee: z.string(),
    consumerProtection: z.string(),
    cookieNoticeVersionAvailable: z.string(),
    documentLinks: z.object({
      CC_XEMT_US: z.string(),
      CG_XEMT_US: z.string(),
      CN_XEMT: z.string(),
      CP_XEMT_US: z.string(),
      ERC_XEMT_US: z.string(),
      II_XEMT_US: z.string(),
      PAD_XEMT_US_PERSONAL: z.string(),
      PRIV_POLICY_XEMT_US: z.string(),
      XEMT_US_CONSUMER: z.string(),
    }),
    errResolutionCancellationDisc: z.string(),
    importantInformation: z.string(),
    preAuthDebit: z.string(),
    privacyPolicyVersionAvailable: z.string(),
    termsAndConditionsVersionAvailable: z.string(),
  }),
  featureToggle: z.object({
    enableInterac: z.string(),
    enablePromotions: z.string(),
    enableXeSim: z.string(),
    inAppReviewsEnabled: z.string(),
    serviceMessaging: z.array(
      z.object({
        phoneCountry: z.string(),
        replyTo: z.string(),
      })
    ),
  }),
  formData: z.object({
    additionalForm: z.object({
      formFields: z.array(
        z.object({
          disabled: z.boolean(),
          id: z.string(),
          options: z.array(
            z.object({
              allowFreeText: z.boolean(),
              text: z.string(),
              value: z.string(),
              jsonContent: z.string().optional(),
            })
          ),
          validators: z.array(z.unknown()),
        })
      ),
      subtitles: z.array(z.unknown()),
    }),
    customerProfileForm: z.object({
      formFields: z.array(
        z.object({
          disabled: z.boolean(),
          id: z.string(),
          options: z.array(
            z.object({
              allowFreeText: z.boolean(),
              text: z.string(),
              value: z.string(),
              jsonContent: z.string().optional(),
            })
          ),
          validators: z.array(z.unknown()),
        })
      ),
      subtitles: z.array(z.unknown()),
    }),
    moneyTransferCalculatorForm: z.object({
      formFields: z.array(
        z.object({
          disabled: z.boolean(),
          id: z.string(),
          options: z.array(
            z.object({
              allowFreeText: z.boolean(),
              text: z.string(),
              value: z.string(),
              jsonContent: z.string().optional(),
            })
          ),
          validators: z.array(z.unknown()),
          fallBack: z.boolean().optional(),
        })
      ),
      subtitles: z.array(z.unknown()),
    }),
    purposeOfPaymentForm: z.object({
      formFields: z.array(
        z.object({
          disabled: z.boolean(),
          id: z.string(),
          options: z.array(
            z.object({
              allowFreeText: z.boolean(),
              text: z.string(),
              value: z.string(),
              jsonContent: z.string().optional(),
            })
          ),
          validators: z.array(z.unknown()),
        })
      ),
      subtitles: z.array(z.unknown()),
    }),
    sourceOfFundsForm: z.object({
      formFields: z.array(
        z.object({
          disabled: z.boolean(),
          id: z.string(),
          options: z.array(
            z.object({
              allowFreeText: z.boolean(),
              text: z.string(),
              value: z.string(),
              jsonContent: z.string().optional(),
            })
          ),
          validators: z.array(z.unknown()),
        })
      ),
      subtitles: z.array(z.unknown()),
    }),
  }),
  geoLocation: z.object({
    countryCode: z.string(),
  }),
});
