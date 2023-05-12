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

  // umail로 유저 찾기
  const foundUser = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!foundUser) {
    return res.status(404).json({ ok: false, msg: 'user not found' });
  }

  // 찾은 유저의 비밀번호 검증
  const bcrypt = require('bcrypt');
  if (!bcrypt.compare(foundUser.password, password)) {
    return res.status(404).json({ ok: false, msg: 'wrong password' });
  }

  // 유저 인증 후, 유저 정보 session에 저장
  req.session.user = {
    id: foundUser.id,
  };
  await req.session.save();

  // 로그인 성공 응답.
  return res.status(200).json({ ok: true });
}

export default withSession(withHandler({ method: 'POST', handler }));
