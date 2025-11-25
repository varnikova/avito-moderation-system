// время кэширования для запроса в миллисекундах
// статистика обновляется чаще, так как она более динамична
export const QUERY_STALE_TIME = {
	ADS: 5 * 60 * 1000, // 5 минут
	STATS: 2 * 60 * 1000, // 2 минуты
	DEFAULT: 5 * 60 * 1000, // 5 минут
}

export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_API_URL || '/api/v1',
	CONTENT_TYPE: 'application/json',
}

export const PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_LIMIT: 10,
	MAX_LIMIT: 100,
}

export const DATE_FORMATS = {
	DISPLAY: 'dd.MM.yyyy',
	DISPLAY_WITH_TIME: 'dd.MM.yyyy HH:mm',
	API: 'yyyy-MM-dd',
}

export const PRICE_FORMAT = {
	LOCALE: 'ru-RU',
	CURRENCY: 'RUB',
	MIN_FRACTION_DIGITS: 0,
}

export const ROUTE_PATHS = {
	LIST: 'list',
	ITEM: 'item',
	STATS: 'stats',
} as const

export const ROUTES = {
	HOME: '/',
	LIST: `/${ROUTE_PATHS.LIST}`,
	ITEM: `/${ROUTE_PATHS.ITEM}`,
	STATS: `/${ROUTE_PATHS.STATS}`,
} as const

export const CATEGORIES = [
	{ id: 0, name: 'Электроника' },
	{ id: 1, name: 'Недвижимость' },
	{ id: 2, name: 'Транспорт' },
	{ id: 3, name: 'Работа' },
	{ id: 4, name: 'Услуги' },
	{ id: 5, name: 'Животные' },
	{ id: 6, name: 'Мода' },
	{ id: 7, name: 'Детское' },
] as const

export const STATUS_LABELS = {
	pending: 'На модерации',
	approved: 'Одобрено',
	rejected: 'Отклонено',
	draft: 'Черновик',
} as const

