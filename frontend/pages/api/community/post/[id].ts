import { NextApiRequest, NextApiResponse } from 'next';
import { COMMUNITY } from '@/datas/community';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const idNum = Number(id);
  const data = COMMUNITY.find((project) => project.id === idNum);
  return res.status(200).json({ data });
};

export default handler;
