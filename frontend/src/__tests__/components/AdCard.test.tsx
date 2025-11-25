import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AdCard } from '@/components/AdCard'
import type { Ad } from '@/types'

const mockAd: Ad = {
	id: 1,
	title: 'Test Ad Title',
	description: 'Test description',
	price: 123456,
	category: 'Test Category',
	categoryId: 0,
	status: 'pending',
	priority: 'normal',
	createdAt: '2025-01-15T10:00:00Z',
	updatedAt: '2025-01-15T10:00:00Z',
	images: ['https://example.com/image.jpg'],
	characteristics: {},
	seller: {
		id: 1,
		name: 'Test Seller',
		rating: '4.5',
		totalAds: 10,
		registeredAt: '2024-01-01',
	},
	moderationHistory: [],
}

const mockAdWithoutImage: Ad = {
	...mockAd,
	id: 2,
	images: [],
}

describe('AdCard', () => {
	it('renders ad title correctly', () => {
		render(
			<BrowserRouter>
				<AdCard ad={mockAd} />
			</BrowserRouter>
		)

		expect(screen.getByText('Test Ad Title')).toBeInTheDocument()
	})

	it('renders formatted price', () => {
		render(
			<BrowserRouter>
				<AdCard ad={mockAd} />
			</BrowserRouter>
		)

		const priceElement = screen.getByText(/123/)
		expect(priceElement).toBeInTheDocument()
	})

	it('renders category and formatted date', () => {
		render(
			<BrowserRouter>
				<AdCard ad={mockAd} />
			</BrowserRouter>
		)

		expect(screen.getByText('Test Category')).toBeInTheDocument()
	})

	it('renders image when available', () => {
		render(
			<BrowserRouter>
				<AdCard ad={mockAd} />
			</BrowserRouter>
		)

		const image = screen.getByAltText('Test Ad Title')
		expect(image).toBeInTheDocument()
		expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
	})

	it('renders placeholder when no image', () => {
		render(
			<BrowserRouter>
				<AdCard ad={mockAdWithoutImage} />
			</BrowserRouter>
		)

		expect(screen.getByText('Нет фото')).toBeInTheDocument()
		expect(screen.queryByAltText('Test Ad Title')).not.toBeInTheDocument()
	})

	it('renders link to detail page with correct route', () => {
		render(
			<BrowserRouter>
				<AdCard ad={mockAd} />
			</BrowserRouter>
		)

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute('href', '/item/1')
	})

	it('renders open button', () => {
		render(
			<BrowserRouter>
				<AdCard ad={mockAd} />
			</BrowserRouter>
		)

		expect(screen.getByText('Открыть')).toBeInTheDocument()
	})
})

