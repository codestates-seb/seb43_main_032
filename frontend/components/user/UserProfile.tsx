import styled from 'styled-components';
import Tag from '../Tag';
import { UserState } from '@/types/user';
import Stack from '../stack/Stack';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const AvatarContainer = styled.div`
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
  margin-bottom: 50px;
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
      <Tag>{`${user?.yearOfDev} 년차`}</Tag>
      <Name>{user?.name}</Name>
      <p className="noto-regular-13">프론트엔드</p>
      <StackWrapper>
        {stacks.map((stack) => (
          // <Tag key={`${stack}`}>{stack}</Tag>
          <Stack key={stack} tech={stack} />
        ))}
      </StackWrapper>
    </Wrapper>
  );
}
