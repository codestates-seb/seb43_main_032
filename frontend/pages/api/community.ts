import { COMMUNITY } from '@/datas/community';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const url = new URL(req.url!);
  // const size = Number(url.searchParams.get('size'));
  // const page = Number(url.searchParams.get('page'));
  // const start = (page - 1) * size;
  // const search = url.searchParams.get('search');
  // const end = page * size;
  // let filteredData = COMMUNITY;
  // if (search !== null) {
  //   filteredData = COMMUNITY.filter((p) => p.title.includes(search));
  // } else {
  //   filteredData = COMMUNITY;
  // }
  // const data = filteredData.slice(start, end);
  // const total = filteredData.length;
  return res.status(200).json(COMMUNITY);
}
