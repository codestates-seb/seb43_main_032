import GridBox from '@/components/GridBox';
import InfoContainer from '@/components/user/InfoContainer';
import UserContentsBox from '@/components/user/UserContentsBox';
import UserInfoCard from '@/components/user/UserProfile';
import { UserState } from '@/types/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

const LeftColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.1);
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
  padding: 40px;
  padding-top: 20px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.2);
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

export default function me() {
  // const user = useAuth();
  const user = USER;
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);

  return (
    <>
      {user && (
        <GridBox>
          <LeftColumn>
            <UserInfoCard user={user} />
          </LeftColumn>
          <RightColumn>
            <UserInfo>
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
                      <p className="noto-regular">프론트엔드</p>
                    </>
                  }
                />
              </ProfileContainer>
              <InfoContainer keyNode={'휴대전화'} contentNode={user.phone} />
              <InfoContainer keyNode={'이메일'} contentNode={user.email} />
              <InfoContainer
                keyNode={'기술스텍'}
                contentNode={'#react #python'}
                lastItem
              />
            </UserInfo>
            <UserContentsBox id={0} contents={['Projects', 'Posts']} />
            <UserContentsBox
              id={0}
              contents={['Projects replies', 'Post replies']}
            />
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
};
