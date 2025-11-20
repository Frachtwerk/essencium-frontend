import { z } from 'zod'

import { stringSchema } from './base'

export const OpenInput = {
  Issue: 'issue',
  Idea: 'idea',
  Other: 'other',
} as const

export type OpenInputTypeValues = (typeof OpenInput)[keyof typeof OpenInput]

export const baseFeedbackFormSchema = z.object({
  firstName: stringSchema,
  lastName: stringSchema,
  email: z.email(),
  feedbackType: z.enum([OpenInput.Issue, OpenInput.Idea, OpenInput.Other]),
  message: z.string().min(10, 'validation.feedbackWidget.message'),
  screenshot: z.string().optional(),
  path: stringSchema,
})

export const additionalPropertiesSchema = stringSchema

export const feedbackFormSchema = baseFeedbackFormSchema.catchall(
  additionalPropertiesSchema,
)

export type FeedbackInput = z.infer<typeof feedbackFormSchema>

export type FeedbackOutput = FeedbackInput
