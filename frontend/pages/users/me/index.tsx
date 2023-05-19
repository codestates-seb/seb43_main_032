import GridBox from '@/components/GridBox';
import Stack from '@/components/stack/Stack';
import InfoContainer from '@/components/user/InfoContainer';
import UserContentsBox from '@/components/user/UserContentsBox';
import UserInfoCard from '@/components/user/UserProfile';
import useUser from '@/hooks/react-query/useUser';
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
const StackContainer = styled.div`
  display: flex;
`;
const EditButton = styled.button`
  border: none;
  padding: 10px;
  background-color: skyblue;
  border-radius: 5px;
  cursor: pointer;
`;

export default function me() {
  // const user = useAuth();
  // const user = USER;
  const {
    getMyInfo: { data: user },
  } = useUser({});
  const router = useRouter();
  user && console.log(user);

  const handleClick = () => {
    router.push('/users/me/edit');
  };

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
            <EditButton onClick={handleClick}>edit</EditButton>
            <UserInfoCard user={user} />
          </LeftColumn>
          <RightColumn>
            <UserInfo>
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
              <InfoContainer keyNode={'AboutMe'} contentNode={user.aboutMe} />
              <InfoContainer keyNode={'휴대전화'} contentNode={user.phone} />
              <InfoContainer
                keyNode={'이메일'}
                contentNode={user.email}
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
