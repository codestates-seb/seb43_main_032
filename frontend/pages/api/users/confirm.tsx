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
  const { token } = req.body;
  console.log(token);
  console.log(process.env.COOCKIE_PASSWORD);
  // 입력된 token으로
  const foundToken = await client.signUpToken.findUnique({
    where: {
      payload: token,
    },
  });
  if (!foundToken) {
    return res.status(404).json({ ok: false });
  }
  await client.user.update({
    where: { id: foundToken.userId },
    data: { isVerified: true },
  });

  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();

  await client.signUpToken.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  return res.status(200).json({ ok: true });
}
export default withSession(withHandler({ method: 'POST', handler }));
