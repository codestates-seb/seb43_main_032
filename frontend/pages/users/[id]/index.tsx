import styled from 'styled-components';
import { useRouter } from 'next/router';
import UserProfile from '@/components/user/UserProfile';
import Tag from '@/components/Tag';
import Stack from '@/components/stack/Stack';
import GridBox from '@/components/common_box/GridBox';
import { useProject } from '@/hooks/react-query/project/useProject';
import useUser from '@/hooks/react-query/useUser';
import UserContentsBox from '@/components/user/UserContentsBox';

const UserPage = () => {
  const router = useRouter();
  const id = router.query.id;

  const {
    getUserById: { data: user, isLoading },
    // getProjectByUserId: { data: projects },
    // getPostsByUserId: { data: posts },
  } = useUser({ id: id ? +id : undefined });
  const {
    projectQuery: { data: projects },
  } = useProject();

  return user ? (
    <GridBox>
      <UserInfoContainer>
        <div className="user-box">
          <UserProfile user={user} />
          <Tag>메일 보내기</Tag>
          <Tag>채팅하기</Tag>
        </div>
        <StackWrapper>
          <div className="title">사용 스택</div>
          <div className="stack-list">
            {stacks.map((stack) => (
              // <Tag key={`${stack}`}>{stack}</Tag>
              <Stack key={stack} tech={stack} />
            ))}
          </div>
        </StackWrapper>
      </UserInfoContainer>
      <ContentsContainer>
        <UserDescription>
          <ContentTitle>자기 소개란</ContentTitle>
          <ContentBox>asdasd</ContentBox>
        </UserDescription>
        <UserContentsBox
          contentTitle={['프로젝트', '게시글', '답글', '댓글']}
        />
      </ContentsContainer>
    </GridBox>
  ) : (
    'User not Found'
  );
};

export default UserPage;

const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 36px 20px;

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
const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: var(--radius-sm);
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
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
const stacks = [
  'java_script',
  'react',
  'next_js',
  'recoil',
  'react_query',
  'type_scriypt',
];
