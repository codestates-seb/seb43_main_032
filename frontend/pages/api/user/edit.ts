import client from '@/libs/client/client';
import withHandler from '@/libs/server/withHandler';
import withSession from '@/libs/server/withSession';

import { NextApiRequest, NextApiResponse } from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('eidt running');
  const {
    session: { user },
    body: {
      name,
      profileImageUrl,
      location,
      yearOfDev,
      position,
      aboutMe,
      stacks,
      phone,
      email,
      roles,
      totalStar,
    },
  } = req;
  console.log('edit', user);
  if (!user) {
    return res.status(404).json('user not found');
  }
  const dataToUpdate = {
    ...(name ? { name } : {}),
    ...(profileImageUrl ? { profileImageUrl } : {}),
    ...(location ? { location } : {}),
    ...(yearOfDev ? { yearOfDev: Number(yearOfDev) } : {}),
    ...(position ? { position } : {}),
    ...(aboutMe ? { aboutMe } : {}),
    ...(stacks ? { stacks } : {}),
    ...(roles ? { roles } : {}),
    ...(phone ? { phone } : {}),
    ...(email ? { email } : {}),
    ...(totalStar ? { totalStar } : {}),
  };

  const updatedUser = await client.user.update({
    where: {
      id: +user.id,
    },

    data: dataToUpdate,
    select: {
      id: true,
      name: true,
      profileImageUrl: true,
      location: true,
      yearOfDev: true,
      position: true,
      aboutMe: true,
      stacks: true,
      roles: true,
      totalStar: true,
    },
  });
  res.status(200).json({ ok: true, updatedUser });
}
export default withSession(withHandler({ method: 'POST', handler }));

interface IUpdatedUser {
  id: number;
  name: string;
  profileImageUrl: string;
  location: string;
  yearOfDev: number;
  position: string;
  aboutMe: string;
  stacks: string;
  roles: string;
  totalStar: number;
}

export interface IUSerEdit {
  ok: boolean;
  updatedUser: IUpdatedUser;
}
