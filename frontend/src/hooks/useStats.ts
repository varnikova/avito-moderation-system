import { useQuery } from '@tanstack/react-query'
import { fetchStats } from '@/lib/api/stats'
import { QUERY_STALE_TIME } from '@/lib/constants'
import type { StatsParams } from '@/types'

// хук для получения статистики модератора
// статистика кэшируется на 2 минуты, так как обновляется чаще
export function useStats(params?: StatsParams) {
	return useQuery({
		queryKey: ['stats', params],
		queryFn: () => fetchStats(params),
		staleTime: QUERY_STALE_TIME.STATS,
	})
}

