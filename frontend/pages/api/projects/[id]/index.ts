import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  // ID가 제공되지 않은 경우 에러 반환
  if (!id) {
    return res.status(400).json({ error: 'Missing project id' });
  }

  try {
    // 특정 프로젝트 검색
    const project = await client.project.findUnique({
      where: { id: Number(id) },
    });

    // 프로젝트가 없는 경우 에러 반환
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // 검색된 프로젝트 반환
    return res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the project' });
  }
}

export default withHandler({ method: 'GET', handler });
