import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import withSession from '@/libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('user/me');
  const userId = req.session?.user?.id;
  // 세션에 사용자 ID가 없는 경우 에러 반환
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    // 사용자 정보를 조회함
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
        profileImageUrl: true,
        location: true,
        yearOfDev: true,
        position: true,
        aboutMe: true,
        stacks: true,
        roles: true,
        totalStar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    // 사용자 정보를 반환함
    return res.status(200).json(user);
  } catch (error) {
    // 에러 발생 시 에러 메시지를 반환함
    return res.status(500).json(console.log);
  }
}

export default withSession(withHandler({ method: 'GET', handler }));
