import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { ActivityData } from '@/types'

interface ActivityChartProps {
	data: ActivityData[]
}

const LABELS = {
	TITLE: 'График активности (7 дней)',
}

function formatChartDate(dateString: string): string {
	const date = new Date(dateString)
	return format(date, 'dd.MM', { locale: ru })
}

// столбчатая диаграмма активности модератора по дням
// показывает одобренные, отклонённые и отправленные на доработку
export function ActivityChart({ data }: ActivityChartProps) {
	if (!data || data.length === 0) {
		return (
			<div className="rounded-lg border bg-[var(--card)] p-6">
				<h3 className="mb-4 text-lg font-semibold">{LABELS.TITLE}</h3>
				<p className="text-sm text-[var(--muted-foreground)]">Нет данных для отображения</p>
			</div>
		)
	}

	// форматируем даты для отображения на оси x
	const chartData = data.map((item) => ({
		...item,
		dateFormatted: formatChartDate(item.date),
	}))

	return (
		<div className="rounded-lg border bg-[var(--card)] p-6">
			<h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">{LABELS.TITLE}</h3>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={chartData}>
					<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
					<XAxis dataKey="dateFormatted" tick={{ fill: 'var(--muted-foreground)' }} />
					<YAxis tick={{ fill: 'var(--muted-foreground)' }} />
					<Tooltip />
					<Bar dataKey="approved" stackId="a" fill="#22c55e" />
					<Bar dataKey="rejected" stackId="a" fill="#ef4444" />
					<Bar dataKey="requestChanges" stackId="a" fill="#eab308" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

