// i18n.config.ts
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'ar',
  datetimeFormats: {
    ar: {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short', hour: 'numeric', minute: 'numeric' }
    },
    en: {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short', hour: 'numeric', minute: 'numeric' }
    }
  },
  numberFormats: {
    ar: {
      currency: { style: 'currency', currency: 'EGP', notation: 'standard' },
      decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
      percent: { style: 'percent', useGrouping: false }
    },
    en: {
      currency: { style: 'currency', currency: 'USD', notation: 'standard' },
      decimal: { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
      percent: { style: 'percent', useGrouping: false }
    }
  }
}))