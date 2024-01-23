import { FeedbackInput, FeedbackOutput } from '@frachtwerk/essencium-types'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

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
        .post<FeedbackOutput, FeedbackInput>('/api/feedback', newFeedback, {
          baseURL: '/',
        })
        .then(response => response.data),
  })

  return mutation
}
