import styled from 'styled-components';
import { useRouter } from 'next/router';
import UserProfile from '@/components/user/UserProfile';
import Tag from '@/components/Tag';
import Stack from '@/components/stack/Stack';
import GridBox from '@/components/common_box/GridBox';
import UserContentBox from '@/components/user/UserContentBox';
import Message from '@/components/Message';
import useUser from '@/hooks/react-query/user/useUser';
import { onChatCreate } from '@/util/chat';
import Custom404 from '@/components/Custom404';

const UserPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const {
    getUserById: { data: user, isLoading, isError },
  } = useUser({ id: id ? +id : undefined });

  if (isError) return <Custom404 />;
  if (isLoading) return <Message>로딩중입니다.</Message>;
  return user && !isLoading ? (
    <GridBox>
      <UserInfoContainer>
        <div className="user-box">
          <UserProfile user={user} />
          <Tag onClick={() => onChatCreate(Number(id))} className="chat-create">
            쪽지 보내기
          </Tag>
        </div>
        <StackWrapper>
          <div className="title">사용 스택</div>
          <div className="stack-list">
            {user.techList.map((stack) => (
              <Stack key={stack.tech} tech={stack.tech} />
            ))}
          </div>
        </StackWrapper>
      </UserInfoContainer>
      <ContentsContainer>
        <UserDescription>
          <ContentTitle>자기 소개란</ContentTitle>
          <ContentBox>{user.aboutMe}</ContentBox>
        </UserDescription>
        <UserContentBox contentTitle={['프로젝트', '게시글']} />
      </ContentsContainer>
    </GridBox>
  ) : (
    <Message>존재하지 않는 사용자입니다.</Message>
  );
};

export default UserPage;

const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 36px 20px;

  .chat-create {
    cursor: pointer;
  }
  .user-box {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .tag {
      padding: 10px;
      color: #171717;
      font-size: 14px;
      transition: all 0.5s;

      :hover {
        color: white;
      }
    }
  }

  img {
    width: 200px;
    height: 200px;
  }
`;
const ContentsContainer = styled.div`
  width: 100%;
  padding: 20px 20px 36px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const UserDescription = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  gap: 32px;
`;
const ContentTitle = styled.h2.attrs({
  className: 'nanum-bold',
})`
  padding-bottom: 20px;
`;

const ContentBox = styled.div`
  width: 100%;
  min-height: 100px;
  background: #0d1117;
  color: #c9d1d9;
  font-size: 15px;
  padding: var(--padding-2);
  border: 1px solid #d8d8d8;
  border-radius: var(--radius-def);
`;

const StackWrapper = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-top: 20px;
  padding: 0 30px;

  .title {
    font-size: 15px;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .stack-list {
    flex-wrap: wrap;
    display: flex;
    gap: 8px;
  }
`;
