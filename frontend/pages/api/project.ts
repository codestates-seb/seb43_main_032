import { PROJECTS } from '@/datas/project';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const url = new URL(req.url!);
  // const size = Number(url.searchParams.get('size'));
  // const page = Number(url.searchParams.get('page'));
  // const total = PROJECTS.length;
  // const data = PROJECTS.slice((page - 1) * size, page * size);
  return res.status(200).json(PROJECTS);
}
