import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModerationActions } from '@/components/ModerationActions'
import * as useAdMutations from '@/hooks/useAdMutations'
import { toast } from 'sonner'

vi.mock('sonner', () => ({
	toast: {
		success: vi.fn(),
		error: vi.fn(),
	},
}))

vi.mock('@/hooks/useAdMutations', () => ({
	useApproveAd: vi.fn(),
	useRejectAd: vi.fn(),
	useRequestChanges: vi.fn(),
}))

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	})
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

describe('ModerationActions', () => {
	const mockApproveMutation = {
		mutateAsync: vi.fn().mockResolvedValue({}),
		isPending: false,
	}

	const mockRejectMutation = {
		mutateAsync: vi.fn().mockResolvedValue({}),
		isPending: false,
	}

	const mockRequestChangesMutation = {
		mutateAsync: vi.fn().mockResolvedValue({}),
		isPending: false,
	}

	beforeEach(() => {
		vi.clearAllMocks()
		vi.mocked(useAdMutations.useApproveAd).mockReturnValue(mockApproveMutation as any)
		vi.mocked(useAdMutations.useRejectAd).mockReturnValue(mockRejectMutation as any)
		vi.mocked(useAdMutations.useRequestChanges).mockReturnValue(mockRequestChangesMutation as any)
	})

	it('renders all three action buttons', () => {
		render(<ModerationActions adId={1} />, { wrapper: createWrapper() })

		expect(screen.getByText('Одобрить')).toBeInTheDocument()
		expect(screen.getByText('Отклонить')).toBeInTheDocument()
		expect(screen.getByText('Доработка')).toBeInTheDocument()
	})

	it('calls approve mutation when approve button is clicked', async () => {
		const user = userEvent.setup()
		render(<ModerationActions adId={123} />, { wrapper: createWrapper() })

		const approveButton = screen.getByText('Одобрить')
		await user.click(approveButton)

		await waitFor(() => {
			expect(mockApproveMutation.mutateAsync).toHaveBeenCalledWith(123)
			expect(toast.success).toHaveBeenCalledWith('Объявление одобрено')
		})
	})

	it('opens reject dialog when reject button is clicked', async () => {
		const user = userEvent.setup()
		render(<ModerationActions adId={1} />, { wrapper: createWrapper() })

		const rejectButton = screen.getByText('Отклонить')
		await user.click(rejectButton)

		await waitFor(() => {
			expect(screen.getByText('Отклонение')).toBeInTheDocument()
		})
	})

	it('opens request changes dialog when request button is clicked', async () => {
		const user = userEvent.setup()
		render(<ModerationActions adId={1} />, { wrapper: createWrapper() })

		const requestButton = screen.getByText('Доработка')
		await user.click(requestButton)

		await waitFor(() => {
			expect(screen.getByText('Запрос доработки')).toBeInTheDocument()
		})
	})

	it('shows validation error when submitting reject form without reason', async () => {
		const user = userEvent.setup()
		render(<ModerationActions adId={1} />, { wrapper: createWrapper() })

		const rejectButton = screen.getByText('Отклонить')
		await user.click(rejectButton)

		await waitFor(() => {
			expect(screen.getByText('Отклонение')).toBeInTheDocument()
		})

		const submitButton = screen.getByText('Отправить')
		await user.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Выберите причину')).toBeInTheDocument()
		})
	})

	it('shows validation error when submitting request changes form without comment', async () => {
		const user = userEvent.setup()
		render(<ModerationActions adId={1} />, { wrapper: createWrapper() })

		const requestButton = screen.getByText('Доработка')
		await user.click(requestButton)

		await waitFor(() => {
			expect(screen.getByText('Запрос доработки')).toBeInTheDocument()
		})

		const submitButton = screen.getByText('Отправить запрос')
		await user.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText('Комментарий обязателен')).toBeInTheDocument()
		})
	})
})

