import { describe, expect, it } from 'vitest'

import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('should format a valid ISO date string to DD.MM.YYYY', () => {
    expect(formatDate('2025-01-15')).toBe('15.01.2025')
  })

  it('should format a date-time string using only the date part', () => {
    expect(formatDate('2025-12-31T23:59:59Z')).toBe('31.12.2025')
  })

  it('should return "—" for null', () => {
    expect(formatDate(null)).toBe('—')
  })

  it('should return "—" for undefined', () => {
    expect(formatDate(undefined)).toBe('—')
  })

  it('should return "—" for an empty string', () => {
    expect(formatDate('')).toBe('—')
  })
})
