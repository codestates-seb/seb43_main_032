import { POST_STATE, PROJECTS } from '@/datas/project';
import { NextApiRequest, NextApiResponse } from 'next';

//post_state 관련 보완 필요함
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const idNum = Number(id);
  const post_data = PROJECTS.find((project) => project.id === idNum);
  const post_state = POST_STATE.find((project) => project.id === idNum);
  if (post_state?.heart && post_data) {
    post_data.heart = post_data.heart - 1;
    post_state.heart = false;
    return res.status(200).json({ post_state });
  }
  if (post_state?.heart === false && post_data) {
    post_data.heart = post_data.heart + 1;
    post_state.heart = true;
    return res.status(200).json({ post_state });
  }
};

export default handler;
