import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { CategoriesChart } from '@/types'

interface CategoriesChartProps {
	data: CategoriesChart
}

const LABELS = {
	TITLE: 'График по категориям проверенных объявлений',
	NO_DATA: 'Нет данных для отображения',
}

// горизонтальная столбчатая диаграмма по категориям
// показывает количество проверенных объявлений в каждой категории
export function CategoriesChart({ data }: CategoriesChartProps) {
	if (!data || Object.keys(data).length === 0) {
		return (
			<div className="rounded-lg border bg-[var(--card)] p-6">
				<h3 className="mb-4 text-lg font-semibold">{LABELS.TITLE}</h3>
				<p className="text-sm text-[var(--muted-foreground)]">{LABELS.NO_DATA}</p>
			</div>
		)
	}

	// преобразуем объект в массив для графика
	const chartData = Object.entries(data).map(([category, count]) => ({
		category,
		count,
	}))

	return (
		<div className="rounded-lg border bg-[var(--card)] p-6">
			<h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">{LABELS.TITLE}</h3>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={chartData} layout="vertical">
					<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
					<XAxis type="number" tick={{ fill: 'var(--muted-foreground)' }} />
					<YAxis dataKey="category" type="category" width={150} tick={{ fill: 'var(--muted-foreground)' }} />
					<Tooltip />
					<Bar dataKey="count" fill="#3b82f6" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

