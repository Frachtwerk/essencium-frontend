import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_: NextApiRequest, res: NextApiResponse): void {
  res.status(200).json({ status: 'ok' })
}
