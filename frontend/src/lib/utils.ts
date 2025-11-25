import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { DATE_FORMATS, PRICE_FORMAT, ROUTES } from './constants'

// утилита для объединения классов tailwind  с правильным приоритетом
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// дата в формат дд.мм.гггг
export function formatDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date
	return format(d, DATE_FORMATS.DISPLAY)
}

// форматирование цены в рубли
export function formatPrice(price: number): string {
	return new Intl.NumberFormat(PRICE_FORMAT.LOCALE, {
		style: 'currency',
		currency: PRICE_FORMAT.CURRENCY,
		minimumFractionDigits: PRICE_FORMAT.MIN_FRACTION_DIGITS,
	}).format(price)
}

// форматирование даты и времени
export function formatDateTime(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date
	return format(d, DATE_FORMATS.DISPLAY_WITH_TIME)
}

// генерация url для страницы детального просмотра объявления
export function getItemRoute(id: number | string): string {
	return `${ROUTES.ITEM}/${id}`
}

// вычисляет номера страниц для пагинации
// TODO: можно оптимизировать логику, сейчас немного запутанно
export function getPaginationPages(currentPage: number, totalPages: number, maxVisible = 5): number[] {
	if (totalPages <= maxVisible) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	const halfVisible = Math.floor(maxVisible / 2)

	// если мы в начале списка
	if (currentPage <= halfVisible + 1) {
		return Array.from({ length: maxVisible }, (_, i) => i + 1)
	}

	// если мы в конце списка
	if (currentPage >= totalPages - halfVisible) {
		return Array.from({ length: maxVisible }, (_, i) => totalPages - maxVisible + 1 + i)
	}

	// иначе показываем страницы вокруг текущей
	return Array.from({ length: maxVisible }, (_, i) => currentPage - halfVisible + i)
}
