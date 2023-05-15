import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { title },
  } = req;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const projects = await client.project.findMany({
      where: {
        title: {
          contains: title as string,
        },
      },
    });

    return res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the projects' });
  }
}

export default withHandler({ method: 'GET', handler });
