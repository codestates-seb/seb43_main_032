import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('apii', req.body.email);
  res.status(200).end();
}

export default withHandler('POST', handler);
