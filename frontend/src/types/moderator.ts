export type ModerationAction = 'approved' | 'rejected' | 'requestChanges'

export interface ModerationHistory {
	id: number
	moderatorId: number
	moderatorName: string
	action: ModerationAction
	reason: string | null
	comment: string
	timestamp: string
}

export interface ModeratorStats {
	totalReviewed: number
	todayReviewed: number
	thisWeekReviewed: number
	thisMonthReviewed: number
	averageReviewTime: number
	approvalRate: number
}

export interface Moderator {
	id: number
	name: string
	email: string
	role: string
	statistics: ModeratorStats
	permissions: string[]
}

