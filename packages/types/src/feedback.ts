import { z } from 'zod'

export const OpenInput = {
  Issue: 'issue',
  Idea: 'idea',
  Other: 'other',
} as const

export type OpenInputTypeValues = (typeof OpenInput)[keyof typeof OpenInput]

export const baseFeedbackFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  feedbackType: z.enum([OpenInput.Issue, OpenInput.Idea, OpenInput.Other]),
  message: z.string({ required_error: 'feedbackWidget.requiredError' }).min(10),
  screenshot: z.string().optional(),
  path: z.string(),
})

export const additionalPropertiesSchema = z.string()

export const feedbackFormSchema = baseFeedbackFormSchema.catchall(
  additionalPropertiesSchema,
)

export type FeedbackInput = z.infer<typeof feedbackFormSchema>

export type FeedbackOutput = FeedbackInput
