import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

const DEFAULT_SKELETON_ITEMS = 6

export function CardSkeleton({ count = DEFAULT_SKELETON_ITEMS }: { count?: number }) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<Card key={index} className="overflow-hidden">
					<CardContent className="p-0">
						<Skeleton className="relative h-32 w-full overflow-hidden">
							<span className="pointer-events-none absolute inset-0 animate-skeleton-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-slate-500/40" />
						</Skeleton>
					</CardContent>
				</Card>
			))}
		</>
	)
}

