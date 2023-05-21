import Stack from '@/components/stack/Stack';
import InfoContainer from '@/components/user/InfoContainer';
import UserContentsBox from '@/components/user/UserContentsBox';
import UserInfoCard from '@/components/user/UserProfile';
import useUser from '@/hooks/react-query/useUser';
import { UserState } from '@/types/user';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import GridBox from '@/components/common_box/GridBox';
import { getCookie } from '@/util/cookie';

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
    background: #0d1117;
    color: #c9d1d9;
    font-size: 15px;
    padding: var(--padding-2);
    border: 1px solid #d8d8d8;
    border-radius: var(--radius-def);
    display: flex;
    flex-direction: column;
    gap: 16px;
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
const StackContainer = styled.div`
  display: flex;
`;
const EditButton = styled.button`
  width: calc(100% - 2px);
  border: solid 2px #ececec;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  font-family: 'Pretendard';

  :hover {
  }
`;

export default function me() {
  // const user = useAuth();
  // const user = dummyUser;
  const {
    getMyInfo: { data: user },
  } = useUser({});
  const router = useRouter();
  if (!getCookie('accessToken')) {
    alert('로그인을 부탁드려요.');
    router.push('/404');
  }
  user && console.log(user);

  const handleClick = () => {
    router.push('/users/me/edit');
  };

  return (
    <>
      {user && (
        <GridBox>
          <LeftColumn>
            <UserInfoCard user={user} />
            <EditButton onClick={handleClick}>edit</EditButton>
          </LeftColumn>
          <RightColumn>
            <UserInfo>
              <div className="title">개인 정보</div>
              <ProfileContainer>
                <InfoContainer
                  keyNode={
                    <AvatarContainer style={{ width: '70px', height: '70px' }}>
                      {user.profileImageUrl ? (
                        <img alt={user.name} src={user.profileImageUrl} />
                      ) : (
                        <img
                          alt={user.name}
                          src="https://pbs.twimg.com/media/FmynZRjWYAgEEpL.jpg"
                        />
                      )}
                    </AvatarContainer>
                  }
                  contentNode={
                    <>
                      <p className="nanum-bold">{user.name}</p>
                      <p className="noto-regular">프론트엔드</p>
                    </>
                  }
                />
                <InfoContainer
                  keyNode={'기술스텍'}
                  contentNode={
                    <StackContainer>
                      {[
                        'java_script',
                        'react',
                        'next_js',
                        'recoil',
                        'react_query',
                        'type_scriypt',
                      ].map((stack) => (
                        <Stack key={stack} tech={stack} />
                      ))}
                    </StackContainer>
                  }
                />
              </ProfileContainer>
              <div className="info-box">
                <InfoContainer
                  keyNode={'자기소개'}
                  contentNode={user.aboutMe}
                />
                <InfoContainer keyNode={'휴대전화'} contentNode={user.phone} />
                <InfoContainer
                  keyNode={'이메일'}
                  contentNode={user.email}
                  lastItem
                />
              </div>
            </UserInfo>
            <UserContentsBox contentTitle={['프로젝트', '게시글']} />
            <UserContentsBox contentTitle={['프로젝트 댓글', '게시글 댓글']} />
          </RightColumn>
        </GridBox>
      )}
    </>
  );
}

export const USER: UserState = {
  email: 'uverrills0@bloomberg.com',
  location: 'Seoul',
  name: 'Ursulina Verrills',
  aboutMe: 'Poisoning by benzodiazepines, intentional self-harm, init',
  yearOfDev: 1,
  position: 'fe',
  phone: '660 384 5454',
  totalStar: 10,
  techList: ['React', 'JavaScript', 'Python'],
  profileImageUrl: 'https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg',
  memberId: 0,
};
