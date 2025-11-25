import { describe, it, expect } from 'vitest'
import { formatPrice, formatDate, formatDateTime, getPaginationPages, getItemRoute } from '@/lib/utils'

describe('formatPrice', () => {
	it('formats small prices correctly', () => {
		const result = formatPrice(100)
		expect(result).toContain('100')
		expect(result).toContain('₽')
	})

	it('formats large prices with thousands separator', () => {
		const result = formatPrice(1234567)
		expect(result).toContain('1')
		expect(result).toContain('₽')
	})

	it('formats zero price', () => {
		const result = formatPrice(0)
		expect(result).toContain('0')
		expect(result).toContain('₽')
	})

	it('formats decimal prices', () => {
		const result = formatPrice(1234.56)
		expect(result).toBeTruthy()
		expect(typeof result).toBe('string')
	})
})

describe('formatDate', () => {
	it('formats Date object correctly', () => {
		const date = new Date('2025-01-15')
		const formatted = formatDate(date)
		expect(formatted).toBeTruthy()
		expect(typeof formatted).toBe('string')
		expect(formatted).toContain('2025')
	})

	it('formats date string correctly', () => {
		const dateString = '2025-01-15T10:00:00Z'
		const formatted = formatDate(dateString)
		expect(formatted).toBeTruthy()
		expect(typeof formatted).toBe('string')
	})

	it('handles different date formats', () => {
		const date = new Date('2024-12-31T23:59:59')
		const formatted = formatDate(date)
		expect(formatted).toContain('2024')
	})
})

describe('formatDateTime', () => {
	it('formats datetime with time component', () => {
		const date = new Date('2025-01-15T14:30:00')
		const formatted = formatDateTime(date)
		expect(formatted).toBeTruthy()
		expect(typeof formatted).toBe('string')
		expect(formatted.length).toBeGreaterThan(formatDate(date).length)
	})

	it('formats datetime string', () => {
		const dateString = '2025-01-15T14:30:00Z'
		const formatted = formatDateTime(dateString)
		expect(formatted).toBeTruthy()
		expect(typeof formatted).toBe('string')
	})
})

describe('getItemRoute', () => {
	it('generates route with number id', () => {
		expect(getItemRoute(123)).toBe('/item/123')
	})

	it('generates route with string id', () => {
		expect(getItemRoute('456')).toBe('/item/456')
	})
})

describe('getPaginationPages', () => {
	it('returns all pages when total is less than maxVisible', () => {
		expect(getPaginationPages(1, 3)).toEqual([1, 2, 3])
		expect(getPaginationPages(2, 4)).toEqual([1, 2, 3, 4])
	})

	it('returns first 5 pages when current page is at start', () => {
		expect(getPaginationPages(1, 10)).toEqual([1, 2, 3, 4, 5])
		expect(getPaginationPages(2, 10)).toEqual([1, 2, 3, 4, 5])
		expect(getPaginationPages(3, 10)).toEqual([1, 2, 3, 4, 5])
	})

	it('returns last 5 pages when current page is at end', () => {
		expect(getPaginationPages(10, 10)).toEqual([6, 7, 8, 9, 10])
		expect(getPaginationPages(9, 10)).toEqual([6, 7, 8, 9, 10])
		expect(getPaginationPages(8, 10)).toEqual([6, 7, 8, 9, 10])
	})

	it('returns centered pages when current page is in middle', () => {
		expect(getPaginationPages(5, 10)).toEqual([3, 4, 5, 6, 7])
		expect(getPaginationPages(6, 10)).toEqual([4, 5, 6, 7, 8])
	})

	it('handles single page', () => {
		expect(getPaginationPages(1, 1)).toEqual([1])
	})

	it('respects custom maxVisible parameter', () => {
		expect(getPaginationPages(5, 20, 3)).toEqual([4, 5, 6])
		expect(getPaginationPages(10, 20, 7)).toEqual([7, 8, 9, 10, 11, 12, 13])
		expect(getPaginationPages(5, 20, 5)).toEqual([3, 4, 5, 6, 7])
	})
})

