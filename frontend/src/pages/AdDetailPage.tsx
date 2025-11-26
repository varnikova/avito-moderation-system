import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { DetailPageSkeleton } from '@/components/DetailPageSkeleton'
import { ErrorMessage } from '@/components/ErrorMessage'
import { ModerationActions } from '@/components/ModerationActions'
import { ModerationHistory } from '@/components/ModerationHistory'
import { ImageGallery } from '@/components/ImageGallery'
import { PriorityIndicator } from '@/components/PriorityIndicator'
import { useAdById, useAds } from '@/hooks/useAds'
import { getItemRoute } from '@/lib/utils'
import { formatDate, formatDateTime, formatPrice } from '@/lib/utils'
import { STATUS_LABELS } from '@/lib/constants'
import type { AdStatus } from '@/types'

const LABELS = {
	PAGE_TITLE: 'Детали объявления',
	BACK_BUTTON: 'К списку',
	NO_CHARACTERISTICS: 'Характеристики отсутствуют',
	CHARACTERISTICS_TITLE: 'Характеристики',
	SELLER_REGISTERED: 'На площадке с',
	INVALID_ID: 'Некорректный идентификатор объявления',
	ERROR_MESSAGE: 'Не удалось загрузить объявление',
	LOADING_LABEL: 'Загрузка объявления...',
	STATUS_LABEL: 'Статус:',
	ID_LABEL: 'ID:',
	SELLER_LISTINGS_SUFFIX: 'объявлений',
	CATEGORY_LABEL: 'Категория:',
	CREATED_LABEL: 'Создано:',
	PRICE_LABEL: 'Цена:',
	TABLE_PARAM_HEADER: 'Параметр',
	TABLE_VALUE_HEADER: 'Значение',
}

const statusBadgeStyles: Record<AdStatus, string> = {
	pending: 'border-[var(--warning-border)] bg-[var(--warning-chip-bg)] text-[var(--warning)]',
	approved: 'border-[var(--success-border)] bg-[var(--success-chip-bg)] text-[var(--success)]',
	rejected: 'border-[var(--destructive)] bg-[var(--destructive)]/10 text-[var(--destructive)]',
	draft: 'border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]',
}

