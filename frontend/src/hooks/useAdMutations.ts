import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
	approveAd,
	rejectAd,
	requestChanges,
} from '@/lib/api/ads'
import type {
	RejectAdMutationParams,
	RequestChangesMutationParams,
} from '@/types'

// хук для одобрения объявления
// после успешного одобрения обновляем кэш и статистику
export function useApproveAd() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: number) => approveAd(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['ads'] })
			queryClient.setQueryData(['ads', data.id], data)
			queryClient.invalidateQueries({ queryKey: ['stats'] })
		},
	})
}

// хук для отклонения объявления с указанием причины
export function useRejectAd() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: RejectAdMutationParams) =>
			rejectAd(id, data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['ads'] })
			queryClient.setQueryData(['ads', data.id], data)
			queryClient.invalidateQueries({ queryKey: ['stats'] })
		},
	})
}

// хук для отправки объявления на доработку
// после успешной отправки обновляем кэш и статистику
export function useRequestChanges() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, data }: RequestChangesMutationParams) =>
			requestChanges(id, data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['ads'] })
			queryClient.setQueryData(['ads', data.id], data)
			queryClient.invalidateQueries({ queryKey: ['stats'] })
		},
	})
}

