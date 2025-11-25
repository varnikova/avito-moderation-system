import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { cn, getPaginationPages } from '@/lib/utils'

interface AdsPaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

// компонент пагинации с использованием shadcn/ui
// скрываем, если страниц меньше двух
export function AdsPagination({ currentPage, totalPages, onPageChange }: AdsPaginationProps) {
	if (totalPages <= 1) {
		return null
	}

	const pageNumbers = getPaginationPages(currentPage, totalPages)

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={(e) => {
							e.preventDefault()
							if (currentPage > 1) {
								onPageChange(currentPage - 1)
							}
						}}
						className={cn(
							currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer',
							'[&>span:not(.sr-only)]:hidden'
						)}
					/>
				</PaginationItem>

				{pageNumbers.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							onClick={(e) => {
								e.preventDefault()
								onPageChange(page)
							}}
							isActive={currentPage === page}
							className="cursor-pointer min-w-[2.5rem]"
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						onClick={(e) => {
							e.preventDefault()
							if (currentPage < totalPages) {
								onPageChange(currentPage + 1)
							}
						}}
						className={cn(
							currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer',
							'[&>span:not(.sr-only)]:hidden'
						)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

