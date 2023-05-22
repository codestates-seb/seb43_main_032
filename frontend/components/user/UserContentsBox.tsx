import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import ContentCard from './UserProjectCard';
import ProjectCard from '../project/ProjectCard';
import { Project } from '@/types/project';
import UserProjectCard from './UserProjectCard';
import UserPostCard from './UserPostCard';

interface IProps {
  contentTitle: string[];
  contents?: any;
}

export default function UserContentsBox({ contentTitle, contents }: IProps) {
  const [filter, setFilter] = useState(contentTitle[0]);

  // const {
  //   getUserById: { data: user, isLoading },
  //   getProjectByUserId: { data: projects },
  // 	getPostsByUserId:{data:posts}
  // } = useUser({ id })

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    setFilter(name);
  };
  return (
    <Wrapper>
      <Category>
        <FilterBtn name={contentTitle[0]} onClick={handleClick}>
          {contentTitle[0]}
        </FilterBtn>
        <FilterBtn name={contentTitle[1]} onClick={handleClick}>
          {contentTitle[1]}
        </FilterBtn>
      </Category>
      <Contents>
        {filter === contentTitle[0] ? (
          <>
            {[1, 2, 3].map((el) => (
              <UserProjectCard key={el} project={dummyProject} />
            ))}
          </>
        ) : (
          <>
            {/* {posts.map((post) => (
					<CommunityCardBox key={post.id} title={post.title} data={post}>
				<Skeleton/>
				</CommunityCardBox>
				))} */}
            {[1, 2, 3].map((el) => (
              <UserPostCard key={el} post={dummyPost} />
            ))}
          </>
        )}
      </Contents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
  margin-bottom: 20px;
`;

const Contents = styled.div`
  background: #0d1117;
  color: #c9d1d9;
  font-size: 15px;
  padding: var(--padding-2);
  border: 1px solid #d8d8d8;
  border-radius: var(--radius-def);
`;
const ContentTitle = styled.div.attrs({
  className: 'nanum-bold',
})`
  padding-bottom: 20px;
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
})`
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-family: var(--font-nanum);
  font-size: 23px;
  font-weight: 700;
  color: #464646;
  background: none;
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
