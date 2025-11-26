import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAds } from '@/hooks/useAds'
import { AdCard } from '@/components/AdCard'
import { CardSkeleton } from '@/components/CardSkeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { EmptyState } from '@/components/EmptyState'
import { AdsFilters, type FilterValues } from '@/components/AdsFilters'
import { AdsPagination } from '@/components/AdsPagination'
import type { AdsQueryParams, AdStatus } from '@/types'

const LABELS = {
	PAGE_TITLE: 'Список объявлений',
	ERROR_MESSAGE: 'Не удалось загрузить список объявлений',
	EMPTY_TITLE: 'Объявлений не найдено',
	EMPTY_DESCRIPTION: 'Попробуйте изменить фильтры или создайте новое объявление',
	TOTAL_PREFIX: 'Всего:',
	AD_SINGULAR: 'объявление',
	AD_PLURAL_2_4: 'объявления',
	AD_PLURAL_5_PLUS: 'объявлений',
}

// правильное склонение слова объявление в зависимости от количества
// учитываем особые случаи 11-14
function getTotalLabel(count: number): string {
	const lastDigit = count % 10
	const lastTwoDigits = count % 100

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return LABELS.AD_PLURAL_5_PLUS
	}

	if (lastDigit === 1) {
		return LABELS.AD_SINGULAR
	}

	if (lastDigit >= 2 && lastDigit <= 4) {
		return LABELS.AD_PLURAL_2_4
	}

	return LABELS.AD_PLURAL_5_PLUS
}

