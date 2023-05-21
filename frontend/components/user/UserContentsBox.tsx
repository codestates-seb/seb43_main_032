import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import ContentCard from './ContentCard';
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
interface IProps {
  id: number;
  contents: string[];
}
export default function UserContentsBox({ id, contents }: IProps) {
  const [filter, setFilter] = useState(contents[0]);

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
        <FilterBtn name={contents[0]} onClick={handleClick}>
          {contents[0]}
        </FilterBtn>
        <FilterBtn name={contents[1]} onClick={handleClick}>
          {contents[1]}
        </FilterBtn>
      </Category>
      <Contents>
        {filter === contents[0] ? (
          <>
            {/* {projects.map((project) => (
					<ProjectCard key={project.id} size="md" data={project} />
				))} */}
            {[1, 2, 3].map((el) => (
              <ContentCard key={el} />
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
              <ContentCard key={el} />
            ))}
          </>
        )}
      </Contents>
    </Wrapper>
  );
}
