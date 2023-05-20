import styled from 'styled-components';
import Tag from '../Tag';
import { UserState } from '@/types/user';
import Stack from '../stack/Stack';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 960px) {
    flex-direction: row;
    /* justify-content: space-between; */
    gap: 20px;
  }
`;
export const AvatarContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 100%;
  margin: 10px;
  overflow: hidden;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.25);
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
})`
  margin-top: 20px;
  margin-bottom: 5px;
`;
const StackWrapper = styled.div.attrs({})`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: white;
`;
const stacks = [
  'java_script',
  'react',
  'next_js',
  'recoil',
  'react_query',
  'type_scriypt',
];
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
      <ProfileContainer>
        <Name>{user?.name}</Name>
        <Position>
          <p>{`${user?.yearOfDev} 년차`}</p>
          <p className="noto-regular-13">프론트엔드</p>
        </Position>
        <StackWrapper>
          {stacks.map((stack) => (
            <Stack key={stack} tech={stack} />
          ))}
        </StackWrapper>
      </ProfileContainer>
    </Wrapper>
  );
}
