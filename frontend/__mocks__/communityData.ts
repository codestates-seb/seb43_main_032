import { rest } from 'msw';
import users from './datas/users.json';

export const postData = [
  rest.get('/posts', async (req, res, ctx) => {
    const example = [
      {
        page: 1,
        content: [
          {
            id: 1,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content:
              'lorem lipsum lorem lipsumlorem lipsumlorem lipsum lorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 2,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content:
              'lorem lipsum lorem lipsumlorem lipsumlorem lipsum lorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 3,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content:
              'lorem lipsum lorem lipsumlorem lipsumlorem lipsum lorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 4,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content:
              'lorem lipsum lorem lipsumlorem lipsumlorem lipsum lorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 5,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content:
              'lorem lipsum lorem lipsumlorem lipsumlorem lipsum lorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 6,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content:
              'lorem lipsum lorem lipsumlorem lipsumlorem lipsum lorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 7,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content:
              'lorem lipsum lorem lipsumlorem lipsumlorem lipsum lorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 8,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content:
              'lorem lipsum lorem lipsumlorem lipsumlorem lipsum lorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsumlorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
        ],
      },
      {
        page: 2,
        content: [
          {
            id: 9,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content: 'lorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 10,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content: 'lorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 11,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content: 'lorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 12,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content: 'lorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
          {
            id: 13,
            user: 'exms2837',
            score: 5,
            star: 1024,
            view: 594,
            title: 'React 작성 시 TypeScript 질문입니다.',
            tags: ['React', 'TypeScript', 'js'],
            content: 'lorem lipsum lorem lipsumlorem lipsumlorem lipsum',
          },
        ],
      },
    ];
    return res(ctx.status(200), ctx.json({ example }));
  }),
];
