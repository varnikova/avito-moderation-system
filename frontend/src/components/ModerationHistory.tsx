import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'
import type { ModerationHistory, AdStatus } from '@/types'

interface ModerationHistoryProps {
	history: ModerationHistory[]
}

const LABELS = {
	TITLE: 'История модерации',
	NO_HISTORY: 'История модерации пока пуста',
	ID_LABEL: 'ID:',
	REASON_PREFIX: 'Причина:',
	COMMENT_PREFIX: 'Комментарий:',
	HISTORY_SINGLE: 'запись',
	HISTORY_PLURAL: 'записей',
}

const statusBadgeStyles: Record<AdStatus, string> = {
	pending: 'border-[var(--warning-border)] bg-[var(--warning-chip-bg)] text-[var(--warning)]',
	approved: 'border-[var(--success-border)] bg-[var(--success-chip-bg)] text-[var(--success)]',
	rejected: 'border-[var(--destructive)] bg-[var(--destructive)]/10 text-[var(--destructive)]',
	draft: 'border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]',
}

const ACTION_STATUS_MAP: Record<ModerationHistory['action'], AdStatus> = {
	approved: 'approved',
	rejected: 'rejected',
	requestChanges: 'pending',
}

// компонент отображения истории модерации
// сортируем по дате - самые свежие сверху
export function ModerationHistory({ history: rawHistory }: ModerationHistoryProps) {
	const history = useMemo(() => {
		if (!rawHistory || rawHistory.length === 0) {
			return []
		}

		return [...rawHistory].sort(
			(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
		)
	}, [rawHistory])

	return (
		<div className="rounded-lg border border-[var(--border)] bg-[var(--muted)] p-6">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-semibold">{LABELS.TITLE}</h3>
				<span className="text-sm text-[var(--muted-foreground)]">
					{history.length} {history.length === 1 ? LABELS.HISTORY_SINGLE : LABELS.HISTORY_PLURAL}
				</span>
			</div>
			<div className="space-y-4">
				{history.length === 0 && (
					<p className="text-sm text-[var(--muted-foreground)]">{LABELS.NO_HISTORY}</p>
				)}
				{history.map((entry) => (
					<div key={entry.id} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
						<div className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium">
							<span>
								{entry.moderatorName}{' '}
								<span className="text-[var(--muted-foreground)]">({LABELS.ID_LABEL} {entry.moderatorId})</span>
							</span>
							<span className="text-[var(--muted-foreground)]">{formatDateTime(entry.timestamp)}</span>
						</div>
						<div className="mt-2 flex items-center gap-2 text-sm">
							<Badge
								variant="outline"
								className={statusBadgeStyles[ACTION_STATUS_MAP[entry.action]]}
							>
								{STATUS_LABELS[ACTION_STATUS_MAP[entry.action]]}
							</Badge>
						</div>
						{entry.reason && (
							<p className="mt-1 text-sm text-[var(--muted-foreground)]">
								{LABELS.REASON_PREFIX} {entry.reason}
							</p>
						)}
						{entry.comment && (
							<p className="text-sm text-[var(--muted-foreground)]">
								{LABELS.COMMENT_PREFIX} {entry.comment}
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

