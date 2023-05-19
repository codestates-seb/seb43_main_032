import GridBox from '@/components/GridBox';
import styled from 'styled-components';
import ContentCard from '@/components/user/ContentCard';
import { useRouter } from 'next/router';
import UserProfile from '@/components/user/UserProfile';
import { MouseEvent, useEffect, useState } from 'react';
import useUser from '@/hooks/react-query/useUser';
import { USER } from '../me';
import ProjectCard from '@/components/project/ProjectCard';
import Skeleton from '@/components/skeleton/Skeleton';
import UserContentsBox from '@/components/user/UserContentsBox';

//유저 페이지 입니다. 경로 '/user/[id]'  예시 >>  /user/1
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.1);
`;
const ContentsContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
`;

const UserDescription = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: var(--radius-def);
  background-color: rgba(0, 0, 0, 0.2);
`;
const ContentTitle = styled.h2.attrs({
  className: 'nanum-bold',
})`
  padding-bottom: 20px;
`;
const Contents = styled.div`
  padding: 20px;
  border-radius: var(--radius-def);
  background-color: rgba(0, 0, 0, 0.2);
`;
const Category = styled.div.attrs({
  className: 'noto-medium',
})`
  padding: 20px;
  padding-bottom: 10px;
`;
const FilterBtn = styled.button`
  border: none;
  cursor: pointer;
  padding-right: 10px;
  padding-left: 10px;
`;

const UserPage = () => {
  const router = useRouter();
  const id = router.query.id;

  const {
    getUserById: { data: user, isLoading },
    // getProjectByUserId: { data: projects },
    // getPostsByUserId:{data:posts}
  } = useUser({ id: id ? +id : undefined });
  // const user = USER;

  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);

  // if (isLoading) return 'Loading...';

  return user ? (
    <GridBox>
      <UserInfoContainer>
        <UserProfile user={user} />
        <Button>메일 보내기</Button>
        <Button>채팅하기</Button>
      </UserInfoContainer>
      <ContentsContainer>
        <UserDescription>
          <ContentTitle>자기 소개란</ContentTitle>
          <span>{user?.aboutMe}</span>
        </UserDescription>
        {id && <UserContentsBox id={+id} contents={['Projects', 'Posts']} />}
      </ContentsContainer>
    </GridBox>
  ) : (
    'User not Found'
  );
};

export default UserPage;
