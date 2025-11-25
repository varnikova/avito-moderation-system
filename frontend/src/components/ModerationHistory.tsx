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
	pending: 'border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100',
	approved: 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100',
	rejected: 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100',
	draft: 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100',
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
		<div className="rounded-lg border border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-6">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-lg font-semibold">{LABELS.TITLE}</h3>
				<span className="text-sm text-muted-foreground">
					{history.length} {history.length === 1 ? LABELS.HISTORY_SINGLE : LABELS.HISTORY_PLURAL}
				</span>
			</div>
			<div className="space-y-4">
				{history.length === 0 && (
					<p className="text-sm text-muted-foreground">{LABELS.NO_HISTORY}</p>
				)}
				{history.map((entry) => (
					<div key={entry.id} className="rounded-lg border border-yellow-200 dark:border-yellow-700 bg-white/70 dark:bg-yellow-900/30 p-4">
						<div className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium">
							<span>
								{entry.moderatorName}{' '}
								<span className="text-muted-foreground">({LABELS.ID_LABEL} {entry.moderatorId})</span>
							</span>
							<span className="text-muted-foreground">{formatDateTime(entry.timestamp)}</span>
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
							<p className="mt-1 text-sm text-muted-foreground">
								{LABELS.REASON_PREFIX} {entry.reason}
							</p>
						)}
						{entry.comment && (
							<p className="text-sm text-muted-foreground">
								{LABELS.COMMENT_PREFIX} {entry.comment}
							</p>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

