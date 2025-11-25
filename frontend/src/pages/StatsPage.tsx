import { useState } from 'react'
import { useStats } from '@/hooks/useStats'
import { StatsPageSkeleton } from '@/components/StatsPageSkeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { StatCard } from '@/components/StatCard'
import { ActivityChart } from '@/components/ActivityChart'
import { DecisionsChart } from '@/components/DecisionsChart'
import { CategoriesChart } from '@/components/CategoriesChart'
import { PeriodFilter } from '@/components/PeriodFilter'
import type { StatsParams } from '@/types'

const LABELS = {
	PAGE_TITLE: 'Статистика',
	LOADING_LABEL: 'Загрузка статистики...',
	ERROR_MESSAGE: 'Не удалось загрузить статистику',
	CHECKED: 'Проверено',
	APPROVED: 'Одобрено',
	REJECTED: 'Отклонено',
	AVG_TIME: 'Ср. время',
}

// форматирование времени в минутах
function formatTime(minutes: number): string {
	return `${minutes.toFixed(1)} мин`
}

// форматирование процентов без дробной части
function formatPercentage(value: number): string {
	return `${Math.round(value)}%`
}

export default function StatsPage() {
	const [period, setPeriod] = useState<StatsParams['period']>('week')
	const { data: stats, isLoading, error, refetch } = useStats({ period })

	if (isLoading) {
		return <StatsPageSkeleton />
	}

	if (error || !stats) {
		return (
			<div className="container mx-auto py-8">
				<ErrorMessage message={LABELS.ERROR_MESSAGE} onRetry={refetch} />
			</div>
		)
	}

	return (
		<div className="container mx-auto space-y-6 py-8">
			<h1 className="text-3xl font-bold">{LABELS.PAGE_TITLE}</h1>
			<PeriodFilter period={period} onPeriodChange={setPeriod} />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard label={LABELS.CHECKED} value={stats.summary.totalReviewed} />
				<StatCard
					label={LABELS.APPROVED}
					value={formatPercentage(stats.summary.approvedPercentage)}
				/>
				<StatCard
					label={LABELS.REJECTED}
					value={formatPercentage(stats.summary.rejectedPercentage)}
				/>
				<StatCard
					label={LABELS.AVG_TIME}
					value={formatTime(stats.summary.averageReviewTime)}
				/>
			</div>
			<ActivityChart data={stats.activityChart} />
			<DecisionsChart data={stats.decisionsChart} />
			<CategoriesChart data={stats.categoriesChart} />
		</div>
	)
}
