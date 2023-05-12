import mail from '@sendgrid/mail';
import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

mail.setApiKey(process.env.SENDGRID_API!);
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;
  console.log(token);

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

  await client.signUpToken.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  return res.status(200).json({ ok: true });
  // req.session.user = await {
  //   id: foundToken.userId,
  // };
  // await req.session.save();

  // await client.signUpToken.deleteMany({
  //   where: {
  //     userId: foundToken.userId,
  //   },
  // });
}

export default withHandler({ method: 'POST', handler, isPrivate: false });
