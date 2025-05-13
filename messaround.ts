type RecipientReturn = {
  recipients: {
    recipient: {
      recipientId: number;
      recipientDisplayName: string;
      currencyCode: string;
      bankCountryCode: string;
      bankName: string;
      accountNumber: string;
    };
    fields: { name: string; value: string }[];
  }[];
};

const recipients: RecipientReturn = {
  recipients: [
    {
      recipient: {
        recipientId: 3959149,
        recipientDisplayName: "Hans Gruber",
        currencyCode: "EUR",
        bankCountryCode: "DE",
        bankName: "ING-DIBA AG (RETAIL BANKING)",
        accountNumber: "DE17500105179796498884",
      },
      fields: [
        { name: "RECIPIENT_ID", value: "3959149" },
        { name: "RECIPIENT_API_ID", value: "" },
        { name: "CURRENCY_CODE", value: "EUR" },
        { name: "BANK_ADDRESS_COUNTRY_CODE", value: "DE" },
        { name: "IS_OWN_ACCOUNT", value: "False" },
        { name: "IS_BUSINESS", value: "True" },
        { name: "ACCOUNT_NAME", value: "Hans Gruber" },
        { name: "ADDRESS_LINE1", value: "1D Rue Alexandre Barbier" },
        { name: "IBAN", value: "DE17500105179796498884" },
        { name: "BANK_BIC", value: "INGDDEFFXXX" },
        { name: "BANK_NAME", value: "ING-DIBA AG (RETAIL BANKING)" },
        { name: "RECIPIENT_POST_CODE", value: "85400" },
        { name: "STATUS", value: "Approved" },
      ],
    },
    {
      recipient: {
        recipientId: 3957790,
        recipientDisplayName: "Luke Adams",
        currencyCode: "GBP",
        bankCountryCode: "GB",
        bankName: "BARCLAYS BANK UK PLC",
        accountNumber: "12345678",
      },

      fields: [
        { name: "RECIPIENT_ID", value: "3957790" },
        { name: "CURRENCY_CODE", value: "GBP" },
        { name: "BANK_ADDRESS_COUNTRY_CODE", value: "GB" },
        { name: "ACCOUNT_NAME", value: "Luke Adams" },
        { name: "ADDRESS_LINE1", value: "Unit 2,99 Bridge Road" },
        { name: "RECIPIENT_CITY", value: "Leicester" },
        { name: "RECIPIENT_POST_CODE", value: "LE53LD" },
        { name: "NAT_CLEAR_CODE", value: "202678" },
        { name: "BANK_NAME", value: "BARCLAYS BANK UK PLC" },
        { name: "ACCOUNT_NUM", value: "12345678" },
      ],
    },
    {
      recipient: {
        recipientId: 3924517,
        recipientDisplayName: "Candice Nolan",
        currencyCode: "AUD",
        bankCountryCode: "AU",
        bankName: "National Australia Bank Limited",
        accountNumber: "109123123",
      },

      fields: [
        { name: "RECIPIENT_ID", value: "3924517" },
        { name: "CURRENCY_CODE", value: "AUD" },
      ],
    },
  ],
};
