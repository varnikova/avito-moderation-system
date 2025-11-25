import { apiClient } from '../api-client'
import type { Moderator } from '@/types'

export async function fetchModerator(id: number): Promise<Moderator> {
	const response = await apiClient.get<Moderator>(`/moderators/${id}`)
	return response.data
}

