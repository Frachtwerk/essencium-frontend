import { FeedbackInput, FeedbackOutput } from '@frachtwerk/essencium-types'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { withBaseStylingShowNotification } from '@/utils'

import { api } from './api'

export function useCreateFeedback(): UseMutationResult<
  FeedbackOutput,
  AxiosError,
  FeedbackInput
> {
  const mutation = useMutation<FeedbackOutput, AxiosError, FeedbackInput>({
    mutationKey: ['useCreateFeedback'],
    mutationFn: (newFeedback: FeedbackInput) =>
      api
        .post<FeedbackOutput, FeedbackInput>(
          'http://localhost:3000/api/feedback',
          newFeedback,
        )
        .then(response => response.data),
    onSuccess: () => {
      withBaseStylingShowNotification({
        notificationType: 'created',
        color: 'success',
      })
    },
    onError: () => {
      withBaseStylingShowNotification({
        notificationType: 'created',
        color: 'error',
      })
    },
  })

  return mutation
}
