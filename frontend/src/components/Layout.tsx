import { Link, Outlet } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'

// базовый layout с навигацией
// TODO: можно улучшить стилизацию навигации, сейчас очень просто
export default function Layout() {

	return (
		<div>
			<nav className="flex items-center justify-between p-4 border-b">
				<div className="flex items-center gap-4">
					<ThemeToggle />
					<Button
						variant="ghost"
						size="sm"
						asChild
						className="px-0 text-sm font-medium"
					>
						<Link
							to={ROUTES.LIST}
						>
							Список объявлений
						</Link>
					</Button>
					<Button
						variant="ghost"
						size="sm"
						asChild
						className="px-0 text-sm font-medium"
					>
						<Link to={ROUTES.STATS}>
							Статистика
						</Link>
					</Button>
				</div>
			</nav>
			<main>
				<Outlet />
			</main>
		</div>
	)
}

