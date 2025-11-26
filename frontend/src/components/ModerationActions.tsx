import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Check, RefreshCcw, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
	useApproveAd,
	useRejectAd,
	useRequestChanges,
} from '@/hooks/useAdMutations'

interface ModerationActionsProps {
	adId: number
}

interface RejectFormValues {
	reason: string
	otherReason: string
	comment?: string
}

interface RequestChangesFormValues {
	comment: string
}

const LABELS = {
	APPROVE: 'Одобрить',
	REJECT: 'Отклонить',
	REQUEST_CHANGES: 'Вернуть на доработку',
	REJECT_TITLE: 'Отклонение',
	REASON_TITLE: 'Причина:',
	COMMENT_LABEL: 'Комментарий:',
	REASON_REQUIRED: 'Выберите причину',
	OTHER_PLACEHOLDER: 'Опишите причину',
	COMMENT_PLACEHOLDER: 'Добавьте комментарий для модератора',
	REQUEST_TITLE: 'Запрос доработки',
	REQUEST_COMMENT_PLACEHOLDER: 'Опишите, что нужно доработать',
	REQUEST_SUBMIT: 'Отправить запрос',
	REJECT_SUBMIT: 'Отправить',
	REQUEST_REQUIRED: 'Комментарий обязателен',
	APPROVE_SUCCESS: 'Объявление одобрено',
	REJECT_SUCCESS: 'Отклонение отправлено',
	REQUEST_SUCCESS: 'Запрос на доработку отправлен',
	ACTION_ERROR: 'Не удалось выполнить действие. Попробуйте позже.',
	OTHER_REQUIRED: 'Опишите причину в поле «Другое»',
}

const REJECTION_REASONS = [
	{ value: 'Запрещенный товар', label: 'Запрещенный товар' },
	{ value: 'Неверная категория', label: 'Неверная категория' },
	{ value: 'Некорректное описание', label: 'Некорректное описание' },
	{ value: 'Проблемы с фото', label: 'Проблемы с фото' },
	{ value: 'Подозрение на мошенничество', label: 'Подозрение на мошенничество' },
	{ value: 'Другое', label: 'Другое:' },
] as const

