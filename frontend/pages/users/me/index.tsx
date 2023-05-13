import GridBox from '@/components/GridBox';
import InfoContainer from '@/components/user/InfoContainer';
import UserInfoCard from '@/components/user/UserProfile';
import useApi from '@/hooks/useApi';
import { useEffect, useState } from 'react';
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
  const [getUser, { data: user, isLoading }] = useApi('/api/user/me');

  useEffect(() => {
    getUser();
  }, []);
  user && console.log(user);

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
                      <img alt={user.NICK_NAME} src={user.PROFILE_IMAGE} />
                    </AvatarContainer>
                  }
                  contentNode={
                    <>
                      <p className="nanum-bold">{user.NICK_NAME}</p>
                      <p className="noto-regular">프론트엔드</p>
                    </>
                  }
                />
              </ProfileContainer>
              <InfoContainer
                keyNode={'휴대전화'}
                contentNode={user.PHONE_NUMBER}
              />
              <InfoContainer keyNode={'이메일'} contentNode={user.EMAIL} />
              <InfoContainer
                keyNode={'기술스텍'}
                contentNode={'#react #python'}
                lastItem
              />
            </UserInfo>
            <div style={{ display: 'flex' }}>
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
            </Works>
          </RightColumn>
        </GridBox>
      )}
    </>
  );
}
