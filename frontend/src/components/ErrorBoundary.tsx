import { Component, type ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ErrorBoundaryProps {
	children: ReactNode
	fallback?: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
	error: Error | null
}

const LABELS = {
	TITLE: 'Что-то пошло не так',
	DESCRIPTION: 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.',
	RELOAD: 'Обновить страницу',
}

// компонент для перехвата ошибок реакт
// ловит ошибки в дочерних компонентах и показывает фоллбэк
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false, error: null }
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error }
	}

	// логгируем ошибку для отладки
	componentDidCatch(error: Error, errorInfo: unknown) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	handleReload = () => {
		window.location.reload()
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<div className="container mx-auto flex min-h-screen items-center justify-center p-8">
					<div className="w-full max-w-md space-y-4">
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>{LABELS.TITLE}</AlertTitle>
							<AlertDescription>{LABELS.DESCRIPTION}</AlertDescription>
						</Alert>
						<Button onClick={this.handleReload} className="w-full">
							{LABELS.RELOAD}
						</Button>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

