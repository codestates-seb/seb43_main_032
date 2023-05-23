import React, { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProjectCard from './UserProjectCard';
import UserPostCard from './UserPostCard';
import Pagenation from '../Pagenation';
import useUser from '@/hooks/react-query/useUser';
import { useRouter } from 'next/router';
import { useAllData } from '@/hooks/react-query/useAllData';

interface IProps {
  contentTitle: string[];
  contents?: any;
}

export default function UserContentsBox({ contentTitle, contents }: IProps) {
  const router = useRouter();
  const lastUrl = router.asPath.split('/').pop();
  const [id, setId] = useState<number>(0);
  const [filter, setFilter] = useState(contentTitle[0]);
  const [page, setPage] = useState<number>(1);

  const { projectData, communityData } = useAllData();
  const {
    getMyInfo: { data: me },
    getProjectByUserId: { data: projects },
    getPostsByUserId: { data: posts },
  } = useUser({ id, page, pageSize: 3, projectData, communityData });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    setPage(1);
    setFilter(name);
  };
  useEffect(() => {
    if (lastUrl && !(lastUrl === 'me')) {
      setId(+lastUrl);
    } else {
      console.log(me);
      setId(me.memberId);
    }
  }, [lastUrl, me]);

  if (id === 0) return <h1>Loading...</h1>;
  return (
    <Wrapper>
      <Category>
        {contentTitle.map((title) => (
          <FilterBtn name={title} filter={filter} onClick={handleClick}>
            {title}
          </FilterBtn>
        ))}
      </Category>
      <Contents>
        {filter === '프로젝트' && (
          <>
            {projects &&
              projects.map((project) => (
                <UserProjectCard key={project.projectId} project={project} />
              ))}
          </>
        )}
        {filter === '게시글' && (
          <>
            {posts &&
              posts.map((post) => (
                <UserPostCard key={post.articleId} post={post} />
              ))}
          </>
        )}
      </Contents>
      <Pagenation page={page} pageSize={4} onPageChange={setPage} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
  margin-bottom: 20px;
`;

const Contents = styled.div`
  font-size: 15px;
  padding: var(--padding-2);
  border-radius: var(--radius-def);
  background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);

  margin-bottom: 20px;
`;
const Category = styled.div.attrs({
  className: 'noto-medium',
})`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;
const FilterBtn = styled.button.attrs({
  className: 'nanum-bold',
})<{ filter: string }>`
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-family: var(--font-nanum);
  font-size: 23px;
  font-weight: 700;
  /* color: #464646; */
  background: none;
  color: ${(props) => (props.filter === props.name ? '#8a2be2' : '#464646')};
`;

const dummyProject = {
  filter: 'dummyFilter',
  content: 'This is a dummy content',
  createdAt: '2023-05-20',
  endDate: '2023-12-31',
  projectId: 1,
  startDate: '2023-06-01',
  status: 'open',
  techList: [
    'java_script',
    'react',
    'next_js',
    'recoil',
    'react_query',
    'type_scriypt',
  ],
  title: 'Dummy project',
  totalAnswers: 5,
  totalLikes: 20,
  views: 100,
  writerPosition: 'Front-end Developer',
  liked: false,
  author: false,
};

const dummyPost = {
  articleId: 1,
  category: 'Frontend',
  content:
    'RESTful API에서 "자원"은 웹 서비스에서 제공되는 데이터 또는 개체를 나타냅니다. 이는 클라이언트가 요청하고 응답으로 받을 수 있는 실제 데이터이며, 각각의 자원은 고유한 식별자(URI)를 가지고 있습니다.RESTful API에서 자원은 URI(Uniform Resource Identifier)를 통해 식별됩니다. URI는 각 자원에 대한 고유한 주소를 나타내며, 클라이언트는 URI를 사용하여 특정 자원에 접근하고 조작할 수 있습니다.',
  createdAt: '2023-05-20T10:30:00Z',
  memberInfo: {
    memberId: 123,
    memberName: 'John Doe',
    memberLevel: 3,
    memberProfile: 'https://example.com/profile/johndoe',
  },
  techList: [
    'java_script',
    'react',
    'next_js',
    'recoil',
    'react_query',
    'type_scriypt',
  ],
  title: '프론트엔드 개발자들 모여주세요!',
  totalAnswers: 5,
  totalLikes: 10,
  view: 100,
  liked: true,
  author: true,
};
