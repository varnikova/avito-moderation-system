import { createBrowserRouter } from 'react-router-dom'
import { ROUTES, ROUTE_PATHS } from '@/lib/constants'
import Layout from '@/components/Layout'
import AdsListPage from '@/pages/AdsListPage'
import AdDetailPage from '@/pages/AdDetailPage'
import StatsPage from '@/pages/StatsPage'
import NotFoundPage from '@/pages/NotFoundPage'

// конфигурация роутинга приложения
// все страницы обёрнуты в лейаут для единообразной навигации
export const router = createBrowserRouter([
	{
		path: ROUTES.HOME,
		element: <Layout />,
		children: [
			{
				index: true,
				element: <AdsListPage />,
			},
			{
				path: ROUTE_PATHS.LIST,
				element: <AdsListPage />,
			},
			{
				path: `${ROUTE_PATHS.ITEM}/:id`,
				element: <AdDetailPage />,
			},
			{
				path: ROUTE_PATHS.STATS,
				element: <StatsPage />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
])

