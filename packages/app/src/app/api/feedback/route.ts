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

import {
  baseFeedbackFormSchema,
  feedbackFormSchema,
  FeedbackInput,
} from '@frachtwerk/essencium-types'
import nodemailer from 'nodemailer'

const fixedFeedbackProperties = Object.keys(baseFeedbackFormSchema.shape)

async function sendFeedbackEmail(feedback: FeedbackInput): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const formattedFeedback = `
The following feedback was submitted:

  User: ${feedback.firstName} ${feedback.lastName}
  Email: ${feedback.email}
  Type: ${feedback.feedbackType}
  Path: ${feedback.path}
  Message: ${feedback.message}
${Object.keys(feedback)
  .filter(key => !fixedFeedbackProperties.includes(key))
  .map(
    key => `  ${key.charAt(0).toUpperCase() + key.slice(1)}: ${feedback[key]}`,
  )
  .join('\n')}
`

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
    text: formattedFeedback,
  }

  await transporter.sendMail(mailOptions)
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json()

    if (!feedbackFormSchema.safeParse(body).success) {
      return new Response("Feedback couldn't be sent", {
        status: 400,
      })
    }

    await sendFeedbackEmail(body)

    return new Response(
      JSON.stringify({
        message: 'Feedback has been sent successfully',
        receivedData: body,
      }),
      {
        status: 200,
      },
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(error.message, {
      status: 400,
    })
  }
}
