import { POST_STATE, PROJECTS } from '@/datas/project';
import { NextApiRequest, NextApiResponse } from 'next';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

//post_state 관련 보완 필요함
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const idNum = Number(id);
  const data = req.body;
  const post_data = PROJECTS.find((project) => project.id === idNum);
  const job = post_data?.jobs.find((job) => Object.keys(job)[0] === data.job);
  if (data.update === 'want' && job) {
    const jobData = Object.values(job)[0];
    if (jobData.current < jobData.want) {
      jobData.current = jobData.current + 1;
    }
    const post_state = POST_STATE.find((project) => project.id === idNum);
    if (post_state) {
      post_state.want = data.job;
    }
    return res.status(200).json({ post_state });
  }
  if (data.update === 'cancle' && job) {
    const jobData = Object.values(job)[0];
    if (jobData.current > 0) {
      jobData.current = jobData.current - 1;
    }
    const post_state = POST_STATE.find((project) => project.id === idNum);
    if (post_state) {
      post_state.want = '';
    }
    return res.status(200).json({ post_state });
  }
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  jsonParser(req, res, () => handler(req, res));
