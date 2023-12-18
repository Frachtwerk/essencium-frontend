import { z } from 'zod'

import { UserOutput } from '.'

/* export const OpenInput = {
  Issue: 'feedbackWidget.issue',
  Idea: 'feedbackWidget.idea',
  Other: 'feedbackWidget.other',
} as const */

export const OpenInput = {
  Issue: 'issue',
  Idea: 'idea',
  Other: 'other',
} as const

export type OpenInputTypeValues = (typeof OpenInput)[keyof typeof OpenInput]

export const feedbackFormSchema = z.object({ message: z.string().min(10) })

export type FeedbackFormType = z.infer<typeof feedbackFormSchema>

export type FeedbackInput = {
  firstName: UserOutput['firstName']
  lastName: UserOutput['lastName']
  email: UserOutput['email']
  feedbackType: OpenInputTypeValues
  message: string
}

export type FeedbackOutput = FeedbackInput