export default function AdDetailPage() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()

	// валидация id из url
	const numericId = id ? Number(id) : NaN
	const isValidId = Number.isInteger(numericId) && numericId > 0

	const { data: ad, isLoading, error, refetch } = useAdById(isValidId ? numericId : 0)
	// загружаем объявления для навигации предыдущее/следующее
	// ограничиваем до 100 для оптимизации (достаточно для большинства случаев)
	const { data: adsData } = useAds({ limit: 100 })

	const galleryImages = ad?.images && ad.images.length > 0 ? ad.images : []
	const characteristics = ad?.characteristics ? Object.entries(ad.characteristics) : []

	// вычисляем ид предыдущего и следующего объявления для навигации
	const { prevAdId, nextAdId } = useMemo(() => {
		if (!adsData?.ads || !ad) {
			return { prevAdId: null, nextAdId: null }
		}

		const currentIndex = adsData.ads.findIndex((item) => item.id === ad.id)
		if (currentIndex === -1) {
			return { prevAdId: null, nextAdId: null }
		}

		const prevAd = currentIndex > 0 ? adsData.ads[currentIndex - 1] : null
		const nextAd = currentIndex < adsData.ads.length - 1 ? adsData.ads[currentIndex + 1] : null

		return {
			prevAdId: prevAd?.id ?? null,
			nextAdId: nextAd?.id ?? null,
		}
	}, [adsData?.ads, ad])

	const handlePrevClick = () => {
		if (prevAdId) {
			navigate(getItemRoute(prevAdId))
		}
	}

	const handleNextClick = () => {
		if (nextAdId) {
			navigate(getItemRoute(nextAdId))
		}
	}

	const handleBackClick = () => {
		navigate('/')
	}

	if (!isValidId) {
		return (
			<div className="container mx-auto py-8">
				<ErrorMessage message={LABELS.INVALID_ID} />
			</div>
		)
	}

	if (isLoading) {
		return <DetailPageSkeleton />
	}

	if (error || !ad) {
		return (
			<div className="container mx-auto py-8">
				<ErrorMessage message={LABELS.ERROR_MESSAGE} onRetry={refetch} />
			</div>
		)
	}

	return (
		<div className="container mx-auto space-y-6 py-8">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<Button
					variant="ghost"
					onClick={handleBackClick}
					className="px-0 text-base font-medium"
				>
					<ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
					{LABELS.BACK_BUTTON}
				</Button>
				<div className="flex flex-wrap items-center gap-3">
					<Button
						variant="ghost"
						onClick={handlePrevClick}
						disabled={!prevAdId}
						className="px-0 text-sm font-medium"
					>
						<ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
						Предыдущее
					</Button>
					<Separator orientation="vertical" className="h-4 w-[1px]" decorative={false} style={{ backgroundColor: 'var(--border)' }} />
					<Button
						variant="ghost"
						onClick={handleNextClick}
						disabled={!nextAdId}
						className="px-0 text-sm font-medium"
					>
						Следующее
						<ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
					</Button>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-between gap-3">
				<h1 className="text-xl font-semibold text-[var(--foreground)]">
					{ad.title}{' '}
					<span className="text-sm text-[var(--muted-foreground)]">
						({LABELS.ID_LABEL} {ad.id})
					</span>
				</h1>
				<div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
					<span>{LABELS.STATUS_LABEL}</span>
					<Badge variant="outline" className={statusBadgeStyles[ad.status]}>
						{STATUS_LABELS[ad.status]}
					</Badge>
					<PriorityIndicator priority={ad.priority} />
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div className="flex flex-col justify-evenly space-y-6">
					<Card>
						<CardContent className="flex h-full flex-col gap-4 p-6">
							<ImageGallery images={galleryImages} title={ad.title} />
						</CardContent>
					</Card>

					<Card>
						<CardContent className="space-y-3 p-6">
							<div className="flex flex-wrap items-center gap-4 text-sm">
								<span className="text-base font-semibold text-[var(--foreground)]">
									{ad.seller.name}{' '}
									<span className="text-sm text-[var(--muted-foreground)]">({LABELS.ID_LABEL} {ad.seller.id})</span>
								</span>
								<Separator orientation="vertical" className="h-4 w-[1px]" decorative={false} style={{ backgroundColor: 'var(--border)' }} />
								<span className="flex items-center gap-1 font-medium text-[var(--foreground)]">
									<Star className="h-4 w-4 text-[var(--warning)]" aria-hidden="true" />
									{ad.seller.rating}
								</span>
								<Separator orientation="vertical" className="h-4 w-[1px]" decorative={false} style={{ backgroundColor: 'var(--border)' }} />
								<span className="text-[var(--muted-foreground)] whitespace-nowrap">
									{ad.seller.totalAds} {LABELS.SELLER_LISTINGS_SUFFIX}
								</span>
								<Separator orientation="vertical" className="h-4 w-[1px]" decorative={false} style={{ backgroundColor: 'var(--border)' }} />
								<span className="text-[var(--muted-foreground)] whitespace-nowrap">
									{LABELS.SELLER_REGISTERED}: {formatDate(ad.seller.registeredAt)}
								</span>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className="h-full">
					<CardContent className="flex h-full flex-col gap-6 p-6">
						<div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
							<span>{LABELS.CATEGORY_LABEL} {ad.category}</span>
							<Separator orientation="vertical" className="h-4 w-[1px]" decorative={false} style={{ backgroundColor: 'var(--border)' }} />
							<span>{LABELS.CREATED_LABEL} {formatDateTime(ad.createdAt)}</span>
							<Separator orientation="vertical" className="h-4 w-[1px]" decorative={false} style={{ backgroundColor: 'var(--border)' }} />
							<span>{LABELS.PRICE_LABEL} {formatPrice(ad.price)}</span>
						</div>
						<p className="text-base leading-relaxed text-[var(--foreground)]">{ad.description}</p>
						<div>
							<h3 className="mb-3 text-lg font-semibold">{LABELS.CHARACTERISTICS_TITLE}</h3>
							{characteristics.length === 0 ? (
								<p className="text-sm text-[var(--muted-foreground)]">{LABELS.NO_CHARACTERISTICS}</p>
							) : (
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>{LABELS.TABLE_PARAM_HEADER}</TableHead>
											<TableHead>{LABELS.TABLE_VALUE_HEADER}</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{characteristics.map(([key, value]) => (
											<TableRow key={key}>
												<TableCell className="font-medium">{key}</TableCell>
												<TableCell>{value}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			<ModerationActions adId={ad.id} />

			<ModerationHistory history={ad.moderationHistory || []} />
		</div>
	)
}

