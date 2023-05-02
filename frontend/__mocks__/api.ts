import { rest } from 'msw';

export const handlers = [
  rest.get('/test', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: 'hi' }));
  }),
  // rest.post('/login', async (req, res, ctx) => {
  //   const data = req.json();
  //   return res(ctx.status(200), ctx.json({ result: data }));
  // }),
];
