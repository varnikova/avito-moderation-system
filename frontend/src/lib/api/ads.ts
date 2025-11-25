import { apiClient } from '../api-client'
import type {
	Ad,
	AdsQueryParams,
	AdsResponse,
	RejectAdRequest,
	RequestChangesRequest,
} from '@/types'

// получение списка объявлений с фильтрами и пагинацией
export async function fetchAds(params?: AdsQueryParams): Promise<AdsResponse> {
	const response = await apiClient.get<AdsResponse>('/ads', { params })
	return response.data
}

export async function fetchAdById(id: number): Promise<Ad> {
	const response = await apiClient.get<Ad>(`/ads/${id}`)
	return response.data
}

// одобрение объявления
// api возвращает объект с message и ad, нам нужен только ad
export async function approveAd(id: number): Promise<Ad> {
	const response = await apiClient.post<{ message: string; ad: Ad }>(
		`/ads/${id}/approve`
	)
	return response.data.ad
}

export async function rejectAd(
	id: number,
	data: RejectAdRequest
): Promise<Ad> {
	const response = await apiClient.post<{ message: string; ad: Ad }>(
		`/ads/${id}/reject`,
		data
	)
	return response.data.ad
}

export async function requestChanges(
	id: number,
	data: RequestChangesRequest
): Promise<Ad> {
	const response = await apiClient.post<{ message: string; ad: Ad }>(
		`/ads/${id}/request-changes`,
		data
	)
	return response.data.ad
}

