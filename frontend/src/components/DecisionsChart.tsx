import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import type { DecisionsData } from '@/types'

interface DecisionsChartProps {
	data: DecisionsData
}

const LABELS = {
	TITLE: 'Распределение решений',
	APPROVED: 'Одобрено',
	REJECTED: 'Отклонено',
	REQUEST_CHANGES: 'Доработка',
	NO_DATA: 'Нет данных для отображения',
}

const COLORS = {
	APPROVED: '#22c55e',
	REJECTED: '#ef4444',
	REQUEST_CHANGES: '#eab308',
}

// круговая диаграмма распределения решений модератора
// показывает процент одобренных, отклонённых и отправленных на доработку
export function DecisionsChart({ data }: DecisionsChartProps) {
	const total = data.approved + data.rejected + data.requestChanges

	if (total === 0) {
		return (
			<div className="rounded-lg border bg-card p-6">
				<h3 className="mb-4 text-lg font-semibold">{LABELS.TITLE}</h3>
				<p className="text-sm text-muted-foreground">{LABELS.NO_DATA}</p>
			</div>
		)
	}

	// формируем данные для диаграммы с процентами
	const chartData = [
		{
			name: LABELS.APPROVED,
			value: data.approved,
			percentage: Math.round((data.approved / total) * 100),
			color: COLORS.APPROVED,
		},
		{
			name: LABELS.REJECTED,
			value: data.rejected,
			percentage: Math.round((data.rejected / total) * 100),
			color: COLORS.REJECTED,
		},
		{
			name: LABELS.REQUEST_CHANGES,
			value: data.requestChanges,
			percentage: Math.round((data.requestChanges / total) * 100),
			color: COLORS.REQUEST_CHANGES,
		},
	].filter((item) => item.value > 0)

	const renderTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			const data = payload[0]
			const value = data.value
			const percent = data.payload?.percent ?? 0
			return (
				<div className="rounded-lg border bg-background p-2 shadow-md">
					<p className="font-medium">{data.name}</p>
					<p className="text-sm text-muted-foreground">
						{value} ({Math.round(percent * 100)}%)
					</p>
				</div>
			)
		}
		return null
	}

	return (
		<div className="rounded-lg border bg-card p-6">
			<h3 className="mb-4 text-lg font-semibold">{LABELS.TITLE}</h3>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={chartData}
						cx="50%"
						cy="50%"
						labelLine={false}
						label={({ name, percent }) => `${name}: ${Math.round((percent ?? 0) * 100)}%`}
						outerRadius={80}
						fill="#8884d8"
						dataKey="value"
					>
						{chartData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip content={renderTooltip} />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

