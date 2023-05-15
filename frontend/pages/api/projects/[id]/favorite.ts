import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import withSession from '@/libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    body: { projectId },
  } = req;

  if (!user) {
    return res.status(404).json('user not found');
  }

  const userId = user.id;

  const existingFavorite = await client.projectFav.findFirst({
    where: {
      AND: [{ userId: userId }, { projectId: projectId }],
    },
  });

  if (existingFavorite) {
    await client.projectFav.delete({
      where: { id: existingFavorite.id },
    });
  } else {
    await client.projectFav.create({
      data: { userId: userId, projectId: projectId },
    });
  }

  return res.status(200).json({ ok: true });
}
export default withSession(
  withHandler({ method: 'POST', handler, isPrivate: false })
);
