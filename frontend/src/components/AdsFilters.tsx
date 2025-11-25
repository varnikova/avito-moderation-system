import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { CATEGORIES, STATUS_LABELS } from '@/lib/constants'
import type { AdStatus, AdsQueryParams } from '@/types'

interface AdsFiltersProps {
	onFilterChange: (filters: FilterValues) => void
	initialValues?: Partial<FilterValues>
}

export interface FilterValues {
	status: AdStatus[]
	categoryId?: number
	minPrice?: number
	maxPrice?: number
	search: string
	sortBy?: AdsQueryParams['sortBy']
	sortOrder?: AdsQueryParams['sortOrder']
}

const STATUS_OPTIONS: { value: AdStatus; label: string }[] = [
	{ value: 'pending', label: STATUS_LABELS.pending },
	{ value: 'approved', label: STATUS_LABELS.approved },
	{ value: 'rejected', label: STATUS_LABELS.rejected },
	{ value: 'draft', label: STATUS_LABELS.draft },
]

const LABELS = {
	TITLE: 'Фильтры:',
	STATUS: 'Статус',
	CATEGORY: 'Категория',
	PRICE: 'Цена',
	SEARCH: 'Поиск',
	SORT: 'Сортировка',
	RESET_BUTTON: 'Сбросить фильтры',
}

const PLACEHOLDERS = {
	ALL_CATEGORIES: 'Все категории',
	PRICE_FROM: 'От',
	PRICE_TO: 'До',
	SEARCH_INPUT: 'Поиск по названию',
	SORT_SELECT: 'Без сортировки',
}

const SORT_OPTIONS: Array<{ value: string; label: string }> = [
	{ value: 'date:desc', label: 'Дата: сначала новые' },
	{ value: 'date:asc', label: 'Дата: сначала старые' },
	{ value: 'price:asc', label: 'Цена: по возрастанию' },
	{ value: 'price:desc', label: 'Цена: по убыванию' },
	{ value: 'priority:desc', label: 'Приоритет: срочные' },
	{ value: 'priority:asc', label: 'Приоритет: обычные' },
]

