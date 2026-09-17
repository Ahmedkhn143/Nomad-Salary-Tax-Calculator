export interface Country {
  code: string;
  slug: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  flatTaxRate: number;        // Estimated effective remote tax rate
  avgMonthlyCostUSD: number;  // Cost of living estimate
  nomadVisaAvailable: boolean;
  taxNotes: string;
}

export const COUNTRIES: Record<string, Country> = {
  us: {
    code: 'US',
    slug: 'us',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    flatTaxRate: 0.28,
    avgMonthlyCostUSD: 3600,
    nomadVisaAvailable: false,
    taxNotes: 'Worldwide citizenship-based taxation. Foreign Earned Income Exclusion (FEIE) up to ~$126k may apply if qualifying abroad.'
  },
  uk: {
    code: 'UK',
    slug: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    flatTaxRate: 0.24,
    avgMonthlyCostUSD: 2900,
    nomadVisaAvailable: false,
    taxNotes: 'Statutory Residence Test (SRT) governs UK tax residency. Non-resident remote workers are generally exempt from UK tax on foreign work.'
  },
  ae: {
    code: 'AE',
    slug: 'ae',
    name: 'United Arab Emirates (Dubai)',
    flag: '🇦🇪',
    currency: 'AED',
    currencySymbol: 'AED',
    flatTaxRate: 0.00,
    avgMonthlyCostUSD: 3100,
    nomadVisaAvailable: true,
    taxNotes: '0% personal income tax with 1-Year Virtual Working / Remote Work Visa.'
  },
  pt: {
    code: 'PT',
    slug: 'pt',
    name: 'Portugal',
    flag: '🇵🇹',
    currency: 'EUR',
    currencySymbol: '€',
    flatTaxRate: 0.20,
    avgMonthlyCostUSD: 1600,
    nomadVisaAvailable: true,
    taxNotes: 'D8 Digital Nomad Visa offers legal residence with standard / IFICI simplified tax schemes.'
  },
  es: {
    code: 'ES',
    slug: 'es',
    name: 'Spain',
    flag: '🇪🇸',
    currency: 'EUR',
    currencySymbol: '€',
    flatTaxRate: 0.24,
    avgMonthlyCostUSD: 1900,
    nomadVisaAvailable: true,
    taxNotes: 'Beckham Law under Startup Act allows digital nomads to pay flat 24% tax up to €600,000 for up to 6 years.'
  },
  pk: {
    code: 'PK',
    slug: 'pk',
    name: 'Pakistan',
    flag: '🇵🇰',
    currency: 'PKR',
    currencySymbol: 'Rs',
    flatTaxRate: 0.01,
    avgMonthlyCostUSD: 600,
    nomadVisaAvailable: false,
    taxNotes: 'FBR IT/Software export service rebate provides 0.25% - 1% final withholding tax on foreign remittance.'
  },
  in: {
    code: 'IN',
    slug: 'in',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    currencySymbol: '₹',
    flatTaxRate: 0.15,
    avgMonthlyCostUSD: 700,
    nomadVisaAvailable: false,
    taxNotes: 'Section 44ADA presumptive taxation enables 50% deemed profit calculation on foreign freelance earnings.'
  },
  id: {
    code: 'ID',
    slug: 'id',
    name: 'Indonesia (Bali)',
    flag: '🇮🇩',
    currency: 'IDR',
    currencySymbol: 'Rp',
    flatTaxRate: 0.10,
    avgMonthlyCostUSD: 1200,
    nomadVisaAvailable: true,
    taxNotes: 'E33G Remote Worker Visa allows living in Bali for foreign employers with territorial tax treatment.'
  },
  de: {
    code: 'DE',
    slug: 'de',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    currencySymbol: '€',
    flatTaxRate: 0.35,
    avgMonthlyCostUSD: 2700,
    nomadVisaAvailable: false,
    taxNotes: 'Requires Freiberufler freelance visa; progressive income tax rates range between 14% and 42%+.'
  },
  th: {
    code: 'TH',
    slug: 'th',
    name: 'Thailand',
    flag: '🇹🇭',
    currency: 'THB',
    currencySymbol: '฿',
    flatTaxRate: 0.15,
    avgMonthlyCostUSD: 1100,
    nomadVisaAvailable: true,
    taxNotes: 'Destination Thailand Visa (DTV) grants 180-day stays renewable for 5 years for remote workers.'
  }
};

// Generates all (N x (N-1)) country corridor slugs for Programmatic SEO
export function getAllCorridorPairs() {
  const codes = Object.keys(COUNTRIES);
  const corridors: { corridor: string }[] = [];

  for (const origin of codes) {
    for (const dest of codes) {
      if (origin !== dest) {
        corridors.push({ corridor: `${origin}-to-${dest}` });
      }
    }
  }
  return corridors;
}

// Parses "us-to-pt" into { origin: Country, destination: Country }
export function parseCorridor(slug: string): { origin: Country; destination: Country } | null {
  if (!slug) return null;
  const parts = slug.toLowerCase().split('-to-');
  if (parts.length !== 2) return null;

  const origin = COUNTRIES[parts[0]];
  const destination = COUNTRIES[parts[1]];

  if (!origin || !destination) return null;
  return { origin, destination };
}
