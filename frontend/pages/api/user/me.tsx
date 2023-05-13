import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import withSession from '@/libs/server/withSession';

import { NextApiRequest, NextApiResponse } from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.session.user);
  if (req.session.user) {
    return res.status(200).json({ ok: true });
  }
  return res.status(400).json({ ok: false });
}
export default withSession(withHandler({ method: 'GET', handler }));
