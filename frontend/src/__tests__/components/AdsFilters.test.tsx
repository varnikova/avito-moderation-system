import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AdsFilters } from '@/components/AdsFilters'

describe('AdsFilters', () => {
	const mockOnFilterChange = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders all filter controls', () => {
		render(<AdsFilters onFilterChange={mockOnFilterChange} />)

		expect(screen.getByText('Фильтры:')).toBeInTheDocument()
		expect(screen.getByText('Статус')).toBeInTheDocument()
		expect(screen.getByText('Категория')).toBeInTheDocument()
		expect(screen.getByText('Цена')).toBeInTheDocument()
		expect(screen.getByText('Поиск')).toBeInTheDocument()
		expect(screen.getByText('Сортировка')).toBeInTheDocument()
	})

	it('calls onFilterChange when status checkbox is toggled', async () => {
		const user = userEvent.setup()
		render(<AdsFilters onFilterChange={mockOnFilterChange} />)

		const statusLabels = screen.getAllByText(/На модерации|Одобрено|Отклонено|Черновик/i)
		if (statusLabels.length > 0) {
			await user.click(statusLabels[0])
			expect(mockOnFilterChange).toHaveBeenCalled()
		}
	})

	it('calls onFilterChange when search input changes', async () => {
		const user = userEvent.setup()
		render(<AdsFilters onFilterChange={mockOnFilterChange} />)

		const searchInput = screen.getByPlaceholderText('Поиск по названию')
		await user.type(searchInput, 'test query')

		expect(mockOnFilterChange).toHaveBeenCalled()
		const callArgs = mockOnFilterChange.mock.calls[mockOnFilterChange.mock.calls.length - 1][0]
		expect(callArgs.search).toBe('test query')
	})

	it('calls onFilterChange when price inputs blur', async () => {
		const user = userEvent.setup()
		render(<AdsFilters onFilterChange={mockOnFilterChange} />)

		const minPriceInput = screen.getByPlaceholderText('От')
		await user.type(minPriceInput, '1000')
		await user.tab()

		await new Promise((resolve) => setTimeout(resolve, 100))

		expect(mockOnFilterChange).toHaveBeenCalled()
		const lastCall = mockOnFilterChange.mock.calls[mockOnFilterChange.mock.calls.length - 1]
		expect(lastCall[0].minPrice).toBe(1000)
	})

	it('renders reset button', () => {
		render(<AdsFilters onFilterChange={mockOnFilterChange} />)

		expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument()
	})

	it('resets filters when reset button is clicked', async () => {
		const user = userEvent.setup()
		render(<AdsFilters onFilterChange={mockOnFilterChange} />)

		const resetButton = screen.getByText('Сбросить фильтры')
		await user.click(resetButton)

		expect(mockOnFilterChange).toHaveBeenCalled()
		const callArgs = mockOnFilterChange.mock.calls[mockOnFilterChange.mock.calls.length - 1][0]
		expect(callArgs.status).toEqual([])
		expect(callArgs.search).toBe('')
		expect(callArgs.minPrice).toBeUndefined()
		expect(callArgs.maxPrice).toBeUndefined()
	})
})

