import GridBox from '@/components/GridBox';
import InfoContainer from '@/components/user/InfoContainer';
import UserInfoCard from '@/components/user/UserProfile';
import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
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
const Button = styled.button`
  position: absolute;
  right: 20px;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
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
const Works = styled.div`
  background-color: gray;
  margin-top: 20px;
  width: 100%;
  height: 200px;
`;
const ProjectContainer = styled.div``;
const ProjectCard = styled.div``;
const PostContainer = styled.div``;
const PostCard = styled.div``;

export default function me() {
  const user = useAuth();
  const [isEdit, setEdit] = useState<Boolean>(false);
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEdit((prev) => !prev);
    console.log(isEdit);
  };
  return (
    <>
      {user && (
        <GridBox>
          <LeftColumn>
            <Button name="profile" onClick={handleEdit}>
              {isEdit ? 'Submit' : 'Edit'}
            </Button>
            <UserInfoCard user={user} />
          </LeftColumn>
          <RightColumn>
            <UserInfo>
              <ProfileContainer>
                <InfoContainer
                  name="profile"
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
                name="phone"
                keyNode={'휴대전화'}
                contentNode={user.PHONE_NUMBER}
              />
              <InfoContainer
                name="email"
                keyNode={'이메일'}
                contentNode={user.EMAIL}
              />
              <InfoContainer
                name="stacks"
                keyNode={'기술스텍'}
                contentNode={'#react #python'}
                lastItem
              />
            </UserInfo>
            <Works>
              <p className="nanum-bold">Projects | Posts | Replies</p>
            </Works>
          </RightColumn>
        </GridBox>
      )}
    </>
  );
}
