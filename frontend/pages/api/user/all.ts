import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 12;

  try {
    const users = await client.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        profileImageUrl: true,
        location: true,
        yearOfDev: true,
        position: true,
        aboutMe: true,
        stacks: true,
        roles: true,
        totalStar: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(console.log);
  }
}

export default withHandler({ method: 'GET', handler, isPrivate: false });
