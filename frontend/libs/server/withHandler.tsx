import { NextApiRequest, NextApiResponse } from 'next';

interface IProps {
  method: 'GET' | 'POST' | 'DELETE';
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}
export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: IProps) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req?.session?.user)
      return res.status(400).json({ error: 'plz log in' });

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
