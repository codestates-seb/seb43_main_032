import { Project } from '@/types/types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    author: '김기획',
    start: new Date(),
    end: new Date(),
    tags: ['AI', '금융', '자율주행'],
    stacks: ['recoil', 'java'],
    jobs: [
      { 프론트엔드: { want: 3, current: 0 } },
      { 백엔드: { want: 3, current: 1 } },
    ],
    title: '한국 투자 증권 api로 플젝 해보실분?!!?',
    content:
      '우리 프로젝트 같이 하실분 구해요!!!!\n\n\n```\nconst Main = styled.div`\n  padding: var(--padding-1);\n  display: flex;\n``` \n # ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
    state: 1, // 1=모집 중, 2=모집 완료, 3=종료
    createAt: '2023년 4월 1일',
    view: 30,
    comment: [],
  },
];
