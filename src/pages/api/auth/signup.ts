import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("From endpoit: " + JSON.stringify(req.body))
  res.status(200).json(req.body)
}
