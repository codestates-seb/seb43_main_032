import { rest } from 'msw';
import users from './datas/users.json';
import { PROJECTS } from './dummy/project';

export const handlers = [
  rest.get('/test', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: 'hi' }));
  }),
  rest.get('/users', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
  rest.get('/users/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const user =
      typeof id === 'string' &&
      users.find((user) => user.MEMBER_ID === parseInt(id, 10));

    if (user) {
      return res(ctx.status(200), ctx.json(user));
    } else {
      return res(ctx.status(404), ctx.json({ error: 'User not found' }));
    }
  }),
  rest.get('/project/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const data = PROJECTS.find((project) => project.id === Number(id));
    return res(ctx.status(200), ctx.json(data));
  }),
];
