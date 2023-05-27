import InfoContainer from '@/components/user/InfoContainer';
import UserMeContentsBox from '@/components/user/UserMeContentsBox';
import UserInfoCard from '@/components/user/UserProfile';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import GridBox from '@/components/common_box/GridBox';
import { deleteCookie, getCookie } from '@/util/cookie';
import { useEffect } from 'react';
import Tag from '@/components/Tag';
import useUser from '@/hooks/react-query/user/useUser';
import Message from '@/components/Message';
import Head from 'next/head';
import { api } from '@/util/api';
import { confirmAlert } from '@/components/alert/Alert';

export default function me() {
  const {
    getMyInfo: { data: user, isError },
  } = useUser({});
  const router = useRouter();
  useEffect(() => {
    if (!getCookie('accessToken')) {
      router.push('/404').then(() => alert('로그인을 부탁드려요.'));
    }
  }, []);

  const handleClick = () => {
    router.push('/users/me/edit');
  };

  const removeMember = () => {
    confirmAlert('정말 회원 탈퇴를 하시겠습니까?', '회원탈퇴가').then(() =>
      api
        .delete('/members')
        .then(() => {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        })
        .then(() => router.push('/'))
        .then(() => router.reload())
    );
  };

  if (isError) return <Message>잠시 후에 다시 시도해주세요.</Message>;
  return (
    <>
      <Head>
        <title>{`SIDE QUEST - 마이페이지`}</title>
      </Head>
      {user && (
        <GridBox>
          <LeftColumn>
            <UserInfoCard user={user} />
            <EditButton onClick={handleClick}>
              <Tag>수 정</Tag>
            </EditButton>
            <EditButton onClick={removeMember}>
              <Tag>회원 탈퇴</Tag>
            </EditButton>
          </LeftColumn>
          <RightColumn>
            <UserInfo>
              <div className="title">개인 정보</div>
              <ProfileContainer>
                <InfoContainer
                  keyNode={
                    <AvatarContainer style={{ width: '70px', height: '70px' }}>
                      <img alt={user.name} src={user.profileImageUrl} />
                    </AvatarContainer>
                  }
                  contentNode={
                    <>
                      <p className="nanum-bold">{user.name}</p>
                      <p className="noto-regular">{user.position}</p>
                    </>
                  }
                />
              </ProfileContainer>
              <div className="info-box">
                <InfoContainer
                  keyNode={'자기소개'}
                  contentNode={user.aboutMe}
                />
                <InfoContainer
                  keyNode={'휴대전화'}
                  contentNode={user.phone && `${user.phone.slice(0, 7)}****`}
                />
                <InfoContainer
                  keyNode={'이메일'}
                  contentNode={user.email}
                  lastItem
                />
              </div>
            </UserInfo>
            <UserMeContentsBox
              contentTitle={['프로젝트', '게시글', '답글', '댓글']}
            />
          </RightColumn>
        </GridBox>
      )}
    </>
  );
}

const LeftColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 960px) {
    display: none;
  }
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const UserInfo = styled.div`
  padding: 10px;
  margin-bottom: 20px;

  .title {
    font-family: var(--font-nanum);
    font-size: 23px;
    font-weight: 700;
    color: #464646;
    margin-bottom: 20px;
  }

  .info-box {
    color: #c9d1d9;
    font-size: 15px;
    padding: var(--padding-2);
    border: 1px solid #d8d8d8;
    border-radius: var(--radius-def);
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #0d1117;
  }
`;

const ProfileContainer = styled.div`
  @media (min-width: 960px) {
    display: none;
  }
`;
const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: 10px;
  overflow: hidden;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
`;
const EditButton = styled.button`
  width: calc(100% - 14px);
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  font-family: 'Pretendard';
  background: none;

  .tag {
    padding: 10px;
    color: #171717;
    font-size: 14px;
    transition: all 0.5s;

    :hover {
      color: white;
    }
  }
`;
