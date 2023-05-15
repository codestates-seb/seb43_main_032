import GridBox from '@/components/GridBox';
import styled from 'styled-components';
import ContentCard from '@/components/user/ContentCard';
import { useRouter } from 'next/router';
import UserProfile from '@/components/user/UserProfile';
import { useEffect, useState } from 'react';
import { IUser } from '@/util/api/user';
import useUser from '@/hooks/react-query/useUser';

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

const UserPage = () => {
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  //서버에 유저 확인 요청
  if (!id) return 'Loading...';

  const { getUser } = useUser();
  const { data: user } = getUser(+id);

  return user ? (
    <GridBox>
      <UserInfoContainer>
        {user && <UserProfile user={user} />}
        <Button>메일 보내기</Button>
        <Button>채팅하기</Button>
      </UserInfoContainer>
      <ContentsContainer>
        <UserDescription>
          <ContentTitle>자기 소개란</ContentTitle>
          <span>{user?.ABOUT_ME}</span>
        </UserDescription>
        <Category>프로젝트 | 게시글 | 댓글 </Category>
        <Contents>
          <ContentTitle>참여 프로젝트</ContentTitle>
          {[1, 2, 3, 4, 5].map((el) => (
            <ContentCard key={el} />
          ))}
        </Contents>
      </ContentsContainer>
    </GridBox>
  ) : (
    'User not Found'
  );
};

export default UserPage;
