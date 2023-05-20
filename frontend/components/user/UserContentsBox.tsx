import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import ContentCard from './ContentCard';
const Wrapper = styled.div``;

const Contents = styled.div`
  padding: 20px;
  border-radius: var(--radius-def);
  /* background-color: rgba(0, 0, 0, 0.2); */
`;
const ContentTitle = styled.h2.attrs({
  className: 'nanum-bold',
})`
  padding-bottom: 20px;
`;
const Category = styled.div.attrs({
  className: 'noto-medium',
})`
  padding: 20px;
  padding-bottom: 10px;
  padding-top: 50px;
  font-size: 20px;
`;
const FilterBtn = styled.button.attrs({
  className: 'nanum-bold',
})`
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding-right: 10px;
  padding-left: 10px;
  background-color: white;
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
        |
        <FilterBtn name={contents[1]} onClick={handleClick}>
          {contents[1]}
        </FilterBtn>
      </Category>
      <Contents>
        {filter === contents[0] ? (
          <>
            <ContentTitle>{contents[0]}</ContentTitle>
            {/* {projects.map((project) => (
					<ProjectCard key={project.id} size="md" data={project} />
				))} */}
            {[1, 2, 3].map((el) => (
              <ContentCard key={el} />
            ))}
          </>
        ) : (
          <>
            <ContentTitle>{contents[1]}</ContentTitle>
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
