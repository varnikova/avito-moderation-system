import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDate, getItemRoute } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'
import type { Ad, AdStatus } from '@/types'

interface AdCardProps {
	ad: Ad
}

const statusBadgeStyles: Record<AdStatus, string> = {
	pending: 'border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100',
	approved: 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100',
	rejected: 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100',
	draft: 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100',
}

// карточка объявления для списка
// для срочных объявлений добавляем красную рамку
export function AdCard({ ad }: AdCardProps) {
	return (
		<Card className={`overflow-hidden ${ad.priority === 'urgent' ? 'border-red-500 dark:border-red-600' : ''}`}>
			<CardContent className="p-0">
				<div className="flex gap-4 p-4">
					<div className="h-24 w-24 shrink-0 rounded-md bg-muted flex items-center justify-center">
						{ad.images && ad.images.length > 0 ? (
							<img
								src={ad.images[0]}
								alt={ad.title}
								className="h-full w-full object-cover rounded-md"
							/>
						) : (
							<span className="text-xs text-muted-foreground">Нет фото</span>
						)}
					</div>
					<div className="flex flex-1 flex-col gap-2">
						<div className="flex items-start justify-between gap-2">
							<div className="flex-1">
								<h3 className="font-semibold line-clamp-1">{ad.title}</h3>
								<p className="text-lg font-bold text-primary mt-1">{formatPrice(ad.price)}</p>
							</div>
							<Link to={getItemRoute(ad.id)}>
								<Button size="sm" variant="outline" className="shrink-0">
									Открыть
									<ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
								</Button>
							</Link>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<span>{ad.category}</span>
							<span>•</span>
							<span>{formatDate(ad.createdAt)}</span>
						</div>
						<div className="flex items-center justify-between gap-2">
							<Badge variant="outline" className={statusBadgeStyles[ad.status]}>
								{STATUS_LABELS[ad.status]}
							</Badge>
							{ad.priority === 'urgent' ? (
								<span className="inline-flex items-baseline gap-1.5 rounded px-2 py-0.5 text-xs font-medium text-red-500 dark:text-red-400">
									<span className="h-2 w-2 shrink-0 rounded-full bg-red-500 dark:bg-red-400"></span>
									<span>Срочно</span>
								</span>
							) : (
								<span className="inline-flex items-baseline gap-1.5 text-xs text-muted-foreground">
									<span className="h-2 w-2 shrink-0 rounded-full bg-gray-400"></span>
									<span>Обычный</span>
								</span>
							)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

