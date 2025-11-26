import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
	label: string
	value: string | number
}

//карточка для отображения метрики статистики
export function StatCard({ label, value }: StatCardProps) {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="space-y-2">
					<p className="text-sm font-medium text-[var(--muted-foreground)]">{label}</p>
					<p className="text-3xl font-bold text-[var(--foreground)]">{value}</p>
				</div>
			</CardContent>
		</Card>
	)
}

