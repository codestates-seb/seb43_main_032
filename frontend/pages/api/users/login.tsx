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
  const { email, password } = req.body;
  console.log(email, password);
  console.log(process.env.COOCKIE_PASSWORD);
  // 입력된 token으로
  const foundUser = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!foundUser) {
    return res.status(404).json({ ok: false, msg: 'user not found' });
  }
  if (password !== foundUser.password) {
    return res.status(404).json({ ok: false, msg: 'wrong password' });
  }
  req.session.user = {
    id: foundUser.id,
  };
  await req.session.save();
  return res.status(200).json({ ok: true });
}
export default withSession(withHandler({ method: 'POST', handler }));
