import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import withSession from '@/libs/server/withSession';
import { ProjectJob, ProjectStack, ProjectTag } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    body: { start, end, tags, stacks, jobs, title, content },
  } = req;

  if (!user) {
    return res.status(404).json('user not found');
  }
  const userId = user?.id;
  // 새로운 프로젝트 생성
  const newProject = await client.project.create({
    data: {
      userId,
      start,
      end,
      tags: {
        create: tags.map((name: ProjectTag) => ({
          name,
        })),
      },
      stacks: {
        create: stacks.map((name: ProjectStack) => ({
          name,
        })),
      },
      jobs: {
        create: jobs.map((job: ProjectJob) => ({
          key: job.key,
          want: +job.want,
          current: +job.current,
        })),
      },
      title,
      content,
      // createdAt: new Date(),
      // updatedAt: new Date(),
    },
  });

  return res.status(200).json({ ok: true, newProject });
}

export default withSession(withHandler({ method: 'POST', handler }));
