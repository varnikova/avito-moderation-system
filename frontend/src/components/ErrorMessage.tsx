import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ErrorMessageProps {
	message?: string
	onRetry?: () => void
}

// компонент для отображения ошибок с возможностью повтора
export function ErrorMessage({ message = 'Произошла ошибка при загрузке данных', onRetry }: ErrorMessageProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 p-8">
			<Alert variant="destructive" className="max-w-md">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Ошибка</AlertTitle>
				<AlertDescription>{message}</AlertDescription>
			</Alert>
			{onRetry && (
				<Button onClick={onRetry} variant="outline">
					Попробовать снова
				</Button>
			)}
		</div>
	)
}