export default function AdsListPage() {
	const [searchParams, setSearchParams] = useSearchParams()
	
	// читаем параметры из url
	const urlPage = parseInt(searchParams.get('page') || '1', 10)
	const urlStatus = searchParams.get('status')?.split(',').filter(Boolean) as AdStatus[] | undefined
	const urlCategoryId = searchParams.get('categoryId') ? parseInt(searchParams.get('categoryId')!, 10) : undefined
	const urlMinPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined
	const urlMaxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined
	const urlSearch = searchParams.get('search') || undefined
	const urlSortBy = searchParams.get('sortBy') as AdsQueryParams['sortBy'] | undefined
	const urlSortOrder = searchParams.get('sortOrder') as AdsQueryParams['sortOrder'] | undefined

	const [page, setPage] = useState(() => urlPage || 1)
	const [filters, setFilters] = useState<AdsQueryParams>(() => ({
		status: urlStatus,
		categoryId: urlCategoryId,
		minPrice: urlMinPrice,
		maxPrice: urlMaxPrice,
		search: urlSearch,
		sortBy: urlSortBy,
		sortOrder: urlSortOrder,
	}))
	
	// обновляем фильтры при изменении url (например, при переходе по ссылке)
	useEffect(() => {
		const newPage = parseInt(searchParams.get('page') || '1', 10)
		const newStatus = searchParams.get('status')?.split(',').filter(Boolean) as AdStatus[] | undefined
		const newCategoryId = searchParams.get('categoryId') ? parseInt(searchParams.get('categoryId')!, 10) : undefined
		const newMinPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined
		const newMaxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined
		const newSearch = searchParams.get('search') || undefined
		const newSortBy = searchParams.get('sortBy') as AdsQueryParams['sortBy'] | undefined
		const newSortOrder = searchParams.get('sortOrder') as AdsQueryParams['sortOrder'] | undefined

		if (newPage !== page) {
			setPage(newPage)
		}

		const filtersChanged = 
			JSON.stringify(newStatus || []) !== JSON.stringify(filters.status || []) ||
			newCategoryId !== filters.categoryId ||
			newMinPrice !== filters.minPrice ||
			newMaxPrice !== filters.maxPrice ||
			newSearch !== filters.search ||
			newSortBy !== filters.sortBy ||
			newSortOrder !== filters.sortOrder

		if (filtersChanged) {
			setFilters({
				status: newStatus,
				categoryId: newCategoryId,
				minPrice: newMinPrice,
				maxPrice: newMaxPrice,
				search: newSearch,
				sortBy: newSortBy,
				sortOrder: newSortOrder,
			})
		}
	}, [searchParams])

	// синхронизируем url при изменении фильтров или страницы
	useEffect(() => {
		const params = new URLSearchParams()
		
		if (page > 1) {
			params.set('page', page.toString())
		}
		
		if (filters.status && filters.status.length > 0) {
			params.set('status', filters.status.join(','))
		}
		
		if (filters.categoryId !== undefined) {
			params.set('categoryId', filters.categoryId.toString())
		}
		
		if (filters.minPrice !== undefined) {
			params.set('minPrice', filters.minPrice.toString())
		}
		
		if (filters.maxPrice !== undefined) {
			params.set('maxPrice', filters.maxPrice.toString())
		}
		
		if (filters.search) {
			params.set('search', filters.search)
		}
		
		if (filters.sortBy) {
			params.set('sortBy', filters.sortBy)
		}
		
		if (filters.sortOrder) {
			params.set('sortOrder', filters.sortOrder)
		}

		const currentParams = searchParams.toString()
		const newParams = params.toString()
		
		// обновляем url только если он изменился
		if (currentParams !== newParams) {
			setSearchParams(params, { replace: true })
		}
	}, [filters, page, setSearchParams, searchParams])
	
	// формируем параметры запроса из фильтров и текущей страницы
	const queryParams: AdsQueryParams = {
		...filters,
		page,
		limit: 10,
	}
	
	const { data, isLoading, error, refetch } = useAds(queryParams)

	const ads = data?.ads || []
	const totalItems = data?.pagination?.totalItems || 0
	const currentPage = data?.pagination?.currentPage || page
	const totalPages = data?.pagination?.totalPages || 1

	// при изменении фильтров сбрасываем страницу на первую
	const handleFilterChange = useCallback((filterValues: FilterValues) => {
		const newFilters: AdsQueryParams = {
			status: filterValues.status.length > 0 ? filterValues.status : undefined,
			categoryId: filterValues.categoryId,
			minPrice: filterValues.minPrice,
			maxPrice: filterValues.maxPrice,
			search: filterValues.search || undefined,
			sortBy: filterValues.sortBy,
			sortOrder: filterValues.sortOrder,
		}
		setFilters(newFilters)
		setPage(1)
	}, [])

	// при смене страницы прокручиваем вверх для удобства
	const handlePageChange = useCallback((newPage: number) => {
		setPage(newPage)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])

	let content

	if (isLoading) {
		content = (
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<CardSkeleton />
			</div>
		)
	} else if (error) {
		content = (
			<ErrorMessage
				message={LABELS.ERROR_MESSAGE}
				onRetry={refetch}
			/>
		)
	} else if (ads.length === 0) {
		content = (
			<EmptyState
				title={LABELS.EMPTY_TITLE}
				description={LABELS.EMPTY_DESCRIPTION}
			/>
		)
	} else {
		content = (
			<>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{ads.map((ad) => (
						<AdCard key={ad.id} ad={ad} />
					))}
				</div>

				<div className="mt-6 flex flex-col items-center gap-4">
					<AdsPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
					<p className="text-sm text-[var(--muted-foreground)]">
						{LABELS.TOTAL_PREFIX} {totalItems} {getTotalLabel(totalItems)}
					</p>
				</div>
			</>
		)
	}

	return (
		<div className="container mx-auto space-y-6 py-8">
			<h1 className="text-3xl font-bold">{LABELS.PAGE_TITLE}</h1>
			<div className="mb-6">
				<AdsFilters 
					onFilterChange={handleFilterChange}
					initialValues={{
						status: filters.status,
						categoryId: filters.categoryId,
						minPrice: filters.minPrice,
						maxPrice: filters.maxPrice,
						search: filters.search,
						sortBy: filters.sortBy,
						sortOrder: filters.sortOrder,
					}}
				/>
			</div>

			{content}
		</div>
	)
}


