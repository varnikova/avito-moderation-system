import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function StatsPageSkeleton() {
	return (
		<div className="container mx-auto space-y-6 py-8">
			<Skeleton className="h-9 w-32" />
			<Card>
				<CardContent className="p-4">
					<Skeleton className="h-8 w-full" />
				</CardContent>
			</Card>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Card key={index}>
						<CardContent className="p-6">
							<Skeleton className="mb-2 h-4 w-24" />
							<Skeleton className="h-9 w-16" />
						</CardContent>
					</Card>
				))}
			</div>
			<Card>
				<CardContent className="p-6">
					<Skeleton className="mb-4 h-6 w-48" />
					<Skeleton className="h-64 w-full" />
				</CardContent>
			</Card>
			<Card>
				<CardContent className="p-6">
					<Skeleton className="mb-4 h-6 w-40" />
					<Skeleton className="h-64 w-full" />
				</CardContent>
			</Card>
			<Card>
				<CardContent className="p-6">
					<Skeleton className="mb-4 h-6 w-64" />
					<Skeleton className="h-64 w-full" />
				</CardContent>
			</Card>
		</div>
	)
}

