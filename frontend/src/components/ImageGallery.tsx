import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageGalleryProps {
	images: string[]
	title: string
}

const LABELS = {
	NO_IMAGES: 'Нет изображений',
	TOTAL_IMAGES: 'Всего изображений:',
	GALLERY_IMAGE_ALT_SUFFIX: 'изображение',
}

// Галерея изображений с навигацией стрелками
export function ImageGallery({ images, title }: ImageGalleryProps) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	// Сбрасываем текущее изображение при изменении количества изображений
	useEffect(() => {
		setCurrentImageIndex(0)
	}, [images.length])

	const hasMultipleImages = images.length > 1

	// Циклическая навигация по изображениям - после последнего переходим к первому
	const showPrevImage = () => {
		setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
	}

	const showNextImage = () => {
		setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
	}

	return (
		<>
			<div className="relative flex h-72 items-center justify-center overflow-hidden rounded-lg bg-muted">
				{images.length > 0 ? (
					<img
						src={images[currentImageIndex]}
						alt={`${title} ${LABELS.GALLERY_IMAGE_ALT_SUFFIX} ${currentImageIndex + 1}`}
						className="h-full w-full object-cover"
					/>
				) : (
					<span className="text-sm text-muted-foreground">{LABELS.NO_IMAGES}</span>
				)}
				{hasMultipleImages && (
					<>
					<Button
						variant="ghost"
						size="icon"
						className="absolute left-3 cursor-pointer rounded-full bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700"
							onClick={showPrevImage}
						>
							<ChevronLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
						</Button>
					<Button
						variant="ghost"
						size="icon"
						className="absolute right-3 cursor-pointer rounded-full bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-700"
							onClick={showNextImage}
						>
							<ChevronRight className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
						</Button>
					</>
				)}
			</div>
			<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
				<span>
					{LABELS.TOTAL_IMAGES} {images.length}
				</span>
			</div>
		</>
	)
}

