import GridBox from '@/components/GridBox';
import UserInfoCard from '@/components/user/UserInfoCard';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
import styled from 'styled-components';

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.1);
`;
const RightColumn = styled.div`
  padding: 20px;
`;
const UserInfo = styled.div`
  padding: 20px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.2);
`;
const InfoContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const Button = styled.button``;

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
              <InfoContainer>
                <AvatarContainer>
                  <img alt={user.MEMBER_ID} src={user.PROFILE_IMAGE} />
                </AvatarContainer>
                <Button>edit</Button>
              </InfoContainer>
            </UserInfo>
          </RightColumn>
        </GridBox>
      )}
    </>
  );
}
