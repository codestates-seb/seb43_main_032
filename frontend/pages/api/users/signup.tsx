import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, nickName, password } = req.body;
  const user = await client.user.upsert({
    where: {
      email,
    },
    create: {
      email,
      nickName,
      passWord: password,
    },
    update: {},
  });
  res.status(200).end();
}

export default withHandler('POST', handler);
