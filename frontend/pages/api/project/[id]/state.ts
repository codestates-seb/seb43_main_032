import { PROJECTS } from '@/datas/project';
import { NextApiRequest, NextApiResponse } from 'next';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

//post_state 관련 보완 필요함
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const idNum = Number(id);
  const data = req.body;
  const post_data = PROJECTS.find((project) => project.id === idNum);
  if (Number(data.data) === 2 && post_data) {
    post_data.state = 2;
  }
  if (Number(data.data) === 3 && post_data) {
    post_data.state = 3;
  }
  return res.status(200).json({ data });
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  jsonParser(req, res, () => handler(req, res));
