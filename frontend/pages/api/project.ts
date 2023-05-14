import { PROJECTS } from '@/datas/project';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { size, page } = req.query;
  const sizeNum = Number(size);
  const pageNum = Number(page);
  const total = PROJECTS.length;
  const data = PROJECTS.slice((pageNum - 1) * sizeNum, pageNum * sizeNum);
  return res.status(200).json({ data, total });
};

export default handler;
