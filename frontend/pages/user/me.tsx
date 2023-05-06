import GridBox from '@/components/GridBox';
import InfoContainer from '@/components/user/InfoContainer';
import UserInfoCard from '@/components/user/UserProfile';
import useAuth from '@/hooks/useAuth';
import styled from 'styled-components';

const LeftColumn = styled.div`
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

const ProjectContainer = styled.div``;
const ProjectCard = styled.div``;
const PostContainer = styled.div``;
const PostCard = styled.div``;

export default function me() {
  const user = useAuth();
  console.log(user);
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
                    <AvatarContainer>
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
          </RightColumn>
        </GridBox>
      )}
    </>
  );
}
