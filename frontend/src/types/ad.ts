import type { Seller } from './seller'
import type { ModerationHistory } from './moderator'

export type AdStatus = 'pending' | 'approved' | 'rejected' | 'draft'

export type AdPriority = 'normal' | 'urgent'

export interface Ad {
	id: number
	title: string
	description: string
	price: number
	category: string
	categoryId: number
	status: AdStatus
	priority: AdPriority
	createdAt: string
	updatedAt: string
	images: string[]
	seller: Seller
	characteristics: Record<string, string>
	moderationHistory: ModerationHistory[]
}

