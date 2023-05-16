import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { page = 1, pageSize = 10 },
  } = req;

  const numPage = +page;
  const numPageSize = +pageSize;

  if (numPage < 1) {
    return res.status(400).json({ error: 'Page must be greater than 0' });
  }

  try {
    const projects = await client.project.findMany({
      skip: (numPage - 1) * numPageSize,
      take: numPageSize,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the projects' });
  }
}

export default withHandler({ method: 'GET', handler, isPrivate: false });
