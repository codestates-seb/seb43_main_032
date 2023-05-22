import styled from 'styled-components';
import Tag from '../Tag';
import { UserState } from '@/types/user';
import Stack from '../stack/Stack';
// import Position from '../Position';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
  border: solid 2px #ececec;
  padding: 40px 30px 20px;
  border-radius: 15px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;

  .years-tag {
  }
`;
export const AvatarContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  overflow: hidden;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  gap: 10px;
  @media (max-width: 960px) {
    /* flex-direction: row; */
    align-items: flex-start;
  }
`;
const Position = styled.div.attrs({
  className: 'noto-regular-13',
})`
  display: flex;
  flex-direction: column;
  p {
    text-align: center;
  }

  @media (max-width: 960px) {
    align-items: center;
    flex-direction: row;
    gap: 10px;
  }
`;
const Name = styled.p.attrs({
  className: 'nanum-bold',
})``;

export default function UserProfile({ user }: { user: UserState }) {
  return (
    <Wrapper>
      <AvatarContainer>
        {user.profileImageUrl ? (
          <img alt={user.name} src={user.profileImageUrl} />
        ) : (
          <img
            alt={user.name}
            src="https://pbs.twimg.com/media/FmynZRjWYAgEEpL.jpg"
          />
        )}
      </AvatarContainer>
      <Tag className="years-tag">{`${user?.yearOfDev} 년차`}</Tag>
      <Name>{user?.name}</Name>
      <Position>프론트엔드</Position>
    </Wrapper>
  );
}
