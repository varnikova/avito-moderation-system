import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PriorityIndicator } from '@/components/PriorityIndicator'
import { formatPrice, formatDate, getItemRoute } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'
import type { Ad, AdStatus } from '@/types'

interface AdCardProps {
	ad: Ad
}

const statusBadgeStyles: Record<AdStatus, string> = {
	pending: 'border-[var(--warning-border)] bg-[var(--warning-chip-bg)] text-[var(--warning)]',
	approved: 'border-[var(--success-border)] bg-[var(--success-chip-bg)] text-[var(--success)]',
	rejected: 'border-[var(--destructive)] bg-[var(--destructive)]/10 text-[var(--destructive)]',
	draft: 'border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]',
}

// карточка объявления для списка
// для срочных объявлений добавляем красную рамку
export function AdCard({ ad }: AdCardProps) {
	return (
		<Card className="overflow-hidden" style={{ borderColor: 'var(--card-border)' }}>
			<CardContent className="p-0">
				<div className="flex gap-4 p-4">
					<div className="h-24 w-24 shrink-0 rounded-md bg-[var(--muted)] flex items-center justify-center">
						{ad.images && ad.images.length > 0 ? (
							<img
								src={ad.images[0]}
								alt={ad.title}
								className="h-full w-full object-cover rounded-md"
							/>
						) : (
							<span className="text-xs text-[var(--muted-foreground)]">Нет фото</span>
						)}
					</div>
					<div className="flex flex-1 flex-col gap-2">
						<div className="flex items-start justify-between gap-2">
							<div className="flex-1">
								<h3 className="font-semibold line-clamp-1">{ad.title}</h3>
								<p className="text-lg font-bold text-[var(--primary)] mt-1">{formatPrice(ad.price)}</p>
							</div>
							<Link to={getItemRoute(ad.id)}>
								<Button size="sm" variant="outline" className="shrink-0">
									Открыть
									<ChevronRight className="h-4 w-4" aria-hidden="true" />
								</Button>
							</Link>
						</div>
						<div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
							<span>{ad.category}</span>
							<Separator orientation="vertical" className="h-4" style={{ backgroundColor: 'var(--border)' }} />
							<span>{formatDate(ad.createdAt)}</span>
						</div>
						<div className="flex items-center justify-between gap-2">
							<Badge variant="outline" className={statusBadgeStyles[ad.status]}>
								{STATUS_LABELS[ad.status]}
							</Badge>
							<PriorityIndicator priority={ad.priority} />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

