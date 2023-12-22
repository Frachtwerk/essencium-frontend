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

import { FeedbackInput } from '@frachtwerk/essencium-types'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export async function sendFeedbackEmail(
  feedback: FeedbackInput,
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'rusty.yost13@ethereal.email',
      pass: 'pUvWGKuQVHEWAwx7Y3',
    },
  })

  const mailOptions = {
    from: 'rusty.yost13@ethereal.email',
    to: 'rusty.yost13@ethereal.email',
    subject: 'New Feedback Submission',
    text: `The following feedback was submitted:
    User: ${feedback.firstName} ${feedback.lastName}
    Email: ${feedback.email}
    Type: ${feedback.feedbackType}
    Message: ${feedback.message}
    `,
  }

  await transporter.sendMail(mailOptions)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === 'POST') {
    const feedback = req.body

    await sendFeedbackEmail(feedback)

    res.status(200).json({
      message: 'data received successfully',
      receivedData: feedback,
    })
  } else {
    res.status(405).end()
  }
}
