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
			<div className="rounded-lg border bg-card p-6">
				<h3 className="mb-4 text-lg font-semibold">{LABELS.TITLE}</h3>
				<p className="text-sm text-muted-foreground">{LABELS.NO_DATA}</p>
			</div>
		)
	}

	// преобразуем объект в массив для графика
	const chartData = Object.entries(data).map(([category, count]) => ({
		category,
		count,
	}))

	return (
		<div className="rounded-lg border bg-card p-6">
			<h3 className="mb-4 text-lg font-semibold">{LABELS.TITLE}</h3>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={chartData} layout="vertical">
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" />
					<YAxis dataKey="category" type="category" width={150} />
					<Tooltip />
					<Bar dataKey="count" fill="#3b82f6" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

