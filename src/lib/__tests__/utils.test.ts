import { describe, it, expect } from 'vitest'
import { formatBytes, formatCurrency, formatNumber, formatPercentage } from '../utils'

describe('Utils', () => {
  describe('formatBytes', () => {
    it('should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes')
      expect(formatBytes(1024)).toBe('1 KB')
      expect(formatBytes(1024 * 1024)).toBe('1 MB')
      expect(formatBytes(1024 * 1024 * 1024)).toBe('1 GB')
      expect(formatBytes(1024 * 1024 * 1024 * 1024)).toBe('1 TB')
    })

    it('should handle custom decimals', () => {
      expect(formatBytes(1500, 1)).toBe('1.5 KB')
      expect(formatBytes(1500, 0)).toBe('1 KB')
    })
  })

  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00')
      expect(formatCurrency(1000.50)).toBe('$1,000.50')
      expect(formatCurrency(0)).toBe('$0.00')
    })

    it('should handle different currencies', () => {
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00')
    })
  })

  describe('formatNumber', () => {
    it('should format numbers correctly', () => {
      expect(formatNumber(1000)).toBe('1,000')
      expect(formatNumber(1000.5, 1)).toBe('1,000.5')
      expect(formatNumber(0)).toBe('0')
    })
  })

  describe('formatPercentage', () => {
    it('should format percentages correctly', () => {
      expect(formatPercentage(50)).toBe('50.0%')
      expect(formatPercentage(50.5, 2)).toBe('50.50%')
      expect(formatPercentage(0)).toBe('0.0%')
    })
  })
})

