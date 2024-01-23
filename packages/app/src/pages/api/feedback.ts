/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { feedbackFormSchema, FeedbackInput } from '@frachtwerk/essencium-types'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const RequestMethods = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const

export async function sendFeedbackEmail(
  feedback: FeedbackInput,
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    attachments: feedback?.screenshot
      ? [
          {
            filename: 'screenshot.png',
            content: feedback.screenshot.split('base64,')[1],
            encoding: 'base64',
          },
        ]
      : [],
    subject: 'New Feedback Submission',
    text: `The following feedback was submitted:
    User: ${feedback.firstName} ${feedback.lastName}
    Email: ${feedback.email}
    Type: ${feedback.feedbackType}
    Path: ${feedback.path}
    Message: ${feedback.message}  
    `,
  }

  await transporter.sendMail(mailOptions)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === RequestMethods.POST) {
    const feedback = req.body

    const isFeedbackValid = feedbackFormSchema.safeParse(feedback)

    if (!isFeedbackValid.success) {
      return res.status(400).json({
        message: "Feedback couldn't be sent",
        receivedData: feedback,
        errors: isFeedbackValid.error,
      })
    }

    await sendFeedbackEmail(feedback)

    return res.status(200).json({
      message: 'Feedback has been sent successfully',
      receivedData: feedback,
    })
  }

  res.status(405).end()
}
