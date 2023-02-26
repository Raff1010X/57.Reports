import type { NextApiRequest, NextApiResponse } from 'next';
import { IApiResponse } from '@/types/apiResponse';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse>
) {
    res.status(200).json({ status: 'error', message: `Not found: ${req.url}` });
}
