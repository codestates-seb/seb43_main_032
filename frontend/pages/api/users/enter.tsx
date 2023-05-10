import client from '@/libs/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nickName, passWord, email } = req.body;
  const user = await client.user.findUnique({
    where: { email },
  });
  if (!user) {
    await client.user.create({
      data: {
        nickName,
        passWord,
        email,
      },
    });
  }
  console.log(user);
}
