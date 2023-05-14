import { COMMUNITY } from '@/datas/community';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { size, page, search } = req.query;
  const sizeNum = Number(size);
  const pageNum = Number(page);
  const start = (pageNum - 1) * sizeNum;
  const end = pageNum * sizeNum;
  let filteredData = COMMUNITY;
  if (search) {
    filteredData = COMMUNITY.filter((p) => p.title.includes(search as string));
  } else {
    filteredData = COMMUNITY;
  }
  const data = filteredData.slice(start, end);
  const total = filteredData.length;
  return res.status(200).json({ data, total });
};

export default handler;
