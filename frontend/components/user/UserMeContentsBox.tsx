import React, { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import UserProjectCard from './UserProjectCard';
import UserPostCard from './UserPostCard';
import Pagenation from '../Pagenation';
import { useMemberInfo } from '@/hooks/react-query/user/useMemberInfo';
import UserAnswerCard from './UserAnswerCard';
import UserCommentCard from './UserCommentCard';
import Message from '../Message';

interface IProps {
  contentTitle: string[];
  contents?: any;
}

export default function UserMeContentsBox({ contentTitle }: IProps) {
  const [filter, setFilter] = useState(contentTitle[0]);
  const [page, setPage] = useState<number>(1);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    setPage(1);
    setFilter(name);
  };

  //내가 작성한 데이터들
  const {
    projectsData,
    commentsData,
    answersData,
    communitiesData,
    isLoading,
  } = useMemberInfo();

  const getPageSize = () => {
    if (filter === '프로젝트') {
      return projectsData?.length || 0;
    }
    if (filter === '게시글') {
      return communitiesData?.length || 0;
    }
    if (filter === '답글') {
      return answersData?.length || 0;
    }
    if (filter === '댓글') {
      return commentsData?.length || 0;
    }
    return 0;
  };

  const pageSize = Math.ceil(getPageSize() / 5);
  const projectFilterData = projectsData?.slice((page - 1) * 5, page * 5);
  const communitiesFilterData = communitiesData?.slice(
    (page - 1) * 5,
    page * 5
  );
  const answersFilterData = answersData?.slice((page - 1) * 5, page * 5);
  const commentsFilterData = commentsData?.slice((page - 1) * 5, page * 5);

  if (isLoading) return <Message>로딩중입니다.</Message>;
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
        {filter === '프로젝트' && (
          <>
            {projectFilterData &&
              projectFilterData.map((project) => (
                <UserProjectCard key={project.projectId} project={project} />
              ))}
          </>
        )}
        {filter === '게시글' && (
          <>
            {communitiesFilterData &&
              communitiesFilterData.map((post) => (
                <UserPostCard key={post.articleId} post={post} />
              ))}
          </>
        )}
        {filter === '답글' && (
          <>
            {answersFilterData &&
              answersFilterData.map((post) => (
                <UserAnswerCard key={post.answerId} answer={post} />
              ))}
          </>
        )}
        {filter === '댓글' && (
          <>
            {commentsFilterData &&
              commentsFilterData.map((post) => (
                <UserCommentCard key={post.commentId} comment={post} />
              ))}
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
  min-height: 20vh;
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
  background: none;
  color: ${(props) => (props.filter === props.name ? '#8a2be2' : '#464646')};
`;
