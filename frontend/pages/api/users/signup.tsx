import mail from '@sendgrid/mail';
import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

mail.setApiKey(process.env.SENDGRID_API!);
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, nickName, password } = req.body;
  console.log(process.env.SENDGRID_API!);

  // 같은 email을 가진 User가 있는지 확인.
  const existingUser = await client.user.findUnique({ where: { email } });

  // User를 찾으면 conflict code (409) 응답.
  if (existingUser) {
    console.log('user is already exsist');
    return res.status(409).end();
  }

  // Token과 인증되지 않은 User 생성
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  console.log(payload);
  const token = await client.signUpToken.create({
    data: {
      payload,
      user: {
        create: {
          email,
          nickName,
          password,
        },
      },
    },
  });
  console.log(token);
  mail
    .send({
      to: email,
      from: 'naturalcall1313@gmail.com',
      subject: 'Verify Code for Sign Up to SideQuest',
      html: `Your verify Code is <strong>${payload}</strong>`,
    })
    .then(() => {
      console.log('Email sent=============', email);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default withHandler('POST', handler);

// 토큰 생성 시 중복 토큰을 확인 후 토큰 반환
async function tokenGenerator(): Promise<string> {
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const foundToken = await client.signUpToken.findUnique({
    where: { payload },
  });
  if (foundToken) {
    return await tokenGenerator();
  }
  return payload;
}
