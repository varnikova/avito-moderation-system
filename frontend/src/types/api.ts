import type { AdStatus, Ad } from './ad'

export interface PaginationParams {
	page?: number
	limit?: number
}

export interface AdsQueryParams extends PaginationParams {
	status?: AdStatus[]
	categoryId?: number
	minPrice?: number
	maxPrice?: number
	search?: string
	sortBy?: 'date' | 'price' | 'priority'
	sortOrder?: 'asc' | 'desc'
}

export interface Pagination {
	currentPage: number
	totalPages: number
	totalItems: number
	itemsPerPage: number
}

export interface AdsResponse {
	ads: Ad[]
	pagination: Pagination
}

export interface ApiResponse<T> {
	data: T
	pagination?: Pagination
}

export interface ApiError {
	error: string
	message?: string
	id?: number
}

export interface RejectAdRequest {
	reason: string
	comment?: string
}

export interface RequestChangesRequest {
	reason: string
	comment: string
}

export interface StatsParams {
	period?: string
	startDate?: string
	endDate?: string
}

export interface RejectAdMutationParams {
	id: number
	data: RejectAdRequest
}

export interface RequestChangesMutationParams {
	id: number
	data: RequestChangesRequest
}

