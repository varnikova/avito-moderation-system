import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { StatsParams } from '@/types'

interface PeriodFilterProps {
	period: StatsParams['period']
	onPeriodChange: (period: StatsParams['period']) => void
}

const LABELS = {
	PERIOD: 'Период:',
	TODAY: 'Сегодня',
	WEEK: '7д',
	MONTH: '30д',
}

const PERIODS: Array<{ value: StatsParams['period']; label: string }> = [
	{ value: 'today', label: LABELS.TODAY },
	{ value: 'week', label: LABELS.WEEK },
	{ value: 'month', label: LABELS.MONTH },
]

// фильтр периода для статистики
// позволяет выбрать сегодня, неделю или месяц
export function PeriodFilter({ period, onPeriodChange }: PeriodFilterProps) {
	return (
		<div className="rounded-lg border bg-muted/50 p-4">
			<div className="flex flex-wrap items-center gap-3">
				<Calendar className="h-4 w-4" />
				<span className="text-sm font-medium">{LABELS.PERIOD}</span>
				{PERIODS.map((p, index) => (
					<>
						{index > 0 && (
							<Separator
								orientation="vertical"
								className="h-4 w-[1px]"
								decorative={false}
								style={{ backgroundColor: 'var(--border)' }}
							/>
						)}
						<Button
							variant={period === p.value ? 'default' : 'ghost'}
							size="sm"
							onClick={() => onPeriodChange(p.value)}
							className="h-8"
						>
							{p.label}
						</Button>
					</>
				))}
			</div>
		</div>
	)
}

