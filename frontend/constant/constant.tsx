import { ArrObj, DefaultObj } from '@/types/types';

export const STACKS_CATEGORIES: DefaultObj = {
  language: '언어',
  front: '프론트엔드',
  backend: '백엔드',
  game: '게임',
  mobile: '모바일',
  communication: '커뮤니케이션',
  etc: '기타',
};

export const STACKS: ArrObj[] = [
  {
    language: [
      'php',
      'python',
      'ruby',
      'swift',
      'type_scriypt',
      'csharp',
      'cplus',
      'c',
      'go',
      'java',
      'java_script',
      'kotlyn',
    ],
  },
  {
    front: [
      'nuxt',
      'react',
      'react_query',
      'recoil',
      'redux',
      'redux_saga',
      'remix',
      'sass',
      'styled_components',
      'svelt',
      'tailwind',
      'vite',
      'vue',
      'webpack',
      'angular',
      'axios',
      'bootstrap',
      'css',
      'html',
      'jest',
      'imotion',
      'jquery',
      'mobx',
      'next_js',
    ],
  },
  {
    backend: [
      'node',
      'oracle_db',
      'postgre_sql',
      'redis',
      'spring',
      'spring_boot',
      'tomcat',
      'arango_db',
      'django',
      'docker',
      'ejs',
      'express',
      'firebase',
      'h2_db',
      'jpa',
      'jsp',
      'graph_ql',
      'kubernetes',
      'maria_db',
      'mysql',
      'mongo_db',
      'nest_js',
    ],
  },
  { game: ['unity'] },
  { mobile: ['react_native', 'expo', 'flutter'] },
  {
    communication: ['notion', 'source_tree', 'github', 'git', 'jira', 'figma'],
  },
  {
    etc: [
      'nginx',
      'postman',
      'prettier',
      'storybook',
      'aws',
      'aws_ec2',
      'aws_route53',
      'aws_lambda',
      'aws_s3',
      'eslint',
    ],
  },
];

export const PROJECT_EX = (
  <div className="explanation-box">
    <div className="nanum-bold title">모집 글 작성은 이렇게 해주세요.</div>
    <div className="sub">
      무슨 프로젝트를 계획하고 구상했는지, 그리고 어떤 계획으로 진행할 것인지
      최대한 상세히 적어주세요.
    </div>
    <div>
      <ul>
        <li>기간, 태그, 스택, 직군들을 상세하게 기입해주시면 좋아요.</li>
        <li>간략하게 작성하기보다는 최대한 자세하게 적어주시면 좋아요.</li>
        <li>중요한 내용들은 임팩트를 주시면 좋아요.</li>
      </ul>
    </div>
  </div>
);

export const COMMUNITY_EX = (
  <div className="explanation-box">
    <div className="nanum-bold title">질문 전, 좋은 질문이란 이렇습니다.</div>
    <div className="sub">
      더 좋은 질문은 답변자들에게 더 좋은 답변을 이끌어 낼 수 있습니다. 좋은
      답변으로 작성자님의 궁금증을 해결할 수 있게 참고해주세요.
    </div>
    <div>
      <ul>
        <li>
          어떤 곤란함을 겪고 있으며, 이를 해결하기 위해 어떠한 시도를 했는지
          자세히 설명해주세요.
        </li>
        <li>
          충분한 고민과 검색을 동반한 후, 질문을 부탁드려요. 이러한 과정이
          동반된 질문은 작성자와 답변자들에게 좋은 질문과 답변 역할을 할 수
          있습니다.
        </li>
      </ul>
    </div>
  </div>
);

export const POSITIONS = [
  '프론트엔드',
  '백엔드',
  'UI/UX',
  '기획',
  '디자이너',
  'PM',
  '사업기획',
  '마케팅',
  '안드로이드',
  'IOS',
  '무관',
];

//나중에 객체의 형태로 바꿔서 주소를 넣어주는 작업을 해야할 것 같음
export const FOOTER_DATA: ArrObj = {
  information: [
    '1:1 문의 카카오톡 연결',
    '상담 사이드퀘스트 운영자 연결',
    '오픈챗 코드 7777',
    '제휴문의 help@sideQues.com',
    `Copyright©2023 SideQuest.All rights reserved.`,
  ],
  about: ['SideQuest 소개'],
  service: ['프로젝트 등록', '프로젝트 찾기', '파트너 등록'],
  support: ['서비스 이용약관', '개인정보처리방침', 'FAQ'],
};

export const COMMUNITY_FILTER = [
  { value: 'sorted', label: '최신 순' },
  { value: 'star', label: '스크랩 순' },
  { value: 'view', label: '조회수 순' },
  { value: 'comment', label: '댓글 순' },
];
