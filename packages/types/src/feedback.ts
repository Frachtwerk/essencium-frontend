import { z } from 'zod'

export const OpenInput = {
  Issue: 'issue',
  Idea: 'idea',
  Other: 'other',
} as const

export type OpenInputTypeValues = (typeof OpenInput)[keyof typeof OpenInput]

export const feedbackFormSchema = z.object({
  message: z.string({ required_error: 'feedbackWidget.requiredError' }).min(10),
})

export type FeedbackFormType = z.infer<typeof feedbackFormSchema>

export type FeedbackInput = {
  firstName: string
  lastName: string
  email: string
  feedbackType: OpenInputTypeValues
  message: string
  screenshot: string
  path: string
}

export type FeedbackOutput = FeedbackInput
