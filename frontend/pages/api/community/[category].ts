import { COMMUNITY } from '@/datas/community';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { size, page, search, category } = req.query;
  const sizeNum = Number(size);
  const pageNum = Number(page);
  const start = (pageNum - 1) * sizeNum;
  const end = pageNum * sizeNum;
  const filteredData = COMMUNITY.filter((p) => p.position === category);
  let data = filteredData;
  let total = filteredData.length;
  if (search) {
    data = filteredData.filter((p) => p.title.includes(search as string));
    total = data.length;
  }
  data = data.slice(start, end);
  return res.status(200).json({ data, total });
};

export default handler;
