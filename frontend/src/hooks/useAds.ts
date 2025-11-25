import { useQuery } from '@tanstack/react-query'
import { fetchAds, fetchAdById } from '@/lib/api/ads'
import { QUERY_STALE_TIME } from '@/lib/constants'
import type { AdsQueryParams } from '@/types'

// хук для получения списка объявлений с фильтрами и пагинацией
export function useAds(params?: AdsQueryParams) {
	return useQuery({
		queryKey: ['ads', params],
		queryFn: () => fetchAds(params),
		staleTime: QUERY_STALE_TIME.ADS,
	})
}

// хук для получения одного объявления по id
// enabled предотвращает запрос при невалидном id
export function useAdById(id: number) {
	return useQuery({
		queryKey: ['ads', id],
		queryFn: () => fetchAdById(id),
		enabled: !!id,
		staleTime: QUERY_STALE_TIME.ADS,
	})
}