export function AdsFilters({ onFilterChange, initialValues }: AdsFiltersProps) {
	const [selectedStatuses, setSelectedStatuses] = useState<AdStatus[]>(initialValues?.status || [])
	const [categoryId, setCategoryId] = useState<number | undefined>(initialValues?.categoryId)
	const [minPrice, setMinPrice] = useState<string>(initialValues?.minPrice?.toString() || '')
	const [maxPrice, setMaxPrice] = useState<string>(initialValues?.maxPrice?.toString() || '')
	const [searchQuery, setSearchQuery] = useState(initialValues?.search || '')
	const [sortBy, setSortBy] = useState<FilterValues['sortBy']>(initialValues?.sortBy)
	const [sortOrder, setSortOrder] = useState<FilterValues['sortOrder']>(initialValues?.sortOrder)

	// обновляем состояние при изменении initialValues из url
	useEffect(() => {
		if (initialValues) {
			setSelectedStatuses(initialValues.status || [])
			setCategoryId(initialValues.categoryId)
			setMinPrice(initialValues.minPrice?.toString() || '')
			setMaxPrice(initialValues.maxPrice?.toString() || '')
			setSearchQuery(initialValues.search || '')
			setSortBy(initialValues.sortBy)
			setSortOrder(initialValues.sortOrder)
		}
	}, [initialValues])

	const handleStatusToggle = (status: AdStatus) => {
		let newStatuses: AdStatus[]
		if (selectedStatuses.includes(status)) {
			newStatuses = selectedStatuses.filter((s) => s !== status)
		} else {
			newStatuses = [...selectedStatuses, status]
		}
		setSelectedStatuses(newStatuses)
		applyFilters({ status: newStatuses })
	}

	const handleCategoryChange = (value: string) => {
		const catId = value === 'all' ? undefined : parseInt(value)
		setCategoryId(catId)
		applyFilters({ categoryId: catId })
	}

	// обработка изменения цены - срабатывает при потере фокуса
	// TODO: можно добавить debounce для более плавной работы
	const handlePriceChange = () => {
		applyFilters({
			minPrice: minPrice ? parseFloat(minPrice) : undefined,
			maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
		})
	}

	const handleSearchChange = (value: string) => {
		setSearchQuery(value)
		applyFilters({ search: value })
	}

	const handleSortChange = (value: string) => {
		if (value === 'default') {
			setSortBy(undefined)
			setSortOrder(undefined)
			applyFilters({ sortBy: undefined, sortOrder: undefined })
			return
		}

		const [sortByValue, sortOrderValue] = value.split(':')
		const nextSortBy = sortByValue as AdsQueryParams['sortBy']
		const nextSortOrder = sortOrderValue as AdsQueryParams['sortOrder']

		setSortBy(nextSortBy)
		setSortOrder(nextSortOrder)
		applyFilters({ sortBy: nextSortBy, sortOrder: nextSortOrder })
	}

	const currentSortValue = sortBy && sortOrder ? `${sortBy}:${sortOrder}` : 'default'

	// собираем все фильтры в один объект и передаём наверх
	// используем текущие значения из стейта, если обновление не передано
	const applyFilters = (updates: Partial<FilterValues>) => {
		const filters: FilterValues = {
			status: updates.status ?? selectedStatuses,
			categoryId: updates.categoryId !== undefined ? updates.categoryId : categoryId,
			minPrice: updates.minPrice !== undefined ? updates.minPrice : (minPrice ? parseFloat(minPrice) : undefined),
			maxPrice: updates.maxPrice !== undefined ? updates.maxPrice : (maxPrice ? parseFloat(maxPrice) : undefined),
			search: updates.search !== undefined ? updates.search : searchQuery,
			sortBy: updates.sortBy !== undefined ? updates.sortBy : sortBy,
			sortOrder: updates.sortOrder !== undefined ? updates.sortOrder : sortOrder,
		}
		onFilterChange(filters)
	}

	const handleReset = () => {
		setSelectedStatuses([])
		setCategoryId(undefined)
		setMinPrice('')
		setMaxPrice('')
		setSearchQuery('')
		setSortBy(undefined)
		setSortOrder(undefined)
		onFilterChange({
			status: [],
			categoryId: undefined,
			minPrice: undefined,
			maxPrice: undefined,
			search: '',
			sortBy: undefined,
			sortOrder: undefined,
		})
	}

	return (
		<div className="rounded-lg border border-yellow-700 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-6">
			<div className="mb-4">
				<h2 className="text-lg font-semibold">{LABELS.TITLE}</h2>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<div>
					<label className="mb-2 block text-sm font-medium">
						{LABELS.STATUS}
					</label>
					<div className="space-y-2">
						{STATUS_OPTIONS.map((option) => (
							<div key={option.value} className="flex items-center gap-2">
								<Checkbox
									id={`status-${option.value}`}
									checked={selectedStatuses.includes(option.value)}
									onCheckedChange={() => handleStatusToggle(option.value)}
								/>
								<label
									htmlFor={`status-${option.value}`}
									className="cursor-pointer text-sm"
								>
									{option.label}
								</label>
							</div>
						))}
					</div>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium">{LABELS.CATEGORY}</label>
					<Select value={categoryId?.toString() || 'all'} onValueChange={handleCategoryChange}>
						<SelectTrigger>
							<SelectValue placeholder={PLACEHOLDERS.ALL_CATEGORIES} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">{PLACEHOLDERS.ALL_CATEGORIES}</SelectItem>
							{CATEGORIES.map((cat) => (
								<SelectItem key={cat.id} value={cat.id.toString()}>
									{cat.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium">{LABELS.PRICE}</label>
					<div className="flex gap-2">
						<Input
							type="number"
							placeholder={PLACEHOLDERS.PRICE_FROM}
							value={minPrice}
							onChange={(e) => setMinPrice(e.target.value)}
							onBlur={handlePriceChange}
							className="w-full"
						/>
						<Input
							type="number"
							placeholder={PLACEHOLDERS.PRICE_TO}
							value={maxPrice}
							onChange={(e) => setMaxPrice(e.target.value)}
							onBlur={handlePriceChange}
							className="w-full"
						/>
					</div>
				</div>

				<div>
					<label className="mb-2 block text-sm font-medium">{LABELS.SEARCH}</label>
					<Input
						type="text"
						placeholder={PLACEHOLDERS.SEARCH_INPUT}
						value={searchQuery}
						onChange={(e) => handleSearchChange(e.target.value)}
					/>
				</div>
				<div>
					<label className="mb-2 block text-sm font-medium">{LABELS.SORT}</label>
					<Select value={currentSortValue} onValueChange={handleSortChange}>
						<SelectTrigger>
							<SelectValue placeholder={PLACEHOLDERS.SORT_SELECT} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="default">{PLACEHOLDERS.SORT_SELECT}</SelectItem>
							{SORT_OPTIONS.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="mt-4">
				<Button variant="outline" onClick={handleReset} size="sm">
					{LABELS.RESET_BUTTON}
				</Button>
			</div>
		</div>
	)
}

