import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function DetailPageSkeleton() {
	return (
		<div className="container mx-auto space-y-6 py-8">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<Skeleton className="h-10 w-32" />
				<Skeleton className="h-8 w-48" />
			</div>
			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardContent className="p-6">
						<Skeleton className="mb-4 h-6 w-32" />
						<Skeleton className="h-72 w-full" />
						<Skeleton className="mt-4 h-4 w-40" />
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex h-full flex-col gap-6 p-6">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-8 w-3/4" />
						<Skeleton className="h-24 w-full" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-16 w-full" />
						</div>
					</CardContent>
				</Card>
			</div>
			<Card>
				<CardContent className="p-6">
					<Skeleton className="mb-4 h-6 w-48" />
					<div className="space-y-3">
						<Skeleton className="h-16 w-full" />
						<Skeleton className="h-16 w-full" />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

