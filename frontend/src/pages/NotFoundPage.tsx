import { Link } from 'react-router-dom'
import { ROUTES } from '@/lib/constants'

export default function NotFoundPage() {
	return (
		<div>
			<h1>404 - Страница не найдена</h1>
			<Link to={ROUTES.LIST}>Вернуться к списку объявлений</Link>
		</div>
	)
}

