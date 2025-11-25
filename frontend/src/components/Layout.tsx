import { Link, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'
import { ThemeToggle } from '@/components/ThemeToggle'

// базовый layout с навигацией
// TODO: можно улучшить стилизацию навигации, сейчас очень просто
export default function Layout() {
	const location = useLocation()

	return (
		<div>
			<nav className="flex items-center justify-between p-4 border-b">
				<div className="flex items-center gap-4">
					<ThemeToggle />
					<Link
						to={ROUTES.LIST}
						className={location.pathname === ROUTES.HOME || location.pathname === ROUTES.LIST ? 'active' : ''}
					>
						Список объявлений
					</Link>
					<Link to={ROUTES.STATS} className={location.pathname === ROUTES.STATS ? 'active' : ''}>
						Статистика
					</Link>
				</div>
			</nav>
			<main>
				<Outlet />
			</main>
		</div>
	)
}

