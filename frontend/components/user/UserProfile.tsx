import styled from 'styled-components';
import Tag from '../Tag';
import { User } from '@/types/user';
import Position from '../Position';

export default function UserProfile({ user }: { user: User }) {
  return (
    <Wrapper>
      <AvatarContainer>
        <img alt={user.name} src={user.profileImageUrl} />
      </AvatarContainer>
      <Tag className="years-tag">{`${user?.yearOfDev} 년차`}</Tag>
      <Name>{user?.name}</Name>
      <Position>{user.position}</Position>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
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
  border: solid 3px #ececec;
`;
const Name = styled.p.attrs({
  className: 'nanum-bold',
})``;