export function ModerationActions({ adId }: ModerationActionsProps) {
	const [isRejectOpen, setRejectOpen] = useState(false)
	const [isRequestOpen, setRequestOpen] = useState(false)

	const approveMutation = useApproveAd()
	const rejectMutation = useRejectAd()
	const requestChangesMutation = useRequestChanges()

	const rejectForm = useForm<RejectFormValues>({
		defaultValues: {
			reason: '',
			otherReason: '',
			comment: '',
		},
	})

	const requestForm = useForm<RequestChangesFormValues>({
		defaultValues: {
			comment: '',
		},
	})

	// Обработка одобрения
	const handleApprove = async () => {
		try {
			await approveMutation.mutateAsync(adId)
			toast.success(LABELS.APPROVE_SUCCESS)
		} catch (error) {
			toast.error(LABELS.ACTION_ERROR)
		}
	}

	// Обработка и валидация отклонения
	// Если выбрано "Другое", обязательно нужно заполнить поле
	const handleRejectSubmit = async (values: RejectFormValues) => {
		if (!values.reason) {
			rejectForm.setError('reason', {
				type: 'manual',
				message: LABELS.REASON_REQUIRED,
			})
			return
		}

		if (values.reason === 'Другое' && !values.otherReason.trim()) {
			rejectForm.setError('otherReason', {
				type: 'manual',
				message: LABELS.OTHER_REQUIRED,
			})
			return
		}

		// Вводим кастомную причину, если выбрано Другое
		const reasonText = values.reason === 'Другое' ? values.otherReason.trim() : values.reason

		try {
			await rejectMutation.mutateAsync({
				id: adId,
				data: {
					reason: reasonText,
					comment: values.comment?.trim() || undefined,
				},
			})
			toast.success(LABELS.REJECT_SUCCESS)
			setRejectOpen(false)
			rejectForm.reset()
		} catch (error) {
			toast.error(LABELS.ACTION_ERROR)
		}
	}

	const handleRequestSubmit = async (values: RequestChangesFormValues) => {
		try {
			await requestChangesMutation.mutateAsync({
				id: adId,
				data: {
					reason: 'Другое',
					comment: values.comment.trim(),
				},
			})
			toast.success(LABELS.REQUEST_SUCCESS)
			setRequestOpen(false)
			requestForm.reset()
		} catch (error) {
			toast.error(LABELS.ACTION_ERROR)
		}
	}


	return (
		<div className="space-y-4 rounded-lg bg-[var(--card)] p-6">
			<div className="flex flex-wrap justify-end gap-3">
				<Button
					variant="success"
					onClick={handleApprove}
					disabled={approveMutation.isPending}
				>
					<Check className="mr-2 h-4 w-4" aria-hidden="true" />
					{LABELS.APPROVE}
				</Button>

				<Dialog
					open={isRejectOpen}
					onOpenChange={(open) => {
						setRejectOpen(open)
						if (!open) {
							rejectForm.reset()
						}
					}}
				>
					<DialogTrigger asChild>
						<Button
							variant="destructive"
						>
							<X className="mr-2 h-4 w-4" aria-hidden="true" />
							{LABELS.REJECT}
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-2xl">
						<DialogHeader>
							<DialogTitle className="text-[var(--destructive)]">
								{LABELS.REJECT_TITLE}
							</DialogTitle>
						</DialogHeader>
						<form
							className="space-y-4"
							onSubmit={rejectForm.handleSubmit(handleRejectSubmit)}
						>
							<div className="space-y-3">
								<p className="text-sm font-medium text-[var(--foreground)]">
									{LABELS.REASON_TITLE}
								</p>
								<Controller
									name="reason"
									control={rejectForm.control}
									rules={{ required: LABELS.REASON_REQUIRED }}
									render={({ field }) => (
										<RadioGroup
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value)
												if (value !== 'Другое') {
													rejectForm.setValue('otherReason', '')
												}
											}}
										>
											<div className="grid gap-3">
												{REJECTION_REASONS.map((reason) => (
													<div key={reason.value} className="space-y-2">
														<div className="flex items-center gap-2">
															<RadioGroupItem value={reason.value} id={`reject-${reason.value}`} />
															<Label htmlFor={`reject-${reason.value}`} className="text-sm text-[var(--foreground)]">
																{reason.label}
															</Label>
														</div>
														{reason.value === 'Другое' && field.value === 'Другое' && (
															<Input
																placeholder={LABELS.OTHER_PLACEHOLDER}
																{...rejectForm.register('otherReason', {
																	validate: (value) => {
																		if (field.value === 'Другое' && !value.trim()) {
																			return LABELS.OTHER_REQUIRED
																		}
																		return true
																	},
																})}
															/>
														)}
													</div>
												))}
											</div>
										</RadioGroup>
									)}
								/>
								{rejectForm.formState.errors.reason && (
									<p className="text-sm text-[var(--destructive)]">
										{rejectForm.formState.errors.reason.message}
									</p>
								)}
								{rejectForm.formState.errors.otherReason && (
									<p className="text-sm text-[var(--destructive)]">
										{rejectForm.formState.errors.otherReason.message}
									</p>
								)}
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium text-[var(--foreground)]">
									{LABELS.COMMENT_LABEL}
								</p>
								<Textarea
									placeholder={LABELS.COMMENT_PLACEHOLDER}
									{...rejectForm.register('comment')}
								/>
							</div>
							<DialogFooter>
								<Button
									type="submit"
									variant="destructive"
									disabled={rejectMutation.isPending}
								>
									{LABELS.REJECT_SUBMIT}
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>

				<Dialog
					open={isRequestOpen}
					onOpenChange={(open) => {
						setRequestOpen(open)
						if (!open) {
							requestForm.reset()
						}
					}}
				>
					<DialogTrigger asChild>
						<Button variant="warning">
							<RefreshCcw className="mr-2 h-4 w-4" aria-hidden="true" />
							{LABELS.REQUEST_CHANGES}
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{LABELS.REQUEST_TITLE}</DialogTitle>
						</DialogHeader>
						<form
							className="space-y-4"
							onSubmit={requestForm.handleSubmit(handleRequestSubmit)}
						>
							<Textarea
								placeholder={LABELS.REQUEST_COMMENT_PLACEHOLDER}
								{...requestForm.register('comment', {
									required: LABELS.REQUEST_REQUIRED,
									minLength: {
										value: 5,
										message: 'Комментарий слишком короткий',
									},
								})}
							/>
							{requestForm.formState.errors.comment && (
								<p className="text-sm text-[var(--destructive)]">
									{requestForm.formState.errors.comment.message}
								</p>
							)}
							<DialogFooter>
								<Button
									type="submit"
									variant="warning"
									disabled={requestChangesMutation.isPending}
								>
									{LABELS.REQUEST_SUBMIT}
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}


