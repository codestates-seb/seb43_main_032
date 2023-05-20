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
import { dummyUser } from '../me/edit';

//유저 페이지 입니다. 경로 '/user/[id]'  예시 >>  /user/1
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-top: 40px;
  /* background-color: rgba(0, 0, 0, 0.1); */

  @media (max-width: 960px) {
    flex-direction: row;
  }
`;
const ContentsContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  /* background-color: rgba(0, 0, 0, 0.1); */
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 960px) {
    width: 40%;
    margin-top: 0;
  }
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
  /* background-color: rgba(0, 0, 0, 0.2); */
`;
const ContentTitle = styled.h2.attrs({
  className: 'nanum-bold',
})`
  padding-bottom: 20px;
`;

const UserPage = () => {
  const router = useRouter();
  const id = router.query.id;

  // const {
  // getUserById: { data: user, isLoading },
  // getProjectByUserId: { data: projects },
  // getPostsByUserId:{data:posts}
  // } = useUser({ id: id ? +id : undefined });
  const user = dummyUser;

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
        <ButtonContainer>
          <Button>메일 보내기</Button>
          <Button>채팅하기</Button>
        </ButtonContainer>
      </UserInfoContainer>
      <ContentsContainer>
        <UserDescription>
          <ContentTitle>About Me</ContentTitle>
          {/* <span>{user?.aboutMe}</span> */}
          <span>
            다양한 지식을 두루 섭렵하기 위한 노력을 게을리하지 않았고, 이는
            새로운 사람과 공통 화제를 찾는 데 큰 도움이 되었습니다. 다양한
            방면에 잡지식이 많아 어떠한 주제에도 공감할 수 있기 때문입니다.
            이러한 능력에 밝고 쾌활한 성격이 더해진 덕분에 저는 많은 사람과 좋은
            관계를 유지할 수 있었습니다. 성실한 성격입니다. 제게 맡겨진 일은
            책임감을 가지고 성공적인 결과를 낼 수 있도록 최선을 다하는
            성격입니다. 이것은 저의 가장 큰 장점이기도 하지만 때로는 제게
            단점으로 작용하기도 합니다. 한번 마음먹은 일은 완벽하게 해내야
            한다는 생각에 건강을 해치는 경우가 생기기 때문입니다. 팀 과제를
          </span>
        </UserDescription>
        {id && <UserContentsBox id={+id} contents={['Projects', 'Posts']} />}
      </ContentsContainer>
    </GridBox>
  ) : (
    'User not Found'
  );
};

export default UserPage;
