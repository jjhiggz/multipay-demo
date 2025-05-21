import type { CurrencyCode } from "@/constants/currency.constants";
import { startAccurateTimer } from "@/utils/accurate-timer";
import { convertAmount } from "@/utils/quote-helpers";

export const updateUSDRatesOnInterval = (
  updateInterval: number,
  { debug }: { debug?: boolean } = { debug: false }
) => {
  const scramble = (input: number) => {
    const by = 0.96 + Math.random() * 0.08;
    return input * by;
  };

  const createToUSDRates = (): Record<CurrencyCode, number> => ({
    USD: 1,
    DKK: scramble(0.15),
    EUR: scramble(1.08),
    GBP: scramble(1.27),
    JPY: scramble(0.0067),
    AUD: scramble(0.66),
    CAD: scramble(0.74),
    CHF: scramble(1.12),
    CNY: scramble(0.14),
    INR: scramble(0.012),
    BRL: scramble(0.2),
    MXN: scramble(0.059),
    SGD: scramble(0.74),
    HKD: scramble(0.13),
    NZD: scramble(0.61),
    SEK: scramble(0.096),
    NOK: scramble(0.095),
    KRW: scramble(0.00076),
    TRY: scramble(0.031),
    RUB: scramble(0.011),
    ZAR: scramble(0.053),
    AED: scramble(0.27),
    SAR: scramble(0.27),
    PLN: scramble(0.25),
    THB: scramble(0.028),
    MYR: scramble(0.21),
    IDR: scramble(0.000064),
    PHP: scramble(0.018),
    VND: scramble(0.000042),
    PKR: scramble(0.0036),
    BDT: scramble(0.0091),
    NGN: scramble(0.00066),
    KES: scramble(0.0068),
    MAD: scramble(0.1),
    CZK: scramble(0.043),
    HUF: scramble(0.0028),
    RON: scramble(0.22),
    CLP: scramble(0.0011),
    COP: scramble(0.00026),
    PEN: scramble(0.27),
    ARS: scramble(0.0012),
    UAH: scramble(0.026),
    LKR: scramble(0.0033),
    NPR: scramble(0.0075),
    JMD: scramble(0.0065),
    BGN: scramble(0.55),
    GEL: scramble(0.37),
    HRK: scramble(0.14),
  });

  const updateConversionRates = async () => {
    console.log("Making New Rates");
    const newRates = createToUSDRates();
    await Bun.write(
      "./conversion-rates-to-usd.json",
      JSON.stringify(newRates, null, 2)
    );
  };

  const logUsefulShit = () => {
    const tests: [CurrencyCode, CurrencyCode][] = [
      ["MXN", "USD"],
      ["USD", "MXN"],
      ["GBP", "USD"],
      ["GBP", "MXN"],
    ];
    tests.forEach(async ([from, to]) => {
      const result = await convertAmount({
        from,
        to,
        amount: 1,
      });
      console.log(`1[${from}] == ${result}[${to}] `);
    });
  };

  updateConversionRates();
  startAccurateTimer(() => {
    updateConversionRates();
    if (debug) logUsefulShit();
  }, updateInterval);
};

updateUSDRatesOnInterval(15000);
