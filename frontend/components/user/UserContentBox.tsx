import React, { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProjectCard from './UserProjectCard';
import UserPostCard from './UserPostCard';
import Pagenation from '../Pagenation';
import { useRouter } from 'next/router';
import { useAllData } from '@/hooks/react-query/useAllData';
import Message from '../Message';
import useUser from '@/hooks/react-query/user/useUser';

interface IProps {
  contentTitle: string[];
  contents?: any;
}

export default function UserContentBox({ contentTitle }: IProps) {
  const router = useRouter();
  const lastUrl = router.asPath.split('/').pop();
  const [id, setId] = useState<number>(0);
  const [filter, setFilter] = useState(contentTitle[0]);
  const [page, setPage] = useState<number>(1);

  const { projectData, communityData } = useAllData();
  const {
    getMyInfo: { data: me, isError },
    getProjectByUserId: { data: projects },
    getPostsByUserId: { data: posts },
  } = useUser({ id, page, pageSize: 5, projectData, communityData });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    setPage(1);
    setFilter(name);
  };
  useEffect(() => {
    if (lastUrl && !(lastUrl === 'me')) {
      setId(+lastUrl);
    } else {
      setId(me.memberId);
    }
  }, [lastUrl, me]);

  const getPageSize = () => {
    if (filter === '프로젝트') {
      return projects?.length || 0;
    }
    if (filter === '게시글') {
      return posts?.length || 0;
    }
    return 0;
  };
  const pageSize = Math.ceil(getPageSize() / 5);
  const projectFilterData = projects?.slice((page - 1) * 5, page * 5);
  const communitiesFilterData = posts?.slice((page - 1) * 5, page * 5);

  if (id === 0) return <h1>Loading...</h1>;
  if (isError) return <Message>잠시 후에 다시 시도해주세요.</Message>;
  return (
    <Wrapper>
      <Category>
        {contentTitle.map((title) => (
          <FilterBtn
            key={title}
            name={title}
            filter={filter}
            onClick={handleClick}
          >
            {title}
          </FilterBtn>
        ))}
      </Category>
      <Contents>
        {filter === '프로젝트' && projectFilterData && (
          <>
            {projectFilterData?.length === 0 ? (
              <Message className="message">게시글이 존재하지 않아요.</Message>
            ) : (
              projectFilterData.map((project) => (
                <UserProjectCard key={project.projectId} project={project} />
              ))
            )}
          </>
        )}
        {filter === '게시글' && communitiesFilterData && (
          <>
            {communitiesFilterData?.length === 0 ? (
              <Message className="message">게시글이 존재하지 않아요.</Message>
            ) : (
              communitiesFilterData.map((post) => (
                <UserPostCard key={post.articleId} post={post} />
              ))
            )}
          </>
        )}
      </Contents>
      <Pagenation page={page} pageSize={pageSize} onPageChange={setPage} />
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
  min-height: 79vh;
  margin-bottom: 20px;
  .message {
    color: white;
  }
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
  background: none;
  color: ${(props) => (props.filter === props.name ? '#8a2be2' : '#464646')};
`;
