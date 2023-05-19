import GridBox from '@/components/GridBox';
import InfoContainer from '@/components/user/InfoContainer';
import UserContentsBox from '@/components/user/UserContentsBox';
import UserInfoCard from '@/components/user/UserProfile';
import useAuth from '@/hooks/react-query/useAuth';
import { UserData } from '@/types/user';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
const Works = styled.div`
  /* display: flex; */
  background-color: teal;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
`;
const ProjectContainer = styled.div``;
const ProjectCard = styled.div``;
const PostContainer = styled.div``;
const PostCard = styled.div``;
const DummyBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
  background-color: gray;
`;
const DummyBox2 = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
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
            {/* <div style={{ display: 'flex' }}>
              <p
                className="nanum-bold"
                style={{ margin: '10px', marginRight: '0', color: 'tomato' }}
              >
                Projects
              </p>
              <p className="nanum-bold" style={{ margin: '10px' }}>
                | Posts
              </p>
            </div>
            <Works>
              <DummyBox>
                <p className="nanum-bold">My Projects</p>
                <DummyBox2 />
              </DummyBox>
              <DummyBox>
                <div style={{ display: 'flex' }}>
                  <p
                    className="nanum-bold"
                    style={{
                      marginRight: '10px',
                      color: 'tomato',
                    }}
                  >
                    Comment
                  </p>
                  <p className="nanum-bold">| Replies</p>
                </div>
                <DummyBox2 />
              </DummyBox>
            </Works> */}
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

export const USER: UserData = {
  email: 'uverrills0@bloomberg.com',
  location: 'Seoul',
  name: 'Ursulina Verrills',
  aboutMe: 'Poisoning by benzodiazepines, intentional self-harm, init',
  yearOfDev: 1,
  position: 'fe',
  phone: '660 384 5454',
  totalStar: 10,
  profileImageUrl: 'http://dummyimage.com/183x100.png/ff4444/ffffff',
};
