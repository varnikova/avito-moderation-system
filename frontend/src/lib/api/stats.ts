import { apiClient } from '../api-client'
import type {
	Stats,
	StatsSummary,
	ActivityData,
	DecisionsData,
	CategoriesChart,
	StatsParams,
} from '@/types'

export async function fetchStatsSummary(
	params?: StatsParams
): Promise<StatsSummary> {
	const response = await apiClient.get<StatsSummary>('/stats/summary', {
		params,
	})
	return response.data
}

export async function fetchActivityChart(
	params?: StatsParams
): Promise<ActivityData[]> {
	const response = await apiClient.get<ActivityData[]>('/stats/chart/activity', {
		params,
	})
	return response.data
}

export async function fetchDecisionsChart(
	params?: StatsParams
): Promise<DecisionsData> {
	const response = await apiClient.get<DecisionsData>(
		'/stats/chart/decisions',
		{
			params,
		}
	)
	return response.data
}

export async function fetchCategoriesChart(
	params?: StatsParams
): Promise<CategoriesChart> {
	const response = await apiClient.get<CategoriesChart>(
		'/stats/chart/categories',
		{
			params,
		}
	)
	return response.data
}

// основная функция для получения всей статистики
// загружаем все данные параллельно через promise.all для ускорения
export async function fetchStats(params?: StatsParams): Promise<Stats> {
	const [summary, activityChart, decisionsChart, categoriesChart] =
		await Promise.all([
			fetchStatsSummary(params),
			fetchActivityChart(params),
			fetchDecisionsChart(params),
			fetchCategoriesChart(params),
		])

	return {
		summary,
		activityChart,
		decisionsChart,
		categoriesChart,
	}
}

