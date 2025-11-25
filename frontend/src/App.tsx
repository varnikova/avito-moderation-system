import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { QUERY_STALE_TIME } from '@/lib/constants'

// Создаём QueryClient один раз, чтобы не терять кэш при ререндерах
// refetchOnWindowFocus отключен, чтобы не мешать пользователю
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: QUERY_STALE_TIME.DEFAULT,
			refetchOnWindowFocus: false,
		},
	},
})

interface AppProps {
	children: React.ReactNode
}

function App({ children }: AppProps) {
	return (
		<ErrorBoundary>
			<ThemeProvider attribute="class" defaultTheme="light" storageKey="theme">
				<QueryClientProvider client={queryClient}>
					<div className="app">{children}</div>
					<Toaster />
				</QueryClientProvider>
			</ThemeProvider>
		</ErrorBoundary>
	)
}

export default App
