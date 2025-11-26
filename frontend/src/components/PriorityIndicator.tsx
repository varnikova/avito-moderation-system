import type { AdPriority } from '@/types'

interface PriorityIndicatorProps {
	priority: AdPriority
}

// индикатор приоритета объявления
export function PriorityIndicator({ priority }: PriorityIndicatorProps) {
	if (priority === 'urgent') {
		return (
			<span className="inline-flex items-baseline gap-1.5 rounded px-2 py-0.5 text-xs font-medium text-[var(--destructive)]">
				<span className="h-2 w-2 shrink-0 rounded-full bg-[var(--destructive)]"></span>
				<span>Срочно</span>
			</span>
		)
	}

	return (
		<span className="inline-flex items-baseline gap-1.5 text-xs text-[var(--muted-foreground)]">
			<span className="h-2 w-2 shrink-0 rounded-full bg-[var(--muted-foreground)]"></span>
			<span>Обычный</span>
		</span>
	)
}

