import { Inbox } from 'lucide-react'

interface EmptyStateProps {
	title?: string
	description?: string
}

// компонент для отображения пустого состояния когда нет данных
export function EmptyState({
	title = 'Нет данных',
	description = 'Здесь пока ничего нет',
}: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
			<Inbox className="h-12 w-12 text-[var(--muted-foreground)]" />
			<div className="space-y-2">
				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-sm text-[var(--muted-foreground)]">{description}</p>
			</div>
		</div>
	)
}

