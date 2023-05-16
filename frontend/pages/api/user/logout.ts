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
  console.log('api logout', req.session.user);
  if (req.session.user) {
    delete req.session.user;
    await req.session.save();
    res.setHeader('Set-Cookie', `sideQuest=; Max-Age=0; Path=/;`);
    return res.status(200).json({ ok: true });
  }
  return res.status(400).json({ error: 'user not found' });
}
export default withSession(withHandler({ method: 'POST', handler }));
