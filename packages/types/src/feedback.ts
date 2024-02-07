import { z } from 'zod'

export const OpenInput = {
  Issue: 'issue',
  Idea: 'idea',
  Other: 'other',
} as const

export type OpenInputTypeValues = (typeof OpenInput)[keyof typeof OpenInput]

export const feedbackFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  feedbackType: z.enum([OpenInput.Issue, OpenInput.Idea, OpenInput.Other]),
  message: z.string({ required_error: 'feedbackWidget.requiredError' }).min(10),
  screenshot: z.string(),
  path: z.string(),
})

export type FeedbackInput = z.infer<typeof feedbackFormSchema>

export type FeedbackOutput = FeedbackInput
