import { POST_STATE, PROJECTS } from '@/datas/project';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

//post_state 관련 보완 필요함
const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const idNum = Number(id);
  if (req.method === 'PUT') {
    const data = req.body;
    const projectIndex = PROJECTS.findIndex(
      (project) => project.id === Number(id)
    );
    PROJECTS[projectIndex] = { ...PROJECTS[projectIndex], ...data };
    return res.status(200).json({ id });
  }
  const post_data = PROJECTS.find((project) => project.id === Number(idNum));
  const post_state = POST_STATE.find((project) => project.id === Number(idNum));
  return res.status(200).json({ post_data, post_state });
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  jsonParser(req, res, () => handler(req, res));
};
