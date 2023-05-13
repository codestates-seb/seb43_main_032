import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id: userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Missing user id' });
  }

  try {
    const user = await client.user.findUnique({
      where: {
        id: Number(userId),
      },
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

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).end();
  }
}

export default withHandler({ method: 'GET', handler, isPrivate: false });
